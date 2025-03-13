import requests
import shutil
import os
import zipfile


def unzip_dir(zip_path, dest_path,showlog=True):
    if showlog:
        print(f'Start to unzip file {zip_path} to folder {dest_path} ...')
    # Check input ...
    if not os.path.exists(zip_path):
        print(zip_path + " is not exit")
        return
    # 删除旧的
    if os.path.exists(dest_path):
        shutil.rmtree(dest_path, True)
    os.mkdir(dest_path)

    # Start extract files ...
    with zipfile.ZipFile(zip_path, "r") as src_zip:
        for src_path in src_zip.namelist():
            dst_path = os.path.normpath(os.path.join(dest_path, src_path))
            dst_dir = os.path.dirname(dst_path)
            if showlog:
                print(f'Unzip file src_path:{src_path} dst_dir:{dst_dir} dst_path:{dst_path}')
            if not os.path.exists(dst_dir):
                os.makedirs(dst_dir)
            if src_path.endswith("/") and not os.path.exists(dst_path):
                os.makedirs(dst_path)
            else:
                with open(dst_path, "wb") as fd:
                    fd.write(src_zip.read(src_path))
        if showlog:
            print("Unzip file succeed!")

class BLog():
    name = "博客更新"

    def __init__(self, check_item: dict):
        self._session = requests.session()
        self._check_item = check_item
        self._session.headers.update(
            {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64",
                "Referer": "https://docs.github.com/",
                "Accept": "application/vnd.github+json",
                "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
                "Connection": "keep-alive",
            }
        )
    
    

    def main(self):
        ower = self._check_item.get("github_ower")
        repo = self._check_item.get("github_repo")
        token = self._check_item.get("github_token")
        dest_path = self._check_item.get("dest_path")
        github_pre=self._check_item.get("github_prefix")
        url = f"https://api.github.com/repos/{ower}/{repo}/releases/latest"
        print(f"get owner:{ower} repo:{repo} token:{token} ")
        self._session.headers.update(
            {"Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "Authorization": f"Bearer {token}"}
        )
        response = self._session.get(url)
        json_data = response.json()
        download_url = json_data.get("assets")[0].get("browser_download_url")
        print(f"get download_url:{download_url}")
        download_url = github_pre + download_url
        release_name = json_data.get("name")
        if dest_path is None or dest_path.strip() == "":
            dest_path = os.path.join(os.path.abspath(os.curdir), "blog_dist")
        if os.path.exists(dest_path) is False:
            os.makedirs(dest_path)
        print(f"get release_name:{release_name} download_url:{download_url} dest_path:{dest_path}")
        local_file_path = os.path.join(dest_path, f"{release_name}.zip")
        if os.path.exists(local_file_path):
            print("no new blog release")
            return
        if os.path.exists(dest_path) is False:
            os.makedirs(dest_path)

        blog_path = os.path.join(dest_path, "web")
        try:
            print(f'begin download ')
            # 增加超时设置和流式下载
            file_res = self._session.get(download_url, timeout=(10, 30), stream=True)
            file_res.raise_for_status()  # 增加HTTP状态码检查
            # 使用分块下载避免大文件内存问题
            total_size = int(file_res.headers.get('content-length', 0))
            downloaded = 0
            print(f'Total size: {total_size//(1024*1024)}MB')
            with open(local_file_path, "wb") as f:
                for chunk in file_res.iter_content(chunk_size=1024*1024): 
                    if chunk:  # 过滤保持连接的空块
                        f.write(chunk)
                        downloaded += len(chunk)
                        if total_size > 0:
                            print(f"\rProgress: {downloaded*100/total_size:.1f}%", end='')
            print(f'download ok')
            blog_tmp_path = os.path.join(dest_path, "web_tmp")
            if os.path.exists(blog_tmp_path):
                shutil.rmtree(blog_tmp_path, ignore_errors=True)
            print(f'unzip file')
            unzip_dir(local_file_path, blog_tmp_path, showlog=False)
            print(f'unzip ok')
            if os.path.exists(blog_path):
                shutil.rmtree(blog_path, ignore_errors=True)
        except Exception as e:
            print(f"download blog error:{e}")
            if os.path.exists(local_file_path):
                os.remove(local_file_path)
            return f"download blog error:{e}"
        shutil.move(os.path.join(blog_tmp_path, "blog/docs/.vitepress/dist"), blog_path)
        return f"download blog success,save path:{local_file_path}\n url:{download_url}"

if __name__ == "__main__":
    try:
        with open(".env", "r",encoding="utf-8") as f:  
            env_data = f.read()
        env_data = env_data.split("\n")
        env_dict = {}
        for env_item in env_data:
            if env_item.strip() == "":
                continue
            if env_item.startswith("#"):
                continue
            env_dict[env_item.split("=")[0].strip()] = env_item.split("=")[1].strip()
        blog = BLog(env_dict)
        print(blog.main())
    except Exception as e:
        print(f"error:{e}")


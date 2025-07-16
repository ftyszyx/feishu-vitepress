import requests
import shutil
import os
import zipfile
import time


def unzip_dir(zip_path, dest_path, showlog=True):
    if showlog:
        print(f"Start to unzip file {zip_path} to folder {dest_path} ...")
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
                print(f"Unzip file src_path:{src_path} dst_dir:{dst_dir} dst_path:{dst_path}")
            if not os.path.exists(dst_dir):
                os.makedirs(dst_dir)
            if src_path.endswith("/") and not os.path.exists(dst_path):
                os.makedirs(dst_path)
            else:
                with open(dst_path, "wb") as fd:
                    fd.write(src_zip.read(src_path))
        if showlog:
            print("Unzip file succeed!")


class BLog:
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
        github_pre = self._check_item.get("github_prefix") or ""
        url = f"https://api.github.com/repos/{ower}/{repo}/releases/latest"
        print(f"get owner:{ower} repo:{repo} token:{token} ")
        self._session.headers.update(
            {"Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "Authorization": f"Bearer {token}"}
        )
        response = self._session.get(url)
        json_data = response.json()
        # print(f"json_data:{json.dumps(json_data, indent=4)}")
        assets = json_data.get("assets")
        asset_list = []
        if dest_path is None or dest_path.strip() == "":
            dest_path = os.path.join(os.path.abspath(os.curdir), "blog_dist")
        if os.path.exists(dest_path) is False:
            os.makedirs(dest_path)
        for asset in assets:
            asset_name = asset.get("name")
            id = asset.get("id")
            print(f"asset_name:{asset_name} id:{id}")
            if asset_name.endswith(".zip"):
                asset_type = asset_name.split("_")[1].split(".")[0]
                download_url = github_pre + asset.get("browser_download_url")
                asset_list.append(
                    {"id": id, "name": asset_name, "type": asset_type, "download_url": download_url, "dest_path": os.path.join(dest_path, asset_type)}
                )
        if len(asset_list) == 0:
            print("no zip file found")
            return
        print(f"get asset_list len:{len(asset_list)} asset_list:{asset_list}")
        for asset in asset_list:
            asset_dest_path = asset.get("dest_path")
            if os.path.exists(asset_dest_path) is False:
                os.makedirs(asset_dest_path)
            asset_name = asset.get("name")
            asset_type = asset.get("type")
            asset_id = asset.get("id")
            download_local_path = os.path.abspath(os.path.join(asset_dest_path, f"{asset_type}_{asset_id}.zip"))
            if os.path.exists(download_local_path):
                print(f"download_local_path:{download_local_path} is exist")
                continue
            asset_download_url = asset.get("download_url")
            asset_blog_path = os.path.join(asset_dest_path, "web")
            blog_tmp_path = os.path.join(asset_dest_path, "web_tmp")
            if os.path.exists(blog_tmp_path):
                shutil.rmtree(blog_tmp_path, ignore_errors=True)

            download_success = False
            max_retries = 3
            for attempt in range(max_retries):
                try:
                    print(f"begin download:{asset_download_url} to {download_local_path} (Attempt {attempt + 1}/{max_retries})")
                    # 增加超时设置和流式下载
                    file_res = self._session.get(asset_download_url, timeout=(10, 60), stream=True)
                    file_res.raise_for_status()  # 增加HTTP状态码检查
                    # 使用分块下载避免大文件内存问题
                    total_size = int(file_res.headers.get("content-length", 0))
                    downloaded = 0
                    print(f"Total size: {total_size//(1024*1024)}MB")
                    with open(download_local_path, "wb") as f:
                        for chunk in file_res.iter_content(chunk_size=1024 * 1024):
                            if chunk:  # 过滤保持连接的空块
                                f.write(chunk)
                                downloaded += len(chunk)
                                if total_size > 0:
                                    print(f"\rProgress: {downloaded*100/total_size:.1f}%", end="")
                    print()  # 移动到新的一行，避免覆盖进度条
                    if total_size != 0 and downloaded < total_size:
                        raise IOError(f"下载不完整。预期大小: {total_size} 字节, 实际下载: {downloaded} 字节。")

                    print("download ok")
                    print(f"unzip file:{download_local_path} to {blog_tmp_path}")
                    unzip_dir(download_local_path, blog_tmp_path, showlog=False)
                    print(f"unzip ok:{download_local_path} to {blog_tmp_path}")
                    download_success = True
                    break  # 下载成功，跳出重试循环
                except Exception as e:
                    print(f"\nAttempt {attempt + 1} for {asset_name} failed: {e}")
                    if os.path.exists(download_local_path):
                        os.remove(download_local_path)
                    if attempt < max_retries - 1:
                        print("Retrying in 5 seconds...")
                        time.sleep(5)
                    else:
                        print(f"All {max_retries} retries failed for {asset_name}.")

            if not download_success:
                continue

            if os.path.exists(asset_blog_path):
                shutil.rmtree(asset_blog_path, ignore_errors=True)
            print(f"move blog to {asset_blog_path}")
            shutil.move(os.path.join(blog_tmp_path, "blog/docs/.vitepress/dist"), asset_blog_path)
            print(f"clean tmp path:{blog_tmp_path}")
            shutil.rmtree(blog_tmp_path)
            print(f"clean old blog from {dest_path} curzip_file:{asset_name}")
            clean_old_blog(asset_dest_path, os.path.basename(download_local_path))
            print(f"download blog success,save path:{download_local_path}\n url:{asset_download_url}")


def clean_old_blog(dest_path, curzip_file):
    print(f"clean old blog from {dest_path} curzip_file:{curzip_file}")
    for file in os.listdir(dest_path):
        if file.endswith(".zip"):
            if file == curzip_file:
                continue
            print(f"clean old blog:{file}")
            os.remove(os.path.join(dest_path, file))


if __name__ == "__main__":
    try:
        with open(".env", "r", encoding="utf-8") as f:
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

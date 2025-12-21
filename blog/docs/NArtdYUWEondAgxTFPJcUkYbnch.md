---
create_time: 1766212753
edit_time: 1766212979
title: 背景音乐提取
categories:
  - skill
---


用 demucs 做人声/伴奏分离

https://github.com/facebookresearch/demucs

用 whisperx/Whisper 从语音生成文本

```md
# 提取伴奏(BGM)与歌词时间轴（人声分离 + 歌词转写对齐）

给一段歌曲音频，输出：
- `out/BGM.wav`：背景音乐(去人声)
- `out/Vocal.wav`：人声(用于识别歌词)
- `out/lyrics.json`：带时间戳的歌词(逐句/逐词，取决于 whisperx 输出)
- `out/lyrics.srt`：字幕格式歌词(逐句时间轴)
- `out/summary.json`：输出文件路径汇总

## 原理/工具

- **人声分离**：`demucs --two-stems=vocals` 产出 `vocals.wav` 和 `no_vocals.wav`
- **歌词与时间轴**：`whisperx` 在 `Vocal.wav` 上做 ASR + 对齐，导出带时间戳的 JSON/SRT

## 前置依赖

- 安装 `ffmpeg` 并加入 PATH（Windows 推荐用 `winget` 或下载静态版）
- Python 3.10+（建议）

> `whisperx` 会依赖 `torch`，Windows 上建议按官方/torch 官网指令先装匹配的 CUDA 或 CPU 版本。

## 安装

```bash
python -m pip install -r requirements.txt
```

## 用法

```bash
python extract_bgm_lyrics.py "E:\path\to\song.mp3" --out out --language zh
```

可选参数：
- `--whisper-model`：默认 `large-v3`
- `--demucs-model`：默认 `htdemucs`
- `--device`：`cuda` 或 `cpu`
- `--compute-type`：如 `float16` / `int8`

## 时间点信息在哪里

- `out/lyrics.json`：通常包含 `segments`（每句的 `start/end/text`），以及（若对齐成功）每个词/字的 `start/end`
- `out/lyrics.srt`：逐句字幕时间轴

## 重要说明

- **“背景音乐”并非一定完美**：源分离对混音质量/编码/现场录音敏感；可换 demucs 模型或加大模型提升效果。
- **没有“现成歌词文本”时**：得到的是“自动识别出来的歌词”，准确率受语言、咬字、噪声影响。
- **如果你有官方歌词文本**：可以在后续加“强制对齐”(forced alignment)，把给定歌词精确贴到时间轴上（需要额外对齐流程）。
```

```py
_import_ argparse
_import_ json
_import_ os
_import_ shutil
_import_ subprocess
_from_ pathlib _import_ Path

def  **run**(_cmd_, _cwd_=None):
  print(">>", " ".join(_cmd_))
  subprocess.run(_cmd_, _cwd_=_cwd_, _check_=True)

def  **ensure_dir**(_p_: Path):
  _p_.mkdir(_parents_=True, _exist_ok_=True)

def  **find_first**(_root_: Path, _name_: str):
  _for_ p _in_ _root_.rglob(_name_):
    _return_ p
  _return_ None

def  **write_summary**(_out_dir_: Path, _bgm_: Path, _vocal_: Path, _lyrics_json_: Path, _lyrics_srt_: Path):
  data = {"bgm_path": str(_bgm_), "vocal_path": str(_vocal_), "lyrics_json": str(_lyrics_json_), "lyrics_srt": str(_lyrics_srt_)}
  (_out_dir_ / "summary.json").write_text(json.dumps(data, _ensure_ascii_=False, _indent_=2), _encoding_="utf-8")

def  **main**():
  ap = argparse.ArgumentParser(_description_="Extract BGM and lyrics with timestamps from a song audio.")
  ap.add_argument("input", _help_="Path to input audio/video file (mp3/wav/flac/mp4/...)")
  ap.add_argument("--out", _default_="out", _help_="Output directory")
  ap.add_argument("--language", _default_="zh", _help_="WhisperX language code, e.g. zh/en/ja")
  ap.add_argument("--whisper-model", _default_="large-v3", _help_="Whisper model name")
  ap.add_argument("--demucs-model", _default_="htdemucs", _help_="Demucs model name")
  ap.add_argument("--device", _default_=None, _help_="WhisperX device: cuda/cpu (optional)")
  ap.add_argument("--compute-type", _default_=None, _help_="WhisperX compute_type: float16/int8 (optional)")
  args = ap.parse_args()
  inp = Path(args.input).expanduser().resolve()
  out_dir = Path(args.out).expanduser().resolve()
  ensure_dir(out_dir)
  work_dir = out_dir / "work"
  ensure_dir(work_dir)
  wav = work_dir / "input.wav"
  _if_ shutil.which("ffmpeg") is None:
    _raise_ SystemExit("ffmpeg not found in PATH. Please install ffmpeg first.")
  run(["ffmpeg", "-y", "-i", str(inp), "-vn", "-ac", "2", "-ar", "44100", str(wav)])
  demucs_out = out_dir / "demucs"
  ensure_dir(demucs_out)
  run(["demucs", "-n", args.demucs_model, "--two-stems=vocals", "-o", str(demucs_out), str(wav)])
  vocals = find_first(demucs_out, "vocals.wav")
  no_vocals = find_first(demucs_out, "no_vocals.wav")
  _if_ vocals is None or no_vocals is None:
    _raise_ SystemExit("Demucs output not found. Please check demucs logs.")
  bgm_path = out_dir / "BGM.wav"
  vocal_path = out_dir / "Vocal.wav"
  shutil.copyfile(no_vocals, bgm_path)
  shutil.copyfile(vocals, vocal_path)
  whisperx_out = out_dir / "whisperx"
  ensure_dir(whisperx_out)
  _if_ shutil.which("whisperx") is None:
    _raise_ SystemExit("whisperx CLI not found. Please pip install whisperx and ensure scripts are in PATH.")
  cmd = ["whisperx", str(vocal_path), "--model", args.whisper_model, "--language", args.language, "--output_dir", str(whisperx_out)]
  _if_ args.device:
    cmd += ["--device", args.device]
  _if_ args.compute_type:
    cmd += ["--compute_type", args.compute_type]
  run(cmd)
  base = vocal_path.stem
  json_path = whisperx_out / f"{base}.json"
  srt_path = whisperx_out / f"{base}.srt"
  _if_ not json_path.exists():
    json_path = find_first(whisperx_out, "*.json")
  _if_ not srt_path.exists():
    srt_path = find_first(whisperx_out, "*.srt")
  _if_ json_path is None or not Path(json_path).exists():
    _raise_ SystemExit("WhisperX json output not found.")
  lyrics_json = out_dir / "lyrics.json"
  shutil.copyfile(json_path, lyrics_json)
  lyrics_srt = out_dir / "lyrics.srt"
  _if_ srt_path is not None and Path(srt_path).exists():
    shutil.copyfile(srt_path, lyrics_srt)
  _else_:
    lyrics_srt.write_text("", _encoding_="utf-8")
  write_summary(out_dir, bgm_path, vocal_path, lyrics_json, lyrics_srt)
  print("Done.")
  print("BGM:", bgm_path)
  print("Vocal:", vocal_path)
  print("Lyrics JSON:", lyrics_json)
  print("Lyrics SRT:", lyrics_srt)

_if_ __name__ == "__main__":
  main()
```


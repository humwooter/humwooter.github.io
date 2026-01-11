#!/usr/bin/env python3
import sys
import subprocess
from pathlib import Path

def main():
    app_dir = Path(__file__).resolve().parent           # Logs/ or Ostinuto/
    repo_root = app_dir.parent                          # humwooter.github.io/

    images_dir = app_dir / "images"
    if not images_dir.exists():
        raise SystemExit(f"error: missing {images_dir}")

    # raw inputs
    phone_input = images_dir                            # expects: <input>/screenshots/...
    tablet_input = images_dir / "screenshots tablet"    # expects: feature folders inside here

    # outputs next to images/ (raw stays clean)
    resized_root = app_dir / "resized images"
    phone_out = resized_root / "normal"
    tablet_out = resized_root / "tablet"
    phone_out.mkdir(parents=True, exist_ok=True)
    tablet_out.mkdir(parents=True, exist_ok=True)

    normal_script = repo_root / "resize_screenshots.py"
    tablet_script = repo_root / "resize_screenshots_tablet.py"

    py = sys.executable

    print(f"\n[{app_dir.name}] phone input:   {phone_input}")
    print(f"[{app_dir.name}] tablet input:  {tablet_input}")
    print(f"[{app_dir.name}] phone output:  {phone_out}")
    print(f"[{app_dir.name}] tablet output: {tablet_out}\n")

    subprocess.check_call([
        py, str(normal_script),
        "--input-dir", str(phone_input),
        "--output-dir", str(phone_out),
    ])

    subprocess.check_call([
        py, str(tablet_script),
        "--input-dir", str(tablet_input),
        "--output-dir", str(tablet_out),
    ])

    print("\nDone.")

if __name__ == "__main__":
    main()
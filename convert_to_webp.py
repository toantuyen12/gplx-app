import os
import glob
from PIL import Image

folder_path = r"C:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app\images\images600"
jpg_files = glob.glob(os.path.join(folder_path, "**", "*.jpg"), recursive=True)

if not jpg_files:
    print("No .jpg files found.")
    exit(0)

BATCH_SIZE = 100
converted_log = []

for i in range(0, len(jpg_files), BATCH_SIZE):
    batch = jpg_files[i:i+BATCH_SIZE]
    for filepath in batch:
        try:
            with Image.open(filepath) as img:
                webp_path = os.path.splitext(filepath)[0] + ".webp"
                # Save as WebP
                img.save(webp_path, "webp", quality=95)
                converted_log.append(f"{os.path.basename(filepath)} -> {os.path.basename(webp_path)}")
                
            # Need to close the file before deleting on Windows
            os.remove(filepath)
        except Exception as e:
            # Maybe some corrupt images or permission issues
            pass

print("All files converted:")
for log in converted_log:
    print(log)

import glob
import os

images = glob.glob(r"c:\Users\TOANTUYEN\Desktop\gplx-app\gplx-app\images\blog\blog_*.png")
for f in images:
    if "_17" in f:
        # e.g blog_main_thumbnail_177...png
        base = os.path.basename(f)
        parts = base.split("_17")
        if len(parts) > 1:
            new_name = parts[0] + ".png"
            new_path = os.path.join(os.path.dirname(f), new_name)
            if os.path.exists(new_path):
                os.remove(new_path)
            os.rename(f, new_path)
            print("Renamed to", new_name)

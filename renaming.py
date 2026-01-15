import os
import re
from collections import defaultdict
# Change this to your folder path
TARGET_FOLDER = 'data/alt'

def rename_one_piece_official_style(root_directory):
    # Regex to find the core ID (OP01-001)
    # It stops before any existing _p, (Alt), or extra text
    pattern = re.compile(r'([A-Z0-9]+-[0-9]+)')
    
    card_counts = defaultdict(int)

    for root, dirs, files in os.walk(root_directory):
        # Sorting helps keep the "original" or "base" art as _p1 
        # (Assuming the base file has the shortest name)
        files.sort()
        
        for filename in files:
            match = pattern.search(filename)
            if match:
                core_id = match.group(1)
                
                # Get extension, but strip any URL queries like ?251212
                # This ensures we get just '.png' or '.jpg'
                file_ext = os.path.splitext(filename.split('?')[0])[1]
                
                # Increment count
                card_counts[core_id] += 1
                
                # Official style: ID + _p + number (e.g., OP01-120_p1)
                new_name = f"{core_id}_p{card_counts[core_id]}{file_ext}"
                
                old_path = os.path.join(root, filename)
                new_path = os.path.join(root, new_name)
                
                # Only rename if the name is actually different
                if filename != new_name:
                    try:
                        os.rename(old_path, new_path)
                        print(f"Updated: {filename} -> {new_name}")
                    except Exception as e:
                        print(f"Error: {e}")

if __name__ == "__main__":
    if os.path.exists(TARGET_FOLDER):
        print(f"Starting rename in: {TARGET_FOLDER}")
        rename_one_piece_official_style(TARGET_FOLDER)
        print("Done!")
    else:
        print("Folder not found.")
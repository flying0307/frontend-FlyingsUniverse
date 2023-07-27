import shutil
import os

src_folder = './build/'
dst_folder = '../backend/web/'

for filename in os.listdir(dst_folder):
    file_path = os.path.join(dst_folder, filename)
    if os.path.isfile(file_path) or os.path.islink(file_path):
        os.unlink(file_path) 
    elif os.path.isdir(file_path):
        shutil.rmtree(file_path)  

for filename in os.listdir(src_folder):
    
    src_path = os.path.join(src_folder, filename)
    dst_path = os.path.join(dst_folder, filename)

    if os.path.isfile(src_path):
        shutil.copy(src_path, dst_path)
    elif os.path.isdir(src_path):
        shutil.copytree(src_path, dst_path)

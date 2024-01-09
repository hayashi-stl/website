wget -O "$1.zip" "https://fonts.google.com/download?family=$1"
unzip -d "/usr/share/fonts/$1/" "$1.zip"
fc-cache -fv
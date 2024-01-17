wget -O ".fonts/$1.zip" "https://fonts.google.com/download?family=$1"
unzip -d "/usr/share/fonts/$1/" ".fonts/$1.zip"
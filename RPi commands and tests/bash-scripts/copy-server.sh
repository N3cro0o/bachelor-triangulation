#!usr/bin/bash

path=$(pwd)

cd ../../SPA/control-panel;
ls;
pwd;
npm i;
npm run build;
sudo rm -rf /var/www/react_test/build/;
sudo cp -r build /var/www/react_test/;
sudo systemctl stop nginx;
cd "$path"
cp ../default /etc/nginx/sites-available/default;
sudo systemctl start nginx;
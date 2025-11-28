#!usr/bin/bash

pwd;
cd ../../SPA/control-panel;
ls;
pwd;
npm i;
npm run build;
sudo rm -rf /var/www/react_test/build/;
sudo cp -r build /var/www/react_test/;
sudo systemctl stop nginx;
sudo cp ../default /etc/nginx/sites-available/default1234;
sudo systemctl start nginx;

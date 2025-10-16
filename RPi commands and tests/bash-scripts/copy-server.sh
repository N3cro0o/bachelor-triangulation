#!usr/bin/bash

cd ../../SPA/control-panel;
ls;
pwd;
npm i;
npm run build;
sudo rm -rf /var/www/react_test/build/;
sudo cp -r build /var/www/react_test/;
sudo systemctl restart nginx;

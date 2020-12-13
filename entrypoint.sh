# !/bin/bash

PREFIX="RT_CONF_"
CONFIG_JSON=$(jo $(env | grep "$PREFIX" | cut -c $(expr ${#PREFIX} + 1)-))
sed -i "s/{{ JS_RUNTIME_CONFIG }}/$CONFIG_JSON/" /usr/share/nginx/html/index.html

echo $CONFIG_JSON
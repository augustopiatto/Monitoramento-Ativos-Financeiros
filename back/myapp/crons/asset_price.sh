# chmod 777 /root /app/.env /usr/local/bin/python /app/manage.py /commands/asset_price.py
chmod 777 /app/.env
/usr/bin/env $(cat /app/.env | xargs)
/usr/local/bin/python /app/manage.py asset_price

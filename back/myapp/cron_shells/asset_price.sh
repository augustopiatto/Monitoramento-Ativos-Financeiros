. /env_files/env_back
# não consegui fazer o spread, dava erro:
# /usr/bin/env $(cat /env_files/env_back | xargs)
SECRET_KEY=$SECRET_KEY DATABASE_HOST=$DATABASE_HOST POSTGRES_DB=$POSTGRES_DB POSTGRES_USER=$POSTGRES_USER POSTGRES_PASSWORD=$POSTGRES_PASSWORD DATABASE_PORT=$DATABASE_PORT API_KEY_BRAPI=$API_KEY_BRAPI /usr/local/bin/python /app/manage.py asset_price

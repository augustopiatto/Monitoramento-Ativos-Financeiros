#!/bin/bash
. /env_files/env_back
# não consegui fazer o spread, dava erro:
# /usr/bin/env $(cat /env_files/env_back | xargs)
SECRET_KEY=$SECRET_KEY \
DATABASE_HOST=$DATABASE_HOST \
POSTGRES_DB=$POSTGRES_DB \
POSTGRES_USER=$POSTGRES_USER \
POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
API_KEY_BRAPI=$API_KEY_BRAPI \
EMAIL_HOST_USER=$EMAIL_HOST_USER \
EMAIL_HOST_PASSWORD=$EMAIL_HOST_PASSWORD \
/usr/local/bin/python /app/manage.py asset_price

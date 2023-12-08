#!/bin/bash
. /env_files/env_back
# não consegui fazer o spread, dava erro:
# /usr/bin/env $(cat /env_files/env_back | xargs)
SECRET_KEY=$SECRET_KEY \
DATABASE_HOST=$DATABASE_HOST \
POSTGRES_DB=$POSTGRES_DB \
POSTGRES_USER=$POSTGRES_USER \
POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
/usr/local/bin/python /app/manage.py new_assets

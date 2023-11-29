#!/bin/bash
crontab /etc/cron.d/cron_scheduler
service cron start
python manage.py migrate
# colocar um wait-for-it
python manage.py dev_db
gunicorn --reload wsgi --bind 0.0.0.0:8000

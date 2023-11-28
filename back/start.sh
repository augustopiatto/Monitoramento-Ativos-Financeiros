#!/bin/bash
crontab /etc/cron.d/cron_scheduler
service cron start
gunicorn --reload wsgi --bind 0.0.0.0:8000
python manage.py migrate

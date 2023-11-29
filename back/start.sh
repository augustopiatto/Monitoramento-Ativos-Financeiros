#!/bin/bash
crontab /etc/cron.d/cron_scheduler
service cron start
python manage.py migrate
gunicorn --reload wsgi --bind 0.0.0.0:8000

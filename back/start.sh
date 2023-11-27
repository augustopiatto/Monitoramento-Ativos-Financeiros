#!/bin/bash
crontab /etc/cron.d/crons
service cron start
gunicorn --reload wsgi --bind 0.0.0.0:8000
python manage.py migrate

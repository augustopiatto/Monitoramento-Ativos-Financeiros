#!/bin/sh
python manage.py migrate
python manage.py runserver
python manage.py collectstatic --no-input

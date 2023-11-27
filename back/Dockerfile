FROM python:3.12

WORKDIR /app/

RUN mkdir -p /setup
COPY ./requirements.txt /setup
RUN pip install -r /setup/requirements.txt

# cron
RUN apt-get update
RUN apt-get -y install cron

RUN mkdir -p /commands
COPY ./myapp/management/commands/asset_price.py /commands/asset_price.py

COPY ./start.sh /etc/start.sh
RUN chmod 755 /etc/start.sh

COPY ./crons /etc/cron.d/crons

CMD ["/etc/start.sh"]

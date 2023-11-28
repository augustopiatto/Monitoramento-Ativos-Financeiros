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
RUN chmod 755 /commands/asset_price.py

COPY ./start.sh /etc/start.sh
RUN chmod 755 /etc/start.sh

COPY ./crons /etc/cron.d/crons
COPY ./myapp/crons/asset_price.sh /etc/cron.d/asset_price.sh
RUN chmod 755 /etc/cron.d/asset_price.sh

RUN mkdir -p /env_files
# tentando colocar esse .env no msm diretorio do dockerfile
COPY .env /env_files/env_back
RUN chmod 777 /env_files/env_back

CMD ["/etc/start.sh"]

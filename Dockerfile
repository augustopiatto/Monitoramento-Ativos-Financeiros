FROM python:3.12

WORKDIR /app/

RUN mkdir -p /setup
COPY ./back/requirements.txt /setup
RUN pip install -r /setup/requirements.txt

# Cron
RUN apt-get update
RUN apt-get -y install cron
RUN apt-get -y install wait-for-it
RUN apt-get -y install dos2unix

RUN mkdir -p /commands
COPY ./back/myapp/management/commands /commands

COPY ./back/cron_scheduler /etc/cron.d/cron_scheduler
COPY ./back/myapp/cron_shells /etc/cron.d/cron_shells

COPY ./back/start.sh /etc/start.sh
RUN chmod 544 /etc/start.sh

# Para conseguir adicionar as variáveis de ambiente no cron
RUN mkdir -p /env_files
COPY .env /env_files/env_back

# Realiza a conversão do arquivo CRLF (quando é Windows que executa) para LF
RUN dos2unix /env_files/env_back
RUN dos2unix /etc/start.sh
RUN dos2unix /etc/cron.d/cron_scheduler
RUN find /etc/cron.d/cron_shells -type f -exec dos2unix {} \;

CMD ["/etc/start.sh"]

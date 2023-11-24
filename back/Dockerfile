FROM python:3.12
WORKDIR /app/
RUN mkdir -p /setup
COPY ./requirements.txt /setup
RUN pip install -r /setup/requirements.txt

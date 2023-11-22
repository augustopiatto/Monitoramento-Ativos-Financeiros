FROM python:3.12
WORKDIR /app/
COPY ./back .
ADD ./back/requirements.txt ./requirements.txt
RUN pip install -r requirements.txt

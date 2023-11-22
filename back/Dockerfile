FROM python:3.12
WORKDIR /app/
COPY . .
ADD ./requirements.txt ./requirements.txt
RUN pip install -r requirements.txt
COPY ./entrypoint.sh .
ENTRYPOINT ["sh", "/app/entrypoint.sh"]

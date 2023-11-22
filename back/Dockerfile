FROM python:3.12
WORKDIR /app/
COPY . ./back/
RUN pip install -r ./back/requirements.txt
ENTRYPOINT ["sh", "/app/back/entrypoint.sh"]

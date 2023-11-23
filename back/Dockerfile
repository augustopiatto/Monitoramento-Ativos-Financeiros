FROM python:3.12
WORKDIR /app/
COPY ./requirements.txt ./back/
RUN pip install -r ./back/requirements.txt
#: Tem cache para isso, então só vai rodar novamente se houver alguma mudança no requirements
COPY . ./back/
ENTRYPOINT ["sh", "/app/back/entrypoint.sh"]

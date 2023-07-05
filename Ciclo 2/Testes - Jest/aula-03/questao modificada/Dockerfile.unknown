FROM postgres

ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD 123
ENV POSTGRES_DB discount-codes-ecommerce

COPY ./src/schema/erase.sql /docker-entrypoint-initdb.d/
COPY ./src/schema/schema.sql /docker-entrypoint-initdb.d/

EXPOSE 5432

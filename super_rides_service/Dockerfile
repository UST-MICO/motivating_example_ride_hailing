FROM python:3.7-slim-stretch


WORKDIR /app

COPY requirements.txt .
RUN pip3 install -r requirements.txt

COPY src ./super_rides_service

ENTRYPOINT python3 super_rides_service/__main__.py
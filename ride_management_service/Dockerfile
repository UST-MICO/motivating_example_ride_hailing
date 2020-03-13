FROM python:3.7-slim-stretch


WORKDIR /app

COPY requirements.txt .
RUN pip3 install -r requirements.txt

COPY src ./ride_management_service

ENTRYPOINT python3 ride_management_service/__main__.py
FROM python:3.8.13-bullseye

ENV PYTHONUNBUFFERED=1

WORKDIR /backend

COPY . .

RUN pip install -r requirements.txt

EXPOSE 8000

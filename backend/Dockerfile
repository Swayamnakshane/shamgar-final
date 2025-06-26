From python:3.11.4

Workdir /app

copy . .

run  pip install --upgrade pip
run  pip install cryptography

run pip install -r requirements.txt

expose 5000

cmd ["python","run.py"]

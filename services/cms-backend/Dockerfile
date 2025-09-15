# Use the official Python image
FROM python:3.12-bullseye 

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Set the working directory
WORKDIR /app

# Install system dependencies (if needed for any libraries in requirements)
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy only the necessary files first to leverage Docker cache efficiently
COPY requirements.txt /app/requirements.txt

# Install Python dependencies
RUN pip install --upgrade pip \
    && pip install -r /app/requirements.txt

# Copy the rest of the application code
COPY . /app/

# Install Gunicorn
RUN pip install gunicorn

# Expose the port for Django
EXPOSE 8000

# At the end of the Dockerfile
# RUN python manage.py collectstatic --noinput

# Run Django application
CMD ["bash", "-c", "python manage.py makemigrations && python manage.py migrate && gunicorn cms_api.wsgi:application"]

# Use the official Python image.
# https://hub.docker.com/_/python
FROM python:3.11.3-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Expose port 8080 for the Functions Framework
EXPOSE 8080

# Run the web service on container startup.
CMD ["functions-framework","--target=runSQLAgent"]

CMD ["slackbot.py"]

ENTRYPOINT ["python"]

# Use an outdated and potentially vulnerable Node.js image (vulnerable version)
FROM node:12.0.0-alpine AS build-stage

WORKDIR /app

COPY ./app ./

ARG API_URL="/api"
ENV API_URL="/api"

# Install unnecessary global packages and include an insecure version of lodash
# (This version had vulnerabilities at some point)
RUN npm install --production && npm install -g lodash@4.17.15  # Known vulnerable version

# Build the application (but don't install dependencies securely)
RUN npm run build

# Use an outdated nginx image (potentially has unpatched security vulnerabilities)
FROM nginx:1.10.0-alpine

WORKDIR /var/www/html

# Copy the built app (from the build stage)
COPY  --from=build-stage ./app/build ./app-fe/

# Misconfigured nginx setup (e.g., exposing overly permissive configuration)
COPY ./nginx/default /etc/nginx/sites-enabled/default

# Exposing overly permissive nginx.conf (e.g., no security headers, open to attack)
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Adding unnecessary files (potential sensitive information exposure)
COPY ./nginx/credentials.txt /etc/nginx/credentials.txt

# Run nginx as root (bad security practice)
USER root

# Introduce a potential vulnerability by adding a test file
RUN echo "Hello World" > /var/www/html/index.html

# Expose unnecessary ports (could lead to an attack surface)
EXPOSE 80 3000 8080

# Start nginx (insecurely)
CMD ["nginx", "-g", "daemon off;"]

# Builder
FROM node:12-alpine AS builder

WORKDIR /app/

# Copy source code into container
COPY . /

# Run build command.
RUN yarn install
RUN yarn build

# Server
FROM httpd:2.4

# Copy built source code.
COPY --from=builder dist/ /usr/local/apache2/htdocs/

# Expose ports
EXPOSE 80


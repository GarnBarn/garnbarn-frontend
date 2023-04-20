# Builder
FROM node:12-alpine AS builder

WORKDIR /app

# copy both 'package.json' and 'yarn.lock' (if available)
COPY package*.json ./
COPY yarn.lock ./

# Run build command.
RUN yarn install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .
RUN yarn run build

## production-stage
FROM nginx:stable-alpine AS production-stage

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder dist /usr/share/nginx/html/

EXPOSE 80

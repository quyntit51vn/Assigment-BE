# Builder
FROM node:10-alpine AS builder
ENV NODE_OPTIONS=--max_old_space_size=4096
# Workdir
WORKDIR /app/src

COPY ./package* ./
COPY ./.env ./
RUN npm install --production

COPY . .
RUN npm run build

# Production
FROM node:10-alpine
# Workdir
WORKDIR /var/www

# Copy
COPY --from=builder ./app/src/app .
RUN mkdir -p /var/www/src/services/mail/templates
COPY --from=builder ./app/src/src/services/mail/templates /var/www/src/services/mail/templates
COPY ./package* ./
COPY ./.env ./

# Install dependency
RUN npm install --production
# Run
CMD npm start
EXPOSE 5003

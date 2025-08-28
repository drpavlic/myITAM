FROM node:18-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S reactapp -u 1001 && \
    chown -R reactapp:nodejs /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

USER reactapp

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
FROM node:20-bookworm as builder

ARG HOST
 
WORKDIR /app
 
COPY package*.json ./
# RUN npm install --legacy-peer-deps --only=production
RUN npm install --only=production
 
COPY . .
 
RUN HOST=$HOST npm run build

FROM nginx:alpine
 
RUN rm -rf /usr/share/nginx/html/*
RUN rm /etc/nginx/conf.d/default.conf
 
COPY .devops/nginx-react.conf /etc/nginx/conf.d/nginx-react.conf
 
COPY --from=builder /app/out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

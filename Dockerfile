FROM node:current-bullseye as build_front

# Working directory be app
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If your are building your code for development or debugging
RUN npm install

# Bundle app source
COPY ./ ./

# Build React
RUN npm run build-export

# Stage 2 - the production environment
FROM nginx:1.22

ADD ./config/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build_front /app/out /var/www/app/cliente

# Entrypoint
CMD ["nginx", "-g", "daemon off;"]

FROM node:alpine

WORKDIR /app

COPY package.json yarn.lock ./

# TODO: add production script
# RUN yarn install --production

RUN yarn install

COPY . .

CMD ["yarn", "start"]

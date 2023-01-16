FROM node:18.11.0-alpine3.16 as ts-compile
WORKDIR /usr/tc-acl
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . ./
RUN npm run build:app

FROM node:18.11.0-alpine3.16 as ts-remove
WORKDIR /usr/tc-acl
COPY --from=ts-compile /usr/tc-acl/package*.json ./
COPY --from=ts-compile /usr/tc-acl/dist ./
RUN npm install --omit=dev

FROM gcr.io/distroless/nodejs:18
WORKDIR /usr/tc-acl
COPY --from=ts-remove /usr/tc-acl ./
USER 1000
CMD ["server.js"]



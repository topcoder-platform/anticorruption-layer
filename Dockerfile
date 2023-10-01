FROM node:20.8.0-alpine3.17 AS ts-compile
WORKDIR /usr/anticorruption-layer
COPY yarn*.lock ./
COPY package*.json ./
COPY tsconfig*.json ./
COPY .npmrc ./
RUN yarn install --frozen-lockfile --production=false
COPY . ./
RUN yarn build:app

FROM node:20.8.0-alpine3.17 AS ts-remove
WORKDIR /usr/anticorruption-layer
COPY --from=ts-compile /usr/anticorruption-layer/yarn*.lock ./
COPY --from=ts-compile /usr/anticorruption-layer/package*.json ./
COPY --from=ts-compile /usr/anticorruption-layer/dist ./
COPY --from=ts-compile /usr/anticorruption-layer/.npmrc ./
RUN yarn install --frozen-lockfile --production=false

FROM gcr.io/distroless/nodejs:20
WORKDIR /usr/anticorruption-layer
COPY --from=ts-remove /usr/anticorruption-layer ./
USER 1000
ENV GRPC_SERVER_PORT=40020
ENV GRPC_SERVER_HOST=localhost
ENV GRPC_RDB_SERVER_HOST=localhost
ENV GRPC_RDB_SERVER_PORT=9090
CMD ["server.js"]

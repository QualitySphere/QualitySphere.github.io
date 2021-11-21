FROM jekyll/jekyll:4 AS builder
COPY . .
RUN jekyll clean \
    && jekyll build \
    && mv _site /html

FROM nginx:1.16-alpine
COPY --from=builder /html /usr/share/nginx/html
# RUN sed -i \
    # "s#location\ /\ {#location\ /\ {\nadd_header\ \'Access-Control-Allow-Origin\'\ \'*\';\nadd_header\ \'Access-Control-Allow-Methods\'\ \'GET,\ OPTIONS\';#" \
    # /etc/nginx/conf.d/default.conf
EXPOSE 80
WORKDIR /usr/share/nginx/html
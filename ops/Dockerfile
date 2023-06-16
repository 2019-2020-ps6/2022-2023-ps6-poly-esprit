# proxy
FROM httpd:2.4

COPY ./proxy.conf /usr/local/apache2/conf/extra/proxy.conf

COPY httpd.conf /usr/local/apache2/conf/httpd.conf

EXPOSE 80

CMD ["httpd-foreground"]
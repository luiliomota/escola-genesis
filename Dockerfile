FROM amazoncorretto:17-alpine-jdk
COPY target/*.jar /usr/src/app/
WORKDIR /usr/src/app/
CMD java -jar *.jar
EXPOSE 8083

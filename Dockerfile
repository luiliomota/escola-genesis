FROM amazoncorretto:17-alpine-jdk
COPY target/escolagenesis-0.0.1-SNAPSHOT.jar /usr/src/app/
WORKDIR /usr/src/app/
CMD java -jar escolagenesis-0.0.1-SNAPSHOT.jar
EXPOSE 8083

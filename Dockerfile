# Note: This Dockerfile was created after finding out that there is an official image.
#       Consider using that in the future.
#       https://book.getfoundry.sh/tutorials/foundry-docker

FROM node:18.12.1-buster

RUN apt update && \
    apt upgrade && \
    apt install -y sudo git build-essential jq glibc-source && \
    adduser --disabled-password --gecos '' docker && \
    adduser docker sudo && \
    echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

USER docker

WORKDIR /home/docker/opt
COPY packages ./packages
COPY lerna.json ./
COPY package.json ./
COPY foundry.sh ./
ENV PATH "$PATH:/home/docker/.foundry/bin"
RUN ./foundry.sh && \
    foundryup 

RUN yarn cache clean
RUN sudo chmod -R 777 /home/docker/opt
RUN yarn --network-timeout 100000
ENTRYPOINT ["yarn", "start:contracts"]

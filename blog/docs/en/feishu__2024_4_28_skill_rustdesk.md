---
title: Rustdesk use
tags:
  - develop
keywords:
  - rustdesk
  - todesk
  - remote
  - gratis
  - open source
  - Mac Remote
  - Windows Remote
  - teamviwer
create_time: 1716887079
categories:
  - skill
---

# Background:

For a development, remote control is just needed.

I've used Todesk, TeamViwer, Sunflower Remote before

<table>
<colgroup>
<col width="100"/>
<col width="170"/>
<col width="201"/>
<col width="261"/>
</colgroup>
<tbody>
<tr><td></td> The <td><p>connection speed</p></td> <td><p>is friendly to Mac support</p></td> <td><p>software</p></td></tr>
<tr><td><p>Todesk</p></td> <td><p>is</p></td> <td><p>very</p></td> <td><p>good</p></td></tr>
<tr><td><p>TeamViwer</p></td> <td><p>is slow (the server is abroad, often can't connect)</p></td> <td><p>is not good (Mac remote latency is large)</p></td> <td><p>is not particularly good</p></td></tr>
<tr><td><p>Sunflower remote</p></td> <td><p>slow</p></td> <td><p>is</p></td> <td><p>not particularly good</p></td></tr>
</tbody>
</table>

Todesk is the best, and I also used the VIP service for two years (more than 300 a year).

Recently, I found rustdesk on the Internet, and I wanted to try it out to see if I could save 300.

# Install the client

Go to the official website to download the latest version https://github.com/rustdesk/rustdesk/releases

Choose x86_64.msi# Install the server

https://github.com/rustdesk/rustdesk-server

Install using docker

Build a docker-compose.yml

```csharp
version: "3"

networks:
  rustdesk-net:
    external: false

services:
  hbbs:
    container_name: hbbs
    ports:
      - 21115:21115
      - 21116:21116
      - 21116:21116/udp
      - 21118:21118
    image: rustdesk/rustdesk-server:latest
    command: hbbs -r rustdesk.example.com:21117
    volumes:
      - ./data:/root
    networks:
      - rustdesk-net
    depends_on:
      - hbbr
    restart: unless-stopped

hbbr:
    container_name: hbbr
    ports:
      - 21117:21117
      - 21119:21119
    image: rustdesk/rustdesk-server:latest
    command: hbbr
    volumes:
      - ./data:/root
    networks:
      - rustdesk-net
    restart: unless-stopped
```

initiate

```csharp
docker-compose up -d
```

After starting, a certificate file will be generated in the current directory

<img src="/assets/H0Qvb3YFBo6inwxg56fcMBcyn1f.png" src-width="653" class="m-auto" src-height="175" align="center"/>

Copy the .pub file

# Configure the client

Unlock the network configuration

<img src="/assets/TEehbX77so38uaxDOP2cUrFknag.png" src-width="822" class="m-auto" src-height="322" align="center"/>

Fill in your server address and key

<img src="/assets/Z1CsbATDsoX43qxyGQFcw4D0nBd.png" src-width="561" class="m-auto" src-height="318" align="center"/>

Connect the client

<img src="/assets/A60VbgI33oPabdxWHTRczBXtn0d.png" src-width="793" class="m-auto" src-height="350" align="center"/>
# Summary

It's completely free: Of course you can use the Server Pro version, but it feels like the personal version will do the trick.

Fully controllable: your own server, don't worry about privacy being compromised

It's fast and runs smoothly: I tried it out, and the remote response was very fast, with little delay. (It is possible that the server and the client are both in the same local area network.)

Highly recommended

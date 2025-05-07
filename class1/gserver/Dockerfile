# GCP가 이해할 수 있게 도커파일로 환경만들기


# 노드 20버전 부터(환경설명) - 노드 기반 이미지 
FROM node:20

# app에다가 만들어주세요
WORKDIR /app

# 복사해줘! 내가 가지고있는 전부를 너의 app폴더에 다 복사해!!!
COPY . .

# 너가 실행하는건 npm이 있어야해. 
RUN npm install

# 포느틑 8881을 사용할거야
ENV PORT  = 8881
# 내보내는 것도 8881을 사용할거야.
EXPOSE 8881 


# 너는 실행해 GCP야!
CMD [ "node", "server.js" ]
FROM node:14  
WORKDIR /app 
COPY package.json .
COPY . .
EXPOSE 4000
CMD [ "npm" ,"run","start-dev" ]
ARG NODE_ENV 
RUN if ["$NODE_ENV" ="production"]; \
  then npm install --only=production; \
  else npm install ; \
  fi


     ### multi stage 


# FROM node:14  as base 

# FROM node:14  as development 
# WORKDIR /app 
# RUN npm install 
# COPY package.json .
# COPY . .
# EXPOSE 4000
# CMD [ "npm" ,"run","start-dev" ]



# FROM node:14  as production 
# WORKDIR /app 
# RUN npm install --only=production
# COPY package.json .
# COPY . .
# EXPOSE 4000
# CMD [ "npm" ,"start" ]
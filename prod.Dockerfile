FROM node:16-alpine

ENV NODE_ENV development

#add turborepo
RUN yarn global add turbo

# Set working directory
WORKDIR /app

# Install app dependencies
COPY  ["yarn.lock", "package.json", "./"] 

# Copy source files
COPY . .

# Install app dependencies
RUN npm install
RUN chown -R node /app/node_modules
RUN npm run build

CMD ["npm", "run" , "start:prod"]
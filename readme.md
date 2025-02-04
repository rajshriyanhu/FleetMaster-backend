This backend uses node.js, express.js with typescript along with prisma as ORM and postgres as Database

1. Install all dependencies - npm install

2. Set up docker - 
  a) Download and install docker
  b) Go to dev-tools - run command in terminal - cd dev-tools
  c) Fetch postgres and pgAdmin - docker compose up -d
  
    postgres is running on localhost:5432
    
    You can access PgAdmin at localhost:2345
    email - admin@gmail.com
    password - admin

3. Run locally (with typescript) - npm run dev (localhost:8000)

4. Make sure to check the javascript code as well -
   a) Build using the code npm run build, the javascript code will be generated in ./dist
   <!-- b) Add "type" : "module" in package.json -->
   b) Run in javascript - npm start

5. We are using prisma for schema migration - 
   a) After creating/updating schema, migrate to postgres - npx prisma migrate dev --name give_custom_name


To test the endpoint:
(I couldve deployed this on AWS but considering the time limit let it run on local)
1. Clone the repository and run npm i.
2. Start services of psql and redis.
3. The Database Url needs to be in an environment variable with name “DATABASE_URL“ (I will attach mine in mail, change it accordingly)
4. Hit the endpoint “http://localhost:4000?cursor=0&limit=10”

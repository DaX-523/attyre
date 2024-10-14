const redis = require("redis");
const client = redis.createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

client.connect().then(() => {
  console.log("Redis Client Connected!");
});
module.exports = client;

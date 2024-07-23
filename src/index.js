const express = require("express");
// connect DB
//const mongoose = require("mongoose");
const redis = require("redis");
// const { Client } = require("pg");

const PORT = process.env.PORT || 4000;
const app = express();

// mongoose.connect("mongodb://username:password@host:port/database?options...");
// const DB_USER = "root";
// const DB_PASSWORD = "example";
// const DB_PORT = 27017;
// //const DB_HOST = ' '; // to know IPADDRESS  #docker inspect nameofmongoContanier
// const DB_HOST = "mongo"; // you can use name of service instead of ip and docker will get it
// const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// mongoose
//   .connect(URI)
//   .then(() => console.log("connected to DB"))
//   .catch((err) => console.log("failed to connect DB", err));

// const DB_USER = "root";
// const DB_PASSWORD = "example";
// const DB_PORT = 5432;
// //const DB_HOST = ' '; // to know IPADDRESS  #docker inspect nameofmongoContanier
// const DB_HOST = "postgres"; // you can use name of service instead of ip and docker will get it
// const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// const client = new Client({
//   connectionString: URI,
// });

// client
//   .connect()
//   .then(() => console.log("connected to postgres DB"))
//   .catch((err) => console.log("failed to connect postgres DB", err));

// connect to redis
const REDIS_HOST = "redis";
const REDIS_PORT = 6379;
const redisClient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});
redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", (err) => console.log("connected to redis"));
redisClient.connect();

app.get("/", (req, res) => {
  redisClient.set("products", "products...");
  res.send("<h1> Hello world !!!</h1>");
});

app.get("/data", async (req, res) => {
  const products = await redisClient.get("products");
  res.send(`<h1> Hello world this is product!!!</h1> <h2>${products}</h2>`);
});

app.listen(PORT, () => console.log(`server working: ${PORT}`));

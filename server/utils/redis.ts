import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});

redisClient.connect()
  .then(() => {
    console.log('Redis client connected');
  });

export default redisClient;
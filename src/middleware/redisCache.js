// import redisClient from "../config/redis.js";
import client from "../config/redis.js";

// membuat fungsi middleware Redis
const checkRedis = async (req, res, next) => {
  try {
    const data = await client.get(req.url);

    if (data) {
      // result = ;
      res.send({
        fromCache: true,
        data: JSON.parse(data),
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(404);
  }
};

export default checkRedis;

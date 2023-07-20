// import client from "../config/redis.js";

// membuat fungsi middleware Redis
// const checkRedis = async (req, res, next) => {
//   const id = req.params.id;
//   const url = req.url;
//   try {
//     const data = await client.get(`${url}`);

//     if (data) {
//       res.send({
//         fromCache: true,
//         data: JSON.parse(data),
//       });
//     } else {
//       next();
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(404);
//   }
// };

// export default checkRedis;

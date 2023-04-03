import minio from "minio";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

export const MinioClient = new minio.Client({
  endPoint: process.env.S3_ENDPOINT,
  accessKey: process.env.S3_ACCESS_KEY,
  secretKey: process.env.S3_SECRET_KEY,
  port: 443,
  useSSL: true,
});

export const uploadFile = (path, objectName) => {
  fs.readFile(path, function (err, data) {
    if (err) {
      return res.send(err);
    }
    const metaData = {
      "Content-Type": "image/png, image/jpg, image/jpeg", // sesuaikan dengan jenis file gambar
    };
    MinioClient.putObject(
      "foodimages",
      objectName,
      data,
      metaData,
      function (err, etag) {
        if (err) {
          return res.send(err);
        }
      }
    );
  });
};

// remove file

export const removeFile = (filename) => {
  MinioClient.removeObject("foodimages", filename, function (err) {
    if (err) {
      return err;
    }
  });
};

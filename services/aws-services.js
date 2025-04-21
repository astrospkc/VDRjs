import dotenv from "dotenv";
dotenv.config();
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
  region: "us-east-1",
  signatureVersion: "v4",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function createPreSignedUrlToUploadData(
  bucketName,
  fileKey,
  expiresInSecond
) {
  const putCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileKey,
  });

  const response = await getSignedUrl(client, putCommand, {
    expiresIn: expiresInSecond,
  });

  return response;
}

const response = await createPreSignedUrlToUploadData(
  "astrodevsecond",
  "image.jpg",
  3600
);

console.log(response);

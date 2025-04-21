import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
dotenv.config();
const client = new S3Client({
  region: "us-east-1",
  signatureVersion: "v4",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function getFilePresignedUrl(bucketName, fileKey) {
  const getCommand = new GetObjectCommand({
    Bucket: bucketName,
    Key: fileKey,
  });

  const response = await getSignedUrl(client, getCommand);
  return response;
}

const response = await getFilePresignedUrl("astrodevsecond", "image.jpg");
console.log(response);

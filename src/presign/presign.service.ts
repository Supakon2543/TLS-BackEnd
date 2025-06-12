import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class PresignService {
  private s3: S3Client;
  private bucket = process.env.AWS_S3_BUCKET;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  async generatePresignUrls(body: { path: string; files: { name: string; type: string }[] }) {
    const urls = await Promise.all(
      body.files.map(async (file) => {
        const key = `${body.path}/${file.name}`;
        const command = new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          ContentType: file.type,
        });
        const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 });
        return { url, key };
      }),
    );
    return { urls };
  }
}
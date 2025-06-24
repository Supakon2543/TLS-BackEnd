import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class PresignService {
  private readonly s3: S3Client;
  private readonly bucket = process.env.AWS_S3_BUCKET;

  

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

  async downloadFile(bucket: string, key: string): Promise<Buffer> {
    const params = {
      Bucket: bucket,
      Key: key,
    };
    const command = new GetObjectCommand(params);
    const data = await this.s3.send(command);
    const stream = data.Body as NodeJS.ReadableStream;
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
  }
}
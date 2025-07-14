import { Injectable } from '@nestjs/common';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { CreateDowloadS3Dto } from './dto/create-dowload_s3.dto';
import { Readable } from 'stream';

@Injectable()
export class DownloadS3Service {
  private readonly s3 = new S3Client({
    region: process.env.AWS_REGION,
    // credentials: {
    //   accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    // },
  });

  async downloadFile(
    dto: CreateDowloadS3Dto,
  ): Promise<{ base64: string; filename: string; fileType: string }> {
    if (!dto.path) {
      throw new Error('Path is required');
    }
    const key = dto.path.startsWith('/') ? dto.path.slice(1) : dto.path;
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: key,
    });
    const response = await this.s3.send(command);
    // Convert stream to buffer
    const stream = response.Body as Readable;
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    const buffer = Buffer.concat(chunks);

    // Get filename from path
    const filename = key.split('/').pop() || 'file';
    // Get file type from S3 response headers or fallback to 'application/octet-stream'
    const fileType = response.ContentType || 'application/octet-stream';

    return { filename, fileType, base64: buffer.toString('base64') };
  }
}

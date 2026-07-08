import AWS from 'aws-sdk'
import dotenv from 'dotenv'

dotenv.config()

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

export const uploadToS3 = async (file: Express.Multer.File): Promise<string> => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET || 'ugc-platform-files',
    Key: `${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  }

  const result = await s3.upload(params).promise()
  return result.Location
}

export const deleteFromS3 = async (key: string): Promise<void> => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET || 'ugc-platform-files',
    Key: key,
  }

  await s3.deleteObject(params).promise()
}

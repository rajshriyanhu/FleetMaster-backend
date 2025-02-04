import { GetSignedUrlConfig, Storage } from "@google-cloud/storage";
import { NextFunction, Request, Response } from "express";

const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  credentials: {
    client_email: process.env.GCS_CLIENT_EMAIL,
    private_key: process.env.GCS_PRIVATE_KEY?.replace(/\\n/g, "\n"), // Handle escaped newlines
  },
});

export const generateSignedUrl = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log('signed url')
    const { fileName } = req.body;
    const bucketName = process.env.BUCKET_NAME;

    if (!fileName || !bucketName) {
      return res.status(400).json({ error: 'fileName is required' });
    }

    console.log('Bucket Name:', bucketName);
    console.log('File Name:', fileName);

    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    // Check if the file exists
    const [exists] = await file.exists();
    if (!exists) {
      return res.status(404).json({
        error: `File "${fileName}" does not exist in bucket "${bucketName}"`,
      });
    }

    const options: GetSignedUrlConfig = {
      version: 'v4',
      action: 'read',
      expires: Date.now() + 60 * 60 * 1000,
    };

    const [url] = await file.getSignedUrl(options);

    return res.status(200).json({ url });
  }
// utils/uploadToBackblaze.ts
import B2 from 'backblaze-b2';
import fs from 'fs';
import path from 'path';

const b2 = new B2({
  applicationKeyId: process.env.B2_KEY_ID as string,
  applicationKey: process.env.B2_APP_KEY as string,
});

const BUCKET_ID = process.env.B2_BUCKET_ID as string;
const BUCKET_NAME = process.env.B2_BUCKET_NAME as string;

const uploadToBackblaze = async (filePath: string, originalName: string): Promise<string> => {
  try {
    await b2.authorize();

    const fileData = fs.readFileSync(filePath);
    const uploadUrlResp = await b2.getUploadUrl({ bucketId: BUCKET_ID });

    const uploadResp = await b2.uploadFile({
      uploadUrl: uploadUrlResp.data.uploadUrl,
      uploadAuthToken: uploadUrlResp.data.authorizationToken,
      fileName: `${Date.now()}-${originalName}`,
      data: fileData,
    });

    return `https://f000.backblazeb2.com/file/${BUCKET_NAME}/${uploadResp.data.fileName}`;
  } catch (err) {
    const error = err as Error;
    throw new Error(`Failed to upload file to Backblaze: ${error.message}`);
  }
};

export default uploadToBackblaze;

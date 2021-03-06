import {axInstance} from '@/utils/axiosInstance';
import {NextApiRequest, NextApiResponse} from 'next';
import {ImagePreviewResponse} from 'src/types/imageTypes';

const CAMPEDIA_API_URL = process.env.CAMPEDIA_API_URL;

export default async function cameraPreviewImageHandler(
  req: NextApiRequest,
  res: NextApiResponse<ImagePreviewResponse>,
) {
  if (req.method === 'GET') {
    const {cameraAlt} = req.query;
    const cameraResponse = await axInstance.get<ImagePreviewResponse>(
      CAMPEDIA_API_URL + `/image/camera/${cameraAlt}`,
    );

    return res.status(200).json(cameraResponse.data);
  }
}

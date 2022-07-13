import {axInstance} from '@/utils/axiosInstance';
import {NextApiRequest, NextApiResponse} from 'next';
import {ImagePreviewResponse} from 'src/types/imageTypes';

const CAMPEDIA_API_URL = process.env.CAMPEDIA_API_URL;

export default async function brandImageHandler(
  req: NextApiRequest,
  res: NextApiResponse<ImagePreviewResponse>,
) {
  if (req.method === 'GET') {
    const {brandAlt} = req.query;
    const brandResponse = await axInstance.get<ImagePreviewResponse>(
      CAMPEDIA_API_URL + '/image/brand/' + brandAlt,
    );

    return res.status(200).json(brandResponse.data);
  }
}

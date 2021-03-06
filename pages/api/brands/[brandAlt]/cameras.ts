import {axInstance} from '@/utils/axiosInstance';
import {NextApiRequest, NextApiResponse} from 'next';

const CAMPEDIA_API_URL = process.env.CAMPEDIA_API_URL;

export interface BrandCameraListResponse {
  type: 'brands';
  data: BrandCameraObject[];
}

export interface BrandCameraObject {
  id: number;
  name: string;
  alt: string;
  thumbnail?: string;
}

export default async function brandDetailsHandler(
  req: NextApiRequest,
  res: NextApiResponse<BrandCameraListResponse>,
) {
  if (req.method === 'GET') {
    const {brandAlt} = req.query;
    const brandResponse = await axInstance.get<BrandCameraListResponse>(
      CAMPEDIA_API_URL + '/brands/' + brandAlt + '/cameras',
    );

    return res.status(200).json(brandResponse.data);
  }
}

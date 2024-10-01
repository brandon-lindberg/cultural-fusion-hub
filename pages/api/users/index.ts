import { NextApiRequest, NextApiResponse } from 'next';
import { sampleUserData } from '../../../utils/sample-data';
import rateLimiter from '../../../utils/rateLimiter';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  rateLimiter(req, res, () => {
    try {
      if (!Array.isArray(sampleUserData)) {
        throw new Error('Cannot find user data');
      }

      res.status(200).json(sampleUserData);
    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  });
};

export default handler;

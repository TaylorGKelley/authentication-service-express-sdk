import { RequestHandler } from 'express';
import axios from 'axios';

const clientId = '8d46d402-37e4-4b9c-82ef-ccf44acbb43f';

export function authorize(allowedPermissions: string[]): RequestHandler {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(' ').at(1);

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
    }

    // axios request
    const response = await axios.get<{
      id: number;
      email: string;
      permisisons: string[];
    }>(`http://localhost:7001/api/v1/user-permissions/${clientId}`, {
      headers: {
        Authorization: req.headers.authorization,
      },
    });

    console.log(response.data);
    next();
  };
}

import { RequestHandler } from 'express';
import axios from 'axios';
import UserPermissionResponse from './types/UserPermissionResponse';

const clientId = '8d46d402-37e4-4b9c-82ef-ccf44acbb43f';

export function authorize(allowedPermissions: string[]): RequestHandler {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(' ').at(1);

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    // axios request
    const response = await axios.get<UserPermissionResponse>(
      `http://localhost:7001/api/v1/user-permissions/${clientId}`,
      {
        headers: req.headers,
      }
    );

    if (response.status !== 200) {
      res.status(response.status).json(response.data);
      return;
    }

    req.user = response.data.user;
    next();
  };
}

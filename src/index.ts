import { RequestHandler } from 'express';
import axios from 'axios';
import UserPermissionResponse from './types/UserPermissionResponse';

const clientId = '8d46d402-37e4-4b9c-82ef-ccf44acbb43f';

export function authorize(allowedPermissions: string[]): RequestHandler {
  return async (req, res, next) => {
    try {
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

      const { user, permissions } = response.data;
      req.user = user;

      // Check if user is in allowed roles
      const isAllowed = allowedPermissions.some((allowedPermission) =>
        permissions.includes(allowedPermission)
      );

      if (!isAllowed && !allowedPermissions.includes('public')) {
        res.status(403).json({ message: 'Forbidden' });
      }

      next();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        res
          .status(error.status ?? 500)
          .json({ message: error.response?.data?.message });
      } else {
        res.status(500).json({ message: (error as Error).message });
      }
    }
  };
}

import axios from 'axios';
import { RequestHandler } from 'express';

// Types
type AuthServiceConfig = {
  clientId: string;
  serviceBaseUrl: URL;
};
type URL = `${'http://' | 'https://'}${string}`;

// Functions
export default function initialize(authConfig: AuthServiceConfig) {
  const clientId = authConfig.clientId;
  const baseUrl = authConfig.serviceBaseUrl;
  const api = axios.create({ baseURL: baseUrl });

  return {
    authorize: (allowedPermissions: string[]) =>
      ((req, res, next) => {
        try {
          // req handler logic
          console.log(clientId, baseUrl);

          next();
        } catch (error) {
          next(error);
        }
      }) as RequestHandler,
  };
}

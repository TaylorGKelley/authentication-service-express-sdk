import { RequestHandler } from 'express';

export default class AuthService {
  private _clientId: string;
  private _baseUrl: string;

  constructor(authConfig: AuthServiceConfig) {
    this._clientId = authConfig.clientId;
    this._baseUrl = authConfig.serviceBaseUrl;
  }

  public authorize: RequestHandler = (req, res, next) => {
    console.log(this._clientId);
  };
}

export type AuthServiceConfig = {
  clientId: string;
  serviceBaseUrl: `${'http://' | 'https://'}${string}`;
};

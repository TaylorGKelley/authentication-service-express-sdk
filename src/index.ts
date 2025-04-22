import { RequestHandler } from 'express';

export function authorize(allowedPermissions: string[]): RequestHandler {
  return (req, res, next) => {
    console.log(allowedPermissions);
    next();
  };
}

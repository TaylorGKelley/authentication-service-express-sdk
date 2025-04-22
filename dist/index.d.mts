import { RequestHandler } from 'express';

declare function authorize(allowedPermissions: string[]): RequestHandler;

export { authorize };

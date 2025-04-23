import { RequestHandler } from 'express';
import { URL } from 'node:url';

type AuthenticationServiceSettings = {
    clientId: string;
    baseUrl: URL;
};

declare function initialize({ clientId, baseUrl }: AuthenticationServiceSettings): void;
declare function authorize(allowedPermissions: string[]): RequestHandler;

export { authorize, initialize as default };

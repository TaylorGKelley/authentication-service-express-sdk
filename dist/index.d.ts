import { RequestHandler } from 'express';
import { URL } from 'node:url';

type AuthenticationServiceSettings = {
    clientId: string;
    baseUrl: URL;
};

declare function initialize({ clientId, baseUrl }: AuthenticationServiceSettings): {
    authorize: typeof authorize;
};
declare function authorize(allowedPermissions: string[]): RequestHandler;

export { initialize as default };

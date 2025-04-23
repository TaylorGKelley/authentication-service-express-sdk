import { URL } from 'node:url';

type AuthenticationServiceSettings = {
  clientId: string;
  baseUrl: URL;
};

export default AuthenticationServiceSettings;

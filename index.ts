export default class AuthService {
  constructor(authConfig: AuthServiceConfig) {
    console.log('Hello from the test function');
  }
}

export type AuthServiceConfig = {
  clientId: string;
  serviceBaseUrl: `${'http://' | 'https://'}${string}`;
};

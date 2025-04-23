# Authentication Service SDK

This is an SDK to be used in conjunction with the _authentication-service_ API for an external express based api

## Setup

In your express api, add a config file for the sdk

```js
//lib/authService.js

import initialize from 'authentication-service-sdk';

const { authorize } = initialize({
  clientId: process.env.AUTHENTICATION_SERVICE_CLIENT_ID,
  baseUrl: process.env.AUTHENTICATION_SERVICE_BASE_URL,
});

export { authorize };
```

Then to use the middleware, simply `import {authorize} from './lib/authService.js'` and pass in whichever permissions are allowed for that route

-> Be sure you register the permissions in the auth api before adding them to your application, otherwise you will recieve a **409 Forbidden** response.

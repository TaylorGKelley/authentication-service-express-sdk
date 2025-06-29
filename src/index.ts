import { RequestHandler } from 'express';
import axios from 'axios';
import UserPermissionResponse from './types/UserPermissionResponse';
import type AuthenticationServiceSettings from './types/AuthenticationServiceSettings';
import { URL } from 'node:url';

let linkedServiceId: string | null = null;
let hostedUrl: URL | null = null;

function initialize({ clientId, baseUrl }: AuthenticationServiceSettings) {
	linkedServiceId = clientId;
	hostedUrl = baseUrl;

	return {
		authorize,
	};
}

function authorize(allowedPermissions: string[]): RequestHandler {
	return async (req, res, next) => {
		try {
			const token = req.headers.authorization?.split(' ').at(1);

			if (!token) {
				throw new Error('Unauthorized: No token provided');
			}

			// axios request
			const response = await axios.get<UserPermissionResponse>(
				`${hostedUrl}/user-permissions/${linkedServiceId}`,
				{
					headers: req.headers,
				}
			);

			if (response.status !== 200) {
				throw new Error(response.data.message);
			}

			const { user, permissions } = response.data;
			req.user = user;

			// Check if user is in allowed roles
			const isAllowed = allowedPermissions.some((allowedPermission) =>
				permissions.includes(allowedPermission)
			);

			if (!isAllowed && !allowedPermissions.includes('public')) {
				throw new Error('Forbidden');
			}

			next();
		} catch (error) {
			next(error);
		}
	};
}

export { initialize as default };

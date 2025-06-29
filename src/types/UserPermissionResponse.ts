type UserPermissionResponse = {
	user: {
		id: number;
		email: string;
	};
	permissions: string[];
	message?: string; // Optional message field for error responses
};

export default UserPermissionResponse;

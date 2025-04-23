type UserPermissionResponse = {
  user: {
    id: number;
    email: string;
  };
  permissions: string[];
};

export default UserPermissionResponse;

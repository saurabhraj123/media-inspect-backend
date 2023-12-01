interface Context {
  name?: string;
  user?: UserPayload;
}

interface UserPayload {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
}

export { Context, UserPayload };

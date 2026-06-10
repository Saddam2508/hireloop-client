export type SessionUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  role?: "seeker" | "recruiter" | "admin";
  plan?: "seeker_free" | "recruiter_free";
};

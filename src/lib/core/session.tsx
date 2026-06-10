import { auth } from "../auth";
import { headers } from "next/headers";

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

export const getUserSession = async (): Promise<SessionUser | null> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return null;

  return {
    ...session.user,
    role: session.user.role as SessionUser["role"],
    plan: session.user.plan as SessionUser["plan"],
  };
};

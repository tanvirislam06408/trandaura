export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: "user" | "admin" | null;
  status?: "active" | "blocked" | null;
  createdAt: Date;
  updatedAt: Date;
  emailVerified: boolean;
}

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: "user" | "admin" | null;
  status: "active" | "blocked";
  registeredAt: Date;
  emailVerified: boolean;
}
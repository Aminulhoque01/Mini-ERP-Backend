import { Document } from "mongoose";

export type UserRole = "admin" | "manager" | "employee";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  isDeleted: boolean;
}
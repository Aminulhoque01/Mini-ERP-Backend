import bcrypt from "bcrypt";
import User from "../user/user.model";
import { createToken } from "../../utils/jwt";

const login = async (payload: {
  email: string;
  password: string;
}) => {

  const user = await User.findOne({
    email: payload.email,
    isDeleted: false,
  }).select("+password");

  if (!user) {
    throw new Error("User not found");
  }

  const match = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!match) {
    throw new Error("Password is incorrect");
  }

  const token = createToken({
    id: user._id,
    role: user.role,
    email: user.email,
  });

  return {
    token,
    user,
  };
};

export const AuthService = {
  login,
};
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

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new Error("Password is incorrect");
  }

  const accessToken = createToken({
    id: user._id,
    role: user.role,
    email: user.email,
  });

  const userData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  };

  return {
    accessToken,
    user: userData,
  };
};

export const AuthService = {
  login,
};
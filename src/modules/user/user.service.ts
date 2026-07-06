import User from "./user.model";

const createUser = async (payload: any) => {
  const isExist = await User.findOne({
    email: payload.email,
  });

  if (isExist) {
    throw new Error("Email already exists");
  }

  const result = await User.create(payload);

  return result;
};

const getUsers = async () => {
  return await User.find({
    isDeleted: false,
  }).select("-password");
};

const getSingleUser = async (id: string) => {
  return await User.findById(id).select("-password");
};

const updateUser = async (id: string, payload: any) => {
  return await User.findByIdAndUpdate(id, payload, {
    new: true,
  }).select("-password");
};

const deleteUser = async (id: string) => {
  return await User.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );
};

export const UserService = {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
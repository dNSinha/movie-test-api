import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginResponse, RegisterResponse, UserInfo } from "../type";
import { User, UserModel } from "../models";

export async function register(_: void, args: any): Promise<RegisterResponse> {
  const { username, password } = args;
  const existingUser: number = await UserModel.countDocuments({ username });
  if (existingUser) {
    throw new Error("Username already used!");
  }
  const hashedPassword: string = await bcrypt.hash(password, 10);
  const user: User = new UserModel({
    username,
    password: hashedPassword,
  });
  await user.save();
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    "secret",
  );
  return {
    id: user._id,
    username: user.username,
    token
  };
}

export async function login(_: void, args: any): Promise<LoginResponse> {
  const { username, password } = args;
  const user: User | null = await UserModel.findOne({ username });
  if (!user) {
    throw new Error("Invalid login!");
  }
  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    throw new Error("Invalid login!");
  }
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    "secret",
  );
  return {
    token,
  };
}

export async function currentUser(
  _: void,
  _args: any
): Promise<UserInfo> {
  const { id } = _args;
  if (!id) {
    throw new Error("Not authenticated!");
  }
  const user: User | null = await UserModel.findOne({ _id: id });
  if (!user) {
    throw new Error("Not authenticated!");
  }
  return {
    id: user._id,
    username: user.username,
  };
}

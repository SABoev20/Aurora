import axiosClient from "./axiosAuthClient";

export default class registerService {
  async register(
    email: string,
    password: string,
    name: string,
    dateOfBirth: string,
  ) {
    const response = await axiosClient.post("api/auth/register", {
      email,
      password,
      name,
      dateOfBirth,
    });
    return response.data;
  }
}

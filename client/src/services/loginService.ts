import axiosClient from "./axiosAuthClient";

export default class loginService {
  async login(email: string, password: string) {
    const response = await axiosClient.post("api/auth/login", {
      email,
      password,
    });
    return response.data;
  }
}

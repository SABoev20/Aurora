import axiosClient from "./axiosClient";

export default class authService {
  async login() {
    const response = await axiosClient.post("api/auth/login", {
      email: "user1@example.com",
      password: "password123",
    });
    return response.data;
  }
}

import axiosClient from "./axiosAuthClient";

export default class refreshTokenService {
  async refresh() {
    const response = await axiosClient.get("api/token/refresh", {});
    return response.data;
  }
}

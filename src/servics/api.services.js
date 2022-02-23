import { axiosInstance } from "./axiosInstence";

const fetchUsersData = () => {
  return axiosInstance.get("users?page=1");
};

export { fetchUsersData };

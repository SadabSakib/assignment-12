import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "https://assignment-12-server-beige-two.vercel.app/",
  baseURL: "https://assignment-12-server-beige-two.vercel.app/",
  withCredentials: true,
});
const useAxiosPublic = () => {
  return axiosPublic;
};
export default useAxiosPublic;

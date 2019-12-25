import axios from "axios";

// const settings = {
//   baseURL: "/es"
// };

const axiosForES = axios.create();

// 响应拦截器
axiosForES.interceptors.response.use(
  response => {
    let resData = response.data;
    if (resData.code === 500) {
      console.error(resData.msg, "http");
      return Promise.reject(resData);
    }
    return response;
  },
  error => {
    // 服务器异常
    let status = error.response.status;
    let statusText = error.response.statusText;
    console.error(status, statusText);
    return Promise.reject(error.response);
  }
);

export { axiosForES };

const axios = require('axios');

// 创建 Axios 实例
const httpClient = axios.create({
  baseURL: '', // 设置基础URL
  timeout: 5000, // 设置超时时间
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

// 请求拦截器
httpClient.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截器
httpClient.interceptors.response.use(response => {
  return response.data;
}, error => {
  console.error('HttpClient Error:', error);
  return Promise.reject(error);
});

module.exports = httpClient;

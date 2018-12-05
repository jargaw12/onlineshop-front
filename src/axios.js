import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers:{
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('user-token')

    if (token) {
      config.headers['Authorization'] = `Bearer ${ token }`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

export default api;

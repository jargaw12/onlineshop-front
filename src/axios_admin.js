import axios from 'axios';

const axi = axios.create({
  baseURL: 'http://localhost:8080',
  headers:{
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

axi.interceptors.request.use(
  (config) => {
    let adminToken = localStorage.getItem('admin-token')

    if (adminToken) {
      config.headers['Authorization'] = `Bearer ${ adminToken }`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

export default axi;

import Axios from 'axios'
Axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

// Add requset pre-process
Axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (localStorage.getItem('access_token')) {
    // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    // Axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token')
    // console.log(config.headers);
    config.headers.Authorization = localStorage.getItem('access_token')
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

/****************************************************************
 * Home page urls
 */

// login
export const login = (params) => {
  return Axios.post('/login/', params)
}

// Signup
export const signup = (params) => {
  return Axios.post('/signup/', params).then(res => res.data)
}

// Signup
export const addRecord = (params) => {
  return Axios.post('/visitor/add', params).then(res => res.data)
}

// Drawer item: Latest News
export const latestNews = (params) => {
  return Axios.get('/latest-news/', params).then(res => res.data)
}

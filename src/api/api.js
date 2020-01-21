import Axios from 'axios'
Axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'



// Add requset pre-process
Axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (localStorage.getItem('access_token')) {
        // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    	// Axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token');
    	// console.log(config.headers);
    	config.headers.Authorization = localStorage.getItem('access_token')
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

/****************************************************************
 * Home page urls
 */
// Run task
export const runTask = (params) => {
    return Axios.get("/runtask/", params).then(res => res)
}

// Signin
export const signin = (params) => {
    return Axios.post('/auth/signin/', params).then(res => res.data)
}

// Signup
export const signup = (params) => {
    return Axios.post('/auth/signup/', params).then(res => res.data)
}

/*
export const geetest = () => {
    return Axios.get("/auth/auth?t=" + (new Date()).getTime()).then(res => res.data) // 加随机数防止缓存
}
*/
// Drawer item: Latest News
export const latestNews = (params) => {
    return Axios.get('/latest-news/', params).then(res => res.data)
}

// Drawer item: Curriculum Map
export const curriculumMap = (params) => {
    return Axios.get('/curriculum-map/', params).then(res => res.data)
}

// Drawer item: User Manual
export const userManual = (params) => {
    return Axios.get('/user-manual/', params).then(res => res.data)
}

// Drawer item: School Dictionary
export const schoolDic = (params) => {
    return Axios.get('/school-dic/', params).then(res => res.data)
}

// Drawer item: Membership
export const membership = (params) => {
    return Axios.post('/membership/', params).then(res => res.data)
}

export const articles = () => {
    return Axios.get('/articles').then(res => res)
}

export const payment = (params) =>{
    return Axios.post('/payment',params).then(res=>res.data)
}

/****************************************************************
 * Student Home urls
 */
// Student Home
export const studentHome = (studentId, query) => {
    return Axios.get(`/student-home?cid=${studentId}&query=${query}/`).then(res => res)
}

export const runTask = (taskId) => {
    return Axios.get(`/task/${taskId}/`).then(res => res)
}

export const viewResults = () => {
    return Axios.get(`/results`).then(res => res.data)
}

// View Stickers    TODO: login requied to make sure you could only view your own stickers
export const viewStickers = (params) => {
    return Axios.get(`/view-stickers/`, params).then(res => res)
}

// Game World
export const gameWorld = (params) => {
    return Axios.post(`/game-world/`, params).then(res => res)
}

/****************************************************************
 * Mentor Home urls
 */
// Mentor Home
export const mentorHome = (mentorId, query) => {
    return Axios.get(`/mentor-home?cid=${mentorId}&query=${query}`).then(res => res)
}

export const delStudent = (params) =>{
    return Axios.delete('/del-student',{data:params}).then(res=>res.data)
}

export const addStudent = (params) =>{
    return Axios.post('/add-student',{data:params}).then(res=>res.data)
}

export const viewReport = (studentId) =>{
    return Axios.get('/view-report/${studentId}/').then(res=>res.data)
}

export const genReport = (studentId) =>{
    return Axios.get('/gen-report/${studentId}/').then(res=>res.data)
}

// review
export const review = (params) => {
    return Axios.post(`/review/`, params).then(res => res)
}

export const contact = (params) => {
    return Axios.post(`/contact/`, params).then(res => res)
}

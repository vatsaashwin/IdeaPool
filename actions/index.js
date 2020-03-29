
import axios from 'axios'
import Cookies from 'js-cookie'
// import { getCookieFromReq } from '../helpers/utils'
import { getCookieFromReq } from '../helpers/utils';

const PROJ_DATA = []

const BASE_URL = "http://localhost:3000"

const CATEGORY_DATA = [
    { id: '0', name: 'All' },
    { id: '1', name: 'HTML/CSS' },
    { id: '2', name: 'JavaScript' },
    { id: '3', name: 'React.js' },
    { id: '4', name: 'Node.js' },
    { id: '5', name: 'MySQL' },
    { id: '6', name: 'MongoDB' },
    { id: '7', name: 'PHP' },
    { id: '8', name: 'Ruby on Rails' },
    { id: '9', name: 'Java' },
    { id: '10', name: 'C#/.Net' },
    { id: '11', name: 'Python' }
]

const setAuthHeader = (req) => {
    const token = req ? getCookieFromReq(req, 'jwt') : Cookies.getJSON('jwt')

    if (token) {
        return { headers: { 'authorization': `Bearer ${token}` } }
    }

    return undefined;
}

export const getSecretData = async (req) => {
    const url = 'http://localhost:3000/api/v1/secret'
    return await axios.get(url, setAuthHeader(req)).then((response) => response.data)
}



export const getCategories = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(CATEGORY_DATA)
        }, 50)
    })
}

export const getProjects = () => {
    return axios.get(`${BASE_URL}/api/v1/projects`)
        .then((res) => {
            return res.data
        })
}

export const createProject = (project) => {

    project.id = Math.random().toString(36).substr(2, 5)
    return axios.post(`${BASE_URL}/api/v1/projects`, project).then(res => res.data)
}

export const getProjectById = (id) => {
    return axios.get(`${BASE_URL}/api/v1/projects/${id}`).then(res => res.data)
}

export const updateProject = (project) => {
    return axios.patch(`${BASE_URL}/api/v1/projects/${project.id}`, project)
        .then(res => res.data)
}

export const deleteProject = (id) => {
    return axios.delete(`${BASE_URL}/api/v1/projects/${id}`).then(res => res.data)
}




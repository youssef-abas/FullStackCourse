import axios from 'axios'

const baseURL = 'http://localhost:3002/notes'

const getAll = () => {
    const promise =  axios.get(baseURL)
    return promise.then(response => response.data)
}

const create = newObject => {
    const promise = axios.post(baseURL, newObject)
    return promise.then(response => response.data)
}

const update = (id, newObject) => {
    const promise = axios.put(`${baseURL}/${id}`, newObject)
    return promise.then(response => response.data)
}

export default {
    getAll: getAll,
    create: create,
    update: update
}
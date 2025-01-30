import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const addAllContacts = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const addContactRemote = (personObject) => {
    const request = axios.post(baseURL, personObject)
    return request.then(response => response.data)
}

const updateContactRemote = (id, personObject) => {
    const request = axios.put(`${baseURL}/${id}`, personObject)
    return request.then(response => response.data) 
}

const deleteContactRemote = id => {
    return axios.delete(`${baseURL}/${id}`)
}

export default {addAllContacts, addContactRemote, updateContactRemote, deleteContactRemote}
import axios from "axios"
const baseURL='http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return( request.then( response => response.data ))
}

const addNum = (newObj) => {
    const request = axios.post(baseURL, newObj)
    return( request.then( response => response.data ))
}

const deleteNum = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return(request.then( response => response.data ))
}

const updateNum = (newObj) => {
    const request = axios.put(`${baseURL}/${newObj.id}`, newObj)
    return(request.then( response => response.data ))
}

export default { getAll, addNum, deleteNum, updateNum }

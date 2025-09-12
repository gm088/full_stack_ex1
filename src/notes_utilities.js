import axios from 'axios'
const baseURL = 'http://localhost:3002/api/notes'

const getAllNotes = () => {

  //functional programming
  const request = axios.get(baseURL)
  return(request.then( response => response.data ))
}

const postNote = (newObj) => {
  const request = axios.post(baseURL, newObj)
  return(request.then( response => response.data ))
}

const updateNote = (id, newObj) => {
  const request = axios.put(`${baseURL}/${id}`, newObj)
  return(request.then( response => response.data ))
}

export default { getAllNotes, postNote, updateNote }

//export default {
//    getAllNotes: getAllNotes,
//    postNote: postNote,
//    updateNote: updateNote
//}

import axios from "axios";
const baseUrl = "http://localhost:3001/persons"

const getAll = () => axios.get(baseUrl)
const createContact = (object) => axios.post(baseUrl,object)
const deleteContact = (id) => axios.delete(baseUrl+`/${id}`)


export default {
    getAll : getAll,
    createContact: createContact,
    deleteContact: deleteContact
}
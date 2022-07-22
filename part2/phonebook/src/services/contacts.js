import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons"

const getAll = () => axios.get(baseUrl)
const createContact = (object) => axios.post(baseUrl,object)
const deleteContact = (id) => axios.delete(baseUrl+`/${id}`)
const updateContactNumber = (id, changedContactNumber) => axios.put(baseUrl+`/${id}`,changedContactNumber)


export default {
    getAll : getAll,
    createContact: createContact,
    deleteContact: deleteContact,
    updateContactNumber: updateContactNumber
}
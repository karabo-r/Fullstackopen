import axios from "axios";

const baseUrl =  "http://localhost:3001/anecdotes" 

async function getAll(){
    const response = await axios.get(baseUrl) 
    return response
}

async function create(data){
    const response = await axios.post(baseUrl, data)
    return response
}
const services = {
    getAll,
    create
}

export default services 
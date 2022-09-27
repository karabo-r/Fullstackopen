import axios from "axios";

const baseUrl =  "http://localhost:3001/anecdotes" 

async function getAll(){
    const response = await axios.get(baseUrl) 
    return response
}

const services = {
    getAll
}

export default services 
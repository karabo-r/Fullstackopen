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
async function update(id, data){
    const link = `${baseUrl}/${id}`
    const response = await axios.put(link, data )
    // console.log(link);
    return response
}
const services = {
    getAll,
    create,
    update
}

export default services 
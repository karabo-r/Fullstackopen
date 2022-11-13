import axios from "axios";
const usersBaseUrl = "/api/users"

const getAll = () =>{
    const request = axios.get(usersBaseUrl)
    return request.then(response=>response.data)
}

const collection = {
    getAll
}

// imported as UserServices
export default collection 

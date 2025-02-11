import axios from "axios";

export async function getProducts({queryKey}) {
    const resp=await axios.get(queryKey[1])
    return resp.data
}



export async function updateProducts(url,data,setState){
    const resp=await axios.put(url,data)
    return resp.data
}
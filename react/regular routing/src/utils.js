import axios from "axios";

export async function getProducts(url,producsts) {
    const resp=await axios.get(url)
    producsts(resp.data)
    return
}

export async function getSingleProduct(url,product) {
    const resp=await axios.get(url)
    product(resp.data)
    return
}

export async function updateProducts(url,data,setState){
    const resp=await axios.put(url,data)
}
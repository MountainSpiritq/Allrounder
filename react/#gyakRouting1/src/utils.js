import axios from "axios";

export async function getNovenyek(url,setData,setMessage) {
    try {
        setMessage(null);
        setData([])
        const resp=await axios.get(url);
        console.log(`Ezen a routon ${url}`+resp.data);
        setData(resp.data)
    } catch (error) {
        console.log(error);
        setMessage(error.response.data)
    }
    return;
}
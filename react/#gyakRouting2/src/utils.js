import axios from "axios";

export async function getStuff(url,setData,setMessage) {
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

export async function sendAdat(url,data) {
  try {
    const response = await axios.post(url,
     data);
    console.log('Success:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}
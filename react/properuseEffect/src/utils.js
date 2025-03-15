import axios from "axios";

export async function getDate(url,setDate,setMsg) {
  try{
    setMsg(null)
    setDate("")
    const resp = await axios.get(url);
    console.log(resp.data);
    setDate(resp.data);
  }catch(err){
    console.log(err.response.data);
    setMsg(err.response.data.msg)
  }
  return;
}
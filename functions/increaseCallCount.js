import axios from "axios"
export const IncreaseCallCount=async (id)=>{
    try{
        const res=await axios.post(`http://localhost:3001/posts/${id}/contact`)
        console.log(res.data)
    }catch(err){
        console.log(err)
    }
}
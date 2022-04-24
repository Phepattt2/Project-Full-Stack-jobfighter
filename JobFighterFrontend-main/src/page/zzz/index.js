import React from 'react'
import {useState , useEffect} from "react";
import axios from 'axios';



const Testzzz = () => {
  const [img,Setimg] = useState()
  async function fetchFirstJsonData(){  
    const response = await  axios.get(process.env.REACT_APP_API+`/submitjob`)
    console.log(response.data[6].resume)
    Setimg(response.data[6].resume)
  }

  useEffect(()=> {
    fetchFirstJsonData()
  },[])

  console.log('img :',img)
  return (
    <div>testzzz
  <h1>Hello world</h1>
   <img class="card-img-top" src={img} alt="Card image cap" />

    
    
    </div>

  )
}

export default Testzzz
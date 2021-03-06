import React from "react";
import Typography from '@material-ui/core/Typography';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import {useState , useEffect} from "react";
import axios from 'axios';
import "./Applyjob.css";
import Filebase64 from 'react-file-base64'

import { useSelector } from "react-redux";

export default function Applyjob(){

  var { user } = useSelector((state) => ({ ...state }));

  
  if (user.role === 'company') {
    console.log(user.role)
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  let value = params.id;

  const [click, setClick] = useState({
    ClickYes : false,
    canClick : true
  })

 
  const [PostData,SetPostData] = useState([])
  const [final2,Setfinal2] = useState([])
  const [final,Setfinal] = useState([])
  const [sendData,setSendData] = useState({
      'postid':''
      ,'companyid':''
      ,'resume':''
      ,'check': 'suussu'
      ,'userid':''
    })
  let JsonData ;
  let JsonData2 ; 
  async function handleClick (e)  {
    // console.log('clicked')
    // console.log(sendData)
    setClick({
      canClick: false,
      ClickYes : true,
    });
     
    console.log('this is img 64data : ',sendData.resume)
    Setfinal2("clicked")
    const response = await  axios.post(process.env.REACT_APP_API+'/submitjob/', sendData ,{headers:{'authorization':`Bearer ${user.token}`}} )
  }

  async function fetchFirstJsonData(value){  
    let butDis ; 
    const response = await  axios.get(process.env.REACT_APP_API+`/search/${value}`)
    const response2 = axios.get(process.env.REACT_APP_API+`/submitjob/focheck/${value}`,{headers:{'authorization':`Bearer ${user.token}`}} )
    JsonData2 = await response2
    JsonData = await response.data
    // console.log('response.data',JsonData)
    // console.log('response2.data',JsonData2)
    //หาไม่เจอ
    if (JsonData2.data === null) 
    { 
      butDis = 'hohooho'
      console.log(butDis)
      // console.log('i can go sleep now hehehe',JsonData2.data)
    Setfinal('Not Found')
    }
    else{
      //หาเจอ
      butDis = 'yoyooyoy'
      console.log('butdis:',butDis)
      Setfinal('Found')

    
      // console.log('response2.data Xx',JsonData2.data)
    }
    SetPostData(JsonData)
    setSendData({
        ...sendData,
        postid:value,
        companyid:response.data.user._id,
        userid:user._id
      })
  
  }
  // const response2 = axios.get(process.env.REACT_APP_API+`/submitjob/focheck/${value}`,{headers:{'authorization':`Bearer ${user.token}`}} )
  // console.log('iam checking res2 :',response2)

  useEffect(()=> {
    fetchFirstJsonData(value)    
  },[])
  
  console.log('postdata :::',PostData)
  console.log('sendData :::',sendData)
  console.log('res:::',final)
  // console.log('userid is ...:',user.id)
  // console.log('usertoken is ...:',user.token)
  // console.log('PostData : ',PostData._id)
  // console.log('sendData.check :',sendData)
  


  const notosan1=createTheme({
    typography:{
      subtitle1:{
        fontSize:40,
        fontWeight:700,
        fontFamily: [
          'Noto Sans Thai',
          'sans-serif',
        ].join(','),
      },
      subtitle2:{
        fontSize:28,
        fontWeight:500,
        fontFamily: [
          'Noto Sans Thai',
          'sans-serif',
        ].join(','),
      },
      body1:{
        fontSize:25,
        fontFamily: [
          'Noto Sans Thai',
          'sans-serif',
        ].join(','),
      },
      body2:{
        fontSize:20,
        fontWeight:500,
        fontFamily: [
          'Noto Sans Thai',
          'sans-serif',
        ].join(','),
      }
    },
  });
    return(
        <ThemeProvider theme={notosan1}>
      

        <div className=" w-200  bg-gray-200  shadow-lg md:drop-shadow-xl rounded-lg mt-8 mx-10 mb-10 shadow-black">
          <div className="flex space-x-5 ">
        
            <svg class="h-32 w-32 text-black mt-3 ml-7 bg-gray-300 rounded-lg shadow-sm"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
        
          <div className="flex-col space-y-3">
            <div className="mt-4">
              <Typography variant="subtitle1">
                บริษัท companyname
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2">
                วันที่โพสต์ : date
              </Typography>
            </div>
          </div>

          </div>
          <div className="pl-7 pt-5">
            <Typography variant="subtitle2">
                รายละเอียดงาน  
            </Typography>
            <div>
            <Typography variant="body1">
            {PostData.desc} {final} 
            </Typography> 
            </div>

            {/* สวัสดิการ */}
            <div className="pt-5">
            <Typography variant="subtitle2">
                สวัสดิการ
            </Typography>
            <div>
            <Typography variant="body1">
            {PostData.benefit}
            </Typography> 
            </div>
            </div>
            

            {/* คุณสมบัติของผู้สมัคร */}
            <div className="pt-5">
            <Typography variant="subtitle2">
                คุณสมบัติของผู้สมัคร
            </Typography>
            <div className="flex flex-col space-y-6 pt-2">
                <div className="flex space-x-2">
                <Typography variant="body1">
                        มหาลัย : 
                </Typography>
                <div>
                <Typography variant="body1">
                {PostData.college}
                </Typography> 
                </div>
                </div>

                <div className="flex space-x-2">
                <Typography variant="body1">
                        คณะ :
                </Typography>
                <div>
                <Typography variant="body1">
                {PostData.faculty}
                </Typography> 
                </div>
                </div>

                <div className="flex space-x-2">
                <Typography variant="body1">
                        สาขา :
                </Typography>
                <div>
                <Typography variant="body1">
                {PostData.program}

                </Typography> 
                </div>
                </div>
                
              </div>


              <div className="flex flex-col space-y-6 pt-4">
                <div className="flex space-x-2">
                <Typography variant="body1">
                        ประเภทงาน :
                </Typography>
                <div>
                <Typography variant="body1">
                {PostData.jobType}
                </Typography> 
                </div>
                </div>

                <div className="flex space-x-2">
                <Typography variant="body1">
                        ตำแหน่ง :
                </Typography>
                <div>
                <Typography variant="body1">
                {PostData.position}
                </Typography> 
                </div>
                </div>

                {/* เช็คใน input ใส่ได้แค่เลข */}
                <div className="flex space-x-2">
                <Typography variant="body1">
                        เงินเดือน (บาท) :
                </Typography>
                <div>
                <Typography variant="body1">
                {PostData.wageMin}
                </Typography> 
                </div>
                <Typography variant="body1">
                        -
                </Typography>
                <div>
                <Typography variant="body1">
                {PostData.wageMax}
                </Typography> 
                </div>
                </div>
                
              </div>
            </div>


            <div className="flex flex-col space-y-6 pt-4">
                <div className="flex space-x-2">
                <Typography variant="body1">
                        จังหวัดของสถานประกอบการ :
                </Typography>
                <div>
                <Typography variant="body1">
                {PostData.provinceAddress}

                </Typography> 
                </div>
                </div>

                {/* เช็คใน input ใส่ได้แค่เลข */}
                
              </div>

              <div className="flex space-x-2 pt-3">
                <Typography variant="body1">
                        อัตราที่รับ :
                </Typography>
                <div>
                <Typography variant="body1">
                {PostData.rate}
                </Typography> 
                </div>
                </div>
            </div>
            
            
            {/* สถานที่ประกอบการของบริษัท */}
            <div className="pl-7 pt-5">
            <Typography variant="subtitle2">
              สถานที่ประกอบการของบริษัท
            </Typography>
            <div>
                <Typography variant="body1">
                {PostData.companyAddress}
                </Typography> 
                </div>
            </div>
            
            {/* Tags */}
            <div className="pl-7 pt-5 flex space-x-4">
            <Typography variant="body1">
              Tags : 
            </Typography>

              {/* เดะไว้แสดง tags */}
              <div className="flex space-x-2">

              <div className="h-10 px-2 py-2 rounded-lg bg-white shadow-sm">
                <Typography variant="body2">
                  ประเภทงาน 
                </Typography>
              </div>
              <div className="h-10 px-2 py-2 rounded-lg bg-white shadow-sm">
                <Typography variant="body2">
                  ประเภทงาน 
                </Typography>
              </div>

              </div>

            </div>

            <div className="pl-96 pt-5 pb-4 flex space-x-4">
            <Typography variant="body1">
                  แนบไฟล์ เรซูเม่ :  
                </Typography>
            <div className="h-10 w-80 mb-2">
                        <Filebase64
                            mutiple = {false} 
                            onDone = {({base64})=>setSendData ({...sendData,
                            resume:base64})} />
                    </div>
            

            </div>
            <div class="flex items-center justify-center">
            <button
              className={` ${ click.ClickYes || final==='Found' ||final2==='clicked' ?  'bg-[#E2E2E2] hover:bg-[#E2E2E2]' :'bg-[#24AB82] hover:bg-[#1F795E] hover:ring-2 hover:ring-white' }  drop-shadow-md font-bold text-white text-2xl rounded-xl px-6 py-2.5 `}
              onClick={handleClick} disabled = {final==='Found' ||final2==='clicked'}
            >
              <div className="flex space-x-2">
              <svg class="h-8 w-8 mt-1 text-yellow-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"  stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" /></svg>
              <Typography variant="body1">
              สมัครงาน
              </Typography>
              </div>
                  </button>
            </div>
            <div className="h-10 w-200 bg-gray-200   rounded-lg "></div>
        </div>
        </ThemeProvider>
    );
  }
  else {
      throw new Error('please login first')
  }
}
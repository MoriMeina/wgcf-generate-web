import './home.css'
import React, {useState} from 'react'
import Inputs from '../../components/inputs'
const Home = () => {
    const [data,setData]=useState({})
    const handleData=(newData)=>{
        setData(newData)
        console.log('genrate config:',data)
    }
    return(
        <div className="layout">
            <div className="input-box">
                <Inputs sendData={handleData}/>
            </div>
            <div className="output-box">
                <div className="test"/>
            </div>
        </div>
    )

}
export default Home;
import './home.css'
import React, {useEffect, useState} from 'react'
import Inputs from '../../components/inputs'
import Outputs from '../../components/outputs'
import {Alert} from "antd";

const Home = () => {
    const [data, setData] = useState({})
    const [updateChild, setUpdateChild] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const handleData = (newData) => {
        setData(newData);
    };
    useEffect(() => {
        if (Object.keys(data).length > 0) {
            setShowAlert(true); // 数据更改时显示 Alert
            console.log('data:',data)

            // 设置一定时间后自动关闭 Alert，例如 5 秒后自动隐藏
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 3000);

            // 在组件卸载或数据再次更新时清除定时器
            return () => clearTimeout(timer);
        }
    }, [data]);

    useEffect(() => {
        setUpdateChild(true); // 更新状态来触发子组件重新渲染
    }, [data]);
    return (
        <div>
            {/* Alert 组件用于显示顶部提示 */}
            {showAlert && (
                <Alert
                    message="Data Updated"
                    type="success"
                    showIcon
                    closable
                    onClose={() => setShowAlert(false)} // 关闭 Alert
                    style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
                />
            )}
            <div className="layout">
                <div className="input-box">
                    <Inputs sendData={handleData}/>
                </div>
                <div className="output-box">
                    <Outputs data={data} Update={updateChild}/>
                </div>
            </div>
        </div>
    )

}
export default Home;
import React, {useState} from 'react'
import './inputs.css'
import {Alert, Button, Input, Space} from 'antd'
import tweetnacl from 'tweetnacl'


const Inputs = ({sendData}) => {
    const [inputKey, setInputKey] = useState('')
    const [inputInstallID, setInputInstallID] = useState('')
    const [model, setModel] = useState('Xiaomi POCO X2')
    const [osType, setOsType] = useState('Android')
    const [locale, setLocale] = useState('en_US')
    const [showAlert, setShowAlert] = useState(false);

    // 生成私钥
    function generatePrivateKey() {
        const privateKey = tweetnacl.box.keyPair().secretKey;
        console.log("PrivateKey", uint8ArrayToBase64(privateKey))
        return uint8ArrayToBase64(privateKey);
    }

// 将 Uint8Array 转换为 Base64
    function uint8ArrayToBase64(uint8Array) {
        return btoa(String.fromCharCode.apply(null, uint8Array));
    }

// 生成私钥用法
// const privateKey = generatePrivateKey();


    // 将 Base64 编码的私钥转换为 Uint8Array
    function base64ToUint8Array(base64String) {
        const binaryString = atob(base64String);
        const uint8Array = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            uint8Array[i] = binaryString.charCodeAt(i);
        }
        return uint8Array;
    }

// 使用私钥生成公钥
    function generatePublicKey(privateKeyBase64) {
        const privateKey = base64ToUint8Array(privateKeyBase64);
        const publicKey = tweetnacl.box.keyPair.fromSecretKey(privateKey).publicKey;
        console.log('PublicKey', uint8ArrayToBase64(publicKey));
        return uint8ArrayToBase64(publicKey);
    }

// 生成对应的公钥
//     const publicKey = generatePublicKey(私钥);

    function genString(k) {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < k; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result;
    }

// 调用方法，11是字符串长度
//     const randomString = genString(11);


    const GenerateKey = () => {
        const PrivateKey = generatePrivateKey()
        const PublicKey = generatePublicKey(PrivateKey)
        setInputKey(PublicKey)
    }
    const GenerateID = () => {
        const RandomStr = genString(11)
        setInputInstallID(RandomStr)
    }


    // const handleGenerateButton = () => {
    //     if (!inputKey && !inputInstallID) {
    //         GenerateID();
    //         GenerateKey();
    //         setShowAlert(true);
    //     } else if (!inputKey) {
    //         GenerateKey();
    //         setShowAlert(true);
    //     } else if (!inputInstallID) {
    //         GenerateID();
    //         setShowAlert(true);
    //     } else {
    //         RequestOutput();
    //     }
    // };


    const isBase64 = (str) => {
        try {
            return btoa(atob(str)) === str;
        } catch (err) {
            return false;
        }
    };
    const handleGenerateButton = () => {
        const base64KeyRegex = /^[A-Za-z0-9+/]{43}={1,2}$/;
        const installIdRegex = /^[A-Za-z0-9]{11}$/;

        if (!inputKey && !inputInstallID) {
            GenerateID();
            GenerateKey();
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        } else if (!inputKey || !base64KeyRegex.test(inputKey) || !isBase64(inputKey)) {
            GenerateKey();
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
            console.warn('Key is Not Base64 format or Not a pairKey,re-generating')
        } else if (!inputInstallID || !installIdRegex.test(inputInstallID)) {
            GenerateID();
            console.warn('ID is not fill up for 11,or too much,re-generating')
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        } else {
            RequestOutput();
        }
    };


    const RequestOutput = () => {
        const data={
            inputKey,
            inputInstallID,
            model,
            osType,
            locale,
        }
        sendData(data);
        // console.log('key:', inputKey)
        // console.log('install_id:', inputInstallID)
        // console.log('model:', model)
        // console.log('osType:', osType)
        // console.log('locale:', locale)
    }

    return (
        <div className="input">
            <div>
                {showAlert && (
                    <Alert
                        message="Form not fill up or error filled,random filled,plz Re-Submit"
                        type="warning"
                        showIcon
                        closable
                        onClose={() => setShowAlert(false)}
                    />
                )}
            </div>
            <h2 className="title">WGCF Generate Info Select</h2>
            <i>Key</i>
            <Space.Compact style={{width: '100%'}}>
                <Input
                    placeholder="Default Key"
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                />
                <Button type="default" onClick={GenerateKey}>Generate</Button>
            </Space.Compact>
            <i>Install_ID</i>
            <Space.Compact style={{width: '100%'}}>
                <Input
                    placeholder="Default Install_ID"
                    value={inputInstallID}
                    onChange={(e) => setInputInstallID(e.target.value)}
                />
                <Button type="default" onClick={GenerateID}>Generate</Button>
            </Space.Compact>
            <i>Model</i>
            <Input
                placeholder="Xiaomi POCO X2"
                onChange={(e) => setModel(e.target.value)}
            />
            <i>Type</i>
            <Input
                placeholder="Android"
                onChange={(e) => setOsType(e.target.value)}
            />
            <i>Locale</i>
            <Input
                placeholder="en_US"
                onChange={(e) => setLocale(e.target.value)}
            />
            <h2 className="footer">Ensure You Know What You Doing,Or Leave It Empty</h2>
            <Button type="default" style={{height: "5em"}} onClick={handleGenerateButton}>Generate WGCF Config</Button>
        </div>
    )
}
export default Inputs;
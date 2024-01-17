import React, {useEffect, useState} from 'react'
import './outputs.css'
import TextArea from "antd/es/input/TextArea";
import axios from 'axios'

const Outputs = ({data, Update}) => {
    const [conf, setConf] = useState('')

    function genString(k) {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < k; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result;
    }

    useEffect(() => {
        // const { inputKey, inputInstallID, model, osType, locale } = data;
        //
        // console.log('Key:', inputKey);
        // console.log('Install ID:', inputInstallID);
        // console.log('Model:', model);
        // console.log('OS Type:', osType);
        // console.log('Locale:', locale);
        //
        // const fcm_token = inputInstallID+':APA91b'+genString(134)
        // const currentTime = new Date().toISOString();
        // const payload = {
        //     key: inputKey,
        //     install_id: inputInstallID,
        //     fcm_token: fcm_token,
        //     referer: '1.1.1.1',
        //     warp_enabled: true,
        //     tos: currentTime,
        //     model: model,
        //     type: osType,
        //     locale: locale,
        // };
        // try {
        //     const response = axios
        //         .post(url, payload, {
        //         headers: {
        //             'User-Agent': 'okhttp/3.12.1',
        //             'Content-Type': 'application/json; charset=UTF-8',
        //         },
        //     });
        //     // return response.data;
        // } catch (error) {
        //     console.error('Error:', error);
        //     return null;
        // }
        const reg = async () => {
            const {inputKey,pubKey, inputInstallID, model, osType, locale} = data;

            const url = 'https://wgcf-api.xzc-meina.top/v0a977/reg';
            const fcm_token = `${inputInstallID}:APA91b${genString(134)}`;
            const currentTime = new Date().toISOString(); // 获取当前时间并格式化为 ISO 格式
            console.log(currentTime)

            const payload = {
                key: pubKey,
                install_id: inputInstallID,
                fcm_token: fcm_token,
                referer: '1.1.1.1',
                warp_enabled: true,
                tos: currentTime,
                model: model,
                type: osType,
                locale: locale,
            };

            try {
                const response = await axios.post(url, payload, {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                });
                const outputString = `
[Interface]
PrivateKey = ${inputKey}
Address = ${response.data.config.interface.addresses.v4}
Address = ${response.data.config.interface.addresses.v6}
# ClientID = [${Array.from(atob(response.data.config.client_id)).map(char => char.charCodeAt(0))}]
# Table = off
DNS = 1.1.1.1,8.8.8.8
 
[Peer]
PublicKey = bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=
# Endpoint = engage.cloudflareclient.com:2408
Endpoint = 162.159.192.1:2408
# Endpoint = [2606:4700:d0::a29f:c005]:2408
AllowedIPs = 0.0.0.0/0
AllowedIPs = ::/0`;
                setConf(outputString)
                console.log('Response:', response.data);
                // 处理响应，例如更新状态等
            } catch (error) {
                console.error('Error:', error);
                // 处理错误
            }
        };

        if (Update) {
            reg();
        }
    }, [Update, data]);


    return (
        <div className="outputs">
            <h2 className="title">
                Generated WGCF Profile For Wireguard
            </h2>
            <TextArea rows={20} value={conf}/>
        </div>
    )
}
export default Outputs
import {useEffect, useState} from "react";
import {over} from "stompjs";
import SockJs from "sockjs-client";
import {Field, Form, Formik} from "formik";
import axios from "axios";

let stompClient = null

export default function ChatRoom() {
    const [listUsers, setListUsers] = useState([])
    const [publicChats, setPublicChats] = useState([])
    const [privateChats, setPrivateChats] = useState(new Map())
    const [tabs, setTabs] = useState("CHATROOM")
    const [userData, setUserData] = useState({
        username: "",
        receiveName: "",
        connected: false,
        message: ""
    })

    let [users, setUsers] = useState({
        username: "",
        password: ""
    })

    const handleLogin = (e) => {
        axios.post("http://localhost:8080/api/auth/login", e).then((res) => {
            localStorage.setItem("users", JSON.stringify(res.data))
            localStorage.setItem("listUser", JSON.stringify([res.data.name]))
            registerUser()
        })
    }

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    }

    // const handleUsername=(event)=>{
    //     const {value}=event.target;
    //     setUserData({...userData,"username": value});
    // }
    const registerUser = () => {
        let Sock = new SockJs("http://localhost:8080/ws")
        stompClient = over(Sock)
        stompClient.connect({}, onConnected, onError)
    }

    const onConnected = () => {
        userData.username = JSON.parse(localStorage.getItem("users")).name
        setUserData({...userData, "connected": true})
        stompClient.subscribe("/group/public", onPublicMessageReceived)
        stompClient.subscribe("/user/" + userData.username + "/private", onPrivateMessageReceived)
        userJoin()
        setListUsers(JSON.parse(localStorage.getItem("listUser")))
    }

    const userJoin = () => {
        let chatMessage = {
            senderName: userData.username,
            status: "JOIN"
        }
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage))
    }

    const onPublicMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body)
        switch (payloadData.status) {
            case "JOIN":
                if (!privateChats.get(payloadData.senderName)) {
                    privateChats.set(payloadData.senderName, [])
                    setPrivateChats(new Map(privateChats))
                }
                break
            case "MESSAGE":
                publicChats.push(payloadData)
                setPublicChats([...publicChats])
                break
        }
    }

    const onPrivateMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body)
        if (privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName).push(payloadData)
            setPrivateChats(new Map(privateChats))
        } else {
            let list = []
            list.push(payloadData)
            privateChats.set(payloadData.senderName, list)
            setPrivateChats(new Map(privateChats))
        }
    }

    const onError = (err) => {
        console.log(err)
    }

    const sendPublicMessage = () => {
        if (stompClient) {
            let chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: "MESSAGE"
            }
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage))
            setUserData({...userData, "message": ""})
        }
    }
    const sendPrivateMessage = () => {
        if (stompClient) {
            let chatMessage = {
                senderName: userData.username,
                receiveName: tabs,
                message: userData.message,
                status: "MESSAGE"
            }
            if (userData.username !== tabs) {
                privateChats.get(tabs).push(chatMessage)
                setPrivateChats(new Map(privateChats))
            }
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage))
            setUserData({...userData, "message": ""})
        }
    }


    return (
        <>
            <div className={'container'}>
                {userData.connected ?
                    <div className={'chat-box'}>
                        <div className={'member-list'}>
                            <ul>
                                <li onClick={() => {
                                    setTabs("CHATROOM")
                                }}
                                    className={`member ${tabs === "CHATROOM" && "active"}`}>Chatroom
                                </li>
                                {[...privateChats.keys()].map((name, index) => (
                                    <li key={index} onClick={()=>{setTabs(name)}}
                                        className={`member ${tabs === name && "active"}`}>
                                        {name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {tabs === "CHATROOM" && <div className={'chat-content'}>
                            <ul className={'chat-message'}>
                                {publicChats.map((chat, index) => (
                                    <li className={'message'} key={index}>
                                        {chat.senderName !== userData.username &&
                                            <div className={'avatar'}>{chat.senderName}</div>}
                                        <div className={'message-data'}>{chat.message}</div>
                                        {chat.senderName === userData.username &&
                                            <div className={'avatar-self'}>{chat.senderName}</div>}
                                    </li>
                                ))}
                            </ul>
                            <div className={'send-message'}>
                                <input type="text" value={userData.message} className="input-message"
                                       name={'message'} onChange={handleMessage}/>
                                <button type={'button'} className={'send-button'}
                                        onClick={sendPublicMessage}>Send
                                </button>
                            </div>
                        </div>}
                        {tabs !== "CHATROOM" && <div className={'chat-content'}>
                            <ul className={'chat-message'}>
                                {[...privateChats.get(tabs)].map((chat, index) => (
                                    <li className={'message'} key={index}>
                                        {chat.senderName !== userData.username &&
                                            <div className={'avatar'}>{chat.senderName}</div>}
                                        <div className={'message-data'}>{chat.message}</div>
                                        {chat.senderName === userData.username &&
                                            <div className={'avatar-self'}>{chat.senderName}</div>}
                                    </li>
                                ))}
                            </ul>
                            <div className={'send-message'}>
                                <input type="text" value={userData.message} className="input-message"
                                       name={'message'} onChange={handleMessage}/>
                                <button type={'button'} className={'send-button'}
                                        onClick={sendPrivateMessage}>Send
                                </button>
                            </div>
                        </div>}
                    </div>
                    :
                    <div className={'register'}>
                        {/*<input type="text" id={'username'}*/}
                        {/*       placeholder={'Enter username send'}*/}
                        {/*    value={userData.username}*/}
                        {/*       onChange={handleUsername}/>*/}
                        {/*<button type={'button'} onClick={registerUser}>*/}
                        {/*    Connect*/}
                        {/*</button>*/}
                        <h1>Login Form</h1>
                        <Formik initialValues={users}
                                onSubmit={(e) => {
                                    handleLogin(e)
                                }}>
                            <Form>
                                <Field type={'text'} name={'username'}/>
                                <Field type={'password'} name={'password'}/>
                                <button type={'submit'}>Login</button>
                            </Form>
                        </Formik>
                    </div>
                }
            </div>
        </>
    )
}

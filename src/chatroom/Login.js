import {Field, Form, Formik} from "formik";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import SockJs from "sockjs-client";
import {over} from "stompjs";

let stompClient = null
export default function Login() {
    let [users, setUsers] = useState({
        username: "",
        password: ""
    })
    let navigate = useNavigate()

    const handleLogin = (e) => {
        axios.post("http://localhost:8080/api/auth/login", e).then((res) => {
            localStorage.setItem("users", JSON.stringify(res.data))
            navigate("/home-chat")
        })
    }

    return (
        <>
            <h1>Login Form</h1>
            <Formik initialValues={users}
                    onSubmit={(e) => {
                        handleLogin(e)
                    }}>
                <Form>
                    <Field name={users.username}/>
                    <Field name={users.password}/>
                    <button type={'button'}>Login</button>
                </Form>
            </Formik>
        </>
    )
}

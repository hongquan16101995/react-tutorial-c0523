import {Field, Form, Formik} from "formik";
import axios from 'axios'
import {Link, useNavigate} from "react-router-dom";

export default function CreateStudent() {
    let navigate = useNavigate();

    function createStudent(e) {
        axios.post("http://localhost:8080/api/students", e).then(() => {
            navigate('/student')
        })
    }

    return (
        <>
            <div className={'container'} style={{width: '600px'}}>
                <h1 style={{textAlign: "center"}}>Create form</h1>
                <Formik
                    initialValues={{
                        name: '',
                        age: '',
                        point: ''
                    }}
                    onSubmit={(e) => {
                        createStudent(e)
                    }}
                >
                    <Form>
                        <div className="mb-3">
                            <label htmlFor={'name'} className="form-label">Name</label>
                            <Field type={'text'} name={'name'} className={'form-control'} id="{'name'}"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor={'age'} className="form-label">Age</label>
                            <Field type={'number'} name={'age'} className={'form-control'} id="{'age'}"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor={'point'} className="form-label">Point</label>
                            <Field type={'number'} name={'point'} className={'form-control'} id="{'point'}"/>
                        </div>
                        <div style={{textAlign: "center"}}>
                            <button className={'btn btn-primary'} type={'submit'}>Create</button>
                            <Link className={'btn btn-secondary'} to={'/student'}>Back to home</Link>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    )
}

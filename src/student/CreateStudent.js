import {Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {changeValueCheckbox, findAllClassroom, saveStudent} from "./service/StudentService";

export default function CreateStudent() {
    let navigate = useNavigate();
    let [classrooms, setClassrooms] = useState([])
    let [cls, setCls] = useState([])

    useEffect(() => {
        findAllClassroom().then((result) => {
            setClassrooms(result)
        })
    }, [])
    function createStudent(e) {
        e.classrooms = cls
        saveStudent(e, navigate).then()
    }

    return (
        <>
            <div className={'container'} style={{width: '600px'}}>
                <h1 style={{textAlign: "center"}}>Create form</h1>
                <Formik
                    initialValues={{
                        name: '',
                        age: '',
                        point: '',
                        classroom: {
                            id: ''
                        }
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
                        <div className="mb-3">
                            <label htmlFor={'classroom'} className="form-label">Classroom</label>
                            <Field as={'select'} name={'classroom.id'} className={'form-control'} id="{'classroom'}">
                                <option>------------</option>
                                {classrooms.map((c) => {
                                    return (
                                        <>
                                            <option value={c.id}>{c.name}</option>
                                        </>
                                    )
                                })}
                            </Field>
                        </div>
                        <div className="mb-3">
                            <label htmlFor={''} className="form-label">Classrooms</label><br/>
                            {classrooms.map((c) => {
                                return (
                                    <>
                                        <input className="form-check-input"
                                               type="checkbox" value={c.id}
                                        onChange={(e) => {
                                            changeValueCheckbox(e, cls, setCls)
                                        }}/>
                                        <label className="form-check-label">{c.name}</label>
                                    </>
                                )
                            })}
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

import {Field, Form, Formik} from "formik";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {changeValueCheckbox, findAllClassroom, findStudentById, saveStudent} from "./service/StudentService";

export default function UpdateStudent() {
    let navigate = useNavigate();
    let {id} = useParams();
    let [student, setStudent] = useState({})
    let [classrooms, setClassrooms] = useState([])
    let [cls, setCls] = useState([])

    useEffect(() => {
        findStudentById(id).then((a) => {
            setStudent(a)
        })

        findAllClassroom().then((result) => {
            setClassrooms(result)
        })
    }, [])

    function updateStudent(e) {
        e.classrooms = cls
        saveStudent(e, navigate).then()
    }

    function checkCheckbox(id) {
        for (let i = 0; i < student.classrooms.length; i++) {
            if (student.classrooms[i].id === id) {
                return true
            }
        }
         return false
        // classrooms.find((cl) => {
        //     return cl.id === id
        // })
    }

    return (
        <>
            <div className={'container'} style={{width: '600px'}}>
                <h1 style={{textAlign: "center"}}>Update form</h1>
                <Formik
                    initialValues={student}
                    onSubmit={(e) => {
                        updateStudent(e)
                    }}
                    enableReinitialize={true}
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
                                               checked={() => {
                                                   checkCheckbox(c.id)
                                               }}
                                               onChange={(e) => {
                                                   changeValueCheckbox(e, cls, setCls)
                                               }}
                                        />
                                        <label className="form-check-label">{c.name}</label>
                                    </>
                                )
                            })}
                        </div>
                        <div style={{textAlign: "center"}}>
                            <button className={'btn btn-primary'} type={'submit'}>Update</button>
                            <Link className={'btn btn-secondary'} to={'/student'}>Back to home</Link>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    )
}

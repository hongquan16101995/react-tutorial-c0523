import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {deleteStudentById, findAllStudent, findAllStudentByName} from "./service/StudentService";
import axios from "axios";

export default function ListStudent() {
    let [students, setStudents] = useState([])
    let [checkDelete, setCheckDelete] = useState(false)
    let [search, setSearch] = useState("")

    useEffect(() => {
        findAllStudent().then((result) =>{
            setStudents(result)
        })
    }, [checkDelete])

    function deleteStudent(id) {
        if (window.confirm("Are you sure?")) {
            deleteStudentById(id).then(() =>{
                setCheckDelete(!checkDelete)
                alert("Delete successfully!")
            })
        }
    }

    function searchByName() {
        findAllStudentByName(search).then((result) => {
            setStudents(result)
        })
    }

    function ageAsc() {
        setStudents([...students.sort((a, b) => {
            return a.age - b.age
        })])
    }

    function ageDesc() {
        setStudents([...students.sort((a, b) => {
            return b.age - a.age
        })])
    }

    function pointAsc() {
        setStudents([...students.sort((a, b) => {
            return a.point - b.point
        })])
    }

    function pointDesc() {
        setStudents([...students.sort((a, b) => {
            return b.point - a.point
        })])
    }

    return (
        <>
            <div className={'container'}>
                <h1 style={{textAlign: "center"}}>List Student</h1>
                <div className={'row'}>
                    <div className={'col-md-9'}>
                        <Link className={'btn btn-primary'} to={'/student/create'}>Create new student</Link>
                        <button className={'btn btn-info'} onClick={ageAsc}>
                            AgeAsc
                        </button>
                        <button className={'btn btn-info'} onClick={ageDesc}>
                            AgeDesc
                        </button>
                        <button className={'btn btn-info'} onClick={pointAsc}>
                            PointAsc
                        </button>
                        <button className={'btn btn-info'} onClick={pointDesc}>
                            PointDesc
                        </button>
                    </div>
                    <div className={'col-md-3'}>
                        <input type="text" onChange={(e) => {
                            setSearch(e.target.value)
                        }}/>
                        <button className={'btn btn-primary'} onClick={searchByName}>Search</button>
                    </div>
                </div>
                <table className={'table table-hover'}>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Point</th>
                        <th>Classroom</th>
                        <th>Classrooms</th>
                        <th colSpan={2} style={{width: '20%', textAlign: "center"}}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {students.map((s, count = 1) => {
                        return (
                            <>
                                <tr>
                                    <td>{++count}</td>
                                    <td>{s.name}</td>
                                    <td>{s.age}</td>
                                    <td>{s.point}</td>
                                    <td>{s.classroom.name}</td>
                                    <td>
                                        {s.classrooms.map((sc) => {
                                            return (
                                                <>
                                                    <span>{sc.name}</span><br/>
                                                </>
                                            )
                                        })}
                                    </td>
                                    <td>
                                        <Link className={'btn btn-warning update'} to={'/student/update/' + s.id}>
                                            Update
                                        </Link>
                                    </td>
                                    <td>
                                        <button className={'btn btn-danger'} onClick={() => {
                                            deleteStudent(s.id)
                                        }}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

import {useEffect, useState} from "react";
import axios from "axios"
import {Link} from "react-router-dom";

export default function ListStudent() {
    let [students, setStudents] = useState([])
    let [checkDelete, setCheckDelete] = useState(false)
    let [search, setSearch] = useState("")

    useEffect(() => {
        findAll()
    }, [checkDelete])

    function findAll() {
        axios.get("http://localhost:8080/api/students")
            .then(response => {
                    setStudents(response.data)
                }
            )
    }

    function deleteStudent(id) {
        if (window.confirm("Are you sure?")) {
            axios.delete("http://localhost:8080/api/students/" + id)
                .then(() => {
                        setCheckDelete(!checkDelete)
                        alert("Delete successfully!")
                    }
                )
        }
    }

    function searchByName() {
        axios.post("http://localhost:8080/api/students/search?name="+ search)
            .then(response => {
                    setStudents(response.data)
                }
            )
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

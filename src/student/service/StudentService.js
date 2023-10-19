import axios from "axios";

export const findAllStudent = () => {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/students")
                .then(response => {
                        return response.data
                    }
                ).catch(() => {
                return []
            })
        )
    })
}

export const findStudentById = (id) => {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/students/" + id)
                .then(response => {
                        return response.data
                    }
                ).catch(() => {
                return {}
            })
        )
    })
}

export const saveStudent = (student, navigate) => {
    return new Promise((resolve) => {
        resolve(
            axios.post("http://localhost:8080/api/students", student)
                .then(response => {
                        navigate("/student")
                    }
                ).catch(() => {
                navigate("/student/create")
            })
        )
    })
}

export const deleteStudentById = (id) => {
    return new Promise((resolve) => {
        resolve(
            axios.delete("http://localhost:8080/api/students/" + id)
                .then(response => {
                        return response.data
                    }
                ).catch(() => {
                return {}
            })
        )
    })
}

export const findAllStudentByName = (search) => {
    return new Promise((resolve) => {
        resolve(
            axios.post("http://localhost:8080/api/students/search?name=" + search)
                .then(response => {
                        return response.data
                    }
                ).catch(() => {
                return []
            })
        )
    })
}

export const findAllClassroom = () => {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/classrooms")
                .then(response => {
                        return response.data
                    }
                ).catch(() => {
                return []
            })
        )
    })
}

export const findClassroomById = (id) => {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/classrooms/" + id)
                .then(response => {
                        return response.data
                    }
                ).catch(() => {
                return {}
            })
        )
    })
}

export function changeValueCheckbox(e, cls, setCls) {
    let check = false
    for (let i = 0; i < cls.length; i++) {
        if (cls[i].id === e.target.value) {
            cls.splice(i, 1)
            check = true
            break
        }
    }
    if (!check) {
        let cl = {id: e.target.value}
        cls.push(cl)
    }
    setCls([...cls])
}

import {useEffect, useState} from "react";
import {displayAnimal} from "./service/AnimalService";
import {Link} from "react-router-dom";

function List() {
    let [animals, setAnimals] = useState([]);

    useEffect(() => {
        setAnimals(displayAnimal)
    }, [])

    return (
        <>
            <Link to={'/create'}>Create new animal</Link>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Price</th>
                    <th>Update</th>
                </tr>
                </thead>
                <tbody>
                {animals.map((x) => {
                    return (
                        <>
                            <tr>
                                <td>{x.id}</td>
                                <td>{x.name}</td>
                                <td>{x.age}</td>
                                <td>{x.gender}</td>
                                <td>{x.price}</td>
                                <td>
                                    <Link to={"/update/" + x.id}>Update</Link>
                                </td>
                            </tr>
                        </>
                    )
                })}
                </tbody>
            </table>
        </>
    )
}

export default List;

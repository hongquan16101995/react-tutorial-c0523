import {Field, Form, Formik} from "formik";
import {findOne, update} from "./service/AnimalService"
import {Link, useParams} from "react-router-dom";

function Update() {
    let {id} = useParams()

    return (
        <>
            <div>
                <Formik
                    initialValues={findOne(id)}
                    onSubmit={(e) => updateSubmit(e)}>
                    <Form>
                        <table>
                            <tbody>
                            <tr>
                                <th><label htmlFor={'id'}>Id</label></th>
                                <td><Field name={'id'} id={'id'}/></td>
                            </tr>
                            <tr>
                                <th><label htmlFor={'name'}>Name</label></th>
                                <td><Field name={'name'} id={'name'}/></td>
                            </tr>
                            <tr>
                                <th><label htmlFor={'age'}>Age</label></th>
                                <td><Field name={'age'} id={'age'}/></td>
                            </tr>
                            <tr>
                                <th><label htmlFor={'gender'}>Gender</label></th>
                                <td><Field name={'gender'} id={'gender'}/></td>
                            </tr>
                            <tr>
                                <th><label htmlFor={'price'}>Price</label></th>
                                <td><Field name={'price'} id={'price'}/></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button type={'submit'}>Update</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </Form>
                </Formik>
                <Link to="/">Back to home</Link>
            </div>
        </>
    )

    function updateSubmit(e) {
        update(e)
    }
}

export default Update;

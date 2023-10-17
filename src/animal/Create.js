import {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {create} from "./service/AnimalService"
import {Link} from "react-router-dom";
import * as Yup from "yup";

function Create() {
    let [animal] = useState({
        id: "",
        name: "",
        age: "",
        gender: "",
        price: "",
    })

    let validate = Yup.object().shape(
        {
            age: Yup.number().required("Không được để trống")
                .min(0).max(120),
            price: Yup.number().required().min(0),
            name: Yup.string().required().min(6)
        }
    )

    return (
        <>
            <div>
                <Formik
                    initialValues={animal}
                    onSubmit={(e) => createSubmit(e)}
                    validationSchema={validate}
                >
                    <Form>
                        <table>
                            <tbody>
                            <tr>
                                <th><label htmlFor={'id'}>Id</label></th>
                                <td>
                                    <Field name={'id'} id={'id'}/>
                                </td>
                            </tr>
                            <tr>
                                <th><label htmlFor={'name'}>Name</label></th>
                                <td>
                                    <Field name={'name'} id={'name'}/>
                                    <ErrorMessage name={'name'}/>
                                </td>
                            </tr>
                            <tr>
                                <th><label htmlFor={'age'}>Age</label></th>
                                <td>
                                    <Field name={'age'} id={'age'}/>
                                    <ErrorMessage name={'age'}/>
                                </td>
                            </tr>
                            <tr>
                                <th><label htmlFor={'gender'}>Gender</label></th>
                                <td><Field name={'gender'} id={'gender'}/></td>
                            </tr>
                            <tr>
                                <th><label htmlFor={'price'}>Price</label></th>
                                <td>
                                    <Field name={'price'} id={'price'}/>
                                    <ErrorMessage name={'price'}/>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button type={'submit'}>Create</button>
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

    function createSubmit(e) {
        create(e)
    }
}

export default Create;

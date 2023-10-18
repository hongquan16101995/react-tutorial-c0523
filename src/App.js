import './App.css';
import {Route, Routes} from "react-router-dom";
import ListStudent from "./student/ListStudent";
import CreateStudent from "./student/CreateStudent";
import UpdateStudent from "./student/UpdateStudent";
import List from "./animal/List";
import Create from "./animal/Create";
import Update from "./animal/Update";

function App() {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<List/>}></Route>
                <Route path={'/create'} element={<Create/>}></Route>
                <Route path={'/update/:id'} element={<Update/>}></Route>

                <Route path={'/student'} element={<ListStudent/>}></Route>
                <Route path={'/student/create'} element={<CreateStudent/>}></Route>
                <Route path={'/student/update/:id'} element={<UpdateStudent/>}></Route>
            </Routes>
        </>
    );
}

export default App;

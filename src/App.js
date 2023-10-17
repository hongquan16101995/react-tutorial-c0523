import './App.css';
import {Route, Routes} from "react-router-dom";
import List from "./animal/List";
import Create from "./animal/Create";
import Header from "./animal/layout/Header";
import Update from "./animal/Update";

function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path={'/'} element={<List/>}></Route>
                <Route path={'/create'} element={<Create/>}></Route>
                <Route path={'/update/:id'} element={<Update/>}></Route>
            </Routes>
        </>
    );
}

export default App;

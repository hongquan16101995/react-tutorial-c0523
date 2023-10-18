import {Link} from "react-router-dom";

function Header() {
    return (
        <Link className={'btn btn-success'} to={'/student'}>Student</Link>
    )
}

export default Header

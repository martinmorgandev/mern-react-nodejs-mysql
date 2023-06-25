import { Link } from "react-router-dom";


const Navbar = () => {
    return ( 
        <div>
            <h1>React MYSQL</h1>

            <ul>
            <Link to="/">Home</Link>
            </ul>
            <ul>
            <Link to="/new">Create task</Link>
            </ul>
        </div>
     );
}
 
export default Navbar;
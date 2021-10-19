import { NavLink } from "react-router-dom"


const Splash = () => {
    return (
        <div className="wholePage">
            <NavLink to="/signin">Sign In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
        </div>
    )
}


export default Splash;

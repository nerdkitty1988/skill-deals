import { NavLink } from "react-router-dom";
import "./Splash.css";
import Home from "../Home/Home"
import { useSelector } from "react-redux";


const Splash = () => {
    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) {
        return (
            <div id="wholePage">
                <div className="splashPage">
                    <div className="welcome">
                        <div className="links">
                            <h1 className="siteName">Skill Deals</h1>
                            <NavLink className="welcomeNav" to="/login">Sign In</NavLink>
                            <NavLink className="welcomeNav" to="/signup">Sign Up</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        )
    }else{
        return (
            <Home />
        )
    }
}


export default Splash;

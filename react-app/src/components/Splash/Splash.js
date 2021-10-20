import { NavLink } from "react-router-dom"
import "./Splash.css"


const Splash = () => {
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
}


export default Splash;

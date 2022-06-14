import { Link } from "react-router-dom";

function Navbar() {
    return (
        <header className="header">
            <div className="header__inner">
                <nav className="header-navbar">
                    <ul className="header-navbar__links">
                        <li>
                            <Link to="/sign-in" className="header-navbar__link">Sign in</Link>
                        </li>
                        <li>
                            <Link to="/sign-up" className="header-navbar__link">Sign up</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar;
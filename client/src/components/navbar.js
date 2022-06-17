import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";

const useNavbarStyles = createUseStyles({
    header: {
        display: 'flex',
        height: '45px',
        alignItems: 'center',
        backgroundColor: 'teal',

    },
    header__inner: {
        margin: '0 20px',
        width: '100%',
    },
    'header-navbar': {
        display: 'flex', 
    },
    'header-navbar__links': {
        display: 'flex',
        margin: '0 0 0 auto'
    },
    'header-navbar__item': {
        margin: '0 5px',
    },
    'header-navbar__link': {
        color: 'white'
    }
})

function Navbar() {
    const navbarStyles = useNavbarStyles();

    return (
        <header className={navbarStyles.header}>
            <div className={navbarStyles.header__inner}>
                <nav className={navbarStyles['header-navbar']}>
                    <ul className={navbarStyles["header-navbar__links"]}>
                        <li className={navbarStyles["header-navbar__item"]}>
                            <Link to="/sign-in" className={navbarStyles["header-navbar__link"]}>Sign in</Link>
                        </li>
                        <li>
                            <Link to="/sign-up" className={navbarStyles["header-navbar__link"]}>Sign up</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar;
import { createUseStyles } from "react-jss";

const useSignupStyles = createUseStyles({
    'signup-page': { 
        width: '100%',
        height: '100%'
    },
    'signup-page__inner': {
        margin: '15px 20px',
        display: "flex", 
        height: '100%'
    },
    'signup-form': {
        display: 'flex',
        margin: 'auto',
        border: '1px solid red'
    },
    'signup-form__inner': {
        width: '350px',
        height: '450px'
    },
    'signup-form__row': {
        display: "flex"
    },
    'form__input form__input_signup': {
        display: 'flex',
        height: '25px'   
    }
})


function SignupPage() {
    const signupStyles = useSignupStyles();

    return (
        <div className={signupStyles["signup-page"]}>
            <div className={signupStyles["signup-page__inner"]}>
                <form className={signupStyles["signup-form"]}>
                    <div className={signupStyles["signup-form__inner"]}>
                        <div className={signupStyles["signup-form__row"]}>
                            <input type="email" className={signupStyles["form__input form__input_signup"]} placeholder="email"/>
                        </div>
                        <div className={signupStyles["signup-form__row"]}>
                            <input type="password" className={signupStyles["form__input form__input_signup"]} placeholder="password"/>
                        </div>
                        <div className="signup-form__row">
                            <button className="form__button form__button_signup">Sign up</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default SignupPage;
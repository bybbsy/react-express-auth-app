function signupPage() {
    return (
        <div className="signup-page">
            <div className="signup-page__inner">
                <form className="signup-form">
                    <div className="signup-form__inner">
                        <div className="signup-form__row">
                            <input type="email" className="form__input form__input_signup"/>
                        </div>
                        <div className="signup-form__row">
                            <input type="email" className="form__input form__input_signup"/>
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


export default signupPage;
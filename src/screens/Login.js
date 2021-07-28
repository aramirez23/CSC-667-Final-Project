import React, {useState} from "react";
import {Link} from "react-router-dom";
import {getMessages, getUser, postLogin} from "../utility/request";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import './LoginRegister.css'
import Cookies from "universal-cookie";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const cookies = new Cookies();
    cookies.remove('session');

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = JSON.stringify({
            email: email,
            password: password,
        });

        postLogin(data).then((res) => {
            if (res.data !== undefined && res.data.success) {
                getUser().then((res) => {
                    console.log(res.data)
                    if (res.data && res.data.firstName && res.data.firstName
                        !== '') {
                        dispatch({
                            type: 'SET_USER',
                            action: res.data,
                        })
                    }
                    getMessages()
                    .then((res) => {
                        console.log(res);
                        dispatch({
                            type: 'UPDATE_MESSAGES',
                            messages: res.data,
                        });
                        history.push('/')
                    })
                });
            } else {
                alert('Login unsuccessful please try again')
            }
        });
    };
    return (
        <div class="form-container">
            <div className="login-main" class="form">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div class="title-text">
                        Login
                    </div>
                    <div class="input-text-left">
                        Email
                        <input
                            class="form-input"
                            type="email"
                            placeholder="Email"
                            name="email"
                            id="email"
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div class="input-text-left">
                        Password
                        <input
                            class="form-input"
                            type="password"
                            placeholder="Password"
                            name="password"
                            id="password"
                            onChange={(event) => setPassword(
                                event.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="" class="button">
                        Login
                    </button>
                    <p>
                        Don't have an account? <Link to="/register">Sign
                        up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;

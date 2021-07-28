import React, { useState } from "react";
import {Link} from "react-router-dom";
import {getUser, postRegister} from "../utility/request";
import {useDispatch} from "react-redux";
import {useHistory } from "react-router-dom";

const Register = () => {
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        });

        postRegister(data).then((res) => {
            if (res.data !== undefined && res.data.success) {
                getUser().then((res) => {
                    console.log(res.data)
                    if (res.data  && res.data.firstName && res.data.firstName !== '') {
                        dispatch({
                            type: 'SET_USER',
                            action: res.data,
                        })
                    }
                    history.push('/');
                });
            } else {
                alert('Register unsuccessful please try again')
            }
        });
    };
    return (
        <div class="form-container">
            <div class="form">
                <form onSubmit={handleSubmit}>
					<div class="title-text">
						Register
					</div>
					<div class="input-text-left">
						First Name
						<input
							class="form-input"
							type="text"
							placeholder="First Name"
							name="firstName"
							id="firstName"
							onChange={(event) => setFirstName(event.target.value)}
							required
						/>
					</div>
                    <div class="input-text-left">
						Last Name
						<input
							class="form-input"
							type="text"
							placeholder="Last Name"
							name="lastName"
							id="lastName"
							onChange={(event) => setLastName(event.target.value)}
							required
						/>
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
							onChange={(event) => setPassword(event.target.value)}
							required
						/>
					</div>
                    <button type="submit" className="" class="button">
                        Register
                    </button>
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;

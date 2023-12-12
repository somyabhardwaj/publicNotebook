import React from 'react';
import { useState } from 'react';
import { userSignIn } from '../../redux/api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { setLoading } from '../../redux/reducers/userSlice';

function Signin() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();


    const handelOnChange = (e) => {

        if (e.target.id === 'staticName') {
            setName(e.target.value)
        }
        if (e.target.id === 'staticEmail') {
            setEmail(e.target.value)
        }
        if (e.target.id === 'inputPassword') {
            setPassword(e.target.value)
        }

    }

    const handelOnSubmit = () => {
        const user = {
            name: name,
            email: email,
            password: password
        }

        dispatch(userSignIn(user))
            .then((responseData) => {
                
                if (responseData && responseData.payload && responseData.payload.success === true) {
                    enqueueSnackbar('Signup Successful redirecting to login page', { variant: 'success' });
                    
                    const loginbutton = () => {
                        const btn = document.getElementById("loginButton");
                        if (btn) {
                            btn.click();
                        }
                    };
                    loginbutton();
                } else {
                    enqueueSnackbar('Please enter valid credentials', { variant: 'error' });
                }
            })
            .catch((error) => {
                console.error("Error signing in:", error);
                enqueueSnackbar('An error occurred. Please try again.', { variant: 'error' });
            })
            .finally(() => {
                dispatch(setLoading())
                setName("");
                setEmail("");
                setPassword("");
            });
    }


    const clickLoginModel = () => {
        const logButton = document.getElementById("loginButton")
        if (logButton) {
            logButton.click()
        }
        console.log("clickLoginModel ")
    }

    return (
        <>

            {/* <!-- Button trigger Signin modal --> */}

            <button id="myButton" type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Sign In
            </button>

            {/* <!-- Modal --> */}

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Sign In</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            {/* sign in for starts here */}

                            <div>
                                <div className="mb-3 row">
                                    <label htmlFor="staticName" className="col-sm-2 col-form-label">Name</label>
                                    <div className="col-sm-10">
                                        <input onChange={(value) => { handelOnChange(value) }} type="text" className="form-control" id="staticName" value={name} />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                                    <div className="col-sm-10">
                                        <input onChange={(value) => { handelOnChange(value) }} type="email" className="form-control" id="staticEmail" value={email} />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                                    <div className="col-sm-10">
                                        <input onChange={(value) => { handelOnChange(value) }} type="password" className="form-control" id="inputPassword" value={password} />
                                    </div>
                                </div>
                            </div>

                            {/* signin form ends here  */}

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Back</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handelOnSubmit} >SignIn</button>
                        </div>
                        <div className='d-flex justify-content-end mx-4'>
                            <p>Already a user ? <Link data-bs-dismiss="modal" onClick={clickLoginModel}>Click here</Link> to Login.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signin

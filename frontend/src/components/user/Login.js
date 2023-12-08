import React from 'react'
import { useState } from 'react';
import { userLogin } from '../../redux/api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import fetchNotes from "../../redux/api/notesApi"


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.authToken);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handelOnChange = (e) => {

    if (e.target.id === 'staticEmail') {
      setEmail(e.target.value)
    }
    if (e.target.id === 'inputPassword') {
      setPassword(e.target.value)
    }

  }
  const handelOnSubmit = () => {

    const user = {

      email: email,
      password: password
    }

    dispatch(userLogin(user))
    .then((response) => {
      
      if (response && response.payload.data && response.payload.data.success === true) {
        enqueueSnackbar('Login Successful redirecting to login paige', { variant: 'success' })
        navigate('/home')
        dispatch(fetchNotes(token))
      }})
      .catch((err)=>{
        console.log({err})
        enqueueSnackbar('Please enter valid cridentials', { variant: 'error' })
        navigate("")
      })
      .finally(()=>{
        setEmail('')
    setPassword('')
      })


    
  }
  const clickSiginModel = () => {
    const SiginButton = document.getElementById('myButton')
    if (SiginButton) {
      SiginButton.click()
    }
  }

  return (
    <>
      {/* <!-- Button trigger Login modal --> */}

      <button id="loginButton" type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#loginModal">
        Login
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Login</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              {/* sign in for starts here */}
              <div>

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
              <button type="button" className="btn btn-primary" onClick={handelOnSubmit} data-bs-dismiss="modal">Login</button>

            </div>
            <div className='d-flex justify-content-end mx-4'>
              <p>Not a user ? <Link data-bs-dismiss="modal" onClick={() => { setTimeout(clickSiginModel, [500]) }}>Click here</Link> to Sigin.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login

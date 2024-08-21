import React from 'react'
import "./global.css"

const Login = () => {
    return (
        <>
            <div className='formContainer'>
                <div className='formBlock'>
                    <div className='formHead text-center'>
                        <h1>Login</h1>
                    </div>

                    <form className='formSection'>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Login
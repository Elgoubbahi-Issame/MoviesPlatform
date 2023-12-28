import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { decodeToken } from 'react-jwt';

function Log() {

    document.getElementById("html").style.height = '100%';
    document.getElementById("html").style.overflow = 'hidden';
    document.getElementById("html").style.background = 'radial-gradient(ellipse at bottom, #1b2735 0%,#090a0f 100%)';
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [IsPending, setIsPending] = useState(false)
    const history = useNavigate();
    const check = () => {
        const data = {
            email,
            password
        }
        // console.log(data)
        axios.post('http://127.0.0.1:8000/api/login', data).then(res => {
            setIsPending(true);
            // console.log(res.data)
            // try {
            if (res.data.success == true) {
                var admin = decodeToken(res.data.token);
                var h = JSON.stringify(admin);
                console.log(admin)
                localStorage.setItem('token', h)

                // const config = {
                //     headers: {
                //         Authorization: 'Bearer' + localStorage.getItem('token')
                //     }
                // }
                axios.get('http://127.0.0.1:8000/api/Users/' + admin.sub).then(resAdmin => {
                    setIsPending(false)
                    history("/admin/home");
                })
            } else {
                // alert("Check your email and password if correct !")
                // }


                // } catch (error) {
                // console.log(error)
                alert("Check your email and password if correct !")
            }
        })
    }

    return (
        <section class="wrapper">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            {/* <div id="title">
                <span>PURE CSS</span>
                <br />
                <span>PARALLAX PIXEL BACKGROUND</span>
            </div> */}
            <div className="container">
                {/* <div className="form"> */}
                <form className='box' >
                    <div id="title">
                        <span>Admin Login</span>
                    </div>
                    <input onChange={e => { setemail(e.currentTarget.value) }} type="email" placeholder='Email' name='' required />
                    <input onChange={e => { setpassword(e.currentTarget.value) }} type="password" name='' placeholder='Password' required />

                    {IsPending && <input onClick={{ background: '#2ecc71' }} className='submit' onClick={() => (check())} type="" name='' value={'Logining...'} />}
                    {!IsPending && <input className='submit' onClick={() => (check())} type="" name='' value={'Login'} />}

                    {/* <button type="submit" >Submit</button> */}
                </form>
            </div>

            {/* </div> */}
        </section>

        // <div className="row d-flex justify-content-center">
        // <div className="container">
        //     <div className="form">

        //         <form >
        //             <div class="mb-3">
        //                 <label for="exampleInputEmail1" class="form-label">Email address</label>
        //                 <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        //                 <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        //             </div>
        //             <div class="mb-3">
        //                 <label for="exampleInputPassword1" class="form-label">Password</label>
        //                 <input type="password" class="form-control" id="exampleInputPassword1" />
        //             </div>
        //             <div class="mb-3 form-check">
        //                 <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        //                 <label class="form-check-label" for="exampleCheck1">Check me out</label>
        //             </div>
        //             <button type="submit" class="btn btn-primary">Submit</button>
        //         </form>
        //     </div>

        // </div>
        // </div>
    )
}

export default Log

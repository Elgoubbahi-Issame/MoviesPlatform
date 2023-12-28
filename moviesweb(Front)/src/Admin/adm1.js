import React, { useEffect, useState } from 'react'
import './styl3.css'
import DivMov from './Adm_mov'
import DivCas from './Adm_cast'
import DivHom from './Adm_hom'
import UseFetch from "../searchMovies/Usefetch";
import { useNavigate } from 'react-router-dom'

function Adm1() {
    const [id_adm, setid_adm] = useState();
    const history = useNavigate();

    useEffect(() => {
        try {
            setid_adm(JSON.parse(localStorage.getItem('token')).sub)
        } catch (error) {
            history('/admin');
        }
    }, [])

    const { data: Admin, isPending } = UseFetch('http://127.0.0.1:8000/api/users/' + id_adm);

    return (
        <div id='App'>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
            {isPending &&
                <div className="spinner-grow  size" role="status">
                    <span className="visually-hidden">Loading...</span>

                </div>}

            {/* <div class=""> */}
            {!isPending && <div id="container" className='container'>
                <div className="main-title d-flex justify-content-between">
                    <div className="col-md-8">
                        Welcome {Admin.name} <span className='emoji'>👋</span>
                    </div>
                    <div className="col-md-4 d-flex justify-content-end">
                        <a onClick={() => { window.location.reload(); localStorage.clear(); }} className='log_out'>Log out  <i class="fas fa-sign-out-alt"></i></a>
                    </div>
                </div>
                <div className="content">
                    {/* <span > */}
                    <input type="radio" name='indicator' id='Home' />
                    <input type="radio" name='indicator' id='Movie' />
                    <input type="radio" name='indicator' id='Cast' />
                    <input type="radio" name='indicator' id='User' />
                    <div className="list" >
                        <label htmlFor="Home" className="Home">
                            <i className="fas fa-home"></i>
                            <span className="topic" >Home</span>
                        </label>
                        <label htmlFor="Movie" className="Movie">
                            <i className="fas fa-film"></i>
                            <span className="topic" >Movies</span>
                        </label>
                        <label htmlFor="Cast" className="Cast">
                            <i className="fas fa-user-alt"></i>
                            <span className="topic" >Cast</span>
                        </label>
                        <label htmlFor="User" className="User">
                            <i className="fas fa-user-alt"></i>
                            <span className="topic" >Users</span>
                        </label>
                        <div className="indicator"></div>
                    </div>
                    <div className="text-content">

                        <DivHom />
                        <DivMov />

                        <DivCas />
                        <div className="User text">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia fuga eaque repellendus cum consequuntur eum, reiciendis quos omnis porro facilis molestias optio ad deleniti earum cumque natus magni, explicabo velit!</p>
                        </div>
                    </div>
                    {/* </span> */}
                </div>
            </div>
            }
        </div>

    )
}

export default Adm1

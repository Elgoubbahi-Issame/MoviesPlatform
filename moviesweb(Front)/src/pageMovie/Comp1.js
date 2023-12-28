import React, { useEffect } from 'react'

import Img from './profile.jfif'
import Img1 from './spider.jpg'

// const btn = document.querySelector('.btn1');
// 


function Comp1({ actor, IMG_URL, movie }) {

    const show = () => {
        const btn = document.querySelector('.btn1')
        const imag = document.querySelector('.video-container');
        const close = document.querySelector('.close');
        if (btn) {
            btn.addEventListener('click', () => {
                imag.classList.add('show');
            })
        }
        if (close) {
            close.addEventListener('click', () => {
                imag.classList.remove('show');
            })
        }
    }
    show();
    // console.log(Acteur.crew)
    const { original_title, overview, poster_path, vid_key } = movie;

    var Director = [];
    var act = [];
    actor.map(e => {
        if (e.job == 'Director') {
            Director = e;
        } else {
            act.push(e)
        }

    });
    console.log(act)
    console.log(Director)

    // var vid_key = '';
    // video.map(video => {
    //     if (video.type == 'Trailer') {
    //         vid_key = video.key;
    //     }
    // });
    const lien = 'https://www.youtube.com/embed/' + vid_key;

    return (

        <div className="container movie-detail ">
            <div className="row justify-content-between ">
                <div className="col-md-6 left-box">
                    <h1>{original_title}</h1>
                    <p>{overview}</p>
                    <p>Cast :</p>
                    <div className="casting">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="cap">
                                    <img src={IMG_URL + '/' + Director.profile_path} alt="" />
                                    <div className="pop"><p>Director : {Director.name}</p></div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                {
                                    act.slice(0, 2).map(a => {
                                        return <div className="cap">
                                            <img src={IMG_URL + '/' + a.profile_path} alt="" />
                                            <div className="pop"><p>actor : {a.name}</p></div>
                                        </div>;
                                    })
                                }
                            </div>
                            <div className="col-md-4">
                                {
                                    act.slice(2, 4).map(a => {
                                        return <div className="cap">
                                            <img src={IMG_URL + '/' + a.profile_path} alt="" />
                                            <div className="pop"><p>actor : {a.name}</p></div>
                                        </div>;
                                    })
                                }
                            </div>

                        </div>
                    </div>
                    <a href="#hello"><i className="fas fa-play"></i>Watch now</a>
                    <a href="#" className='down-btn btn1'><i className="fab fa-youtube"></i>Watch Trailer</a>
                    <div className="video-container ">
                        <span className="close">&#10006;</span>
                        <embed src={lien} type="" />
                    </div>
                </div>
                {/* #hello */}
                <div className="col-md-5 text-center ">
                    <img src={IMG_URL + poster_path} alt="" className='movie-imag' />

                </div>
            </div>
        </div>


    )
}

export default Comp1

import React, { useEffect, useState } from 'react'
import './style1.css'

function Navbar() {

    const [movies, setmovies] = useState([]);
    const [Input, setInput] = useState("");
    // const [Output, setOutput] = useState([]);
    const IMG_URL = 'https://image.tmdb.org/t/p/w1280'

    const ser = async () => {
        // fetch('https://api.themoviedb.org/3/search/movie?api_key=084c542862edfa415ce57dfbf51c9066&query="' + Input + '"')
        fetch('http://127.0.0.1:8000/api/film?title=' + Input)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setmovies(data.data);
            })
    }

    // document.querySelector('#search-input').addEventListener('focusout', () => {
    //     document.querySelector('#search-list').classList.add('hide')
    // });
    const ser2 = async (a, b) => {
        if (a != '') {
            document.querySelector('#search-list').classList.remove('hide')
            document.querySelector('#search-list').innerHTML = '';

            b.slice(0.5).map(m => {

                document.querySelector('#search-list').innerHTML += ` <a href="/Movie/${m.id}"><li>
                    <div class="img" style="background-image:url('${IMG_URL + m.poster_path}');"></div>
                    <span>
                        ${m.original_title}
                    </span>
                   </li> </a>`
            })
        }
        if (a === '') {
            document.querySelector('#search-list').classList.add('hide')
        }
    }
    console.log(Input)
    console.log(movies)

    useEffect(() => {
        document.querySelector('#search-input').addEventListener('focusout', () => {
            document.querySelector('#search-input').classList.add('hide')
        });

    }, [])
    return (
        <div>
            <section className="navigation">
                <div className="container1 d-flex flex-jc-sb flex-ac">
                    <a href='/' className="logo">
                        <i className="fas fa-film"></i> MovieMar
                    </a>

                    <div className="navigation__search">
                        <input onChange={e => { setInput(e.target.value); ser(); ser2(Input, movies); }} type="text" placeholder=" search for a movie" id="search-input" />
                        <i className="fas fa-search center-vertical "></i>

                        <ul className="navigation__list hide" id="search-list">
                            {
                                // () => {
                                //     // 
                                // }
                            }
                            <li>
                                <div className="img"></div>
                                <span>
                                    movie name
                                </span>
                            </li>

                            <li>
                                <div className="img"></div>
                                <span>
                                    movie name
                                </span>
                            </li>

                            <li>
                                <div className="img"></div>
                                <span>
                                    movie name
                                </span>
                            </li>

                            <li>
                                <div className="img"></div>
                                <span>
                                    movie name
                                </span>
                            </li>
                        </ul>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Navbar

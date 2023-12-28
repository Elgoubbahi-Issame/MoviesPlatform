import React, { useState, useEffect } from 'react'


function Adm_hom() {
    const [cast, setcast] = useState([])
    const [movies, setmovies] = useState([])
    useEffect(() => {
        const getcast = async () => {
            // const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=084c542862edfa415ce57dfbf51c9066`);
            const res = await fetch(`http://127.0.0.1:8000/api/casts`);
            const data = await res.json();

            setcast(data);
        };
        getcast();
        const getMovies = async () => {
            // const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=084c542862edfa415ce57dfbf51c9066`);
            const res = await fetch(`http://127.0.0.1:8000/api/films`);
            const data = await res.json();
            // console.log(data) 
            setmovies(data);
        };
        getMovies();

    }, [])

    let not_Dup_cast = [];
    var seen = {};
    // var seen1 = {};
    for (var i = 0; i < cast.length; i++) {
        if (!(cast[i].name in seen)) {
            not_Dup_cast.push(cast[i]);
            seen[cast[i].name] = true;
            // seen[] = true;
        }
    }
    return (
        <div className="Home text main">
            <div className="cards">
                <div className="card-single">
                    <div>
                        <h1><b>{movies.length}</b> </h1>
                        <span>Movies</span>
                    </div>
                    <div>
                        <span className="fas fa-film"></span>
                    </div>
                </div>
                <div className="card-single">
                    <div>
                        <h1><b>{not_Dup_cast.length}</b> </h1>
                        <span>Cast</span>
                    </div>
                    <div>
                        <span className="fas fa-users"></span>
                    </div>
                </div>
                <div className="card-single">
                    <div>
                        <h1><b>0</b> </h1>
                        <span>Users</span>
                    </div>
                    <div>
                        <span className="fas fa-user"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Adm_hom

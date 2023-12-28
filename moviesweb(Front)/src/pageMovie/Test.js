import React, { useState, useEffect } from 'react'

function Test() {
    const [movies1, setmovies1] = useState([]);
    useEffect(() => {
        const getMovies = async () => {
            const res = await fetch('https://api.themoviedb.org/3/movie/634649?api_key=084c542862edfa415ce57dfbf51c9066');
            const data = await res.json();
            setmovies1(data);
        };
        getMovies();
    }, [])

    console.log(movies1)
    return (
        <div>
            hello
        </div>
    )
}

export default Test

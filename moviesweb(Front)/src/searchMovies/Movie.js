import React from 'react'
import Card from './Card.js'
import Nav from '../Navbar'
import '../style1.css';
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';


function Movie() {

    const [movies, setmovies] = useState([]);
    const [hasMore, sethasMore] = useState(true);
    const [page, setpage] = useState(2);
    useEffect(() => {
        const getMovies = async () => {
            // const res = await fetch('http://api.themoviedb.org/3/discover/movie?api_key=084c542862edfa415ce57dfbf51c9066&page=1');
            const res = await fetch('http://127.0.0.1:8000/api/film?page=1');
            const data = await res.json();
            setmovies(data.data);
            // setmovies(data.results);
        };
        getMovies();
    }, [])
    // console.log(movies)
    const fetchMovies = async () => {
        // const res = await fetch('http://api.themoviedb.org/3/discover/movie?api_key=084c542862edfa415ce57dfbf51c9066&page=' + page);
        const res = await fetch('http://127.0.0.1:8000/api/film?page=' + page);
        const data = await res.json();
        // setmovies(data.results);
        return data.data;
    };
    const fetchData = async () => {
        const movieFromServer = await fetchMovies();
        setmovies([...movies, ...movieFromServer])
        if (movieFromServer.length === 0 || movieFromServer.length < 3) {

            sethasMore(false)
        }
        setpage(page + 1)
        // console.log("hello")
    };

    return (
        <div>
            <Nav />
            <InfiniteScroll
                dataLength={movies.length} //This is important field to render the next data
                next={fetchData}
                hasMore={hasMore}
                loader={<div className="loader "><div className="circle"></div> <div className="circle"></div> <div className="circle"></div></div>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }

            >
                <section className="movies" >
                    <div className="container1 d-flex" >
                        {
                            movies.map((movie) => <Card key={movie.id} result={movie} />)
                        }
                    </div>
                </section>
            </InfiniteScroll>
        </div>
    )
}

export default Movie

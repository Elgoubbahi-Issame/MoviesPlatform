import React from 'react'
import Card from './Card.js'
import { useEffect, useState } from 'react'
import Movie from './Movie'
import UseFetch from './Usefetch.js'
import InfiniteScroll from 'react-infinite-scroll-component';


function Allmovies() {
    const [page, setPage] = useState(1);
    // const [movies, setmovies] = useState([]);
    const [Loading, setLoading] = useState(true);


    const { data: movies, isPending } = UseFetch('http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=084c542862edfa415ce57dfbf51c9066&page=' + page);

    console.log(movies)

    // console.log(movies)
    // console.log(newMovies)

    return (
        <div>
            <section className="movies" >
                <div className="container d-flex" >
                    {isPending && <div className="loader "><div className="circle"></div> <div className="circle"></div> <div className="circle"></div></div>}
                    {movies && movies.results.map((movie) => <Card key={movie.id} result={movie} />)}
                    {/* <InfiniteScroll
                        dataLength={movies.results.length}
                        next={() => setPage(page + 1)}
                        hasMore={true}
                        className='container d-flex'
                    >
                        {movies.results.map((movie) => <Card key={movie.id} result={movie} />)}
                    </InfiniteScroll> */}
                </div>
            </section>

            <div className=" " >
                {/* {Loading && <div className="loader "><div className="circle"></div> <div className="circle"></div> <div className="circle"></div></div>} */}
            </div>

        </div>

    )
}
export default Allmovies

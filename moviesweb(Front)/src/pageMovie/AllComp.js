import React from 'react'
import Comp from './Comp1';
import Comp1 from './comp2';
import Comp2 from './Comp3';
import Nav from '../Navbar';
import './style2.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UseFetch from '../searchMovies/Usefetch'


function AllComp() {
    const [movie, setmovie] = useState([])
    const [movies, setmovies] = useState([])
    const [video, setvideo] = useState([])
    const [Acteur, setActeur] = useState([])
    const { id } = useParams();
    // const { data: movies1, isPending } = UseFetch(`https://api.themoviedb.org/3/movie/popular?api_key=084c542862edfa415ce57dfbf51c9066&language=en-US`)
    // alert(id) sort_by=popularity.desc&

    const IMG_URL = 'https://image.tmdb.org/t/p/w1280';
    const random = Math.floor(Math.random() * 3);
    console.log(random)
    useEffect(() => {
        const getMovie = async () => {
            // const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=084c542862edfa415ce57dfbf51c9066`);
            const res = await fetch(`http://127.0.0.1:8000/api/films/${id}`);
            const data = await res.json();
            // console.log(data) 
            setmovie(data);
        };
        getMovie();
        // const { poster_path } = movie;
        // const getVideo = async () => {
        //     const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=084c542862edfa415ce57dfbf51c9066`);

        //     const data = await res.json();

        //     setvideo(data.results);
        // };
        // getVideo();

        const getActeur = async () => {
            // const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=084c542862edfa415ce57dfbf51c9066&language=en-US`);
            const res = await fetch(`http://127.0.0.1:8000/api/cast?id_film=${id}`);

            const data = await res.json();
            setActeur(data);
        };
        getActeur();

        const getMovies = async () => {
            // const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=084c542862edfa415ce57dfbf51c9066&language=en-US&page=` + random);
            const res = await fetch(`http://127.0.0.1:8000/api/film?page=` + random);
            const data = await res.json();
            setmovies(data.data);
        };
        getMovies();

    }, [])



    // console.log(movies)
    // console.log(Acteur)
    // console.log(movie)
    const { poster_path } = movie;
    // var crew = [];
    // var actor = [];
    // crew = Acteur.crew;
    // actor = Acteur.cast;

    document.getElementById("body").style.backgroundImage = `linear-gradient(rgba(48, 78, 109, 0.686),rgba(33, 36, 58, 0.648)),url(${IMG_URL + poster_path})`;
    document.getElementById("body").style.backgroundPosition = "center";
    document.getElementById("body").style.backgroundSize = "cover";
    return (
        <div>
            <Nav />
            {Acteur && IMG_URL && movie && <Comp actor={Acteur} IMG_URL={IMG_URL} movie={movie} />}


            {movie && <Comp2 movie={movie} />}
            {movies && IMG_URL && <Comp1 movies={movies} IMG_URL={IMG_URL} />}
        </div>
    )
}

export default AllComp

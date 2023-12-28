import React from 'react'

function Card(result) {
    const IMG_URL = 'https://image.tmdb.org/t/p/w1280'
    // console.log(result)
    // alert(page)
    // const moviesArray = []
    // console.log(page)
    // console.log(page)
    const { overview, poster_path, vote_average, original_title } = result.result
    // moviesArray.push({ overview, poster_path, vote_average, original_title })
    let rate
    if (vote_average < 5) {
        rate = <span className="movie__rate red">{vote_average}</span>
    } else if (vote_average < 8) {
        rate = <span className="movie__rate yellow"> {vote_average}</span>
    } else {
        rate = <span className="movie__rate green">{vote_average}</span>
    }
    // alert(result.result.id)
    return (

        <a href={`/Movie/${result.result.id}`}  >
            <div key={result.id} className="movie">
                <img src={IMG_URL + poster_path} alt="" className="movie__img" />
                <div className="movie__info">
                    <h3 className="movie__name">{original_title}</h3>

                    {rate}
                </div>

                <div className="movie__overview">
                    <h3>Overview</h3>
                    <p>
                        {overview}
                    </p>
                </div>
            </div>
        </a>




    )
}

export default Card

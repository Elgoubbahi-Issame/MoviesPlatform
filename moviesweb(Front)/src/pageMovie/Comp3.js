import React from 'react'



function Comp3(movie) {
    console.log(movie)
    // const { vid_key } = movie;
    const { vid_key } = movie.movie;
    // video.video.map(video => {
    //     if (video.type == 'Trailer') {
    //         vid_key = video.key;
    //     }
    // });
    const lien = 'https://www.youtube.com/embed/' + vid_key;

    return (
        <div className='container watch' id='hello'>
            <div className="row video-container2 text-center">
                <h1>Happy Watching</h1>
                <div className="col-md-11 ">
                    <embed src={lien} type="" />
                </div>
                <a href=""><i className="fas fa-arrow-down"></i>Downlaod</a>

            </div>
        </div>
    )
}

export default Comp3

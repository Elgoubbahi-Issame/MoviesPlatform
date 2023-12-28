import React from 'react'
// import './style2.css'
import Img from './spider.jpg'

function comp2({ movies, IMG_URL }) {
    console.log(movies)
    // var random;
    // var random;
    return (
        <div className='container series'>
            <h3>Popular Movies</h3>
            <div className="row">
                {
                    movies.slice(0, 6).map(m => {
                        return <div className="col-md-2 ">
                            <a href={"/Movie/" + m.id}>
                                <img src={IMG_URL + m.poster_path} alt="" />
                                {/* <div className="pop1"><i class="fas fa-play-circle"></i></div> */}
                            </a>
                        </div>;



                    })
                }
                {/* <div className="col-md-2"><img src={Img} alt="" /></div>

                <div className="col-md-2"><img src={Img} alt="" /></div>
                <div className="col-md-2"><img src={Img} alt="" /></div>

                <div className="col-md-2"><img src={Img} alt="" /></div>
                <div className="col-md-2"><img src={Img} alt="" /></div> */}

            </div>
        </div>
    )
}

export default comp2

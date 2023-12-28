import axios from 'axios';
import React, { useState, useEffect } from 'react'

function Adm_mov() {

    const IMG_URL = 'https://image.tmdb.org/t/p/w1280';
    const [movies, setmovies] = useState([])
    const [movie, setmovie] = useState([])
    const [poster_path, setposter_path] = useState("")
    const [original_title, setoriginal_title] = useState("")
    const [overview, setoverview] = useState("")
    const [vid_key, setvid_key] = useState("")
    const [vote_average, setvote_average] = useState(0)
    const [msg, setmsg] = useState("")
    const [id_mov, setid_mov] = useState()

    // let id_mov;
    useEffect(() => {
        const getMovies = async () => {
            // const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=084c542862edfa415ce57dfbf51c9066`);
            const res = await fetch(`http://127.0.0.1:8000/api/films`);
            const data = await res.json();
            setmovies(data);
        };
        getMovies();

    }, [])
    // console.log(movies)
    const getMovie = async (id) => {
        // const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=084c542862edfa415ce57dfbf51c9066`);
        const res = await fetch(`http://127.0.0.1:8000/api/films/${id}`);
        const data = await res.json();
        // console.log(data)
        setoriginal_title(data.original_title);
        setposter_path(data.poster_path);
        setvid_key(data.vid_key);
        setoverview(data.overview);
        setvote_average(data.vote_average);
        // console.log(movie)
    };
    const AddMovie = async () => {
        const data = {
            poster_path,
            original_title,
            overview,
            vid_key,
            vote_average
        }
        console.log(data)
        axios.post(`http://127.0.0.1:8000/api/films/add`, data).then(res => {
            setmsg("add successfully !!")
        }).catch(err => {
            setmsg("ther's an errore !!")
        })

    };

    const UpdateMovie = async (id) => {
        const data = {
            poster_path,
            original_title,
            overview,
            vid_key,
            vote_average
        }

        axios.put(`http://127.0.0.1:8000/api/films/update/${id}`, data).then(res => {

            setmsg("Update successfully !!")
        }).catch(err => {
            setmsg("ther's an errore !!")
        })


    };
    const DeleteMovie = async (id) => {
        console.log(id)
        axios.delete(`http://127.0.0.1:8000/api/films/delete/${id}`).then(res => {
            setmsg("delete successfully !!")
        }).catch(err => {
            setmsg("ther's an errore !!")
        })


    };

    return (
        <div className="Movie text">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-6 title">
                            <h2>Manage <b>Movies</b></h2>
                        </div>
                        <div className="col-sm-6">
                            <a href="#addMovieModal" className="btn btn-success m-5" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Movie</span></a>
                            <a href="#deleteMovieModal" className="btn btn-danger" data-toggle="modal"><i className="material-icons">&#xE15C;</i> <span>Delete</span></a>
                        </div>
                    </div>
                </div>
                <div id='table' >
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>
                                    <span className="custom-checkbox">
                                        <input type="checkbox" id="selectAll" />
                                        <label for="selectAll"></label>
                                    </span>
                                </th>
                                <th>Poster</th>
                                <th>Name</th>

                                <th>Over View</th>
                                <th>Trailer_key</th>
                                <th>Rated</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                movies.map(m => {

                                    return <tr>
                                        <td>
                                            <span className="custom-checkbox">
                                                <input type="checkbox" id="checkbox1" name="options[]" value="1" />
                                                <label for="checkbox1"></label>
                                            </span>
                                        </td>
                                        <td>
                                            <img style={{ height: "40px" }, { width: "40px" }} src={IMG_URL + m.poster_path} alt="" />
                                        </td>
                                        <td>{m.original_title}</td>
                                        <td>{m.overview}</td>
                                        <td>{m.vid_key}</td>
                                        <td>{m.vote_average}</td>
                                        <td>
                                            <a href="#editMovieModal" onClick={() => { setid_mov(m.id); getMovie(m.id); }} className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                                            <a href="#deleteMovieModal" onClick={() => { setid_mov(m.id) }} className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                                        </td>
                                    </tr>;
                                })
                            }


                        </tbody>
                    </table>
                </div>
            </div>
            {/* <!-- Edit Modal HTML --> */}
            <div id="addMovieModal" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <form>
                            <div class="modal-header">
                                <h4 class="modal-title">Add Movie</h4>
                                <span style={{ color: "green" }}>{msg}</span>
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label>Name</label>
                                    <input onChange={e => { setoriginal_title(e.currentTarget.value) }} type="text" class="form-control" required />
                                </div>

                                <div class="form-group">
                                    <label>Poster_path</label>
                                    <input onChange={e => { setposter_path(e.currentTarget.value) }} type="text" class="form-control" required />
                                </div>
                                <div class="form-group">
                                    <label>Over View</label>
                                    <textarea onChange={e => { setoverview(e.currentTarget.value) }} class="form-control" required></textarea>
                                </div>
                                <div class="form-group">
                                    <label>Trailer_key</label>
                                    <input onChange={e => { setvid_key(e.currentTarget.value) }} type="text" class="form-control" required />
                                </div>
                                <div class="form-group">
                                    <label>Rate</label>
                                    <input onChange={e => { setvote_average(e.currentTarget.value); console.log(vote_average) }} type="number" class="form-control" required />
                                </div>
                            </div>
                            <div class="modal-footer">
                                <input type="button" class="btn btn-success" onClick={() => { if (vote_average > 10) { alert('Rating must be less than or equal to 10 !!') } else { AddMovie() } }} value="Add" />
                                <input onClick={() => { window.location.reload() }} type="button" class="btn btn-primary" data-dismiss="modal" value="apply" />
                                <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* <!-- Edit Modal HTML --> */}
            <div id="editMovieModal" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <form>
                            <div class="modal-header">
                                <h4 class="modal-title">Edit Movie</h4>
                                <span style={{ color: "yellow" }}>{msg}</span>
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label>Name</label>
                                    <input onChange={e => { setoriginal_title(e.currentTarget.value) }} value={original_title} type="text" class="form-control" />
                                </div>
                                <div class="form-group">
                                    <label>Poster_path</label>
                                    <input onChange={e => { setposter_path(e.currentTarget.value) }} value={poster_path} type="text" class="form-control" />
                                </div>
                                <div class="form-group">
                                    <label>Over View</label>
                                    <textarea onChange={e => { setoverview(e.currentTarget.value) }} value={overview} class="form-control" ></textarea>
                                </div>
                                <div class="form-group">
                                    <label>Trailer_key</label>
                                    <input onChange={e => { setvid_key(e.currentTarget.value) }} value={vid_key} type="text" class="form-control" />
                                </div>
                                <div class="form-group">
                                    <label>Rate</label>
                                    <input onChange={e => { setvote_average(e.currentTarget.value) }} value={vote_average} type="number" class="form-control" required />
                                </div>
                            </div>
                            <div class="modal-footer">
                                <input onClick={() => { if (vote_average > 10) { alert('Rating must be less than or equal to 10 !!') } else { UpdateMovie(id_mov) } }} type="" class="btn btn-warning" value="Save" />
                                <input onClick={() => { window.location.reload() }} type="button" class="btn btn-primary" data-dismiss="modal" value="Apply" />
                                <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* <!-- Delete Modal HTML --> */}
            <div id="deleteMovieModal" class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <form>
                            <div class="modal-header">
                                <h4 class="modal-title">Delete Movie</h4>
                                <span style={{ color: "red" }}>{msg}</span>
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div class="modal-body">
                                <p>Are you sure you want to delete these Records?</p>
                                <p class="text-warning"><small>This action cannot be undone.</small></p>
                            </div>
                            <div class="modal-footer">
                                <input onClick={() => { DeleteMovie(id_mov) }} type="" class="btn btn-danger" value="Delete" />
                                <input onClick={() => { window.location.reload() }} type="button" class="btn btn-primary" data-dismiss="modal" value="Apply" />
                                <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Adm_mov

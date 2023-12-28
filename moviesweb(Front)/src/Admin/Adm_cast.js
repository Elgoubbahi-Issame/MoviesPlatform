import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { MultiSelect } from 'react-multi-select-component'
import Select from 'react-select'

function Adm_cast() {

    const IMG_URL = 'https://image.tmdb.org/t/p/w1280/';
    const [cast, setcast] = useState([])
    const [movies, setmovies] = useState([])
    const [selected, setSelected] = useState([]);
    const [selected1, setSelected1] = useState('');
    const [msg, setmsg] = useState('');
    const [name, setname] = useState('');
    const [profile_path, setprofile_path] = useState('');
    const [job, setjob] = useState('actor');
    var [id_film, setid_film] = useState(0);
    const [id_films, setid_films] = useState([]);
    const [id_mov, setid_mov] = useState()
    var [movies_name1, setmovies_name1] = useState([])

    let not_Dup_cast = [];
    let movies_name = [];
    let movies_name12 = [];
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
            setmovies(data);
        };
        getMovies();

    }, [])
    // console.log(cast)

    movies.map(m => {
        movies_name.push({ label: m.original_title, value: m.original_title })

    })

    var seen = {};
    var seen1 = {};
    for (var i = 0; i < cast.length; i++) {
        if (!(cast[i].name + '+' + cast[i].job in seen)) {
            not_Dup_cast.push(cast[i]);
            seen[cast[i].name + '+' + cast[i].job] = true;
            // seen[] = true;
        }
    }

    not_Dup_cast.map(n => {
        n.name_film = [];

        cast.map(c => {
            if (n.name.toLowerCase() == c.name.toLowerCase() && c.job.toLowerCase() == n.job.toLowerCase()) {
                // console.log(n.name.toLowerCase() + "==" + c.name.toLowerCase() + "==" + c.job.toLowerCase() + "==" + n.job.toLowerCase())
                movies.map(m => {
                    if (c.id_film == m.id) {
                        n.name_film.push({ name: m.original_title, id: m.id })
                    }

                })

            }

        })
    })
    // console.log(not_Dup_cast)
    // ----------------------------------------------------------
    const AddCast = async () => {

        selected.map(mm => {
            movies.map(m => {
                if (m.original_title.toLowerCase() == mm.label.toLowerCase()) {
                    id_films.push(m.id)
                }
            })
        })

        for (let index = 0; index < id_films.length; index++) {
            // setid_film(id_films[index])
            id_film = id_films[index];

            const data = {
                profile_path,
                name,
                job,
                id_film
            }
            // console.log(data)

            axios.post(`http://127.0.0.1:8000/api/cast/add`, data).then(res => {
                setmsg("Add successfully !!")
            }).catch(err => {
                setmsg("Ther's an errore !!")
            })
        }

    };
    const getCast = async (id) => {
        // alert(id)
        // const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=084c542862edfa415ce57dfbf51c9066`);
        const res = await fetch(`http://127.0.0.1:8000/api/cast/${id}`);
        const data = await res.json();
        // const res1 = await fetch(`http://127.0.0.1:8000/api/cast/`);
        // const data1 = await res1.json();
        // console.log(data)
        setname(data.name);
        setprofile_path(data.profile_path);
        setjob(data.job);
        setid_films([])
        cast.map(d => {
            if (data.name.toLowerCase() == d.name.toLowerCase()) {
                id_films.push(d.id_film)
            }
        })
        // console.log(id_films)

        // alert('----------' + d.name + '--------' + data.name)
        var a = [], diff = [];

        for (var i = 0; i < id_films.length; i++) {
            a[id_films[i]] = true;
        }

        for (var i = 0; i < movies.length; i++) {
            if (a[movies[i].id]) {
                delete a[movies[i].id];
            } else {
                a[movies[i].id] = true;
            }
        }
        // console.log(a)
        for (var k in a) {
            diff.push(k);
        }

        // setmovies_name1([])
        movies_name12 = []
        movies.map(m => {
            diff.map(id => {
                if (m.id == id) {
                    movies_name12.push({ label: m.original_title, value: m.original_title })
                }
            })
        })
        // setoverview(data.overview);
        // movies_name12 = movies_name1;
        // console.log(movies_name12)
        return movies_name12
    };

    const UpdateCast = async (id) => {
        let id_cast;
        const res = await fetch(`http://127.0.0.1:8000/api/cast/${id}`);
        const data1 = await res.json();
        // console.log(data)
        // setid_films([])
        let name_cast = data1.name;
        // console.log(id_film)
        // selected.map(mm => {
        // })
        if (!id_film) {
            alert('You need first to choose one of his movies')
        } else {

            cast.map(m => {
                if (m.id_film == id_film && m.name.toLowerCase() == name_cast.toLowerCase()) {
                    // console.log('(', m.id_film, '---------', id_film, ')==(', m.name, '-----', name_cast)
                    id_cast = m.id;
                }
            })

            movies.map(m => {
                if (m.original_title == selected1.value) {
                    id_film = m.id;
                }
            })

            const data = {
                profile_path,
                name,
                job,
                id_film
            }
            console.log(data, '-------', id_cast)

            axios.put(`http://127.0.0.1:8000/api/cast/update/${id_cast}`, data).then(res => {

                setmsg("Update successfully !!")
            }).catch(err => {
                setmsg("ther's an errore !!")
            })
        }

    };
    // const [data, setdata] = useState([])

    const DeleteCast = async (id) => {
        let id_cast;
        console.log(id)
        // const data = [];
        const res = await fetch(`http://127.0.0.1:8000/api/cast/${id}`);
        const data = await res.json();
        // console.log(data)
        // setid_films([])
        let name_cast = data.name;
        // cast.map(d => {
        //     if (data.name == d.name) {
        //         // id_films.push(d.id_film)
        //         name_cast = 
        //     }
        // })
        if (!id_film) {
            alert('You need first to choose one of his movies')
        }
        else {
            cast.map(m => {
                if (m.id_film == id_film && m.name.toLowerCase() == name_cast.toLowerCase()) {
                    id_cast = m.id;
                }
            })

            // console.log(id_cast, '--------')

            axios.delete(`http://127.0.0.1:8000/api/cast/delete/${id_cast}`).then(res => {
                setmsg("Delete successfully !!")
            }).catch(err => {
                setmsg("ther's an errore !!")
            })

        }


    };

    return (
        <div className="Cast text " >
            <div className="table-wrapper ">
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-6 title">
                            <h2>Manage <b>Cast</b></h2>
                        </div>
                        <div className="col-sm-6">
                            <a href="#addCastModal" className="btn btn-success m-5" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Movie</span></a>
                            <a href="#deleteCastModal" className="btn btn-danger" data-toggle="modal"><i className="material-icons">&#xE15C;</i> <span>Delete</span></a>
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

                                <th>Job</th>
                                <th>All project</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                not_Dup_cast.map(m => {

                                    return <tr>
                                        <td>
                                            <span className="custom-checkbox">
                                                <input type="checkbox" id="checkbox1" name="options[]" value="1" />
                                                <label for="checkbox1"></label>
                                            </span>
                                        </td>
                                        <td>

                                            <img style={{ height: "40px" }, { width: "40px" }} src={IMG_URL + m.profile_path} alt="" />
                                        </td>
                                        <td>{m.name}</td>
                                        <td>{m.job}</td>
                                        <td>

                                            <select onClick={e => { setid_film(e.target.value); }}>
                                                {m.name_film.map(n => {
                                                    return <option value={n.id}>{n.name}</option>;
                                                })
                                                }

                                            </select>

                                        </td>
                                        <td>
                                            <a onClick={() => { setid_mov(m.id); getCast(m.id).then(res => { setmovies_name1(res); }); }} href="#editCastModal" className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                                            <a onClick={() => { setid_mov(m.id); }} href="#deleteCastModal" className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                                        </td>
                                    </tr>;
                                })
                            }


                        </tbody>
                    </table>
                </div>

            </div>
            {/* <!-- A Modal HTML --> */}
            <div id="addCastModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form>
                            <div className="modal-header">
                                <h4 className="modal-title">Add Cast</h4>
                                <span style={{ color: "green" }}>{msg}</span>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input onChange={(e) => { setname(e.currentTarget.value) }} type="text" className="form-control" required />
                                </div>

                                <div className="form-group">
                                    <label>Profil_path</label>
                                    <input onChange={(e) => { setprofile_path(e.currentTarget.value) }} type="text" className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label>Job</label>
                                    <select className='form-control' onClick={e => { setjob(e.target.value); }}>
                                        <option value={'actor'}>Actor</option>
                                        <option value={'Director'}>Director</option>

                                    </select>

                                    <br />
                                    {/* <input onChange={(e) => { setjob(e.currentTarget.value) }} type="text" className="form-control" required /> */}
                                </div>
                                <div className="form-group">
                                    <label>Movies</label>
                                    <MultiSelect
                                        options={movies_name}
                                        value={selected}
                                        onChange={setSelected}
                                        labelledBy="Select"
                                    />
                                    {/* <input type="text" className="form-control" required /> */}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <input type="button" class="btn btn-success" onClick={() => { AddCast() }} value="Add" />
                                <input onClick={() => { window.location.reload() }} type="button" class="btn btn-primary" data-dismiss="modal" value="apply" />
                                <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* <!-- Edit Modal HTML --> */}
            <div id="editCastModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form>
                            <div className="modal-header">
                                <h4 className="modal-title">Edit Cast</h4>
                                <span style={{ color: "yellow" }}>{msg}</span>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input onChange={e => { setname(e.currentTarget.value) }} value={name} type="text" className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label>Profile_path</label>
                                    <input onChange={e => { setprofile_path(e.currentTarget.value) }} value={profile_path} type="text" className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label>Job</label>
                                    <select className='form-control' onClick={e => { setjob(e.target.value); }}>
                                        <option value={'actor'}>Actor</option>
                                        <option value={'Director'}>Director</option>

                                    </select>

                                    <br />
                                    {/* <input onChange={e => { setjob(e.currentTarget.value) }} value={job} type="text" className="form-control" required /> */}
                                </div>
                                <div className="form-group">
                                    <label>Movies</label>
                                    {/* {
                                        console.log(movies_name1) // "Some User token"
                                    } */}
                                    {/* <MultiSelect
                                        options={movies_name1}
                                        value={selected}
                                        onChange={setSelected}
                                        labelledBy="Select"
                                    /> */}
                                    <Select options={movies_name1}
                                        onChange={setSelected1}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <input onClick={() => { UpdateCast(id_mov) }} type="" class="btn btn-warning" value="Save" />
                                <input onClick={() => { window.location.reload() }} type="button" class="btn btn-primary" data-dismiss="modal" value="Apply" />
                                <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* <!-- Delete Modal HTML --> */}
            <div id="deleteCastModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form>
                            <div className="modal-header">
                                <h4 className="modal-title">Delete Employee</h4>
                                <span style={{ color: "red" }}>{msg}</span>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete these Records?</p>
                                <p className="text-warning"><small>This action cannot be undone.</small></p>
                            </div>
                            <div className="modal-footer">
                                <input onClick={() => { DeleteCast(id_mov) }} type="" class="btn btn-danger" value="Delete" />
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

export default Adm_cast

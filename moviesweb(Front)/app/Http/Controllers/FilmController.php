<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Film;

class FilmController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $film = Film::all();
        return $film;
    }
    public function indexparem(Request $request)
    {
        $query = Film::query();

        if ($title = $request->input('title')) {

            $result = $query->whereRaw("original_title LIKE '%" . $title . "%'")->get();
        }
        $per_page = 3;
        $page = $request->input('page', 1);
        $result = $query->offset(($page - 1) * $per_page)->Limit($per_page)->get();
        return [
            "data" => $result
        ];
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $film = new Film();
        $film->original_title = $request->original_title;
        $film->overview = $request->overview;
        $film->poster_path = $request->poster_path;
        $film->vid_key = $request->vid_key;
        if ($request->vote_average <= 10) {
            $film->vote_average = $request->vote_average;
        }
        $film->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $film = Film::find($id);
        return $film;
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $film = Film::find($id);
        $film->original_title = $request->original_title;
        $film->overview = $request->overview;
        $film->poster_path = $request->poster_path;
        $film->vid_key = $request->vid_key;
        if ($request->vote_average <= 10) {
            # code...
            $film->vote_average = $request->vote_average;
        }
        $film->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $film = Film::find($id);
        $film->delete();
    }
}

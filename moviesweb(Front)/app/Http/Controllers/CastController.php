<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cast;

class CastController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Cast = Cast::all();
        return $Cast;
    }
    public function indexparem(Request $request)
    {
        $query = Cast::query();
        $id_film = $request->input('id_film');

        $res = $query->where('id_film', $id_film)->get();

        return $res;
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
        $Cast = new Cast();
        $Cast->name = $request->name;
        $Cast->job = $request->job;
        $Cast->profile_path = $request->profile_path;
        $Cast->id_film = $request->id_film;
        $Cast->save();
        // $Cast-> = $request->;
        $Cast->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $Cast = Cast::find($id);
        return $Cast;
    }

    // public function showActorOfFilms($id)
    // {
    //     $Cast = array() ;
    //     $Cast = Cast::find($id);
    //     return $Cast;
    // }

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
        $Casts = Cast::all();
        $Cast = Cast::find($id);
        foreach ($Casts as $key => $value) {
            if (strcasecmp($Cast->name, $value->name) == 0) {
                # code...

                $value->name = $request->name;
                $value->profile_path = $request->profile_path;

                $value->save();
            }
        }
        $Cast->job = $request->job;
        if ($request->id_film) {
            $Cast->id_film = $request->id_film;
        }
        $Cast->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Cast = Cast::find($id);
        $Cast->delete();
    }
}

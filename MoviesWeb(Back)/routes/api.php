<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [App\Http\Controllers\ApiController::class, 'login']);
Route::get('/users/{id}', [App\Http\Controllers\UsersController::class, 'show']);


Route::get('/films', [App\Http\Controllers\FilmController::class, 'index']);
Route::get('/film', [App\Http\Controllers\FilmController::class, 'indexparem']);

Route::get('/films/{id}', [App\Http\Controllers\FilmController::class, 'show']);
Route::post('/films/add', [App\Http\Controllers\FilmController::class, 'store']);
Route::delete('/films/delete/{id}', [App\Http\Controllers\FilmController::class, 'destroy']);
Route::put('/films/update/{id}', [App\Http\Controllers\FilmController::class, 'update']);

Route::get('/casts', [App\Http\Controllers\CastController::class, 'index']);
Route::get('/cast', [App\Http\Controllers\CastController::class, 'indexparem']);
Route::get('/cast/{id}', [App\Http\Controllers\CastController::class, 'show']);
Route::post('/cast/add', [App\Http\Controllers\CastController::class, 'store']);
Route::delete('/cast/delete/{id}', [App\Http\Controllers\CastController::class, 'destroy']);
Route::put('/cast/update/{id}', [App\Http\Controllers\CastController::class, 'update']);
Route::group(['middleware' => 'auth.jwt'], function () {
    // Route::get('/Users{token}', [App\Http\Controllers\UsersController::class, 'auth']);
});
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::post('/login', 'ApiController@login');
// Route::post('/Login', [App\Http\Controllers\UsersController::class, 'Login']);

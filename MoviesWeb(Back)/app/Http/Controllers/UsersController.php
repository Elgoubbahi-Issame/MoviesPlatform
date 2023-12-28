<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;
use Validator;

class UsersController extends Controller
{
    //
    // public function auth($token)
    // {

    //     $token->authenticate();
    // }
    public function show($id)
    {
        $admin = User::find($id);
        return $admin;
    }
    public $successStatus = 200;

    public function Login(Request $request)

    {

        // $user = User::select('*')->where('email', 'Issame@gmail.com')->first();

        // echo ($user == Null) . "---" . (Hash::check($request->password, $user->password) == Null);
        // echo Hash::make($request->password);
        // if ($user && Hash::check($request->password, $user->password)) {

        //     return $user;
        // }
        // return ['error' => 'Unauthorised'];
        // if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
        //     /** @var \App\Models\MyUserModel $user **/
        //     $user = Auth::user();
        //     $success['token'] =  ($user->createToken('MyApp')->accessToken);

        //     return response()->json(['success' => $success], $this->successStatus);
        // } else {
        //     return response()->json(['error' => 'Unauthorised'], 401);
        // }
    }
}

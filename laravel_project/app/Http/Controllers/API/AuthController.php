<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator=Validator::make($request->all(),[
            'name'=>'required|string|max:50|min:3',
            'email'=>'required|string|max:50|email|unique:users',
            'password'=>'required|string|min:8|confirmed'
            
        ]);

        if($validator->fails())
        {
            return response()->json([$validator->errors(),'success'=>false]);
        }

        $user=User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>bcrypt($request->password)
        ]);

        $token=$user->createToken('auth token')->plainTextToken;
        return response()->json(['data'=>$user,'access_token'=>$token,'token_type'=>'Bearer','success'=>true]);

    }

    public function login(Request $request)
    {
        $validator=Validator::make($request->all(),[
            'email'=>'required|string|max:50|email|',
            'password'=>'required|string|min:8'

        ]);

        if($validator->fails())
        {
            return response()->json([$validator->errors(),'success'=>false]);
        }

        if(!Auth::attempt($request->only('email','password')))
        {
            return response()->json(['Unauthorized',401,'success'=>false]);
        }

        $user=User::where('email',$request['email'])->first();

        $token=$user->createToken('auth token')->plainTextToken;

        return response()->json(['message'=>'Dobrodosli, '.$user->name,'access_token'=>$token,
        'token_type'=>'Bearer', 'success'=>true,'user_type'=>$user->user_type]);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json(['message'=>"Uspesno ste se izlogovali",'success'=>true]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Traits\CanLoadRelationships;

class UserController extends Controller
{
    use CanLoadRelationships;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserResource::collection(User::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:50|min:3',
            'email' => 'required|string|max:50|email|unique:users',
            'password' => 'required|string|min:8'
        ]);
    
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']), 
        ]);
    
        return $this->loadRelationships($user);
    }

    /**
     * Display the specified resource.
     */
    public function show($user_id)
    {
        $user=User::find($user_id);
        if(is_null($user))
        {
            return response()->json('Data not found','404');
        }
        return response()->json($user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($user_id)
    {
        $user=User::find($user_id);
        if(is_null($user))
        {
            return response()->json('Data not found','404');
        }
        $user->delete();
        return response(status:204);
    }
}

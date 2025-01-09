<?php

use App\Http\Controllers\API\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    
    Route::post('/events/{event}/reservations', [ReservationController::class, 'store']);
    Route::delete('/reservations/{user_id}/{event_id}', [ReservationController::class, 'destroy']);
    Route::get('/reservations', [ReservationController::class, 'index']);
    Route::get('/export',[ReservationController::class,'exportUserReservations']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware(['auth:sanctum',  \App\Http\Middleware\AdminMiddleware::class])->group(function () {
    Route::resource('users', UserController::class);

    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::post('/users', [UserController::class, 'store']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

});


Route::resource('events',EventController::class);
Route::get('/events/{id}',[EventController::class,'show']);
Route::get('/filter',[EventController::class,'filterAndPaginate']);



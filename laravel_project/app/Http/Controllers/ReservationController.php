<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Barryvdh\DomPDF\PDF;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
//use Illuminate\Container\Attributes\Auth;
use Illuminate\Support\Facades\Gate;
use App\Http\Traits\CanLoadRelationships;

class ReservationController extends Controller
{
    use CanLoadRelationships;
    /**
     * Display a listing of the resource.
     **/

    public function index(Request $request)
    {
        if($request->user()->user_type!=='admin')
        {
            $reservations = Reservation::with('event')
            ->where('id_user', Auth::id())
            ->get();
        }
        else
        {
            $reservations=Reservation::with('event')->get();
        }


        return response()->json($reservations);

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
    public function store(Request $request,Event $event)
    {   
        $userId = $request->user()->id;

        // Proveri da li je korisnik već rezervisao ovaj događaj
        $existingReservation = Reservation::where('id_user', $userId)
                                          ->where('id_event', $event->id)
                                          ->first();
    
        if ($existingReservation) {
            return response()->json([
                'message' => 'Već ste rezervisali ovaj događaj.'
            ], 400); 
        }

        $reservation = $this->loadRelationships(
            $event->reservations()->create([
                'id_user' => $request->user()->id
            ])
        );

        return response()->json($reservation, 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(Reservation $reservation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reservation $reservation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reservation $reservation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($user_id,$event_id,Request $request)
    {
        $reservation = Reservation::where('id_user', $user_id)
        ->where('id_event', $event_id)
        ->first();

        if (!$reservation) 
        {
            return response()->json(['message' => 'Reservation not found.'], 404);
        }


        if ($reservation->id_user !== $request->user()->id && $request->user()->user_type!=='admin') 
        {
            return response()->json(['message' => 'You are not authorized to delete this reservation.'], 403);
        }
    
        Reservation::where('id_user', $user_id)
        ->where('id_event', $event_id)
        ->delete();
        return response()->json(['message' => 'Reservation deleted successfully.']);

    }

    public function exportUserReservations(){
        $user = auth()->user();
        $reservations = $user->reservations;
        
        $pdf = app(PDF::class); 
        $pdfContent = $pdf->loadView('reservations', compact('user','reservations'));

        return $pdfContent->download('events.pdf');
    }
}

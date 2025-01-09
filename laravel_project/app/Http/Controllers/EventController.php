<?php

namespace App\Http\Controllers;

use App\Models\Event;
//use Barryvdh\DomPDF\PDF;
use Barryvdh\DomPDF\PDF;
use Barryvdh\DomPDF\Facade;
use Illuminate\Http\Request;
use App\Http\Resources\EventResource;
use Illuminate\Support\Facades\Cache;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events=Cache::remember('all_events',60,function(){
            return Event::all();
        });

        return EventResource::collection($events);
    }

    public function filterAndPaginate(Request $request){
        $query = Event::query();
        if ($request->has('title')) {
            $query->where('title', 'LIKE', '%' . $request->title . '%');
        }
        if ($request->has('location')) {
            $query->where('location', 'LIKE', '%' . $request->location . '%');
        }
 
        $data = $query->paginate(10);
        return response()->json($data);
    }

    public function webIndex()
    {
        $events = Event::all();
        return view('home', ['events' => $events]);
    }
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($event_id)
    {
        $event=Event::find($event_id);
        if(is_null($event))
        {
            return response()->json('Data not found','404');
        }
        return response()->json($event);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        //
    }

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Event extends Model
{
    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'id_event');
    }

    protected static function booted()
    {
        static::saved(function () {
            Cache::forget('all_events');
        });

        static::deleted(function () {
            Cache::forget('all_events');
        });
    }

}

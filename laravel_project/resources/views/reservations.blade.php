<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>UserReservations</title>
  <style>
    body{
      font-family: 'DejaVu Sans', sans-serif;
    }
    </style>
</head>
<body>
  <h1>Reservations for {{ $user->name }}</h1>

          @foreach($reservations as $reservation)
          <div style="border:1px solid black; margin:1rem; padding:1rem;">           
            <h3>{{ $reservation->event->title }}</h3>
            <p>Datum: {{ $reservation->event->date }}</p>
            <p>Lokacija: {{ $reservation->event->location }}</p>
          </div> 
          @endforeach


</body>
</html>
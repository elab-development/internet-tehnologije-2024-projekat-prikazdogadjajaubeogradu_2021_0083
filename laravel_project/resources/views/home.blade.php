<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>BelEvents</title>
  <style>
    body{
      font-family: 'DejaVu Sans', sans-serif;
    }
    </style>
</head>
<body>
  

  <h1>BelEvents</h1>

  @foreach($events as $event)
  <div style="border:1px solid black; margin:1rem; padding:1rem;">           
    <h3>{{ $event->title }}</h3>
    <p>Datum: {{ $event->date }}</p>
    <p>Lokacija: {{ $event->location }}</p>
  </div>            
  @endforeach

</body>
</html>
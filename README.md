Julia Moczyńska

Aplikacja bazy filmów, dzięki której użytkownicy mogą znaleść wybrany film wyszukując go po nazwie, ale także czasie trwania, języku, gatunku itd. Do każdego filmu można się odnieść pozostawiając po sobie ocene oraz recenzje. Dodatkowo użytkownicy posiadający role administratora mogą dodawać filmy, a co za tym idzie - jego informacje, plakaty oraz obsadę. Poza tym mają także zezwolenie na usuwanie poszczególnych użytkowników (tych bez roli administratora).

Konto administratora do zalogowania: email: julia@email.test, hasło: haslo123
Konto zwyklego uzytkownika: dorota@email.test, hasło: haslo123
Po zalogowaniu aplikacja sama nie przekierowuje na strone głowna, nalezy wejsc w inna zakladke nastepnie ponwnie w zakladke konta aby zobaczyc rozne ustawienia uzytkownika. 

Uruchomienie:
w server/services --> docker compose up -d
w server --> npm install, npm start
w client --> npm install, npm start
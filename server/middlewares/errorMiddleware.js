// error handling middleware

export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    })
}


// process.env.NODE_ENV sprawdza zmienną środowiskową NODE_ENV. W przypadku środowiska produkcyjnego ("production"), warunek 
// Jeśli warunek jest prawdziwy (czyli aplikacja jest uruchomiona w środowisku produkcyjnym), to przypisuje null do stack. Jest to zazwyczaj praktyka w produkcji, aby nie wyjawiać pełnych stosów wywołań (trace) błędów klientom ze względów bezpieczeństwa i prywatności.
// Jeśli warunek jest fałszywy (czyli aplikacja nie jest w środowisku produkcyjnym), to przypisuje err.stack do stack. W trybie deweloperskim, pełny stos wywołań błędu może być przydatny do debugowania i analizy problemów.
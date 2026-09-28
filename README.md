# Projekt-AdventureXP

Fullstack projekt med Java Spring Boot (Java 21) backend og React (JavaScript, Vite) frontend.

## Struktur

- `backend/` — Spring Boot 4 app (Maven, Java 21). Eksempel-endpoint: `GET /api/hello`.
- `frontend/` — React app lavet med Vite. Henter besked fra backend og viser den.

## Kør backend

```bash
cd backend
./mvnw spring-boot:run
```

Kører på http://localhost:8080

## Kør frontend

```bash
cd frontend
npm install
npm run dev
```

Kører på http://localhost:5173 og kalder backend på port 8080 (CORS er konfigureret i `WebConfig.java`).

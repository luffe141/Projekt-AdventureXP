import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("Henter besked fra backend...");

  useEffect(() => {
    fetch("http://localhost:8080/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() =>
        setMessage(
          "Kunne ikke kontakte backend. Kør Spring Boot serveren på port 8080.",
        ),
      );
  }, []);

  return (
    <section id="center">
      <div>
        <h1>AdventureXP</h1>
        <p>{message}</p>
      </div>
    </section>
  );
}

export default App;

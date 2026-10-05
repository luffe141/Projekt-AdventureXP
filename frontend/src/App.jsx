import "./App.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Hero from "./components/home/hero/Hero";
import Activities from "./components/home/activities/Activities";
import Firmabooking from "./components/home/firmabooking/Firmabooking";
import BookingBanner from "./components/home/booking-banner/BookingBanner";
import Admin from "./components/admin/Admin";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <main>
            <Header />
            <Hero />
            <Activities />
            <Firmabooking />
            <BookingBanner />
            <Footer />
          </main>
        }
      />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;

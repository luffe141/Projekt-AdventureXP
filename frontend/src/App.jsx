import "./App.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Hero from "./components/home/hero/Hero";
import Activities from "./components/home/activities/Activities";
import Firmabooking from "./components/home/firmabooking/Firmabooking";
import BookingBanner from "./components/home/booking-banner/BookingBanner";

function App() {
  return (
    <main>
      <Header />
      <Hero />
      <Activities />
      <Firmabooking />
      <BookingBanner />
      <Footer />
    </main>
  );
}

export default App;

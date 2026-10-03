import logo from "../../assets/logo.png";

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="AdventureXP – forsiden">
        <img className="brand__logo" src={logo} alt="AdventureXP" />
      </a>
      <nav className="site-nav" aria-label="Hovednavigation">
        <a href="#aktiviteter">Aktiviteter</a>
        <a href="#firmabooking">Firmaevents</a>
        <a href="#booking">Praktisk info</a>
        <a href="#booking">Medarbejder</a>
      </nav>
      <a className="header-book" href="#booking">
        Book oplevelse <span>→</span>
      </a>
    </header>
  );
}

export default Header;

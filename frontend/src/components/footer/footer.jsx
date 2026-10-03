function Footer() {
  return (
    <footer className="site-footer">
      <a
        className="brand"
        href="#top"
        aria-label="AdventureXP – tilbage til toppen"
      ></a>
      <p>Gode oplevelser. Bedre historier.</p>
      <small>© {new Date().getFullYear()} AdventureXP</small>
    </footer>
  );
}

export default Footer;

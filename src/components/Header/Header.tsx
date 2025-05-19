import Image from "next/image";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <p className="logo">Guac-a-mole</p>
      <Image
        src="/gouacBowl.svg"
        alt="guaca-bowl"
        className="logo-img"
        width={200}
        height={50}
        style={{ objectFit: "contain" }}
      />
    </header>
  );
}

export default Header;

import { Link } from "react-router-dom";
import "./../css/components/Header.css";

export default function Header() {
  return (
    <div className="title__section">
      <div className="titleWrapper">
        <Link to="/">
          <h1 className="title">CryptoCheck.</h1>
        </Link>
      </div>
    </div>
  );
}

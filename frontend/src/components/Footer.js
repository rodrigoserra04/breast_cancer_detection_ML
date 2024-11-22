import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-auto text-center">
      <ul>
        <li className="py-2 px-4 rounded hover:bg-blue-500 transition">
          <Link to="https://github.com/rodrigoserra04" className="text-sm">© 2024 Rodrigo Serra</Link>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;

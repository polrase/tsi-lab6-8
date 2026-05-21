import { Link } from "react-router-dom";

const linkClassName =
  "rounded-xl bg-violet-500 px-4 py-2 transition-colors hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700";

function Navbar() {
  return (
    <header className="bg-sky-500 text-white">
      <nav className="rounded-lg px-6 py-8 shadow-xl ring ring-gray-900/5 dark:bg-gray-800">
        <ul className="flex flex-wrap justify-center gap-4">
          <li>
            <Link to="/" className={linkClassName}>
              Главная
            </Link>
          </li>
          <li>
            <Link to="/shop" className={linkClassName}>
              Товары
            </Link>
          </li>
          <li>
            <Link to="/about" className={linkClassName}>
              О нас
            </Link>
          </li>
          <li>
            <Link to="/contact" className={linkClassName}>
              Контакты
            </Link>
          </li>
          <li>
            <Link to="/register" className={linkClassName}>
              Регистрация
            </Link>
          </li>
          <li>
            <Link to="/login" className={linkClassName}>
              Вход
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;

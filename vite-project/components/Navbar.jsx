import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <header className="bg-sky-500 text-white">
            <nav className="dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
                <ul className="flex space-x-6 justify-center">
                    <li><Link to="/" className="bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700">Главная</Link></li>
                    <li><Link to="/about" className="bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700">О нас</Link></li>
                    <li><Link to="/contact" className="bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700">Связаться с нами</Link></li>
                    <li><Link to="/register" className="bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700">Регистрация</Link></li>
                    <li><Link to="/login" className="bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700">Авторизация</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;

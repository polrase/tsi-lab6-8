import { Link } from "react-router-dom";
import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-cpl justify-center item-center py-10">
          <div className="contai mx-auto text-center px-4">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">Добро пожаловать в онлайн-магазин Scrudge!</h1>
            <p className="mb-6 text-lg font-normal text-body lg:text-xl sm:px-16 xl:px-48">Здесь вы найдёте широкий ассортимент всякой пали.</p>
          </div>
        </div>
    )
  }
}

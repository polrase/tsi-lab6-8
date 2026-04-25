import React, { Component } from 'react'

export default class Register extends Component {
  render() {
    return (
        <div>
            <h1>Регистрация</h1>
            <form>
                <label htmlFor='username'>Имя пользователя: </label>
                <input type='text' id='username' name="username" required />
                <label htmlFor="email">Электронная почта: </label>
                <input type='email' id='email' name='email' required />
                <button type='submit'>Зарегистрироваться</button>
            </form>
        </div>
    )
  }
}

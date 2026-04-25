import React, { Component } from 'react'

export default class Login extends Component {
  render() {
    return (
        <div>
            <h1>Авторизация</h1>
            <form>
                <label htmlFor='username'>Имя пользователя: </label>
                <input type='text' id='username' name="username" required />
                <label htmlFor="password">Пароль: </label>
                <input type='password' id='password' name='password' required />
                <button type='submit'>Войти</button>
            </form>
        </div>
    )
  }
}

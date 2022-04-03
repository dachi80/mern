import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      message(data.message)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  const keyPressHendler = (e) => {
    //it triggers by pressing the enter key
    if (e.which === 13 || e.keyCode === 13) {
      loginHandler()
    }
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3 center">
        <h3>სისტემაში შესვლა</h3>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">ავტორიზაცია</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="ჩაწერეთ ელ. ფოსტა"
                  id="email"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">ელ. ფოსტა</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="ჩაწერეთ პაროლი"
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                  onKeyPress={keyPressHendler}
                />
                <label htmlFor="password">პაროლი</label>
              </div>
            </div>
          </div>
          <div className="card-action center">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              disabled={loading}
              onClick={loginHandler}
            >
              შესვლა
            </button>
            <button
              className="btn grey lighten-1 black-text"
              disabled={loading}
              onClick={registerHandler}
            >
              რეგისტრაცია
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

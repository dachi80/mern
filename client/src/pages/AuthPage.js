import React, {useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from "../hooks/message.hook";

export const AuthPage = () => {
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm ({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            message(data.message)
        } catch (e) {}
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
                                    id="email"
                                    type="text"
                                    name="email"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">ელ. ფოსტა</label>
                            </div>
                            <div className="input-field">
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">პაროლი</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action center">
                        <button
                            className="btn yellow darken-4"
                            style={{marginRight: 10}}
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
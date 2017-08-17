import React, {Component} from 'react';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {msg: ''};
    }

    login(event) {
        event.preventDefault();

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({login: this.usuario.value, senha: this.senha.value}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };
        fetch('http://localhost:8080/api/public/login', requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error('Erro ao efetuar login.');
            })
            .then(token => {
                localStorage.setItem('token', token);
                this.props.history.push('/timeline');
            })
            .catch(error => this.setState({msg: error.message}));
    }

    render() {
        return (
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span>{this.state.msg}</span>
                <form onSubmit={this.login.bind(this)}>
                    <input type="text" ref={input => this.usuario = input}/>
                    <input type="password" ref={input => this.senha = input}/>
                    <input type="submit" value="Login"/>
                </form>
            </div>
        );
    }
}
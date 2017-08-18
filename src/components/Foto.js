import React, {Component} from "react";
import {Link} from "react-router-dom";
import PubSub from "pubsub-js";

class FotoComentario extends Component {
    constructor(props) {
        super(props);
        this.state = {likeada: props.foto.likeada};
    }

    like() {
        fetch(`http://localhost:8080/api/fotos/${this.props.foto.id}/like?X-AUTH-TOKEN=${localStorage.getItem('token')}`, {method: 'POST'})
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Erro ao dar like na foto.');
            })
            .then(liker => {
                this.setState({likeada: !this.state.likeada});
                PubSub.publish('foto-like', {fotoId: this.props.foto.id, liker});
            });
    }

    render() {
        return (
            <section className="fotoAtualizacoes">
                <a onClick={this.like.bind(this)} className={this.state.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Likar</a>
                <form className="fotoAtualizacoes-form">
                    <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo"/>
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
                </form>

            </section>
        );
    }
}

class FotoInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {likers: this.props.foto.likers};

        PubSub.subscribe('foto-like', (topic, info) => {
            if (info.fotoId === this.props.foto.id) {
                const encontrado = this.state.likers.find(liker => liker.login === info.liker.login);
                if (encontrado) {
                    this.setState({likers: this.state.likers.filter(liker => liker.login !== info.liker.login)});
                } else {
                    this.setState({likers: this.state.likers.concat(info.liker)});
                }
            }
        })
    }

    render() {
        return (
            <div className="foto-in fo">
                <div className="foto-info-likes">
                    {
                        this.state.likers.map(liker => {
                            return (<Link to={`/timeline/${liker.login}`} key={liker.login} href="#">{liker.login},</Link>);
                        })
                    }

                    curtiram

                </div>

                <p className="foto-info-legenda">
                    <a className="foto-info-autor">{this.props.foto.loginUsuario} </a>
                    {this.props.foto.comentario}
                </p>

                <ul className="foto-info-comentarios">
                    {
                        this.props.foto.comentarios.map(comentario => {
                            return(
                                <li className="comentario" key={comentario.id}>
                                    <Link to={`/timeline/${comentario.login}`} className="foto-info-autor">{comentario.login} </Link>
                                    {comentario.texto}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

class FotoHeader extends Component {
    render() {
        return (
            <header className="foto-header">
                <figure className="foto-usuario">
                    <img
                        src={this.props.foto.urlPerfil}
                        alt="foto do usuario"/>
                    <figcaption className="foto-usuario">
                        <Link to={`/timeline/${this.props.foto.loginUsuario}`}>
                            {this.props.foto.loginUsuario}
                        </Link>
                    </figcaption>
                </figure>
                <time className="foto-data">{this.props.foto.horario}</time>
            </header>
        );
    }
}

export default class Foto extends Component {
    render() {
        return (
            <div className="foto">
                <FotoHeader foto={this.props.foto}/>
                <img alt="foto" className="foto-src"
                     src={this.props.foto.urlFoto}/>
                <FotoInfo foto={this.props.foto}/>
                <FotoComentario foto={this.props.foto}/>
            </div>
        );
    }
}
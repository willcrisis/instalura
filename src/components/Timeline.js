import React, {Component} from "react";
import Foto from "./Foto";
import PubSub from "pubsub-js";

export default class Timeline extends Component {

    constructor(props) {
        super(props);
        this.state = {fotos: []};
        this.login = this.props.login;
    }

    componentWillMount() {
        PubSub.subscribe('foto-like', (topic, info) => {
            const fotoExistente = this.state.fotos.find(foto => foto.id === info.fotoId);
            fotoExistente.likeada = !fotoExistente.likeada;

            const encontrado = fotoExistente.likers.find(liker => liker.login === info.liker.login);
            if (encontrado) {
                fotoExistente.likers = fotoExistente.likers.filter(liker => liker.login !== info.liker.login);
            } else {
                fotoExistente.likers.push(info.liker);
            }
            this.setState({fotos: this.state.fotos});
        });

        PubSub.subscribe('foto-comentario', (topic, info) => {
            const fotoExistente = this.state.fotos.find(foto => foto.id === info.fotoId);

            const encontrado = fotoExistente.comentarios.find(comentario => comentario.id === info.comentario.id);
            if (encontrado) {
                fotoExistente.comentarios.splice(fotoExistente.comentarios.indexOf(encontrado), 1);
            } else {
                fotoExistente.comentarios.push(info.comentario);
            }
            this.setState({fotos: this.state.fotos});
        });

        PubSub.subscribe('timeline', (topic, fotos) => {
            this.setState({fotos});
        });
    }

    componentDidMount() {
        this.carregarFotos();
    }

    carregarFotos() {
        let url = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('token')}`;
        if (this.login) {
            url = `http://localhost:8080/api/public/fotos/${this.login}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(fotos => {
                this.setState({fotos: fotos});
            });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.login) {
            this.login = nextProps.login;
            this.carregarFotos();
        }
    }

    like(fotoId) {
        fetch(`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('token')}`, {method: 'POST'})
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Erro ao dar like na foto.');
            })
            .then(liker => {
                PubSub.publish('foto-like', {fotoId: fotoId, liker});
            });
    }

    comentar(fotoId, comentario) {
        fetch(`http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('token')}`,
            {
                method: 'POST',
                body: JSON.stringify({texto: comentario}),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Erro ao comentar');
            })
            .then(comentario => {
                PubSub.publish('foto-comentario', {fotoId: fotoId, comentario});
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="fotos container">
                {
                    this.state.fotos.map(foto => {
                        return (
                            <Foto key={foto.id} foto={foto} like={this.like} comentar={this.comentar} />
                        );
                    })
                }
            </div>
        );
    }
}
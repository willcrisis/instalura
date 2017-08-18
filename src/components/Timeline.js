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

            const encontrado = fotoExistente.likers.find(liker => liker.login === info.liker.login);
            if (encontrado) {
                fotoExistente.likers = fotoExistente.likers.filter(liker => liker.login !== info.liker.login);
            } else {
                fotoExistente.likers.push(info.liker);
            }
            this.setState({fotos: this.state.fotos});
        });

        PubSub.subscribe('foto-comentario', (topic, info) => {
            if (info.fotoId === this.props.foto.id) {
                const encontrado = this.state.comentarios.find(comentario => comentario.id === info.comentario.id);
                if (encontrado) {
                    this.setState({comentarios: this.state.comentarios.filter(comentario => comentario.id !== info.comentario.id)});
                } else {
                    this.setState({comentarios: this.state.comentarios.concat(info.comentario)});
                }
            }
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

    render() {
        return (
            <div className="fotos container">
                {
                    this.state.fotos.map(foto => {
                        return (
                            <Foto key={foto.id} foto={foto}/>
                        );
                    })
                }
            </div>
        );
    }
}
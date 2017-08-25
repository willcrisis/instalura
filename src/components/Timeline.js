import React, {Component} from "react";
import Foto from "./Foto";

export default class Timeline extends Component {

    constructor(props) {
        super(props);
        this.state = {fotos: []};
        this.login = this.props.login;
    }

    componentWillMount() {
        this.props.store.subscribe(fotos => this.setState({fotos}));
    }

    componentDidMount() {
        this.carregarFotos();
    }

    carregarFotos() {
        this.props.store.list(this.login);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.login) {
            this.login = nextProps.login;
            this.carregarFotos();
        }
    }

    like(fotoId) {
        this.props.store.like(fotoId);
    }

    comentar(fotoId, comentario) {
        this.props.store.comment(fotoId, comentario);
    }

    render() {
        return (
            <div className="fotos container">
                {
                    this.state.fotos.map(foto => {
                        return (
                            <Foto key={foto.id} foto={foto} like={this.like.bind(this)} comentar={this.comentar.bind(this)} />
                        );
                    })
                }
            </div>
        );
    }
}
import React, {Component} from "react";
import Foto from "./Foto";
import TimelineLogic from "../logic/TimelineLogic";

export default class Timeline extends Component {

    constructor(props) {
        super(props);
        this.state = {fotos: []};
        this.login = this.props.login;
        this.timelineLogic = new TimelineLogic([]);
    }

    componentWillMount() {
        this.timelineLogic.subscribe(fotos => this.setState({fotos}));
    }

    componentDidMount() {
        this.carregarFotos();
    }

    carregarFotos() {
        this.timelineLogic.list(this.login);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.login) {
            this.login = nextProps.login;
            this.carregarFotos();
        }
    }

    like(fotoId) {
        this.timelineLogic.like(fotoId);
    }

    comentar(fotoId, comentario) {
        this.timelineLogic.comment(fotoId, comentario);
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
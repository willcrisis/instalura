import React, {Component} from "react";
import Foto from "./Foto";
import TimelineApi from "../logic/TimelineApi";
import {connect} from "react-redux";

class Timeline extends Component {

    constructor(props) {
        super(props);
        this.login = this.props.login;
    }

    componentDidMount() {
        this.carregarFotos();
    }

    carregarFotos() {
        this.props.listar(this.login);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.login !== this.login) {
            this.login = nextProps.login;
            this.carregarFotos();
        }
    }

    render() {
        return (
            <div className="fotos container">
                {
                    this.props.fotos.map(foto => {
                        return (
                            <Foto key={foto.id} foto={foto} like={this.props.like} comentar={this.props.comentar} />
                        );
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        fotos: state.timeline
    }
};

const mapDispatchToProps = dispatch => {
    return {
        like: fotoId => {
            dispatch(TimelineApi.like(fotoId));
        },
        comentar: (fotoId, comentario) => {
            dispatch(TimelineApi.comment(fotoId, comentario));
        },
        listar: login => {
            dispatch(TimelineApi.list(login));
        }
    }
};

const TimelineContainer = connect(mapStateToProps, mapDispatchToProps)(Timeline);

export default TimelineContainer;
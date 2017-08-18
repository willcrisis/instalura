import React, {Component} from "react";
import Foto from "./Foto";
import PubSub from "pubsub-js";

export default class Timeline extends Component {

    constructor(props) {
        super(props);
        this.state = {fotos: []};
        this.login = this.props.login;
    }

    componentDidMount() {
        this.carregarFotos();

        PubSub.subscribe('timeline', (topic, fotos) => {
            this.setState({fotos});
        });
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

    render(){
        return (
            <div className="fotos container">
                {
                    this.state.fotos.map(foto => {
                        return(
                            <Foto key={foto.id} foto={foto}/>
                        );
                    })
                }
            </div>
        );
    }
}
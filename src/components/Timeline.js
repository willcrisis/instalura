import React, {Component} from "react";
import Foto from "./Foto";

export default class Timeline extends Component {

    constructor() {
        super();
        this.state = {fotos: []};
    }

    componentDidMount() {
        let url = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('token')}`;
        if (this.props.login) {
            url = `http://localhost:8080/api/public/fotos/${this.props.login}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(fotos => {
                this.setState({fotos: fotos});
            });
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
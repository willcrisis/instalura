import React, {Component} from "react";
import TimelineApi from "../logic/TimelineApi";
import {connect} from "react-redux";

class Header extends Component {

    pesquisar(evento) {
        evento.preventDefault();
        this.props.pesquisar(this.pesquisa.value);
    }

    render() {
        return (
            <header className="header container">
                <h1 className="header-logo">
                    Instalura
                </h1>

                <form className="header-busca" onSubmit={this.pesquisar.bind(this)}>
                    <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo" ref={input => this.pesquisa = input}/>
                    <input type="submit" value="Buscar" className="header-busca-submit"/>
                </form>

                <span>{this.props.msg}</span>

                <nav>
                    <ul className="header-nav">
                        <li className="header-nav-item">
                            <a href="#">
                                ♡
                                {/*                 ♥ */}
                                {/* Quem deu like nas minhas fotos */}
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

const mapStateToProps = state => {
  return {
      msg: state.header
  }
};

const mapDispatchToProps = dispatch => {
    return {
        pesquisar: termo => {
          dispatch(TimelineApi.list(termo));
        }
    }
};

const HeaderComponent = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderComponent;
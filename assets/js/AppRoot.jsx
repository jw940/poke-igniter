import React, { Component } from 'react';
import {connect} from 'react-redux';
import {AppActions} from './AppState';

class AppRoot extends Component {

    componentDidMount() {
        fetch("https://pokeapi.co/api/v2/pokemon/1/", {
            method:"GET",
            mode: "cors",
        })
        .then(res => {
            return res.json();
        })
        .then(json => {
            this.props.setPokemonDisplay(json);
        })
    }
    
    render() {
        if (this.props.pokemon.name) {
        return (
            <div>
                <h1>{this.props.pokemon.name}</h1>
            </div>
        );
        } else {
            return (
                <div>
                    Loading..
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        pokemon: state.pokemon
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setPokemonDisplay: pokemon => {
            dispatch(AppActions.SetPokemonDisplay(pokemon));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
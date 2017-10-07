import React, { Component } from 'react';
import {connect} from 'react-redux';
import {AppActions} from '../AppState';

class TableRow extends Component {

    componentDidMount() {

        // if we haven't already retrieved the details for this pokemon, fetch them
        if (!this.props.pokemon.details_fetched) {

            fetch("https://pokeapi.co/api/v2/pokemon/" + this.props.pokemon.id + "/", {
                method:"GET",
                mode:"cors"
            })
            .then(res => {
                return res.json();
            })
            .then(json => {
                json.id = this.props.pokemon.id;
                json.details_fetched = true;
                this.props.updatePokemonDetails(json);
            })

        }

    }

    render() {

        let pokemon = this.props.pokemon;

        if (this.props.pokemon.details_fetched) {
            return (
                <tr onClick={() => {this.props.openPokemonCard(pokemon.id)}}>
                    <td><img src={pokemon.sprites.front_default} className="img-responsive" /></td>
                    <td>{pokemon.name}</td>
                    <td>{pokemon.url}</td>
                </tr>
            );
        } else {
            return (
                <tr><td><p>Loading...</p></td></tr>
            )
        }

    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePokemonDetails: pokemon => {
            dispatch(AppActions.UpdatePokemonDetails(pokemon));
        },
        openPokemonCard: id => {
            dispatch(AppActions.OpenPokemonCard(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRow);
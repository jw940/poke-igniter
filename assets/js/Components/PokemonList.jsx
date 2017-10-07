import React, { Component } from 'react';
import {connect} from 'react-redux';
import {AppActions} from '../AppState';

class PokemonList extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.all_pokemon.length) {
            fetch("https://pokeapi.co/api/v2/pokemon/", {
                method:"GET",
                mode: "cors",
            })
            .then(res => {
                return res.json();
            })
            .then(json => {
                this.props.setAllPokemon(json.results, json.count);
            })
        }
    }

    renderTableRows() {
        let render = [];

        for (let i = 0; i < this.props.all_pokemon.length; i++) {
            let p = this.props.all_pokemon[i];
            render.push(
                <tr key={i}>
                    <td>{p.name}</td>
                    <td>{p.url}</td>
                </tr>
            )
        }

        return render;
    }
    
    render() {

        let rows = this.renderTableRows();

        return (
            <div className="container">
                <table className="pokemon-table">
                    <thead>
                        <tr>
                            <th>
                                <h3>Name</h3>
                            </th>
                            <th>
                                <h3>URL</h3>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <h3>Total pokemon: {this.props.pokemon_count}</h3>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        all_pokemon: state.all_pokemon,
        pokemon_count: state.pokemon_count
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAllPokemon: (pokemon, count) => {
            dispatch(AppActions.SetAllPokemon(pokemon, count));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonList);
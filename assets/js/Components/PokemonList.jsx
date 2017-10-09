import React, { Component } from 'react';
import {connect} from 'react-redux';
import {AppActions} from '../AppState';
import TableRow from './TableRow';

class PokemonList extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.all_pokemon.length) {
            
            // fetch all pokemon
            fetch("https://pokeapi.co/api/v2/pokemon/?limit=1000", {
                method:"GET",
                mode: "cors",
            })
            .then(res => {
                return res.json();
            })
            .then(json => {
                // set the pokemon's ID to the number reference from their URL
                json.results.forEach(pokemon => {
                    // get the characters at that position and remove slashes
                    pokemon.id = parseInt(pokemon.url.slice(34, 37).replace("/", ""));
                })
                this.props.setAllPokemon(json.results, json.count);
            })

        }
    }

    renderTableRows() {
        let render = [];

        let offset = (this.props.page - 1) * this.props.per_page

        for (let i = offset; i < (offset + this.props.per_page) && i < this.props.all_pokemon.length; i++) {
            let p = this.props.all_pokemon[i];
            render.push(
                <TableRow pokemon={p} key={p.id} />
            )
        }

        return render;
    }

    renderPagination() {
        let render = [];

        let page_count = this.props.pokemon_count / this.props.per_page;

        let starting_pagination_number = (this.props.page - 5) > 0 ? this.props.page - 5 : 1

        for (let i = starting_pagination_number; i < page_count && i < (starting_pagination_number + 10); i++) {
            let pagination_class_names = "table-pagination"
            if (i == this.props.page) pagination_class_names += " table-pagination-active";
            render.push(
                <a key={i} onClick={this.switchPage.bind(this, i)} className={pagination_class_names}>{i}</a>
            )
        }
        return render;
    }

    switchPage(page) {
        this.props.switchPage(page);
    }
    
    render() {

        let rows = this.renderTableRows();
        let pagination = this.renderPagination();

        return (
            <div className="container">
                <table className="pokemon-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>
                                <h3>Name</h3>
                            </th>
                            <th>
                                <h3>HP</h3>
                            </th>
                            <th>
                                <h3>Attack</h3>
                            </th>
                            <th>
                                <h3>Defense</h3>
                            </th>
                            <th>
                                <h3>Special<br/> Attack</h3>
                            </th>
                            <th>
                                <h3>Special<br/> Defense</h3>
                            </th>
                            <th>
                                <h3>Speed</h3>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <h5>Total pokemon: {this.props.pokemon_count}</h5>
                <div className="pagination-container">
                    {pagination}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        all_pokemon: state.all_pokemon,
        pokemon_count: state.pokemon_count,
        page: state.page,
        per_page: state.per_page
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAllPokemon: (pokemon, count) => {
            dispatch(AppActions.SetAllPokemon(pokemon, count));
        },
        switchPage: page => {
            dispatch(AppActions.SwitchPage(page));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonList);
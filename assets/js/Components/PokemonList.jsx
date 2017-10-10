import React, { Component } from 'react';
import {connect} from 'react-redux';
import {AppActions} from '../AppState';
import TableRow from './TableRow';

class PokemonList extends Component {

    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handlePerPageChange = this.handlePerPageChange.bind(this);
    }

    componentDidMount() {
        if (!this.props.pokemon_results.length) {
            
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
                    pokemon.id = parseInt(pokemon.url.slice(34).replace("/", ""));
                })
                this.props.setAllPokemon(json.results, json.count);
            })

        }
    }

    renderTableRows() {
        let render = [];

        // get the pokemon to fetch based on page and pokemon per page
        let offset = (this.props.page - 1) * this.props.per_page

        for (let i = offset; i < (offset + this.props.per_page) && i < this.props.pokemon_results.length; i++) {
            let p = this.props.pokemon_results[i];
            render.push(
                <TableRow pokemon={p} key={p.id} />
            )
        }

        return render;
    }

    renderPagination() {
        let render = [];

        // page count will be Number of pokemon / Pokemon per page
        let page_count = Math.ceil(this.props.pokemon_results.length / this.props.per_page);

        if (page_count < 1) page_count = 1;

        // aiming to keep the active page in the middle so there's ~5 pages to click on either forwards or backwards
        let starting_pagination_number = (this.props.page - 5) > 0 ? this.props.page - 5 : 1

        for (let i = starting_pagination_number; i <= page_count && i < (starting_pagination_number + 10); i++) {
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

    handleSearch(e) {
        this.props.updateSearch(e.target.value);
    }

    handlePerPageChange(e) {
        this.props.updatePerPage(e.target.value);
    }
    
    render() {

        let rows = this.renderTableRows();
        let pagination = this.renderPagination();

        return (
            <div className="container">
                <div className="table-controls row">
                    <div className="col-sm-6">
                        <input placeholder="Search..." className="table-search" onChange={this.handleSearch} />
                    </div>
                    <div className="col-sm-6">
                        <p>Pokémon per page:</p>
                        <select onChange={this.handlePerPageChange} value={this.props.per_page}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">25</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                    {this.props.selecting_compare &&
                        <div className="col-sm-12">
                            <p>*Selecting Pokemon for comparison</p>
                        </div>
                    }
                </div>
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
                            <th className="hidden-xs">
                                <h3>Special<br/> Attack</h3>
                            </th>
                            <th className="hidden-xs">
                                <h3>Special<br/> Defense</h3>
                            </th>
                            <th className="hidden-xs">
                                <h3>Speed</h3>
                            </th>
                            <th>
                                <h3>Favourite</h3>
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

const mapStateToProps = (state, ownProps) => {

    let pokemon_results = state.all_pokemon;

    if (pokemon_results.length) {
        // filter down pokemon - if they're starred, or searched
        if (ownProps.show_starred) {
            pokemon_results = pokemon_results.filter(p => {
                return state.starred_pokemon.includes(p.id);
            })
        }
        
        if (state.search) {
            pokemon_results = pokemon_results.filter(p => {
                return p.name.includes(state.search)
            })
        }
    }

    return {
        pokemon_results: pokemon_results,
        pokemon_count: state.pokemon_count,
        page: state.page,
        per_page: state.per_page,
        search: state.search,
        selecting_compare: state.selecting_compare
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAllPokemon: (pokemon, count) => {
            dispatch(AppActions.SetAllPokemon(pokemon, count));
        },
        switchPage: page => {
            dispatch(AppActions.SwitchPage(page));
        },
        updateSearch: search => {
            dispatch(AppActions.UpdateSearch(search));
        },
        updatePerPage: per_page => {
            dispatch(AppActions.UpdatePerPage(per_page));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonList);
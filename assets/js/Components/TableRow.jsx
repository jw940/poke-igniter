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

    renderStats() {
        let renderStats = [];
        let i = 0;
        this.props.pokemon.stats.forEach(s => {
            let classNames = "";
            if (i < 3) classNames += "hidden-xs";
            renderStats.push(
                <td key={i} className={classNames}>
                    <p>{s.base_stat}</p>
                </td>
            )
            i++;
        })
        return renderStats.reverse();
    }

    savePokemonToggle(e) {
        e.stopPropagation();
        this.props.savePokemonToggle(this.props.pokemon.id);
    }

    render() {

        let pokemon = this.props.pokemon;

        let onClick;
        if (this.props.selecting_compare) {
            onClick = () => {
                this.props.selectCompareCard(pokemon.id);
            }
        } else {
            onClick = () => {
                this.props.openPokemonCard(pokemon.id);
            }
        }

        if (this.props.pokemon.details_fetched) {
            let renderStats = this.renderStats();
            let starClasses = "pokemon-save";
            if (this.props.is_starred) starClasses += " saved";
            return (
                <tr onClick={onClick}>
                    <td><img src={pokemon.sprites.front_default} className="img-responsive" /></td>
                    <td><p>{pokemon.name.capitalize()}</p></td>
                    {renderStats}
                    <td><a className={starClasses} onClick={this.savePokemonToggle.bind(this)}></a></td>
                </tr>
            );
        } else {
            return (
                <tr>
                    <td>
                        <p>Loading...</p>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="hidden-xs"></td>
                    <td className="hidden-xs"></td>
                    <td className="hidden-xs"></td>
                    <td></td>
                </tr>
            )
        }

    }
}

const mapStateToProps = (state, ownProps) => {

    var is_starred = false;

    if (state.starred_pokemon.length) {
        is_starred = state.starred_pokemon.filter(s => {
            return s == ownProps.pokemon.id
        });
        is_starred = is_starred[0] ? true : false;
    }

    return {
        selecting_compare: state.selecting_compare,
        is_starred: is_starred
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePokemonDetails: pokemon => {
            dispatch(AppActions.UpdatePokemonDetails(pokemon));
        },
        openPokemonCard: id => {
            dispatch(AppActions.OpenPokemonCard(id))
        },
        selectCompareCard: id => {
            dispatch(AppActions.SelectCompareCard(id));
        },
        savePokemonToggle: id => {
            dispatch(AppActions.SavePokemonToggle(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRow);
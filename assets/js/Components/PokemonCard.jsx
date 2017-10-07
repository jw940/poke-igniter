import React, { Component } from 'react';
import {connect} from 'react-redux';
import {AppActions} from '../AppState';

class PokemonCard extends Component {

    render() {

        let pokemon = this.props.pokemon

        let renderStats = [];
        this.props.pokemon.stats.forEach(s => {
            renderStats.push(
                <div className="pokemon-stat">
                    <p>{s.stat.name}: {s.base_stat}</p>
                </div>
            )
        })

        return (
            <div className="pokemon-card">
                <div className="container">
                    <div className="pokemon-card-inner col-md-6 col-sm-8 col-xs-12">
                        <a className="pokemon-card-close" onClick={() => {this.props.closeCard()}}>X</a>
                        <img className="img-responsive" src={pokemon.sprites.front_default} />
                        <h2>{pokemon.name}</h2>
                        {renderStats}
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    
    let viewing_pokemon = null;
    
        if (state.viewing_pokemon != null) {
            viewing_pokemon = state.all_pokemon.filter(p => {
                return p.id == state.viewing_pokemon
            }).pop();
        }

    return {
        pokemon: viewing_pokemon
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeCard: () => {
            dispatch(AppActions.CloseCard());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonCard);
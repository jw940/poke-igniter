import React, { Component } from 'react';
import {connect} from 'react-redux';
import {AppActions} from '../AppState';

import Ability from './Ability';
import Type from './Type';
import 'gsap';

class PokemonCard extends Component {

    constructor(props) {
        super(props);
        this.closeCard = this.props.closeCard.bind(this);
    }

    componentDidMount() {
        // animate stat bars up from 0 on card open
        for (let stat in this.refs) {
            TweenMax.fromTo(this.refs[stat], 0.5, {height:"0%"}, {height: this.refs[stat].style.height})
        }
    }

    renderStatBars() {
        let renderStats = [];
        let i = 0;
        this.props.pokemon.stats.forEach(s => {
            let barStyle = {
                height: s.base_stat + "%"
            }
            renderStats.push(
                <div className="pokemon-stat col-xs-2" key={i}>
                    <div ref={"stat-" + s.stat.name} className={"stat-bar stat-" + s.stat.name} style={barStyle}>
                        <p>{s.base_stat}</p>
                        <p className="stat-label">{s.stat.name.capitalize().replace("-", " ")}</p>
                    </div>
                </div>
            )
            i++;
        })
        // Reverse stats array as Pokeapi seems to provide them in reverse order
        return renderStats.reverse();
    }

    renderAbilities() {
        let renderAbilities = [];
        let i = 0;
        this.props.pokemon.abilities.forEach(a => {
            // if we haven't already got the ability id, get it out of the url
            if (!a.id) a.id = parseInt(a.ability.url.slice(34).replace("/", ""));
            renderAbilities.push(<Ability key={i} ability={a} />)
            i++;
        })
        return renderAbilities;
    }

    renderTypes() {
        let renderTypes = [];
        let i = 0;
        this.props.pokemon.types.forEach(t => {
            // if we haven't already got the type id, get it out of the url
            if (!t.id) t.id = parseInt(t.type.url.slice(31).replace("/", ""));
            renderTypes.push(<Type key={i} type={t} />)
            i++;
        })
        return renderTypes;
    }

    render() {

        let pokemon = this.props.pokemon
        let renderStatBars = this.renderStatBars();
        let renderAbilities = this.renderAbilities();
        let renderTypes = this.renderTypes();

        return (
            <div className="pokemon-card">
                <div className="pokemon-card-click-off" onClick={this.closeCard}></div>
                    <div className="pokemon-card-inner col-md-6 col-sm-8 col-xs-12">
                    <a className="pokemon-card-close" onClick={this.closeCard}>X</a>
                    <img className="img-responsive" src={pokemon.sprites.front_default} />
                    <h2>{pokemon.name.capitalize()}</h2>
                    <div className="stats-barchart col-sm-8">
                        <h4>Stats</h4>
                        {renderStatBars}
                    </div>
                    <div className="abilities col-sm-4">
                        <h4>Types</h4>
                        {renderTypes}
                        <h4>Abilities</h4>
                        {renderAbilities}
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    let viewing_pokemon = null;
    
    if (state.viewing_pokemon != null) {

        // get more details on pokemon and abilities from state
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
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
        this.closeCompare = this.props.closeCompare.bind(this);
        this.selectCompare = this.props.selectCompare.bind(this);
    }

    componentDidMount() {
        // animate stat bars up from 0 on card open
        for (let stat in this.refs) {
            TweenMax.fromTo(this.refs[stat], 0.5, {height:"0%"}, {height: this.refs[stat].style.height})
        }
    }

    renderStatBars(pokemon, pokemon_2) {
        let renderStats = [];
        // if two pokemon are provided to the function, generate a bar graph comparing stat diff
        if (null != pokemon_2) {
            // use for..in instead of forEach so we can easily access the same stat from both Pokemon
            for (let i = 0; i < pokemon.stats.length; i++) {
                let own_stat = pokemon.stats[i]
                let compare_stat = pokemon_2.stats[i]

                let bar_classes = "stat-bar stat-" + own_stat.stat.name;

                // add a CSS class if the stat is greater or smaller for styling

                let stat_val = own_stat.base_stat;

                if (own_stat.base_stat > compare_stat.base_stat) {
                    bar_classes += " greater"
                    stat_val += " (+" + (own_stat.base_stat - compare_stat.base_stat) + ")"
                } else if (own_stat.base_stat < compare_stat.base_stat) {
                    bar_classes += " lesser"
                    stat_val += " (-" + (compare_stat.base_stat - own_stat.base_stat)+ ")"
                }

                let barStyle = {
                    height: own_stat.base_stat + "%"
                }

                let stat_label = own_stat.stat.name.capitalize().replace("-", " ")

                renderStats.push(
                    <div className="pokemon-stat col-xs-2" key={i}>
                        <div ref={pokemon.name + "-stat-" + own_stat.stat.name} className={bar_classes} style={barStyle}>
                            <p>{stat_val}</p>
                            <p className="stat-label">{stat_label}</p>
                        </div>
                    </div>
                )
            }
        } else {
            let i = 0;
            pokemon.stats.forEach(s => {
                let barStyle = {
                    height: s.base_stat + "%"
                }

                let stat_label = s.stat.name.capitalize().replace("-", " ");

                renderStats.push(
                    <div className="pokemon-stat col-xs-2" key={i}>
                        <div ref={pokemon.name + "-stat-" + s.stat.name} className={"stat-bar stat-" + s.stat.name} style={barStyle}>
                            <p>{s.base_stat}</p>
                            <p className="stat-label">{stat_label}</p>
                        </div>
                    </div>
                )
                i++;
            })
        }
        // Reverse stats array as Pokeapi seems to provide them in reverse order
        return renderStats.reverse();
    }

    renderAbilities(pokemon) {
        let renderAbilities = [];
        let i = 0;
        pokemon.abilities.forEach(a => {
            // if we haven't already got the ability id, get it out of the url
            if (!a.id) a.id = parseInt(a.ability.url.slice(34).replace("/", ""));
            renderAbilities.push(<Ability key={i} ability={a} />)
            i++;
        })
        return renderAbilities;
    }

    renderTypes(pokemon) {
        let renderTypes = [];
        let i = 0;
        pokemon.types.forEach(t => {
            // if we haven't already got the type id, get it out of the url
            if (!t.id) t.id = parseInt(t.type.url.slice(31).replace("/", ""));
            renderTypes.push(<Type key={i} type={t} />)
            i++;
        })
        return renderTypes;
    }

    render() {

        let pokemon = this.props.pokemon

        // create card classes for type styling
        let renderBarColors = [];
        let i = 0;
        pokemon.types.forEach(t => {
            let name = t.type ? t.type.name : t.name;
            let barPartClassName = "bar-color " + name
            renderBarColors.push(<div className={barPartClassName} key={i}></div>)
            i++;
        })
        var cardClasses = "pokemon-card-inner col-md-5 col-sm-9 col-xs-12"
        if (pokemon.types.length > 1) cardClasses += " double-type"
        
        // prepare stats and abilities for pokemon
        let renderStatBars = this.renderStatBars(pokemon);
        let renderAbilities = this.renderAbilities(pokemon);
        let renderTypes = this.renderTypes(pokemon);


        let compare_pokemon = this.props.compare_pokemon;

        if (null != compare_pokemon && compare_pokemon.details_fetched) {

            // re-do first card bars with comparison data
            renderStatBars = this.renderStatBars(pokemon, compare_pokemon);

            // create card classes for type styling
            var renderCompareBarColors = [];
            i = 0;
            compare_pokemon.types.forEach(t => {
                let name = t.type ? t.type.name : t.name;
                let barPartClassName = "bar-color " + name
                renderCompareBarColors.push(<div className={barPartClassName} key={i}></div>)
                i++;
            })
            var compareCardClasses = "pokemon-card-compare col-md-5 col-sm-9 col-xs-12";
            if (pokemon.types.length > 1) cardClasses += " double-type"

            // prepare stats and abilities for compared pokemon
            var renderCompareStatBars = this.renderStatBars(compare_pokemon, pokemon);
            var renderCompareAbilities = this.renderAbilities(compare_pokemon);
            var renderCompareTypes = this.renderTypes(compare_pokemon);
        }

        return (
            <div className="pokemon-card">
                <div className="pokemon-card-click-off" onClick={this.closeCard}></div>
                <div className={cardClasses}>
                    <div className="card-bar">
                        {renderBarColors}
                    </div>
                    <a className="pokemon-card-close" onClick={this.closeCard}>X</a>
                    <img className="img-responsive" src={pokemon.sprites.front_default} />
                    <h2>{pokemon.name.capitalize()}</h2>
                    <div className="stats-barchart col-sm-8">
                        <h4>Stats</h4>
                        {renderStatBars}
                    </div>
                    <div className="abilities col-sm-4">
                        <div className="col-xs-6 col-sm-12">
                            <h4>Types</h4>
                            {renderTypes}
                        </div>
                        <div className="col-xs-6 col-sm-12">
                            <h4>Abilities</h4>
                            {renderAbilities}
                        </div>
                    </div>
                    {null == this.props.compare_pokemon &&
                        <div className="compare-link col-sm-12">
                            <a className="compare-button" onClick={this.selectCompare}>Compare</a>
                        </div>
                    }
                </div>
                {(null != compare_pokemon && compare_pokemon.details_fetched) &&
                    <div className={compareCardClasses}>
                        <div className="card-bar">
                            {renderCompareBarColors}
                        </div>
                        <a className="pokemon-card-close" onClick={this.closeCompare}>X</a>
                        <img className="img-responsive" src={compare_pokemon.sprites.front_default} />
                        <h2>{compare_pokemon.name.capitalize()}</h2>
                        <div className="stats-barchart col-sm-8">
                            <h4>Stats</h4>
                            {renderCompareStatBars}
                        </div>
                        <div className="abilities col-sm-4">
                            <div className="col-xs-6 col-sm-12">
                                <h4>Types</h4>
                                {renderCompareTypes}
                            </div>
                            <div className="col-xs-6 col-sm-12">
                                <h4>Abilities</h4>
                                {renderCompareAbilities}
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }

}

const mapStateToProps = state => {
    let viewing_pokemon = null;
    let compare_pokemon = null;
    
    if (state.viewing_pokemon != null) {
        // get more details on pokemon and abilities from state
        viewing_pokemon = state.all_pokemon.filter(p => {
            return p.id == state.viewing_pokemon
        }).pop();
    }

    if (state.compare_pokemon != null) {
        compare_pokemon = state.all_pokemon.filter(p => {
            return p.id == state.compare_pokemon
        }).pop();
    }

    return {
        pokemon: viewing_pokemon,
        compare_pokemon: compare_pokemon
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeCard: () => {
            dispatch(AppActions.CloseCard());
        },
        closeCompare: () => {
            dispatch(AppActions.CloseCompare());
        },
        selectCompare: () => {
            dispatch(AppActions.SelectCompareMode());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonCard);
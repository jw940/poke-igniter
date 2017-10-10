import React, { Component } from 'react';
import {connect} from 'react-redux';
import {AppActions} from '../AppState';

class Ability extends Component {

    componentDidMount() {

        // if we haven't already retrieved the details for this ability, fetch them
        if (!this.props.ability.details_fetched) {
            
            fetch("https://pokeapi.co/api/v2/ability/" + this.props.ability.id + "/", {
                method:"GET",
                mode:"cors"
            })
            .then(res => {
                return res.json();
            })
            .then(json => {
                json.id = this.props.ability.id;
                json.details_fetched = true;
                this.props.updateAbilityDetails(json);
            })

        }

    }

    render() {

        // annoyingly, ability name is stored on different parts of prop
        // depending if the details have been retrieved from the API yet
        let name = this.props.ability.ability ? this.props.ability.ability.name : this.props.ability.name;

        let description = this.props.ability.effect_entries ? this.props.ability.effect_entries[0].effect.replace("\n", "") : "Loading...";

        if (description.length > 125) {
            description = description.slice(0, 125);
            description += "...";
        }

        if (this.props.ability) {
            return (
                <div className="ability">
                    <p>{name.capitalize()}</p>
                    <div className="effect-desc">
                        <p>{description}</p>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {

    // if the ability is in the state, use the state's copy of the ability otherwise use the
    // limited information version passed by the component's parent

    let ability = state.all_abilities.length ? state.all_abilities.filter(a => {
        return a.id == ownProps.ability.id;
    }).pop() : null;

    if (ability == null) ability = ownProps.ability

    return {
        ability: ability
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateAbilityDetails: ability => {
            dispatch(AppActions.UpdateAbilityDetails(ability))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ability);
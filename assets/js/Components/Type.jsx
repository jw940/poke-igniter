import React, { Component } from 'react';
import {connect} from 'react-redux';
import {AppActions} from '../AppState';

class Type extends Component {

    componentDidMount() {

        // if we haven't already retrieved the details for this type, fetch them
        if (!this.props.type.details_fetched) {
            
            fetch("https://pokeapi.co/api/v2/type/" + this.props.type.id + "/", {
                method:"GET",
                mode:"cors"
            })
            .then(res => {
                return res.json();
            })
            .then(json => {
                json.id = this.props.type.id;
                json.details_fetched = true;
                this.props.updateTypeDetails(json);
            })

        }

    }

    render() {

        // annoyingly, type name is stored on different parts of prop
        // depending if the details have been retrieved from the API yet
        let name = this.props.type.type ? this.props.type.type.name : this.props.type.name;

        if (this.props.type) {
            return (
                <div className="type">
                    <p>{name.capitalize()}</p>
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

    // if the type is in the state, use the state's copy of the type otherwise use the
    // limited information version passed by the component's parent

    let type = state.all_types.length ? state.all_types.filter(t => {
        return t.id == ownProps.type.id;
    }).pop() : null;

    if (type == null) type = ownProps.type

    return {
        type: type
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateTypeDetails: type => {
            dispatch(AppActions.UpdateTypeDetails(type))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Type);
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {AppActions} from './AppState';
import PokemonList from './Components/PokemonList'

class AppRoot extends Component {
    
    render() {
        return (
            <div>
                <PokemonList />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
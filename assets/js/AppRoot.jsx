import React, { Component } from 'react';
import {connect} from 'react-redux';
import {AppActions} from './AppState';
import PokemonList from './Components/PokemonList';
import PokemonCard from './Components/PokemonCard';
import Header from './Components/Header';

class AppRoot extends Component {
    
    render() {

        return (
            <div>
                <Header />
                <div className="app-main">
                <PokemonList />
                {this.props.viewing_pokemon != null &&
                    <PokemonCard pokemon={this.props.viewing_pokemon} />
                }
                </div>
            </div>
        );

    }
}

const mapStateToProps = state => {

    return {
       viewing_pokemon: state.viewing_pokemon
    }

}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
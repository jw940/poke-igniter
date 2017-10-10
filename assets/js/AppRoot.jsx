import React, { Component } from 'react';
import {connect} from 'react-redux';
import {AppActions} from './AppState';

import Nav from './Components/Nav';
import PokemonList from './Components/PokemonList';
import PokemonCard from './Components/PokemonCard';
import Header from './Components/Header';

class AppRoot extends Component {

    renderView() {
        switch(this.props.current_view) {
            case "nav":
                return <Nav />
            case "list":
                return <PokemonList />
        }
    }
    
    render() {

        let renderView = this.renderView();

        return (
            <div>
                <Header />
                <div className="app-main">
                {renderView}
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
       viewing_pokemon: state.viewing_pokemon,
       current_view: state.current_view
    }

}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
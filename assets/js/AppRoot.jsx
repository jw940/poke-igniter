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
            case "starred":
                return <PokemonList show_starred={true} />
        }
    }
    
    render() {

        let renderView = this.renderView();

        return (
            <div>
                <Header />
                <div className="app-main">
                {renderView}
                {(this.props.viewing_pokemon != null && !this.props.selecting_compare) &&
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
       current_view: state.current_view,
       selecting_compare: state.selecting_compare
    }

}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
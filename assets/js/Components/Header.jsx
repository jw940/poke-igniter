import React, { Component } from 'react';
import {connect} from 'react-redux';
import {AppActions} from '../AppState';

class Header extends Component {
    
    render() {

        let username = this.props.user != null ? this.props.user : "Guest"

        return (
            <header>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-6">
                            <h1 onClick={this.props.changeView.bind(this, "nav")}>PokeIgniter</h1>
                        </div>
                        <div className="col-xs-6">
                            <p onClick={this.props.changeView.bind(this, "nav")}>Home</p>
                            <p> | </p>
                            <p onClick={this.props.changeView.bind(this, "list")}>All <span className="hidden-xs">Pokemon</span></p>
                            <p> | </p>
                            <p onClick={this.props.changeView.bind(this, "starred")}>Favourites</p>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeView: (view) => {
            dispatch(AppActions.ChangeView(view))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
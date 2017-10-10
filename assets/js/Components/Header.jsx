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
                            <h1 onClick={this.props.viewNav}>PokeIgniter</h1>
                        </div>
                        <div className="col-xs-6">
                            <p>{username}</p>
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
        viewNav: () => {
            dispatch(AppActions.ChangeView("nav"))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
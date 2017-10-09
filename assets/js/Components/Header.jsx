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
                        <div className="col-sm-6">
                            <h1>PokeIgniter</h1>
                        </div>
                        <div className="col-sm-6">
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

export default connect(mapStateToProps)(Header);
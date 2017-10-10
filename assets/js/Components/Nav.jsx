import React, { Component } from 'react';
import {connect} from 'react-redux';
import {AppActions} from '../AppState';

class Nav extends Component {
    render() {
        return (
            <div className="container view-nav">
                <div onClick={this.props.selectView.bind(this, "list")} className="nav-link">
                    <i className="fa fa-list"></i>
                    <a>List Pokemon</a>
                </div>
                <div onClick={this.props.selectView.bind(this, "list")} className="nav-link">
                    <i className="fa fa-exchange"></i>
                    <a>Compare Pokemon</a>
                </div>
                <div onClick={this.props.selectView.bind(this, "list")} className="nav-link">
                    <i className="fa fa-user-circle"></i>
                    <a>Log In</a>
                </div>
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
        selectView: view => {
            dispatch(AppActions.ChangeView(view));
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Nav);
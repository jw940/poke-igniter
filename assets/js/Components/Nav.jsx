import React, { Component } from 'react';
import {connect} from 'react-redux';
import {AppActions} from '../AppState';

class Nav extends Component {
    render() {
        return (
            <div className="container view-nav">
                <div onClick={this.props.selectView.bind(this, "list")} className="nav-link">
                    <i className="fa fa-list"></i>
                    <a>All Pokemon</a>
                </div>
                <div onClick={this.props.selectView.bind(this, "starred")} className="nav-link">
                    <i className="fa fa-star-o"></i>
                    <a>Saved Pokemon</a>
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
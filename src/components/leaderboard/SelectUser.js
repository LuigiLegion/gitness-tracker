/* eslint-disable react/button-has-type */

// Imports
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getOrganizationsThunkCreator } from '../../store/reducers/leaderboardReducer';

// Component
export class SelectUser extends PureComponent {
  constructor() {
    super();
    this.state = {
      userLogin: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.getOrganizationsThunk(this.state.userLogin);
  }

  render() {
    const { userLogin } = this.props;

    return (
      <div className="container center">
        <div className="section center">
          <form onSubmit={this.handleSubmit} className="card white center">
            <span className="card-title">
              <span className="gray-text-color bold-text-style">User</span>
            </span>

            <div className="input-field">
              <label htmlFor="userLogin">
                GitHub Username<span className="red-text-color">*</span>
              </label>

              <input
                type="text"
                id="userLogin"
                required
                onChange={this.handleChange}
              />
            </div>

            <button
              className="btn black lighten-1 z-depth-0"
              disabled={!this.state.userLogin.length}
            >
              Select
            </button>

            <br />
            <br />

            <span className="italic-text-style">
              {userLogin ? userLogin : 'Not Selected Yet'}
            </span>

            <br />
            <br />
          </form>
        </div>
      </div>
    );
  }
}

// Container
const mapStateToProps = state => ({
  userLogin: state.leaderboard.userLogin,
});

const mapDispatchToProps = dispatch => ({
  getOrganizationsThunk(userLogin) {
    dispatch(getOrganizationsThunkCreator(userLogin));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectUser);

// Prop Types
SelectUser.propTypes = {
  userLogin: PropTypes.string,
  getOrganizationsThunk: PropTypes.func,
};

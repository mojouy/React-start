import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import AuthorList from './AuthorList';

class AuthorsPage extends Component {

  render() {
    const {authors} = this.props;
    return (
      <div>
        <h1>Authors Page</h1>
        <AuthorList authors={authors}/>
      </div>
    );
  }
}

AuthorsPage.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.object).isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    authors: state.authors
  };
}

export default connect(mapStateToProps)(AuthorsPage);

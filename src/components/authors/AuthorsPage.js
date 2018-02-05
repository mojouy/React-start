import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AuthorList from './AuthorList';
import * as authorActions from '../../actions/authorActions';
import { browserHistory } from 'react-router';
import toastr from 'toastr';

class AuthorsPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToAuthorCreatePage = this. redirectToAuthorCreatePage.bind(this);
    this.deleteThisAuthor = this.deleteThisAuthor.bind(this);
  }

  redirectToAuthorCreatePage() {
    browserHistory.push('/author');
  }

  authorHasCourse(courses, authorId) {
    return courses.find(course => course.authorId == authorId) != undefined ? true : false;
  }

  deleteThisAuthor(authorId) {
    const authorHasCourse = this.authorHasCourse(this.props.courses, authorId);

    if (authorHasCourse) {
      toastr.warning("Author Has Course Assigned");
    } else {
      this.props.actions.deleteAuthor(authorId)
        .then(() => toastr.success("Author Deleted"))
        .catch(error => toastr.error(error));
    }
  }

  saveAuthor(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.saveAuthor(this.state.author)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  render() {
    const {authors} = this.props;
    return (
      <div>
        <h1>Authors Page</h1>
        <input
          type="submit"
          value="Add Author"
          className="btn btn-primary"
          onClick={this.redirectToAuthorCreatePage} />
        <AuthorList authors={authors} onDelete={this.deleteThisAuthor}/>
      </div>
    );
  }
}

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    authors: state.authors,
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);

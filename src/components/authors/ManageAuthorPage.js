import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AuthorForm from './AuthorForm';
import * as authorActions from '../../actions/authorActions';
import {authorsFormattedForDropdown} from '../../selectors/selectors';
import toastr from 'toastr';

class ManageAuthorPage extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      author: Object.assign({}, props.author),
      errors: {},
      saving: false
    };

    this.updateAuthorState = this.updateAuthorState.bind(this);
    this.saveAuthor = this.saveAuthor.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.author.id != nextProps.author.id) {
      this.setState({
        author: Object.assign({}, nextProps.author)
      });
    }
  }

  updateAuthorState(event) {
    const field = event.target.name;
    let author = Object.assign({}, this.state.author);
    author[field] = event.target.value;
    return this.setState({author: author});
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

  redirect() {
    this.setState({saving: false});
    toastr.success('Author Saved');
    this.context.router.push('/authors');
  }

  render() {
    return (
      <AuthorForm
        author={this.state.author}
        onSave={this.saveAuthor}
        onChange={this.updateAuthorState}
        errors={this.state.errors}
        loading={this.state.saving}
      />
    );
  }
}

ManageAuthorPage.propTypes = {
  author: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageAuthorPage.contextTypes = {
  router: PropTypes.object
};

function getAuthorById(authors, id) {
  const author = authors.filter(author => author.id == id); //Filter returns an array
  if (author.length) return author[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const authorHasId = ownProps.params.id; // From the URL
  let author = {id: '', firstName: '', lastName: ''};

  if (authorHasId && state.authors.length > 0) {
    author = getAuthorById(state.authors, ownProps.params.id);
  }

  return {
    author: author
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);

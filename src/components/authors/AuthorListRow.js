import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const AuthorListRow = ({author, onDelete}) => {
  const onDeleteAuthor = () => onDelete(author.id);

  return (
    <tr>
      <td>{author.id}</td>
      <td>{author.firstName}</td>
      <td>{author.lastName}</td>
      <td>
        <Link to={'/author/' + author.id} className="text-primary">Edit</Link>
        <span> | </span>
        <a href="#" className="text-danger" onClick={onDeleteAuthor}>Delete</a>
      </td>
    </tr>
  );
};

AuthorListRow.propTypes = {
  author: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default AuthorListRow;

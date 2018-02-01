import React, {PropTypes} from 'react';

const AuthorListRow = ({author}) => (
  <tr>
    <td>{author.id}</td>
    <td>{author.firstName}</td>
    <td>{author.lastName}</td>
    <td><a href="#" className="text-danger">Delete</a></td>
  </tr>
);

AuthorListRow.propTypes = {
  author: PropTypes.object.isRequired
};

export default AuthorListRow;

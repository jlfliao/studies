import React from 'react';

const Table = (props) => {
  const { selectedStudies } = props;
  return (
    <table>
      <tbody>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Conditions</th>
          <th>URL</th>
          <th>Locations</th>
          <th>Interventions</th>
        </tr>
        {selectedStudies.map((study) => (
          <tr key={study.id}>
            <td>{study.id}</td>
            <td>{study.title}</td>
            <td>{study.url}</td>
            <td>{study.locations}</td>
            <td>{study.tnterventions}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

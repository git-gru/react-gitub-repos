import "./style.scss";

export const ReposTable = ({ repos }) => {
  if (repos.length === 0) {
    return null;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Description</th>
          <th>Link</th>
          <th>Language</th>
        </tr>
      </thead>
      <tbody>
        {repos.map((repo) => (
          <tr key={repo.id}>
            <td>{repo.full_name}</td>
            <td>{repo.description}</td>
            <td>{repo.url}</td>
            <td>{repo.language}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function User({ user }) {
  console.log(`user component ${JSON.stringify(user)}`);

  const showProperties = ["name", "blog", "location", "bio"];

  return (
    <>
      {Object.keys(user).map((k, idx) => {
        if (showProperties.includes(k)) {
          return (
            <li key={idx}>
              <strong>{k}</strong>: {user[k]}
            </li>
          );
        } else {
          return null;
        }
      })}
    </>
  );
}

export default User;

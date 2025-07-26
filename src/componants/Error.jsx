export const Error = ({ error }) => {
  return (
    <div className="error-message">
      <h1>Something went wrong!</h1>
      <p>{error.message}</p>
    </div>
  );
};

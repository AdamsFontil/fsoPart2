const Input = ({ label, newType, handleType }) => {
    return (
      <div>
        {label}:
        <input
          type="text"
          value={newType}
          onChange={handleType}
        />
      </div>
    );
  };

export default Input

function Filter({ value, onChange, names }) {
  return (
    <>
      {names.map((name) => (
        <label key={name}>{name}
          <input type="text" name={name} value={value} onChange={onChange} />
        </label>
      ))}
    </>
  );
}

export default Filter;

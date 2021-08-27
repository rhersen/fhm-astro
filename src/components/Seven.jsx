export default function Seven({ cases }) {
  return (
    <div className="table">
      <span>Statistikdatum</span>
      {cases.columns.map((region) => (
        <span className="region">{region}</span>
      ))}
      {cases.cells7.map((cellArray, index) => (
        <>
          <span>{cases.rows[index]}</span>
          {cellArray.map((cell) => (
            <span className="cell" style={{backgroundColor:cell.bgcolor}}>{Math.round(cell.value)}</span>
          ))}
        </>
      ))}
    </div>
  );
}

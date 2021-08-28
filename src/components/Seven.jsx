import styles from "./Seven.module.scss";

export default function Seven({ cases }) {
  return (
    <div className={styles.table}>
      <span>Statistikdatum</span>
      {cases.columns.map((region) => (
        <span className={styles.region}>{region}</span>
      ))}
      {cases.cells7.map((cellArray, index) => (
        <>
          <span>{cases.rows[index]}</span>
          {cellArray.map((cell) => (
            <span
              className={styles.cell}
              style={{ backgroundColor: cell.bgcolor }}
            >
              {Math.round(cell.value)}
            </span>
          ))}
        </>
      ))}
    </div>
  );
}

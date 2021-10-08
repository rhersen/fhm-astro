import styles from "./Change.module.scss";

export default function Change({ cases } = {}) {
  return (
    <div className={styles.table}>
      <span>Statistikdatum</span>
      {cases?.columns.map((region) => (
        <span className={styles.region}>{region}</span>
      ))}
      {cases?.cellsDiff.map((cellArray, index) => (
        <>
          <span>{cases?.rows[index * 7]}</span>
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

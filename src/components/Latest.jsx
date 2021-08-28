import styles from "./Latest.module.scss";

export default function Latest({ latest }) {
  return (
    <table className={styles.top}>
      <tr>
        <th>Region</th>
        <th>7-dagars</th>
        <th>ändring i %</th>
        <th>14-dagars</th>
      </tr>
      {latest.rows.map((row) => (
        <tr>
          <th>{row.regionName}</th>
          <td
            className={styles.value}
            style={{ backgroundColor: row.bgcolor }}
          >
            {Math.round(row.value)}
          </td>
          <td
            className={styles.diff}
            style={{ backgroundColor: row.entryDiff.bgcolor }}
          >
            {Math.round(row.entryDiff.value)}
          </td>
          <td
            className={styles.value}
            style={{ backgroundColor: row.entry14.bgcolor }}
          >
            {Math.round(row.entry14.value)}
          </td>
        </tr>
      ))}
    </table>
  );
}

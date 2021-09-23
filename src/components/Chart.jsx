import styles from "./Chart.module.scss";

export default function Chart({ cases }) {
  const { height, max, points, region, width, yValues } = cases.charts[0];
  return (
    <>
      <nav className={styles.regions}>
        <a href="/">Hem</a>
        {cases.columns.map((column) => (
          <a href={`charts/${column.toLowerCase()}`}>{column}</a>
        ))}
      </nav>
      <div className={styles.chart}>
        <svg viewBox={[0, 0, width, height].join(" ")}>
          <polyline fill="none" points={points} />
          {yValues.map((yValue) => (
            <line
              x1={0}
              y1={(yValue * height) / max}
              x2={width}
              y2={(yValue * height) / max}
            />
          ))}
        </svg>
        <div className={styles.yvalues}>
          {yValues.map((yValue) => (
            <div>{yValue}</div>
          ))}
        </div>
      </div>
    </>
  );
}

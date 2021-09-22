import styles from "./Chart.module.scss";

export default function Chart({
  dataArray: { height, max, points, region, width, yValues },
}) {
  console.log(region);
  console.log(width);
  console.log(height);
  console.log(max);
  console.log(yValues.length);
  console.log(points.length);
  return (
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
  );
}

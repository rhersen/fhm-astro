import styles from "./Chart.module.scss";
import _ from "lodash";

export default function Chart({ chart: { values } = {} } = {}) {
  const width = 800;
  const height = 600;
  const max = 1400;
  const yValues = _.range(100, max, 100);
  return (
    <div className={styles.chart}>
      <svg viewBox={[0, 0, width, height].join(" ")}>
        <polyline
          fill="none"
          points={_.map(values, (y, x, a) => [
            (x * width) / a.length,
            height * (1 - y / max),
          ])}
        />
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

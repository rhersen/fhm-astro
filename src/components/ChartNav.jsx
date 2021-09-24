import styles from "./ChartNav.module.scss";

export default function ChartNav({ columns }) {
  return (
    <nav className={styles.regions}>
      <a href="/">Hem</a>
      {columns.map((column) => (
        <a href={column.toLowerCase()}>{column}</a>
      ))}
    </nav>
  );
}

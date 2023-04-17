import styles from "./MetricsCard.module.css";

interface MetricsCardProps {
  name?: string;
  value?: string | number;
  metric?: string;
  img?: string;
};

export default function MetricsCard({name, value, metric, img}: MetricsCardProps) {
  return (
    <>
      <div className={styles.metricsCard}>
        <p>{name}</p>
        <div className={styles.metricsContent}>
          <div className={styles.imgContent}>
            <img className={styles.weatherImg} src={img}/>
          </div>
          <div>
            <h1>{value}</h1>
            <p>{metric}</p>
          </div>
        </div>
      </div>
    </>
  )
};
import styles from "./Alert.module.css";

// Importing a CSS Module gives an object mapping your class names to the
// generated unique ones: styles.alert -> "_alert_x7f2a_1".
// styles[type] picks a class by name, so type="danger" uses .danger.
// Combine several classes with a template string.
function Alert({ type = "info", children }) {
  return <div className={`${styles.alert} ${styles[type]}`}>{children}</div>;
}

export default Alert;

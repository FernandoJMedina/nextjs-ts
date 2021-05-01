import classes from "./error-alert.module.css";

interface IErrorAlert {
  children: React.ReactNode;
}

function ErrorAlert(props: IErrorAlert) {
  return <div className={classes.alert}>{props.children}</div>;
}

export default ErrorAlert;

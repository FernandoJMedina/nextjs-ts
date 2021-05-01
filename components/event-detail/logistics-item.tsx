import classes from "./logistics-item.module.css";

interface ILogisticsItem {
  children: React.ReactNode;
  icon: () => JSX.Element;
}

function LogisticsItem(props: ILogisticsItem) {
  const { icon: Icon } = props;

  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{props.children}</span>
    </li>
  );
}

export default LogisticsItem;

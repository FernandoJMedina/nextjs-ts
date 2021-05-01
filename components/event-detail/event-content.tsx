import classes from "./event-content.module.css";

interface IEventContent {
  children: React.ReactNode;
}

function EventContent(props: IEventContent) {
  return <section className={classes.content}>{props.children}</section>;
}

export default EventContent;

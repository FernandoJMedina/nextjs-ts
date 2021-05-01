import { Event } from "../../types";
import EventItem from "./event-item";
import css from "./event-list.module.css";

interface IEventList {
  items: Event[];
}

export function EventList(props: IEventList) {
  const { items } = props;

  return (
    <ul className={css.list}>
      {items.map(event => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          image={event.image}
          location={event.location}
          date={event.date}
        />
      ))}
    </ul>
  );
}

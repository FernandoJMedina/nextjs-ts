import Image from "next/image";
import Link from "next/link";
import { Event } from "../../types";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import DateIcon from "../icons/date-icon";
import Button from "../ui/button";
import css from "./event-item.module.css";

type EventItem = Omit<Event, "description" | "isFeatured">;

export default function EventItem(props: EventItem) {
  const { title, image, date, location, id } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;

  return (
    <li className={css.item}>
      {/* <Image src={"/" + image} alt={title} width={244} height={224} /> */}
      <img src={"/" + image} alt={title} />
      <div className={css.content}>
        <div className={css.summary}>
          <h2>{title}</h2>
          <div className={css.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={css.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={css.actions}>
          <Button link={exploreLink}>
            <span> Explore Event</span>
            <span className={css.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}

import AddressIcon from "../icons/address-icon";
import DateIcon from "../icons/date-icon";
import LogisticsItem from "./logistics-item";
import classes from "./event-logistics.module.css";
import { Event } from "../../types";
import Image from "next/image";

type EventLogistics = Omit<Event, "description" | "id" | "isFeatured">;

function EventLogistics(props: EventLogistics) {
	const { date, location, image, title } = props;

	const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
	const addressText = location.replace(", ", "\n");

	return (
		<section className={classes.logistics}>
			<div className={classes.image}>
				<Image src={`/${image}`} alt={title} width={500} height={500} />
			</div>
			<ul className={classes.list}>
				<LogisticsItem icon={DateIcon}>
					<time>{humanReadableDate}</time>
				</LogisticsItem>
				<LogisticsItem icon={AddressIcon}>
					<address>{addressText}</address>
				</LogisticsItem>
			</ul>
		</section>
	);
}

export default EventLogistics;

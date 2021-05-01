import Link from "next/link";
import css from "./button.module.css";

interface IButton {
  children: React.ReactNode;
  link?: string;
  onClick?: () => void;
}

export default function Button(props: IButton) {
  if (props.link) {
    return (
      <Link href={props.link}>
        <a className={css.btn}>{props.children}</a>
      </Link>
    );
  }

  return (
    <button className={css.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

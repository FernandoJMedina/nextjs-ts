import MainHeader from "./main-header";

interface ILayout {
  children: React.ReactNode;
}

export default function Layout(props: ILayout) {
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
    </>
  );
}

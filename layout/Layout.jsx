import classnames from "classnames";

export default function Layout(comp) {
  const { children, className } = comp;

  return (
    <div className={classnames("layout", { [className]: className })}>
      <div className="content">{children}</div>
    </div>
  );
}

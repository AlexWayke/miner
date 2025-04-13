import { JSX } from "react";
import "./style.scss";

function Layout({ children }: { children: JSX.Element[] }) {
  return <div className="layout">{children}</div>;
}

export default Layout;

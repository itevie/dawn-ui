import { HTMLAttributes, ReactNode } from "react";
import Words from "./Words";
import { combineClasses } from "../util";
import Breadcrumb from "./Breadcrumb";
import Link from "./Link";
import ThemeButton from "./ThemeButton";
import Row from "./Row";

export default function Navbar({
  children,
  pageTitle,
  title,
  noPage,
  breadcrumb,
  link,
  ...rest
}: {
  pageTitle?: string;
  title?: ReactNode;
  breadcrumb?: boolean;
  noPage?: boolean;
  children?: ReactNode;
  link?: string;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      <div {...rest} className="dawn-navbar">
        <div
          className={combineClasses(
            "dawn-navbar-content",
            !noPage ? "dawn-navbar-page-align" : ""
          )}
        >
          <Link style={{ color: "white" }} noHighlight href={link ?? "/"}>
            <Words type="navbar">{title}</Words>
          </Link>
          <Row util={["no-gap", "align-center"]}>
            {children}
            <ThemeButton style={{ alignItems: "flex-end" }} />
          </Row>
        </div>
      </div>
      {pageTitle || breadcrumb ? (
        <div
          className={combineClasses(
            "dawn-navbar-below",
            !noPage ? "dawn-navbar-page-align" : ""
          )}
        >
          {pageTitle ? (
            <Words type="page-title">{pageTitle}</Words>
          ) : (
            <div></div>
          )}
          {breadcrumb && (
            <Breadcrumb url={new URL(window.location.toString())} />
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

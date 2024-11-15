import { ReactNode } from "react";
import Words from "./Words";
import { combineClasses } from "../util";
import Breadcrumb from "./Breadcrumb";

export default function Navbar({
  children,
  pageTitle,
  title,
  noPage,
  breadcrumb,
}: {
  pageTitle?: ReactNode;
  title?: string;
  breadcrumb?: boolean;
  noPage?: boolean;
  children?: ReactNode;
}) {
  return (
    <>
      <div className="dawn-navbar">
        <div
          className={combineClasses(
            "dawn-navbar-content",
            !noPage ? "dawn-navbar-page-align" : ""
          )}
        >
          <Words type="navbar">{title}</Words>
          {children}
        </div>
      </div>
      {pageTitle || breadcrumb ? (
        <div
          className={combineClasses(
            "dawn-navbar-below",
            !noPage ? "dawn-navbar-page-align" : ""
          )}
        >
          {pageTitle ?? <div></div>}
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

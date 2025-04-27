import { HTMLAttributes, ReactNode } from "react";
import { combineClasses, OptionalChildren, UtilClassNames } from "../util";

export enum TextType {
  /** The default text */
  Normal = "normal",

  /** Used for denoting a section of data in a container */
  Heading = "heading",

  /** Subsection under a header */
  Heading2 = "heading-2",

  /** Used for under/side text, e.g. underneath an input */
  Small = "small",

  /** Used for titles in containers */
  ContainerTitle = "container-title",

  /** Used in the text at the top */
  Navbar = "navbar",

  /** Used at the very start of pages */
  PageTitle = "page-title",
}

export interface WordsProps {
  /** The type of the text, default is Normal */
  type?: TextType;

  util?: UtilClassNames[];
}

export default function Words({
  type = TextType.Normal,
  children,
  util,
  ...rest
}: WordsProps & OptionalChildren & HTMLAttributes<HTMLElement>) {
  const className = combineClasses(
    `dawn-text dawn-text-${type}`,
    rest.className,
    util,
  );

  switch (type) {
    case TextType.Heading:
      return (
        <h1 {...rest} className={className}>
          {children}
        </h1>
      );
    case TextType.Heading2:
      return (
        <h2 {...rest} className={className}>
          {children}
        </h2>
      );
    case TextType.Small:
      return (
        <small {...rest} className={className}>
          {children}
        </small>
      );
    default:
      return (
        <label {...rest} className={className}>
          {children}
        </label>
      );
  }
}

import { HTMLAttributes } from "react";
import { OptionalChildren } from "../util";
import Button, { ButtonProps } from "./Button";
import Column from "./Column";
import GoogleMatieralIcon from "./GoogleMaterialIcon";
import Words from "./Words";

export default function IconButton({
  icon,
  text,
  ...rest
}: { text: string; icon: string } & ButtonProps &
  OptionalChildren &
  HTMLAttributes<HTMLButtonElement>) {
  return rest.big ? (
    <Button {...rest}>
      <Column util={["small-gap"]}>
        <GoogleMatieralIcon size="48px" name={icon} />
        <Words>{text}</Words>
      </Column>
    </Button>
  ) : (
    <></>
  );
}

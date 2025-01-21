import { forwardRef, HTMLAttributes } from "react";
import Column from "./Column";
import { combineStyles } from "../util";

const InputWithName = forwardRef<
  HTMLInputElement,
  { name: string } & HTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <Column util={["no-gap"]}>
      <label>{props.name}</label>
      <input
        ref={ref}
        {...props}
        style={combineStyles({ width: "300px" }, props.style)}
      />
    </Column>
  );
});

export default InputWithName;

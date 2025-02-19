import { forwardRef, HTMLAttributes, useState } from "react";
import Column from "./Column";
import { combineStyles } from "../util";
import Row from "./Row";

const Range = forwardRef<
  HTMLInputElement,
  { name: string } & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>((props, ref) => {
  const [value, setValue] = useState<string>(
    props.defaultValue?.toString() || "0"
  );

  return (
    <Row util={["align-center"]}>
      <label>{props.name}</label>
      <input
        type="range"
        ref={ref}
        {...props}
        onChange={(e) => {
          setValue(e.currentTarget.value);
          props?.onChange?.(e);
        }}
        style={combineStyles({ width: "300px" }, props.style)}
      />
      <label>{value}</label>
    </Row>
  );
});

export default Range;

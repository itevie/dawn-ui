/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Button from "./Button";
import Row from "./Row";

export default function MultiSelect(props: {
  elements: string[];
  onChange: (values: string[]) => void;
  selected: string[];
  updateSelectedKey: number;
}) {
  const [selected, setSelected] = useState<string[]>([]);

  function setElementSelected(element: string) {
    setSelected((old) => {
      if (old.includes(element)) {
        const newElements = [...old];
        newElements.splice(old.indexOf(element), 1);
        return [...newElements];
      }

      return [...old, element];
    });
  }

  useEffect(() => {
    setSelected(props.selected);
  }, [props.updateSelectedKey]);

  useEffect(() => {
    props.onChange([...selected]);
  }, [selected]);

  return (
    <Row util={["flex-wrap"]}>
      {props.elements.map((x) => (
        <Button
          key={x}
          onClick={() => setElementSelected(x)}
          type={selected.includes(x) ? "accent" : "normal"}
        >
          {x}
        </Button>
      ))}
    </Row>
  );
}

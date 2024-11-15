import { useEffect, useState } from "react";
import Button from "./Button";
import Row from "./Row";

export default function ArrayInput(props: {
  input: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  onChange: (values: any[]) => void;
  currentValues?: any[];
  updateKey?: string;
}) {
  const [inputs, setInputs] = useState<number[]>([]);
  const [values, setValues] = useState<any[]>([]);

  useEffect(() => {
    if (props.currentValues) {
      if (props.currentValues) {
        setValues([...props.currentValues]);
        props.onChange([...props.currentValues]);
      } else {
        setValues([props.input.value || "1"]);
        props.onChange([props.input.value || "1"]);
      }

      const inp = [];
      for (let i = 0; i !== props.currentValues.length; i++) {
        inp.push(Math.random());
      }
      setInputs(inp);
    } else addInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.updateKey]);

  function addInput() {
    setValues((old) => [...old, props.input.value || "1"]);
    props.onChange([...values, props.input.value || "1"]);
    setInputs((old) => [...old, Math.random()]);
  }

  function inputUpdated(
    event: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) {
    let newValue: any = event.target.value;
    if (event.target.type === "checkbox") {
      newValue = event.target.checked;
    }

    const index = inputs.findIndex((x) => x === key);
    if (index === -1) {
      return;
    }

    setValues((oldValues) => {
      const newValues = [...oldValues];
      newValues[index] = newValue;

      setTimeout(() => {
        props.onChange(newValues);
      }, 100);

      return newValues;
    });
  }

  function removeInput(key: number) {
    setValues((oldValues) => {
      const newValues = [...oldValues];
      newValues.splice(
        inputs.findIndex((x) => x === key),
        1
      );

      setTimeout(() => {
        props.onChange(newValues);
      }, 100);

      return newValues;
    });
    setInputs((oldInputs) => {
      const newInputs = [...oldInputs];
      newInputs.splice(
        inputs.findIndex((x) => x === key),
        1
      );
      return newInputs;
    });
  }

  return (
    <div>
      {inputs.map((x) => (
        <div key={x}>
          <Row>
            <input
              {...props.input}
              {...(props.input.type === "checkbox"
                ? { checked: values[inputs.findIndex((y) => y === x)] }
                : { value: values[inputs.findIndex((y) => y === x)] })}
              onChange={(i) => inputUpdated(i, x)}
            />
            <Button onClick={() => removeInput(x)}>X</Button>
          </Row>
          <br />
        </div>
      ))}
      <Button onClick={addInput}>Add</Button>
    </div>
  );
}

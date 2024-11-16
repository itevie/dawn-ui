import { ReactNode, useState } from "react";
import Button from "./Button";
import Row from "./Row";
import Column from "./Column";

export default function Tabbed({
  children,
}: {
  children: { [key: string]: ReactNode };
}) {
  const [selectedTab, setSelectedTab] = useState<string>(
    Object.keys(children)[0]
  );

  return (
    <Column util={["no-gap"]}>
      <Row className="dawn-tab-tabs" util={["no-gap"]}>
        {Object.keys(children).map((x) => (
          <Button
            className={x === selectedTab ? "dawn-active" : ""}
            key={x}
            onClick={() => setSelectedTab(x)}
            big
          >
            {x}
          </Button>
        ))}
      </Row>
      <div className="dawn-tab-contents">{children[selectedTab]}</div>
    </Column>
  );
}

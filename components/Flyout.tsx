import { cloneElement, ReactElement, useEffect, useState } from "react";

interface FlyoutData {
  direction?: "up" | "down" | "left" | "right";
  text: string;
}

export let setFlyout = (
  flyout: FlyoutData,
  event: React.MouseEvent<any, MouseEvent>
) => {};
export let hideFlyout = () => {};

export function FlyoutManager() {
  const [xy, setXy] = useState<[number, number]>([0, 0]);
  const [flyout, _setFlyout] = useState<FlyoutData | null>(null);

  useEffect(() => {
    let timeout: any = undefined;
    setFlyout = (f, e) => {
      _setFlyout(f);
      let pos = [e.clientX, e.clientY + 15];
      setXy(pos as [number, number]);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        hideFlyout();
      }, 1000);
    };

    hideFlyout = () => {
      _setFlyout(null);
    };
  }, []);

  return (
    flyout && (
      <div
        className="dawn-flyout"
        style={{ top: `${xy[1]}px`, left: `${xy[0]}px` }}
      >
        {flyout?.text}
      </div>
    )
  );
}

export default function Flyout({
  children,
  ...flyout
}: FlyoutData & { children: ReactElement }) {
  const child = cloneElement(children, {
    onMouseOver: (e: React.MouseEvent<any, MouseEvent>) => {
      setFlyout(flyout, e);
    },
    onMouseLeave: () => {
      hideFlyout();
    },
  });

  return child;
}

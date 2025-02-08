import { cloneElement, ReactElement, useEffect, useState } from "react";

interface FlyoutData {
  direction?: "up" | "down" | "left" | "right";
  text: string;
  timeout?: number;
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
  const [prev, setPrev] = useState<[number, number] | null>(null);
  const [shown, setShown] = useState<boolean>(false);

  const child = cloneElement(children, {
    onMouseMove: (e: React.MouseEvent<any, MouseEvent>) => {
      if (!flyout.timeout) return setFlyout(flyout, e);

      if (shown || (prev && isWithinRange(...prev, e.clientX, e.clientY, 3)))
        return;
      setPrev([e.clientX, e.clientY]);

      setTimeout(() => {
        if (prev === null) return;
        if (isWithinRange(...prev, e.clientX, e.clientY, 10)) {
          setFlyout(flyout, e);
          setPrev(null);
          setShown(true);
        }
      }, flyout.timeout);
    },
    onMouseLeave: () => {
      setShown(false);
      hideFlyout();
    },
  });

  return child;
}

function isWithinRange(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  range = 5
) {
  return Math.abs(x1 - x2) <= range && Math.abs(y1 - y2) <= range;
}

import { ReactNode, useEffect, useState } from "react";
import Button, { ButtonType } from "./Button";
import Container from "./Container";
import Row from "./Row";
import Loader from "react-spinners/PulseLoader";
import Column from "./Column";
import GoogleMatieralIcon from "./GoogleMaterialIcon";
import ProgressBar from "./ProgressBar";
import "./alerts.css";
import { dawnUIConfig } from "../config";

interface Model {
  id?: string;
  title?: ReactNode;
  body: ReactNode;
  buttons?: ModelButton[];
  noClose?: boolean;
}

interface ModelButton {
  text: ReactNode;
  id: string;
  type?: ButtonType;
  click: (close: () => void) => void;
  enterKey?: boolean;
}

export let alertStack: Model[] = [];
export let addAlert: (data: Model) => void = () => {};
export let closeAlert: (id?: string) => void = () => {};
export let updateAlert: (id: string, newElement: ReactNode) => void = () => {};

export default function AlertManager() {
  const [current, setCurrent] = useState<Model | null>(null);

  useEffect(() => {
    addAlert = (model) => {
      alertStack.push(model);
      reload();
    };

    closeAlert = (id) => {
      if (id) {
        const index = alertStack.findIndex((x) => x.id === id);
        if (index < 0) return reload();
        alertStack.splice(index, 1);
        reload();
      } else {
        alertStack.pop();
        reload();
      }
    };

    updateAlert = (id, el) => {
      const index = alertStack.findIndex((x) => x.id === id);
      if (index < 0) return;
      alertStack[index] = {
        ...alertStack[index],
        body: el,
      };
      reload();
    };
  }, []);

  function reload() {
    setCurrent(alertStack[alertStack.length - 1]);
  }

  function close() {
    alertStack.pop();
    reload();
  }

  return (
    current && (
      <div
        className="dawn-fullscreen"
        style={{ top: `${window.scrollY}px` }}
        onClick={(e) => {
          if ((e.target as HTMLElement).classList.contains("dawn-fullscreen"))
            !current.noClose && close();
        }}
      >
        <div className="dawn-page-center">
          <Container
            className="dawn-alert"
            util={["ignore-responsive-mobile"]}
            style={{ position: "relative" }}
          >
            {!current.noClose ? (
              <GoogleMatieralIcon
                util={["clickable", "hover-grow"]}
                name={"close"}
                style={{ position: "absolute", right: "15px" }}
                onClick={close}
              />
            ) : (
              <></>
            )}
            {current.title && (
              <label className="dawn-text-alert-title">{current.title}</label>
            )}
            <div className="dawn-alert-content">{current.body}</div>
            <Row>
              {current.buttons?.map((button) => (
                <Button key={button.id} big onClick={() => button.click(close)}>
                  {button.text}
                </Button>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    )
  );
}

export function showErrorAlert(message: ReactNode, title?: ReactNode) {
  return new Promise<void>((resolve) => {
    addAlert({
      title: title ?? dawnUIConfig.strings.errorTitle,
      body: <label>{message}</label>,
      buttons: [
        {
          id: "ok",
          text: dawnUIConfig.strings.ok,
          enterKey: true,
          click: (close) => {
            close();
            resolve();
          },
        },
      ],
    });
  });
}

export function showInfoAlert(message: ReactNode) {
  return new Promise<void>((resolve) => {
    addAlert({
      title: dawnUIConfig.strings.informationTitle,
      body: message,
      buttons: [
        {
          id: "ok",
          text: dawnUIConfig.strings.ok,
          enterKey: true,
          click: (close) => {
            close();
            resolve();
          },
        },
      ],
    });
  });
}

export function showLoadingAlert(): {
  stop: () => void;
  progress: (amount: number) => void;
} {
  const id = Math.random().toString();

  addAlert({
    id,
    body: <Loader color="white" />,
    noClose: true,
  });

  return {
    stop: () => closeAlert(id),
    progress: (amount) => {
      updateAlert(
        id,

        <Column util={["align-center", "justify-center"]}>
          <Loader color="white" />
          <div>
            <ProgressBar max={100} size={5} current={amount * 100} />
            <label>{(amount * 100).toFixed(2)}%</label>
          </div>
        </Column>,
      );
    },
  };
}

export function showConfirmModel(title: ReactNode, yesCb: () => void): void {
  addAlert({
    title: dawnUIConfig.strings.confirmTitle,
    body: <label>{title}</label>,
    buttons: [
      {
        id: "no",
        text: dawnUIConfig.strings.no,
        click: (c) => c(),
      },
      {
        id: "yes",
        text: dawnUIConfig.strings.yes,
        enterKey: true,
        click: (c) => {
          c();
          yesCb();
        },
      },
    ],
  });
}

export function showInputAlert(title: ReactNode): Promise<string | null> {
  return new Promise<string | null>((resolve) => {
    let current: string | null = null;

    addAlert({
      title,
      body: (
        <input
          autoFocus
          className="dawn-big"
          onChange={(e) => (current = e.currentTarget.value)}
        />
      ),
      buttons: [
        {
          id: "close",
          click: (close) => {
            close();
            resolve(null);
          },
          text: dawnUIConfig.strings.cancel,
        },
        {
          id: "ok",
          enterKey: true,
          click: (close) => {
            close();
            resolve(current);
          },
          text: dawnUIConfig.strings.ok,
        },
      ],
    });
  });
}

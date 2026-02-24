import { MouseEvent, useEffect, useState } from "react";
// import showImageContextMenu from "../../components/context-menus/imageContextMenu";
import Column from "./Column";
import Row from "./Row";
import Button from "./Button";

export interface FullscreenImageConfig {
  image: string;
  images?: string[];
  onContextMenu?: (e: MouseEvent<HTMLImageElement>, image: string) => any;
}

export let setFullscreenImage: (
  config: FullscreenImageConfig,
) => void = () => {};

export default function ImageViewer() {
  const [config, setConfig] = useState<FullscreenImageConfig | null>(null);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    setFullscreenImage = (c) => {
      if (!c.images) c.images = [c.image];
      setConfig(c);
      setIndex(c.images.indexOf(c.image));
    };
  }, []);

  return config && config.images!.length > 0 ? (
    <div
      className="dawn-fullscreen"
      onClick={(e) => !(e.target instanceof HTMLDivElement) && setConfig(null)}
    >
      <div
        className="dawn-page-center"
        onClick={(e) =>
          !(e.target instanceof HTMLDivElement) && setConfig(null)
        }
      >
        <Column util={["justify-center", "align-center"]}>
          <img
            className="sy-image-fullscreen"
            src={config.images![index] ?? ""}
            onContextMenu={(e) =>
              config.onContextMenu?.(e, config.images![index])
            }
          />
          {config.images!.length > 1 && (
            <Row util={["justify-center"]}>
              <Button
                style={{ fontSize: "2em" }}
                onClick={() =>
                  setIndex(index === 0 ? config.images!.length - 1 : index - 1)
                }
              >
                ←
              </Button>
              <Button
                style={{ fontSize: "2em" }}
                onClick={() =>
                  setIndex(index === config.images!.length - 1 ? 0 : index + 1)
                }
              >
                →
              </Button>
            </Row>
          )}
        </Column>
      </div>
    </div>
  ) : (
    <></>
  );
}

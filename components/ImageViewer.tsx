import { MouseEvent, useEffect, useState } from "react";
import showImageContextMenu from "../../components/context-menus/imageContextMenu";
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
  const [images, setImages] = useState<string[]>([]);
  const [config, setConfig] = useState<FullscreenImageConfig>({} as any);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    setFullscreenImage = (config) => {
      if (!config.images) {
        setImages([config.image]);
        setIndex(0);
      } else {
        setImages(images);
        setIndex(images.indexOf(config.image));
      }
    };
  }, []);

  return images.length > 0 ? (
    <div
      className="dawn-fullscreen"
      onClick={(e) => !(e.target instanceof HTMLButtonElement) && setImages([])}
    >
      <div
        className="dawn-page-center"
        onClick={(e) =>
          !(e.target instanceof HTMLButtonElement) && setImages([])
        }
      >
        <Column util={["justify-center", "align-center"]}>
          <img
            className="sy-image-fullscreen"
            src={images[index] ?? ""}
            onContextMenu={(e) => config.onContextMenu?.(e, images[index])}
          />
          {images.length > 1 && (
            <Row util={["justify-center"]}>
              <Button
                style={{ fontSize: "2em" }}
                onClick={() =>
                  setIndex(index === 0 ? images.length - 1 : index - 1)
                }
              >
                ←
              </Button>
              <Button
                style={{ fontSize: "2em" }}
                onClick={() =>
                  setIndex(index === images.length - 1 ? 0 : index + 1)
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

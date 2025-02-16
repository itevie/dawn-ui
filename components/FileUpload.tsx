import { ReactNode, useState } from "react";
import uploadFile from "../uploadFile";

export default function UploadFile({
  children,
  filter,
  noLabel,
  onChange,
}: {
  children: ReactNode;
  filter?: string;
  noLabel?: boolean;
  onChange: (dataUrl: string) => void;
}) {
  const [fileName, setFileName] = useState<string>("");

  function _uploadFile() {
    uploadFile(filter).then((res) => {
      setFileName(res.name);
      onChange(res.result);
    });
  }

  return (
    <div onClick={_uploadFile}>
      {children}
      {!noLabel && <label>{fileName}</label>}
    </div>
  );
}

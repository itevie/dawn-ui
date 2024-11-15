import { ReactNode, useState } from "react";
import { showErrorAlert } from "./AlertManager";

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

  function uploadFile() {
    const input = document.createElement("input");
    input.type = "file";

    input.onchange = (_) => {
      if (input.files?.length !== 1) {
        return showErrorAlert("Expected only 1 file to be selected");
      }

      const file = input.files[0];
      if (filter && !file.type.startsWith(filter)) {
        return showErrorAlert("Invalid file type! Expected: " + filter);
      }

      setFileName(file.name);

      const reader = new FileReader();

      reader.onload = (file) => {
        if (!file.target || !file.target.DONE) return;
        onChange(file.target.result as string);
      };

      reader.readAsDataURL(file);
    };

    input.click();
  }

  return (
    <div onClick={uploadFile}>
      {children}
      {!noLabel && <label>{fileName}</label>}
    </div>
  );
}

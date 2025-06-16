import { showErrorAlert } from "./components/AlertManager";

export default async function uploadFile(
  filter?: string,
): Promise<{ name: string; result: string } | null> {
  return new Promise((res, rej) => {
    const input = document.createElement("input");
    input.type = "file";
    if (filter) input.accept = filter;

    input.onchange = (_) => {
      if (input.files?.length !== 1) {
        showErrorAlert("Expected only 1 file to be selected");
        res(null);
        return;
      }

      const file = input.files[0];
      /*if (filter && !file.type.startsWith(filter)) {
        return showErrorAlert(
          "Invalid file type! Expected: " + filter + ", but got " + file.type
        );
      }*/

      const reader = new FileReader();

      reader.onload = (f) => {
        if (!f.target || !f.target.DONE) return;
        res({
          name: file.name,
          result: f.target.result?.toString() as string,
        });
      };

      reader.readAsDataURL(file);
    };

    input.click();
  });
}

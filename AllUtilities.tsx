import AlertManager from "./components/AlertManager";
import CommandPaletteManager from "./components/CommandPaletteManager";
import ContextMenuManager from "./components/ContextMenuManager";
import { FlyoutManager } from "./components/Flyout";

export default function AllUtilities() {
  return (
    <>
      <ContextMenuManager />
      <AlertManager />
      <FlyoutManager />
      <CommandPaletteManager />
    </>
  );
}

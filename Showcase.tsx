import { useState } from "react";
import Button, { ButtonType } from "./components/Button";
import Column from "./components/Column";
import Container from "./components/Container";
import Link from "./components/Link";
import MultiSelect from "./components/MultiSelect";
import Page from "./components/Page";
import Row from "./components/Row";
import Words from "./components/Words";
import Navbar from "./components/Navbar";
import {
  addAlert,
  showConfirmModel as showConfirmAlert,
  showErrorAlert,
  showInfoAlert,
  showInputAlert,
  showLoadingAlert,
} from "./components/AlertManager";
import { showContextMenu } from "./components/ContextMenuManager";
import GoogleMatieralIcon from "./components/GoogleMaterialIcon";
import Breadcrumb from "./components/Breadcrumb";
import UploadFile from "./components/FileUpload";
import Banner from "./components/Banner";
import Tabbed from "./components/Tabbed";
import { setTheme } from ".";
// @ts-ignore
import wallpaper from "./images/wallpaper.jpg";
import Sidebar from "./components/Sidebar";
import FullPage from "./components/FullPage";
import Content from "./components/Content";
import SidebarButton from "./components/SidebarButton";

export default function Showcase() {
  const [multiSelected, setMultiSelected] = useState<string[]>([]);
  const [background, setBackground] = useState<boolean>(false);

  return (
    <div
      style={{
        backgroundImage: `${background ? `url(${wallpaper})` : ""}`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
        height: "100vh",
        width: "100vw",
        overflow: "auto",
      }}
    >
      <Row>
        <input
          key={Math.random()}
          checked={background}
          onChange={(e) => setBackground(e.currentTarget.checked)}
          type="checkbox"
        />
        <label>Enable Background</label>
      </Row>
      <Tabbed>
        {{
          main: (
            <>
              <Navbar title="Dawn UI Debug (Navbar)" breadcrumb>
                <Button type="inherit">Button 1</Button>
                <Button type="inherit">Button 2</Button>
                <Button type="inherit">Button 3</Button>
                <Button
                  type="inherit"
                  onClick={() => {
                    setTheme("dark-transparent", true);
                  }}
                >
                  Apply Transparent Theme
                </Button>
              </Navbar>
              <Page>
                <Banner title="Dawn Debug">
                  Nunc efficitur fermentum elit, a dictum diam suscipit id. Ut
                  aliquet at risus et porttitor. Nulla accumsan ultrices mauris
                  et bibendum. Donec sed ultrices velit, eu ornare urna. Aliquam
                  ullamcorper odio in hendrerit condimentum. Praesent vulputate,
                  felis vel molestie consectetur, felis erat tincidunt nulla,
                  quis interdum massa dui non risus. Integer eu eros vel metus
                  pulvinar egestas. Cras ligula felis, venenatis at accumsan
                  vel, hendrerit vel elit. Fusce facilisis elit sit amet libero
                  suscipit, non convallis libero ultrices. Donec id augue
                  tincidunt turpis lobortis ornare. Proin tincidunt ipsum orci.
                  Nullam urna massa, efficitur vitae aliquet vitae, tincidunt
                  interdum nibh. Aenean tristique velit et risus feugiat congue.
                  Vestibulum eget lectus a urna pulvinar placerat. Nulla
                  vulputate diam ante, vel consequat purus facilisis vitae.
                </Banner>
                <Words type="page-title">page-title</Words>
                <Column>
                  <Container></Container>
                  <Container>
                    <Words type="container-title">container-title</Words>
                    <label>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Fusce ac libero eros. Vivamus eget ligula metus. Lorem
                      ipsum dolor sit amet, consectetur adipiscing elit. Duis
                      ultrices, turpis bibendum ullamcorper tristique, nibh
                      justo viverra dolor, tincidunt scelerisque urna velit quis
                      odio. Proin urna dui, maximus ut tristique scelerisque,
                      efficitur sed nisi. Maecenas nec imperdiet leo. Nulla eu
                      condimentum ante, nec lobortis nulla. Ut in est in eros
                      molestie euismod. Pellentesque habitant morbi tristique
                      senectus et netus et malesuada fames ac turpis egestas.
                      Nulla eget ex sit amet odio gravida iaculis. Quisque sed
                      magna bibendum, aliquet erat ac, posuere mauris. Sed
                      ullamcorper massa felis, a posuere dolor sollicitudin in.
                      Donec pellentesque ex est, ut iaculis neque condimentum
                      id. Proin imperdiet, leo sed rutrum maximus, nibh libero
                      suscipit eros, pharetra interdum orci eros vitae mauris.
                      Duis id rutrum felis, sed venenatis est. Maecenas congue,
                      mi id sodales accumsan, diam augue pharetra diam, quis
                      lacinia orci nulla nec ligula. Sed quis ipsum quis nibh
                      euismod luctus. Morbi efficitur erat sem. Nunc a tortor
                      rhoncus, luctus nisi in, fringilla lorem.
                    </label>
                  </Container>
                  <Container hover>Hoverable Container</Container>
                  <Link href="#" noHighlight>
                    <Container hover>
                      <Words type="container-title">Container in a Link</Words>
                      <label>
                        Lorum ipsum dolar sit amet, consectetur adipiscing elit.
                      </label>
                    </Container>
                  </Link>
                  <Container>
                    <Words type="container-title">&lt;Words&gt;</Words>
                    <Words type="page-title">page-title</Words>
                    <Words type="container-title">container-title</Words>
                  </Container>
                  <Container>
                    <Words type="container-title">&lt;Button&gt;</Words>
                    <Button>normal</Button>
                    <Button type="success">success</Button>
                    <Button type="danger">danger</Button>
                    <Button type="inherit">inherit</Button>

                    <Button big>big normal</Button>
                    <Button big type="success">
                      big success
                    </Button>
                    <Button big type="danger">
                      big danger
                    </Button>
                    <Button big type="inherit">
                      big inherit
                    </Button>
                    <small>small</small>
                  </Container>
                  {["danger", "success", "accent"].map((x) => (
                    <Container
                      title={`Elements, but all ${x}`}
                      className={`dawn-${x}`}
                    >
                      <Button type={x as ButtonType}>Button</Button>
                      <Button big type={x as ButtonType}>
                        Button Big
                      </Button>
                      <Words className={`dawn-${x}`}>Words</Words>
                      <Words type="page-title" className={`dawn-${x}`}>
                        page-title words
                      </Words>
                    </Container>
                  ))}

                  <Container title="Progress Bars">
                    <Column>
                      <progress />
                      <progress value="10" />
                      <progress value="10" max="100" />
                    </Column>
                  </Container>

                  <Container>
                    <Words type="container-title">Other Controls</Words>
                    <Link href="#">Link</Link>
                    <table>
                      <tbody>
                        <tr>
                          <td>Normal</td>
                          <td>
                            <input />
                          </td>
                        </tr>
                        <tr>
                          <td>Checkbox</td>
                          <td>
                            <input type="checkbox" />
                            <input type="checkbox" />
                            <input type="checkbox" checked />
                            <input type="checkbox" checked />
                          </td>
                        </tr>
                        <tr>
                          <td>Range</td>
                          <td>
                            <input type="range" />
                          </td>
                        </tr>
                        <tr>
                          <td>Color</td>
                          <td>
                            <input type="color" />
                          </td>
                        </tr>
                        <tr>
                          <td>&lt;MultiSelect&gt;</td>
                          <td>
                            <Row util={["align-center"]}>
                              <MultiSelect
                                onChange={(a) => setMultiSelected(a)}
                                updateSelectedKey={0}
                                selected={["a", "c"]}
                                elements={"abcdef".split("")}
                              />
                              <label>
                                Selected: {multiSelected.join(", ")}
                              </label>
                            </Row>
                          </td>
                        </tr>
                        <tr>
                          <td>Upload File</td>
                          <td>
                            <UploadFile
                              onChange={(e) =>
                                showInfoAlert(e.substring(0, 500))
                              }
                            >
                              <Button>Upload</Button>
                            </UploadFile>
                          </td>
                        </tr>
                        <tr>
                          <td>Upload File (No Label)</td>
                          <td>
                            <UploadFile
                              noLabel
                              onChange={(e) =>
                                showInfoAlert(e.substring(0, 500))
                              }
                            >
                              <Button>Upload</Button>
                            </UploadFile>
                          </td>
                        </tr>
                        <tr>
                          <td>Upload File (want .txt)</td>
                          <td>
                            <UploadFile
                              filter="text/plain"
                              onChange={(e) =>
                                showInfoAlert(e.substring(0, 500))
                              }
                            >
                              <Button>Upload</Button>
                            </UploadFile>
                          </td>
                        </tr>
                        <tr>
                          <td>Textarea</td>
                          <td>
                            <textarea></textarea>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <label>Big textarea:</label>
                    <textarea></textarea>
                  </Container>
                  <Container title="Tabs">
                    <Tabbed>
                      {{
                        test: "Test Tab!",
                        test2: "Test Tab 2!",
                        test3: <Button>Test Tab 3!</Button>,
                      }}
                    </Tabbed>
                  </Container>
                  <Container>
                    <Words type="container-title">Alerts</Words>
                    <Button onClick={() => addAlert({ body: "" })}>
                      Base Alert
                    </Button>
                    <Button
                      onClick={() =>
                        addAlert({
                          title: "Title",
                          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae ipsum vulputate enim dictum scelerisque. Aliquam sed facilisis leo, tristique laoreet sem. Praesent sed imperdiet lectus. Fusce vehicula diam dui, in viverra nibh vehicula auctor. Praesent mauris odio, malesuada a arcu ut, fringilla dapibus lacus. Praesent quis iaculis massa. Proin non nisi euismod, aliquam nisi ullamcorper, vulputate purus. Etiam sed porta urna. Morbi sollicitudin ipsum venenatis orci auctor, maximus condimentum ligula consectetur. Fusce varius sagittis tellus, a feugiat libero efficitur in. Etiam eget gravida nisi. Mauris in neque vitae sapien rhoncus aliquam at ac mi. Mauris luctus consequat risus id hendrerit. Etiam et mi facilisis, ultrices lorem et, dictum ex.",
                          buttons: [
                            {
                              id: "close",
                              text: "Close",
                              click: (close) => close(),
                            },
                            {
                              id: "ok",
                              text: "OK",
                              click: (close) => close(),
                            },
                          ],
                        })
                      }
                    >
                      Average
                    </Button>
                    <Button onClick={() => showErrorAlert("Error")}>
                      Error
                    </Button>
                    <Button onClick={() => showErrorAlert("Information")}>
                      Info
                    </Button>

                    <Button
                      onClick={async () => {
                        let loader = showLoadingAlert();
                        await new Promise((resolve) =>
                          setTimeout(() => {
                            loader.progress(0.5);
                            resolve(0);
                          }, 500)
                        );
                        await new Promise((resolve) =>
                          setTimeout(() => {
                            loader.progress(0.75);
                            resolve(0);
                          }, 500)
                        );
                        await new Promise((resolve) =>
                          setTimeout(() => {
                            loader.stop();
                            resolve(0);
                          }, 500)
                        );
                      }}
                    >
                      Loader
                    </Button>
                    <Button
                      onClick={async () => {
                        showConfirmAlert("Confirm", () =>
                          showInfoAlert("Yay!")
                        );
                      }}
                    >
                      Confirm
                    </Button>
                    <Button
                      onClick={async () => {
                        let result = await showInputAlert("Enter Data");
                        showInfoAlert(result ?? "");
                      }}
                    >
                      Input
                    </Button>
                  </Container>
                  <Container title="Context Menus">
                    <p>(Right click them)</p>
                    <Button
                      onContextMenu={(e) => {
                        showContextMenu({
                          event: e,
                          elements: [],
                        });
                      }}
                    >
                      Base
                    </Button>
                    <Button
                      onContextMenu={(e) => {
                        showContextMenu({
                          event: e,
                          elements: [
                            {
                              type: "button",
                              label: "Copy Text",
                              onClick() {
                                showInfoAlert("Copy Text");
                              },
                            },
                            {
                              type: "button",
                              label: "Copy Text",
                              onClick() {
                                showInfoAlert("Copy Text");
                              },
                            },
                            {
                              type: "button",
                              label: "Copy Text Test",
                              onClick() {
                                showInfoAlert("Copy Text");
                              },
                            },
                            {
                              type: "button",
                              label: "Copy Text Tet Test",
                              onClick() {
                                showInfoAlert("Copy Text");
                              },
                            },
                            {
                              type: "seperator",
                            },
                            {
                              type: "button",
                              scheme: "danger",
                              label: "Delete",
                              onClick() {
                                showInfoAlert("Delete");
                              },
                            },
                          ],
                        });
                      }}
                    >
                      Average
                    </Button>
                  </Container>
                  <Container title="Icons">
                    <p>GoogleMaterialIcon</p>
                    {["person", "settings", "search", "menu", "home"].map(
                      (x) => (
                        <GoogleMatieralIcon name={x} />
                      )
                    )}
                  </Container>
                  <Container title="Breadcrumbs">
                    <Breadcrumb
                      url={new URL("https://dawn.rest/hypno/files/9")}
                    />
                  </Container>
                  <Words type="page-title">Rows</Words>
                  <Row>
                    <Container>A</Container>
                    <Container>B</Container>
                  </Row>
                  <Row>
                    <Container>A</Container>
                    <Container>B</Container>
                    <Container>C</Container>
                  </Row>
                  <Row>
                    <Container>A</Container>
                    <Container>B</Container>
                    <Container>C</Container>
                    <Container>D</Container>
                  </Row>
                </Column>
                <Words type="page-title">
                  Container with background (from dawn.rest)
                </Words>
                <Row util={["justify-center", "flex-wrap"]}>
                  <Container
                    small
                    hover
                    title="Hypnosis"
                    style={{
                      backgroundImage:
                        "url(https://dawn.rest/images/spiral.svg)",
                    }}
                  >
                    <label>
                      Discover the wonders of hypnosis. See my hypno files,
                      visualisations, and more.
                    </label>
                  </Container>
                  <Container
                    small
                    hover
                    title="Discord"
                    style={{
                      backgroundImage:
                        "url(https://dawn.rest/images/discord.svg)",
                    }}
                  >
                    <label>
                      Join my Discord server where we talk about hypnosis, have
                      fun events, and have a generally nice community.
                    </label>
                  </Container>
                  <Container
                    small
                    hover
                    title="Trancer"
                    style={{
                      backgroundImage:
                        "url(https://dawn.rest/images/discord.svg)",
                    }}
                  >
                    <label>See my hypnosis-related Discord bot: Trancer.</label>
                  </Container>
                  <Container
                    small
                    hover
                    title="YouTube"
                    style={{
                      backgroundImage:
                        "url(https://dawn.rest/images/youtube.svg)",
                    }}
                  >
                    <label>
                      This is my YouTube channel where I post my files too.
                    </label>
                  </Container>
                  <Container
                    small
                    hover
                    title="GitHub"
                    style={{
                      backgroundImage:
                        "url(https://dawn.rest/images/github.svg)",
                    }}
                  >
                    <label>See all my code projects I make here.</label>
                  </Container>
                </Row>
              </Page>
            </>
          ),
          sidebar: (
            <FullPage style={{ height: "calc(100vh - 100px)" }}>
              <Navbar title="Test" noPage style={{ boxShadow: "none" }}>
                <Row>
                  <Button
                    type="inherit"
                    onClick={() => {
                      setTheme("dark-transparent", true);
                    }}
                  >
                    Apply Transparent Theme
                  </Button>
                </Row>
              </Navbar>
              <Row className="full-page" util={["no-gap"]}>
                <Sidebar>
                  <SidebarButton label="Your Tasks" icon="task" />
                  <SidebarButton label="Your Groups" icon="group" />
                  <SidebarButton label="Your Account" icon="person" />
                </Sidebar>
                <Content>
                  <Column>
                    <Container small title="Hello">
                      <label>Contents</label>
                      <Button big type="danger">
                        Hey!
                      </Button>
                    </Container>
                  </Column>
                </Content>
              </Row>
            </FullPage>
          ),
        }}
      </Tabbed>
    </div>
  );
}

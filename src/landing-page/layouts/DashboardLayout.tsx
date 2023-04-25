import SideMenu from "components/SideMenu";
import ContentHeader from "components/ContentHeader";

export default function ({ children }) {
  return (
    <section className="bg-background flex w-full flex-row">
      <SideMenu />
      <div className="bg-background h-screen w-full overflow-y-scroll">
        <ContentHeader
          generateButtonLabel="Benjamin"
          onClick={() => console.log("clicked")}
        />
        <div className="flex overflow-y-hidden p-5">{children}</div>
      </div>
    </section>
  );
}

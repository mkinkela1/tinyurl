import SideMenu from "components/SideMenu";
import ContentHeader from "components/ContentHeader";

export default function ({ children }) {
  return (
    <section className="bg-background flex h-full w-full flex-row overflow-y-hidden">
      <SideMenu />
      <div className="bg-background flex h-screen w-full flex-col overflow-y-scroll">
        <ContentHeader
          generateButtonLabel="Benjamin"
          onClick={() => console.log("clicked")}
        />
        <div className="flex p-2.5">{children}</div>
      </div>
    </section>
  );
}

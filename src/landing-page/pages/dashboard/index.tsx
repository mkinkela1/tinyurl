import SideMenu from "components/SideMenu";
import ContentHeader from "components/ContentHeader";

export default function () {
  return (
    <section className="bg-background flex min-h-screen w-full flex-row">
      <SideMenu />
      <div className="flex w-full flex-col">
        <ContentHeader
          generateButtonLabel="button"
          onClick={() => console.log("clicked")}
        />
      </div>
    </section>
  );
}

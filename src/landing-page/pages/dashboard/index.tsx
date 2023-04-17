import DashboardLayout from "layouts/DashboardLayout";

export default function Index() {
  return "";
}

Index.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

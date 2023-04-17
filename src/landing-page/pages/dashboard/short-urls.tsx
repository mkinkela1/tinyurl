import DashboardLayout from "layouts/DashboardLayout";
import useColumns from "hooks/useColumns";
import { GetAllUrlsPaginatedDtoResponse } from "api-calls/GenerateApi";
import Table from "components/Table";
import Api from "api-calls/Api";
import { useState } from "react";

export default function ShortUrls() {
  const [data, setData] = useState<GetAllUrlsPaginatedDtoResponse[]>([]);
  const columns = useColumns<GetAllUrlsPaginatedDtoResponse>([
    { Header: "id", accessor: "id" },
    {
      Header: "Long url",
      accessor: "longUrl"
    },
    { Header: "Short url", accessor: "shortUrl" },
    { Header: "Created at", accessor: "createdAt" }
  ]);

  Api.urlControllerGetAllUrlsPaginated().then(({ data: { data } }) =>
    setData(data)
  );

  return <Table columns={columns} data={data} />;
}

ShortUrls.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

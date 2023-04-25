import DashboardLayout from "layouts/DashboardLayout";
import useColumns from "hooks/useColumns";
import { GetAllUrlsPaginatedDtoResponse } from "api-calls/GenerateApi";
import Table from "components/Table";
import Api from "api-calls/Api";
import { GetServerSideProps } from "next";
import DateTimeCell from "components/table-cells/DateTimeCell";
import UrlCell from "components/table-cells/UrlCell";

export default function ShortUrls({ data, meta }) {
  const columns = useColumns<GetAllUrlsPaginatedDtoResponse>([
    {
      Header: "Long url",
      accessor: "longUrl"
    },
    {
      Header: "Short url",
      accessor: "shortUrl",
      Cell: ({
        row: {
          original: { shortUrl }
        }
      }: any) => <UrlCell value={shortUrl} />
    },
    {
      Header: "Created at",
      accessor: "createdAt",
      Cell: ({
        row: {
          original: { createdAt }
        }
      }: any) => <DateTimeCell value={createdAt} />
    }
  ]);

  return <Table columns={columns} data={data} meta={meta} />;
}

ShortUrls.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    data: { data, ...meta }
  } = await Api.urlControllerGetAllUrlsPaginated({
    ...context.query,
    pageSize: 20
  });
  return {
    props: { data, meta }
  };
};

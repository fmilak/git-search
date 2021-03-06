import { Table } from "antd";
import Search from "antd/lib/input/Search";
import { observer } from "mobx-react";
import React from "react";
import { ReactElement, useContext, useEffect } from "react";
import { RootContext } from "../App";

const MainTable = observer(({ data, columns }: { data: any; columns: any }) => {
  return <Table dataSource={data} columns={columns} />;
});

const MainPage: React.FC = observer(
  (): ReactElement => {
    const { mainPageStore, restStore } = useContext(RootContext);
    mainPageStore.restStore = restStore;

    useEffect(() => {
      mainPageStore.init();
    }, [mainPageStore]);

    return (
      <div>
        <Search
          placeholder="Search text"
          onSearch={(value) => mainPageStore.filterTable(value)}
          style={{ width: 200 }}
          allowClear
          size="large"
          enterButton
          loading={mainPageStore.isLoading}
        />
        <MainTable
          columns={mainPageStore.columns}
          data={mainPageStore.shownData.slice()}
        />
      </div>
    );
  }
);

export default MainPage;

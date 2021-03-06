import { Input, Table } from "antd";
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
      <div style={{ margin: 20 }}>
        <div style={{ margin: 10 }}>
          <Search
            placeholder="Enter user"
            onSearch={(value) => mainPageStore.filterUsers(value)}
            style={{ width: 400 }}
            allowClear
            size="large"
            enterButton
            loading={mainPageStore.isLoading}
          />
          <Input
            placeholder="Enter repository name"
            onKeyUp={(event) =>
              mainPageStore.filterTable(event.currentTarget.value)
            }
            style={{ width: 400 }}
            allowClear
            size="large"
          />
        </div>
        <MainTable
          columns={mainPageStore.columns}
          data={mainPageStore.shownData.slice()}
        />
      </div>
    );
  }
);

export default MainPage;

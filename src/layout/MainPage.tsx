import { gql, useLazyQuery } from "@apollo/client";
import { Input, Table } from "antd";
import Search from "antd/lib/input/Search";
import { observer } from "mobx-react";
import React from "react";
import { ReactElement, useContext, useEffect } from "react";
import { RootContext } from "../App";
import MainPageStore from "./MainPageStore";

const SearchBar = observer(
  ({
    store,
    loading,
  }: {
    store: MainPageStore;
    loading: boolean;
  }): ReactElement => {
    return (
      <div style={{ margin: 10 }}>
        <Search
          placeholder="Enter user"
          onSearch={(value) => store.filterUsers(value)}
          style={{ width: 400 }}
          allowClear
          size="large"
          enterButton
          loading={loading}
        />
        <Input
          placeholder="Enter repository name"
          onKeyUp={(event) => store.filterTable(event.currentTarget.value)}
          style={{ width: 400 }}
          size="large"
        />
      </div>
    );
  }
);

const MainTable = observer(({ data, columns }: { data: any; columns: any }) => {
  return <Table dataSource={data} columns={columns} />;
});

const GET_REPOS = gql`
  query GetRepos($username: String!) {
    user(login: $username) {
      repositories(first: 100) {
        edges {
          node {
            id
            description
            name
            owner {
              login
            }
            languages(first: 10) {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

const MainPage: React.FC = observer(
  (): ReactElement => {
    const { mainPageStore, restStore } = useContext(RootContext);
    const [getRepos, { loading, error, data: repoData }] = useLazyQuery(
      GET_REPOS
    );
    mainPageStore.restStore = restStore;
    mainPageStore.getRepos = getRepos;

    useEffect(() => {
      if (repoData) {
        mainPageStore.setRepositories(repoData.user.repositories.edges);
      }
    }, [loading, repoData, mainPageStore]);

    useEffect(() => {
      if (error) {
        alert(error);
      }
    }, [error]);

    return (
      <div style={{ margin: 20 }}>
        <SearchBar store={mainPageStore} loading={loading} />
        <MainTable
          columns={mainPageStore.columns}
          data={mainPageStore.shownData.slice()}
        />
      </div>
    );
  }
);

export default MainPage;

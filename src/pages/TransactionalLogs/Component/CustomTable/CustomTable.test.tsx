import React from "react";
import { act, render } from "@testing-library/react";
import store from "app/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import CustomTable from ".";

describe("ShowNumberOfRecords", () => {
  it("should render without errors", async () => {
    const tree = render(
      <MemoryRouter initialEntries={["/transactionLogs"]}>
        <Provider store={store}>
          <CustomTable
            theadData={[
              {
                name: "Entity Name",
                id: 1,
                clsName: "entityNameTableHeader",
                sortable: false,
                filterSupport: true,
                filterCode: "entityName",
                optionalColumn: false,
                isChecked: true,
              },
              {
                name: "Transaction ID",
                id: 7,
                clsName: "transIDTableHeader",
                sortable: false,
                filterSupport: false,
                filterCode: "transactionId",
                optionalColumn: false,
                optionalColumnClass: "optionalColumnTransactionID",
                isChecked: true,
              },
              {
                name: "Source",
                id: 2,
                clsName: "sourceTableHeader",
                sortable: false,
                filterSupport: true,
                filterCode: "source",
                optionalColumn: false,
                isChecked: true,
              },
              {
                name: "Status",
                id: 3,
                clsName: "statusTableHeader",
                sortable: false,
                filterSupport: true,
                filterCode: "status",
                optionalColumn: false,
                isChecked: true,
              },
              {
                name: "Consumer",
                id: 4,
                clsName: "consumerTableHeader",
                sortable: false,
                filterSupport: true,
                filterCode: "consumer",
                optionalColumn: false,
                isChecked: true,
              },
              {
                name: "Created Date",
                id: 6,
                clsName: "createdAtTableHeader",
                sortable: true,
                filterSupport: false,
                filterCode: "createdAt",
                optionalColumn: false,
                defaultSort: "DESC",
                isChecked: true,
                optionalColumnClass: "optionalColumnCreatedDate",
              },
              {
                name: "Error Code",
                id: 8,
                clsName: "",
                sortable: false,
                filterSupport: false,
                filterCode: "errorCode",
                optionalColumn: true,
                optionalColumnClass: "optionalColumnErrorCode",
                isChecked: false,
              },
              {
                name: "Event Type",
                id: 9,
                clsName: "",
                sortable: false,
                filterSupport: false,
                filterCode: "eventType",
                optionalColumn: true,
                optionalColumnClass: "optionalColumnEventType",
                isChecked: false,
              },
            ]}
            tbodyData={[
              {
                id: 464504,
                transactionId:
                  "ECARDS:COMPLETION:NATS:U73aac46f-d9cb-4727-ba77-6ee9ac98155e:T1697807099134",
                parentId: "",
                consumer: "ADH",
                eventTimestamp: null,
                eventType: "CREATE",
                status: "FAILURE",
                entityName: "COMPLETION",
                channel: "NATS",
                source: "ECARDS",
                referenceId: "",
                errorCode: "OrgNotFound",
                createdAt: "2023-10-20T13:04:59Z",
                updatedAt: "0001-01-01T00:00:00Z",
                isPassThrough: false,
              },
              {
                id: 464503,
                transactionId:
                  "ECARDS:COMPLETION:NATS:U420ee708-50ba-4b7e-9569-f4d75c7bfabe:T1697798908923",
                parentId: "",
                consumer: "ADH",
                eventTimestamp: null,
                eventType: "CREATE",
                status: "FAILURE",
                entityName: "COMPLETION",
                channel: "NATS",
                source: "ECARDS",
                referenceId: "",
                errorCode: "OrgNotFound",
                createdAt: "2023-10-20T10:48:29Z",
                updatedAt: "0001-01-01T00:00:00Z",
                isPassThrough: false,
              },
              {
                id: 464502,
                transactionId:
                  "ECARDS:COMPLETION:NATS:U5d6103f3-a6ae-4471-9e13-9af60333db0f:T1697798451852",
                parentId: "",
                consumer: "ADH",
                eventTimestamp: null,
                eventType: "CREATE",
                status: "FAILURE",
                entityName: "COMPLETION",
                channel: "NATS",
                source: "ECARDS",
                referenceId: "",
                errorCode: "OrgNotFound",
                createdAt: "2023-10-20T10:40:52Z",
                updatedAt: "0001-01-01T00:00:00Z",
                isPassThrough: false,
              },
            ]}
            customClass=""
            isTableLoading={false}
            checkfilter={[]}
            toggleSelectAll={[]}
            setSelectAll={jest.fn()}
            selectAll
            toggleRow={jest.fn()}
            reset
            setReset={jest.fn()}
          />
        </Provider>
      </MemoryRouter>
    );

    await act(async () => {
      const value = tree.getAllByTestId("entityName");
      expect(value).toBeTruthy();
    });
  });
});

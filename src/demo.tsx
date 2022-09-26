import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator
} from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

function QuickSearchToolbar() {
  return (
    <div
      style={{
        padding: "0px 10px",
        position: "absolute",
        top: "-50px"
      }}
    >
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput: string) =>
          searchInput
            .split(",")
            .map((value) => value.trim())
            .filter((value) => value !== "")
        }
      />
    </div>
  );
}

const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

export default function QuickFilteringCustomizedGrid() {
  const { data } = useDemoData({
    dataSet: "Employee",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100
  });

  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = React.useMemo(
    () =>
      data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [data.columns]
  );

  return (
    <div style={{ height: "500px", marginTop: "65px" }}>
      <DataGrid
        {...data}
        columns={columns}
        initialState={{
          filter: {
            filterModel: {
              items: [],
              quickFilterLogicOperator: GridLinkOperator.Or
            }
          }
        }}
        components={{ Toolbar: QuickSearchToolbar }}
      />
    </div>
  );
}

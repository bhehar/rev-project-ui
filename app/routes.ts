import {
  index,
  layout,
  type RouteConfig,
  route,
} from "@react-router/dev/routes"

export default [
  layout("./layouts/nav.tsx", [
    index("./Welcome.tsx"),
    route("/user/details", "./routes/UserExpenseDetails.tsx"),
    route("/user/table", "./routes/UserExpenseTable.tsx"),
    route("/admin/table", "./routes/AdminExpenseTable.tsx"),
    route("/admin/details", "./routes/AdminExpenseDetails.tsx"),
    route("/admin/manage-users", "./routes/AdminUserMgmt.tsx")
  ]),
  // route("/user/create", "./routes/ExpenseEntry.tsx"),
  // route("/user/table", "./routes/UserExpenseTable.tsx"),
  // route("/admin/table", "./routes/AdminExpenseTable.tsx"),
  // route("/admin/details", "./routes/AdminExpenseDetails.tsx")
  // pattern ^           ^ module file
] satisfies RouteConfig;

import {
  index,
  layout,
  type RouteConfig,
  route,
} from "@react-router/dev/routes"

export default [
  route("/login", "./routes/Login.tsx"),
  layout("./layouts/nav.tsx", [
    index("./Welcome.tsx"),
    route("/user/details/:mode", "./routes/UserExpenseDetails.tsx"),
    route("/user/table", "./routes/UserExpenseTable.tsx"),
    layout("./layouts/admin.tsx", [
      route("/admin/table", "./routes/AdminExpenseTable.tsx"),
      // route("/admin/details", "./routes/AdminExpenseDetails.tsx"),
      route("/admin/manage-users", "./routes/AdminUserMgmt.tsx")
    ]),
  ]),
  // route("/user/create", "./routes/ExpenseEntry.tsx"),
  // route("/user/table", "./routes/UserExpenseTable.tsx"),
  // route("/admin/table", "./routes/AdminExpenseTable.tsx"),
  // route("/admin/details", "./routes/AdminExpenseDetails.tsx")
  // pattern ^           ^ module file
] satisfies RouteConfig;

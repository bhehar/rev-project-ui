import {
  index,
  type RouteConfig,
  route,
} from "@react-router/dev/routes"

export default [
  index("./Welcome.tsx"),
  route("/user/create", "./routes/ExpenseEntry.tsx"),
  route("/user/details", "./routes/UserExpenseTable.tsx"),
  route("/admin/expense", "./routes/AdminExpenseTable.tsx"),
  route("/admin/details", "./routes/AdminExpenseDetails.tsx")
  // pattern ^           ^ module file
] satisfies RouteConfig;

import {
  index,
  type RouteConfig,
  route,
} from "@react-router/dev/routes"

export default [
  index("./Welcome.tsx"),
  route("/user/create", "./routes/ExpenseEntry.tsx"),
  route("/user/view", "./routes/UserExpenseTable.tsx")
  // pattern ^           ^ module file
] satisfies RouteConfig;

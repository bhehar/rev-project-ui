import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Meta, Links, Outlet, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const root = UNSAFE_withComponentProps(function Root() {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(Outlet, {}), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: root
}, Symbol.toStringTag, { value: "Module" }));
const Welcome = UNSAFE_withComponentProps(function Welcome2() {
  return /* @__PURE__ */ jsx("h2", {
    children: "Welcome to Initech's Expense Reporting Portal"
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Welcome
}, Symbol.toStringTag, { value: "Module" }));
const categoryDisplay = {
  "transportation": "Transportation",
  "food": "Food",
  "lodging": "Lodging",
  "equipment": "Equipment",
  "other": "Other"
};
const ExpenseEntry = UNSAFE_withComponentProps(function ExpenseEntry2() {
  console.log("expense entry component rendered");
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    description: ""
  });
  function handleCategoryChange(e) {
    console.log("a category has been selected", e);
    console.log(e.target);
    setFormData({
      ...formData
    });
  }
  const categoryOptions = Object.entries(categoryDisplay).map(([cat, display]) => {
    return /* @__PURE__ */ jsx("option", {
      value: cat,
      children: display
    }, cat);
  });
  function handleSubmit() {
    console.log("submit called");
  }
  return /* @__PURE__ */ jsxs(Form, {
    action: handleSubmit,
    children: [/* @__PURE__ */ jsxs(Row, {
      className: "m-3",
      children: [/* @__PURE__ */ jsx(Col, {
        children: /* @__PURE__ */ jsxs(Form.Group, {
          controlId: "expenseCategory",
          children: [/* @__PURE__ */ jsx(Form.Label, {
            children: "Category"
          }), /* @__PURE__ */ jsxs(Form.Select, {
            value: formData.category,
            onChange: handleCategoryChange,
            "aria-label": "expense category selection",
            children: [/* @__PURE__ */ jsx("option", {
              children: "Select a category"
            }), categoryOptions]
          })]
        })
      }), /* @__PURE__ */ jsx(Col, {
        children: /* @__PURE__ */ jsxs(Form.Group, {
          controlId: "expenseAmount",
          children: [/* @__PURE__ */ jsx(Form.Label, {
            children: "Amount"
          }), /* @__PURE__ */ jsx(Form.Control, {
            type: "number",
            placeholder: "$0.00"
          })]
        })
      })]
    }), /* @__PURE__ */ jsx(Row, {
      className: "m-3",
      children: /* @__PURE__ */ jsx(Col, {
        children: /* @__PURE__ */ jsxs(Form.Group, {
          controlId: "expenseDescription",
          children: [/* @__PURE__ */ jsx(Form.Label, {
            children: "Description"
          }), /* @__PURE__ */ jsx(Form.Control, {
            as: "textarea",
            rows: 3
          })]
        })
      })
    }), /* @__PURE__ */ jsx(Row, {
      className: "m-3",
      children: /* @__PURE__ */ jsx(Col, {
        children: /* @__PURE__ */ jsx(Button, {
          variant: "primary",
          type: "submit",
          children: "Submit"
        })
      })
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ExpenseEntry
}, Symbol.toStringTag, { value: "Module" }));
const mockExpenseData = [
  {
    id: "exp1",
    employeeID: "EMP001",
    status: "new",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    category: "transportation",
    amount: 45.5,
    description: null,
    comment: null
  },
  {
    id: "exp2",
    employeeID: "EMP002",
    status: "pending",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-16T09:15:00Z",
    category: "food",
    amount: 28.75,
    description: null,
    comment: "Please provide more details"
  },
  {
    id: "exp3",
    employeeID: "EMP001",
    status: "approved",
    createdAt: "2024-01-12T16:45:00Z",
    updatedAt: "2024-01-17T11:30:00Z",
    category: "lodging",
    amount: 120,
    description: null,
    comment: "Approved for business trip"
  },
  {
    id: "exp4",
    employeeID: "EMP002",
    status: "pending",
    createdAt: "2024-01-13T09:00:00Z",
    updatedAt: "2024-01-18T13:45:00Z",
    category: "equipment",
    amount: 350,
    description: null,
    comment: "What is the equipment?"
  },
  {
    id: "exp5",
    employeeID: "EMP001",
    status: "new",
    createdAt: "2024-01-16T12:15:00Z",
    updatedAt: "2024-01-16T12:15:00Z",
    category: "other",
    amount: 75.25,
    description: "Client gift for contract signing",
    comment: null
  },
  {
    id: "exp6",
    employeeID: "EMP002",
    status: "new",
    createdAt: "2024-01-17T08:30:00Z",
    updatedAt: "2024-01-17T08:30:00Z",
    category: "transportation",
    amount: 12.5,
    description: null,
    comment: null
  },
  {
    id: "exp7",
    employeeID: "EMP001",
    status: "pending",
    createdAt: "2024-01-11T15:20:00Z",
    updatedAt: "2024-01-19T10:00:00Z",
    category: "other",
    amount: 45,
    description: "Software license for project development",
    comment: "Need approval from IT department"
  },
  {
    id: "exp8",
    employeeID: "EMP002",
    status: "approved",
    createdAt: "2024-01-10T11:45:00Z",
    updatedAt: "2024-01-20T14:30:00Z",
    category: "food",
    amount: 55.8,
    description: null,
    comment: "Business lunch approved"
  },
  {
    id: "exp9",
    employeeID: "EMP001",
    status: "denied",
    createdAt: "2024-01-09T13:10:00Z",
    updatedAt: "2024-01-21T16:20:00Z",
    category: "lodging",
    amount: 200,
    description: null,
    comment: "Exceeds per diem limit"
  },
  {
    id: "exp10",
    employeeID: "EMP002",
    status: "new",
    createdAt: "2024-01-18T09:45:00Z",
    updatedAt: "2024-01-18T09:45:00Z",
    category: "other",
    amount: 25,
    description: "Parking fees for client meeting",
    comment: null
  }
];
const UserExpenseTable = UNSAFE_withComponentProps(function ExpenseTable() {
  const mockData = mockExpenseData;
  useEffect(() => {
    console.log("this is the log from use expense");
  }, []);
  const tableData = mockData.map((exp) => {
    return /* @__PURE__ */ jsxs("tr", {
      children: [/* @__PURE__ */ jsx("td", {
        children: exp.employeeID
      }), /* @__PURE__ */ jsx("td", {
        children: exp.status
      }), /* @__PURE__ */ jsx("td", {
        children: exp.category
      }), /* @__PURE__ */ jsxs("td", {
        children: ["$", exp.amount]
      }), /* @__PURE__ */ jsx("td", {
        children: exp.createdAt
      }), /* @__PURE__ */ jsx("td", {
        children: exp.updatedAt
      })]
    }, exp.id);
  });
  return /* @__PURE__ */ jsxs(Table, {
    striped: true,
    bordered: true,
    hover: true,
    children: [/* @__PURE__ */ jsx("thead", {
      children: /* @__PURE__ */ jsxs("tr", {
        children: [/* @__PURE__ */ jsx("th", {
          children: "Employee ID"
        }), /* @__PURE__ */ jsx("th", {
          children: "Status"
        }), /* @__PURE__ */ jsx("th", {
          children: "Category"
        }), /* @__PURE__ */ jsx("th", {
          children: "Amount"
        }), /* @__PURE__ */ jsx("th", {
          children: "Created At"
        }), /* @__PURE__ */ jsx("th", {
          children: "Update At"
        })]
      })
    }), /* @__PURE__ */ jsx("tbody", {
      children: tableData
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UserExpenseTable
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DRuyMB-r.js", "imports": ["/assets/chunk-B7RQU5TL-BLD9B1wM.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/root-Q8KYVHgy.js", "imports": ["/assets/chunk-B7RQU5TL-BLD9B1wM.js"], "css": ["/assets/root-C11chwFa.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "Welcome": { "id": "Welcome", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/Welcome-BrUXOByu.js", "imports": ["/assets/chunk-B7RQU5TL-BLD9B1wM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/ExpenseEntry": { "id": "routes/ExpenseEntry", "parentId": "root", "path": "/user/create", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/ExpenseEntry-BqUGGpoi.js", "imports": ["/assets/chunk-B7RQU5TL-BLD9B1wM.js", "/assets/ThemeProvider-BEu2I-iZ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/UserExpenseTable": { "id": "routes/UserExpenseTable", "parentId": "root", "path": "/user/view", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/UserExpenseTable-Bal5KiCk.js", "imports": ["/assets/chunk-B7RQU5TL-BLD9B1wM.js", "/assets/ThemeProvider-BEu2I-iZ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-355d696e.js", "version": "355d696e", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "Welcome": {
    id: "Welcome",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/ExpenseEntry": {
    id: "routes/ExpenseEntry",
    parentId: "root",
    path: "/user/create",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/UserExpenseTable": {
    id: "routes/UserExpenseTable",
    parentId: "root",
    path: "/user/view",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};

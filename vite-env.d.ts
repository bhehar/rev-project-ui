/// <reference types="vite/client" />

/*
  CSS files don't return anything as modules
  they are a "side effect" as they
  are simply injected into the page
  we're telling TypeScript how Vite
  deals with .css files
  declare module "*.css" {}
*/
declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}
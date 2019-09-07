import { AbstractRouter } from "./router/router";
import { MultipleTextLines } from "./MultipleTextLines";
import { AsyncActionExample } from "./AsyncActionExample";

const routerInit = [
  {
    name: "Index",
    path: "/",
    // component: ExampleMultipleTextLine
    redirect: "/multiline"
  },
  {
    name: "Multiline Example",
    path: "/multiline",
    component: MultipleTextLines
  },
  {
    name: "Async Example",
    path: "/async",
    component: AsyncActionExample
  }
];

export const AppRouter = AbstractRouter(routerInit);

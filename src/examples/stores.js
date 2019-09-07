import { createStore } from "../../dist/rxsm";
import { createStore as createStore_v2 } from "../../dist/experemental";

const init = {
  textLine1: "init text1",
  textLine2: "init text2",
  streams: [{ stream1: "MediaStream", video: false }]
};

export const STORE = createStore(init);
export const store_v2 = createStore_v2(init);

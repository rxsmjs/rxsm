export const setTextAction = arg => ({
  name: "changeTextLine1",
  func: store => {
    return {
      textLine1: arg
    };
  }
});

export const setTextAction2 = arg => ({
  name: "changeTextLine2",
  func: store => {
    return {
      textLine2: arg
    };
  }
});

export const clearTextLine1 = {
  name: "clearTextLine1",
  func: store => ({
    textLine1: ""
  })
};

export const clearTextLine2 = {
  name: "clearTextLine2",
  func: store => ({
    textLine2: ""
  })
};

export const Line1SwapLine2 = {
  name: "Line1SwapLine2",
  func: store => ({
    textLine1: store.textLine2,
    textLine2: store.textLine1
  })
};

const asyncFunction = store =>
  new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve({
          textLine2: `${store.textLine2} added after 3 sec`
        });
      }, 3000);
      // throw new Error("Error in async function");
    } catch (e) {
      reject(e);
    }
  });

export const AsyncAction = {
  name: "Async Action",
  func: async store => {
    try {
      const asyncResult = await asyncFunction(store);
      return asyncResult;
    } catch (e) {
      console.error(e.message);
      return store;
    }
  }
};

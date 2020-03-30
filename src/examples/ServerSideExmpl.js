const createStore = require("../../dist/rxsm").createStore

const store = createStore({val:"initial", val2: 0})

console.log(store.getState())

store.dispatch({
    name: "alter_text",
    func: store => ({
        val: `New text, old was - ${store.val}`
    })
})

setTimeout(() => { console.log(store.getState()) }, 100);

const asyncFunc = () => new Promise(resolve => {
    setTimeout(() => {resolve("Async Text")}, 1000)
}) 


store.dispatch({
    name: "alter_text",
    func: async store => ({
        val: `${await asyncFunc()}, old was - ${store.val}`
    })
})

setTimeout(() => { console.log(store.getState()) }, 2000);

setTimeout(() => {
    store.dispatch({
        name: "new-val",
        func: store => ({
            val2: store.val2 + 1
        })
    })

}, 300)


setTimeout(() => { console.log(store.getState()) }, 500);
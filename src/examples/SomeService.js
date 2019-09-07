import { STORE } from "./stores";

class SomeService {
  constructor(props) {
    // super(props);
    STORE.textLine1.subscribe(i => this.onTextChanged(i));
    // SUBSCRIBE textLine1  TO onTextChanged  METHOD
  }

  onTextChanged(text) {
    console.log(`Class method onTextChanged value: ${text}`);
  }
}

export default SomeService;

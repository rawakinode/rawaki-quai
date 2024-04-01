// store.js
import { createStore } from "vuex";
import JsonToken from "../assets/token/token-list.json";

const defaultState = {
  // For Wallet and Address
  address: null,
  shard: "zone-0-0",
  zone_index: "zone-0-0",
  zone_name: "cyprus-1",
  rpc: "https://rpc.cyprus1.colosseum.quaiscan.io",
  explorer: "https://cyprus1.colosseum.quaiscan.io",
  slippage: 0.2,
  deadline: 10,
  // For Token Swap / Pools
  token_name_1: null,
  token_symbol_1: null,
  token_logo_1: null,
  token_contract_1: null,
  token_balance_1: 0,
  token_amount_1: "",
  token_price_1: null,
  token_name_2: null,
  token_symbol_2: null,
  token_logo_2: null,
  token_contract_2: null,
  token_balance_2: 0,
  token_amount_2: "",
  token_price_2: null,
  //Tokenlist,
  tokenlist: JsonToken["cyprus-1"],
  // function excecute status
  get_account: false,
  // interface
  route: null,
}

const variables = createStore({
  state: {
    globalVariable: {...defaultState},
  },
  mutations: {
    updateGlobal(state, payload) {
      state.globalVariable = { ...state.globalVariable, ...payload };
    },
  },
});

export default variables;

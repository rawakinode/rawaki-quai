import { quais } from "quais";
import Qrc20Abi from "../contracts/abi/QRC20.json";
import variables from "../variables/variable";

const $store = variables;

const getQuaiBalance = async (addr) => {
  try {
    const provider = new quais.providers.Web3Provider(window.ethereum);
    const bal = await provider.getBalance(addr);
    const bal_human = quais.utils.formatEther(bal);
    return bal_human;
  } catch (error) {
    return 0;
  }
};

const getQrc20Balance = async (addr, contract) => {
  try {
    const provider = new quais.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tokenContract = new quais.Contract(contract, Qrc20Abi, signer);
    const tokenBalance = await tokenContract.balanceOf(addr);
    const balance = quais.utils.formatEther(tokenBalance);
    return balance;
  } catch (error) {
    return 0;
  }
};

const getBalance = async (v) => {
  console.log("Get Balance Executed !");
  try {
    var balances = 0;
    const global = $store.state.globalVariable;
    let contract = v == 1 ? global.token_contract_1 : global.token_contract_2;
    console.log(global);
    console.log(contract);

    if (v == 1) {
      if (global.token_contract_1 == "native") {
        balances = await getQuaiBalance(global.address);
      } else {
        balances = await getQrc20Balance(global.address, contract);
      }
      $store.commit("updateGlobal", {
        token_balance_1: balances,
      })
    } else {
      if (global.token_contract_2 == "native") {
        balances = await getQuaiBalance(global.address);
      } else {
        balances = await getQrc20Balance(global.address, contract);
      }
      $store.commit("updateGlobal", {
        token_balance_2: balances,
      })
    }
  } catch (error) {
    console.log(error);
    if (v == 1) {
      $store.commit("updateGlobal", {
        token_balance_1: 0,
      });
    } else {
      $store.commit("updateGlobal", {
        token_balance_2: 0,
      });
    }
  }
};

export { getQuaiBalance, getQrc20Balance, getBalance };

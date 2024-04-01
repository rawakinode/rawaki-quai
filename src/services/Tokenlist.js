import variables from '../variables/variable'
import importJsonToken from '../assets/token/token-list.json'

const $store = variables

const setTokenListByShard = async (zonename) => {
    try {
        const tokenlist = importJsonToken[zonename]
        $store.commit('updateGlobal', {
            tokenlist: tokenlist
        })
    } catch (error) {
        console.log(error);
    }
}

export {setTokenListByShard}
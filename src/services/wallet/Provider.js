import { quais } from "quais";

const getProvider = async () => {
    try {
        const provider = new quais.providers.Web3Provider(window.ethereum)
        // const signer = provider.getSigner()
        // const address = await signer.getAddress()
        return provider
    } catch (error) {
        return false
    }
}

export { getProvider }
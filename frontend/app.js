const connectBtn = document.getElementById("connectBtn");
const connectedWallet = document.getElementById("wallet")

console.log(window.ethereum)

async function connectWallet() {
    const provider = await window.detectEthereumProvider(); // No import needed

    if (provider) {
        console.log("MetaMask detected!");
        const ethersProvider = new ethers.BrowserProvider(provider);
        const signer = await ethersProvider.getSigner();
        
        connectedWallet.innerText = await signer.getAddress();
    } else {
        alert("MetaMask not detected. Please install it.");
    }
}

connectBtn.addEventListener("click", connectWallet);


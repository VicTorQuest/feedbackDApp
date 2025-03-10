const connectBtn = document.getElementById("connectBtn");
const connectedWallet = document.getElementById("wallet");
const feedbackInput = document.getElementById("feedbackInput");
const feedbackList = document.getElementById("feedbackList");
const submitFeedbackBtn = document.getElementById("submitFeedback")

let contract;
const contractAddress = '0x1AC732966e3F9293E13FA46b6Cfe141Ce99933C4'
const contractABI = [ /* ABI from artifacts/Feedback.json */ ];

console.log(window.ethereum)

async function connectWallet() {
    const provider = await window.detectEthereumProvider(); // No import needed

    if (provider) {
        console.log("MetaMask detected!");
        const ethersProvider = new ethers.BrowserProvider(provider);
        const signer = await ethersProvider.getSigner();
        
        connectedWallet.innerText = await signer.getAddress();

        contract = new ethers.Contract(contractAddress, contractABI, signer);
        loadFeedback();

    } else {
        alert("MetaMask not detected. Please install it.");
    }
}


async function submitFeedback() { 
    const message = feedbackInput.value; 
    if (!message) return; 
    const tx = await contract.submitFeedback(message); 
    await tx.wait(); 
    feedbackInput.value = ""; 
    loadFeedback(); 
}


async function loadFeedback() {
  if (!contract) return;
  const feedbacks = await contract.getAllFeedback();
  feedbackList.innerHTML = "";
  feedbacks.forEach((fb) => {
    const item = document.createElement("li");
    item.innerText = `${fb.user}: ${fb.message} (At ${new Date(
      fb.timestamp * 1000
    ).toLocaleString()})`;
    feedbackList.appendChild(item);
  });
}


connectBtn.addEventListener("click", connectWallet);
submitFeedbackBtn.addEventListener("click", submitFeedback);
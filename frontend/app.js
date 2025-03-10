const connectBtn = document.getElementById("connectBtn");
const connectedWallet = document.getElementById("wallet");
const feedbackInput = document.getElementById("feedbackInput");
const feedbackList = document.getElementById("feedbackList");
const submitFeedbackBtn = document.getElementById("submitFeedback")

const contractAddress = '0x1AC732966e3F9293E13FA46b6Cfe141Ce99933C4'
let contract;
let contractABI;

async function loadABI() {
    const response = await fetch('./artifacts/contracts/Feedback.sol/Feedback.json');
    const data = await response.json();
    contractABI = data.abi; // Assign ABI globally
    console.log("Loaded ABI:", contractABI);
}

async function connectWallet() {
    const provider = await window.detectEthereumProvider(); 

    if (provider) {
        console.log("MetaMask detected!");
        const ethersProvider = new ethers.BrowserProvider(provider);
        const signer = await ethersProvider.getSigner();
        
        connectedWallet.innerText = await signer.getAddress();

        contract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log(contract)
        loadFeedback();

    } else {
        alert("MetaMask not detected. Please install it.");
    }
}


async function submitFeedback() { 
    submitFeedbackBtn.innerHTML = `<div class="spinner-border spinner-border-sm" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
`
submitFeedbackBtn.disabled = true
    const message = feedbackInput.value; 
    if (!message) return; 
    const tx = await contract.submitFeedback(message); 
    await tx.wait(); 
    feedbackInput.value = ""; 
    loadFeedback(); 
}


async function loadFeedback() {
  if (!contract) {
    submitFeedbackBtn.innerHTML = ""
    submitFeedbackBtn.innerText = "Submit"
    submitFeedbackBtn.disabled = false
    return
  } ;
  console.log('Contract exist')
  const feedbacks = await contract.getAllFeedback();
  console.log(feedbacks)
  feedbackList.innerHTML = "";
  feedbacks.forEach((fb) => {
    const item = document.createElement("li");
    item.innerText = `${fb.user}: ${fb.message} (At ${new Date(
     Number(fb.timestamp) * 1000
    ).toLocaleString()})`;
    feedbackList.appendChild(item);
  });
  submitFeedbackBtn.innerHTML = ""
  submitFeedbackBtn.innerText = "Submit"
  submitFeedbackBtn.disabled = false
}


connectBtn.addEventListener("click", connectWallet);
submitFeedbackBtn.addEventListener("click", submitFeedback);
loadABI();

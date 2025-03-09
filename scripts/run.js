const main = async ()=> {
    const feedbackContractFactory = await hre.ethers.getContractFactory('Feedback');
    const feedbackContract = await feedbackContractFactory.deploy();
    await feedbackContract.waitForDeployment();

    const message = await feedbackContract.getMessage();
    console.log(message)
};


const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};


runMain();
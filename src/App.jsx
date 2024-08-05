import { useEffect, useState } from 'react'


import { ethers } from 'ethers';



function App() {


  const contractAddress = "0x22aBBbbAd53c1eE546da818F23c0D70deF3d5eFD";// contract address

  const abi =[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "finalScore",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "scoreFour",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "scoreSix",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  const [ethWindow,setEthWindow] = useState();
  const [contractInstance,setContractInstance] = useState();
  const [owner, setOwner] = useState();
  const [scoreSixFunction, setScoreSixFunction] = useState();
  const [scoreFourFunction,setScoreFourFunction] = useState();

  const [score,setScore] = useState();
  

  const initialize = async () => {
    if (window.ethereum) {
      console.log("Metamask is installed");
      setEthWindow(window.ethereum);
    }

    if (ethWindow) {
      const accountsArray = await ethWindow.request({ method: "eth_accounts" });
      
    }
    ConnectToMetamask();
  };

  const ConnectToMetamask = async () => {
    if (ethWindow) {
      const accounts = ethWindow.request({ method: "eth_requestAccounts" });
     
    }
    // setAddFriend(true);
    ConnectToContract();
  };

  const ConnectToContract = () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractInstanceObject = new ethers.Contract(
        contractAddress,
        abi,
        signer
      );
      console.log(contractInstanceObject);
      setContractInstance(contractInstanceObject);
      console.log(contractInstance);
    } catch (error) {
      console.log("can't connect with the contract");
    }
  };


  const getFinalScore = async()=>{
    try{
      const sc = await contractInstance.finalScore();
      setScore(parseInt(sc));
      console.log(sc)
      console.log(score)

    }catch(error){
      console.log(error)
    }
    

  }


  const showOwner = async()=>{

    try{
      const ownerAddress =  await contractInstance.getOwner();
      setOwner(ownerAddress);

    }catch(error){
      console.log(error)
    }

  
  }

  const scoredSix = async()=>{
    try{
      const getScore = await contractInstance.scoreSix();
      setScoreSixFunction(getScore);


    }catch(error){
      console.log(error)
    }
  }

  const scoredFour = async()=>{
    try{
      const getScore = await contractInstance.scoreFour();
      setScoreFourFunction(getScore);


    }catch(error){
      console.log(error)
    }
  }


  useEffect(()=>{

    async function Operation(){
      // await initialize();
      //  ConnectToContract();
     
      
    }
    Operation();

  },[score])
  

  return (
    <div class="container">
      <div class="content" >

        <button onClick={()=> initialize()}> Connect to Metamask</button>
        {/* <button onClick={()=> ConnectToContract()}>Connect to Contract</button> */}

      </div>
      <button onClick={showOwner} >Show Owner</button>
      <button onClick={scoredSix}>Score +6</button>
      <button onClick={scoredFour}>Score +4</button>
      <button onClick={getFinalScore}>Get Final Score</button>

     

    


     <div class="">
      {score && <div class=""><p className='scoreClass'>Score is : <span>{score}</span></p></div>}
    </div>

    <div>
     {scoreSixFunction && <div><p>{scoreSixFunction}</p></div>}
     {scoreFourFunction && <div><p>{scoreFourFunction}</p></div>}


     {owner &&  <div class="scoreClass" style={{display:"block"}}><p> The owner Address is : <span>{owner}</span> </p></div>}

    
     </div>



    </div>
  )
}

export default App

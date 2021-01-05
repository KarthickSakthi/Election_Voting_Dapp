import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "./App.css"
import Electionabi from "./contracts/Election.json";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import AddressCard from './components/AddressCard'
function App() {
  useEffect(() => {
    loadWeb3();
    LoadBlockchaindata();
  }, []);

  const [Currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [Electionsm, SetElectionsm] = useState();
  const [Candidate1, setCandidate1] = useState();
  const [Candidate2, setCandidate2] = useState();
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const LoadBlockchaindata = async () => {
    setloader(true);
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);
    const networkId = await web3.eth.net.getId();

    const networkData = Electionabi.networks[networkId];

    if (networkData) {
      const election = new web3.eth.Contract(
        Electionabi.abi,
        networkData.address
      );
      const candidate1 = await election.methods.candidates(1).call();
      setCandidate1(candidate1);
      // const canidate1id = canidate1.id;
      // const canidate1name = canidate1.name;
      // const canidate1votecount = canidate1.voteCount;
      const candidate2 = await election.methods.candidates(2).call();
      setCandidate2(candidate2);
      // const canidate2id = canidate1.id;
      // const canidate2name = canidate2.name;
      // const canidate2votecount = canidate2.voteCount;
      SetElectionsm(election);
      setloader(false);
    } else {
      window.alert("the smart contract is not deployed current network");
    }
  };

  const votecandidate = async (candidateid) => {
    setloader(true);
    await Electionsm.methods
      .vote(candidateid)
      .send({ from: Currentaccount })
      .on("transactionhash", () => {
        console.log("succesfully ran");
      });
    setloader(false);
  };

  if (loader) {
    return <div class="text-light"><h4>Loading ....</h4><p>Connecting Metamask to access this Site.
      If this current browser don't have Metamask means this site doesn't Open. </p></div>;
  }

  return (
    <div className="bg">
      <Navbar/>
      <AddressCard account={Currentaccount}/>
      <Body
        candidate1={Candidate1}
        candidate2={Candidate2}
        votecandidate={votecandidate}
      />
    </div>
  );
}

export default App;
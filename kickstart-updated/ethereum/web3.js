import Web3 from "web3";

// window is a global variable that is available only inside of the browser. It is not availabe on Node.js.
// Next.js loads up code so window variable is not defined. Error message shows up. Cannot have direct access to window.

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "INFURA.IO URL HERE"
  );
  web3 = new Web3(provider);
}

export default web3;

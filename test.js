require("dotenv").config({ path: "config" });

const ethers = require("ethers");
const { RelayProvider, configureGSN } = require("@opengsn/gsn");
const Web3HttpProvider = require("web3-providers-http");

const { CaptureTheFlag } = require("./dist/contracts.json");

async function run() {
  //const origProvider = new ethers.providers.JsonRpcProvider();
  const web3provider = new Web3HttpProvider("http://localhost:8545");

  const config = configureGSN({
    verbose: true,
    relayHubAddress: process.env.RELAY_HUB,
    stakeManagerAddress: process.env.STAKE_MANAGER,
    paymasterAddress: process.env.PAYMASTER,
  });

  console.log("config", config);

  const gsnProvider = new RelayProvider(web3provider, config);
  const account = gsnProvider.newAccount();
  const from = account.address;

  const etherProvider = new ethers.providers.Web3Provider(gsnProvider);
  console.log(
    "sending from",
    from,
    "to",
    CaptureTheFlag.networks[666666].address
  );

  try {
    const contract = await new ethers.Contract(
      CaptureTheFlag.networks[666666].address,
      CaptureTheFlag.abi,
      etherProvider.getSigner(from)
    );

    await contract.captureFlag();
    //console.log(await contract.flagHolder());
  } catch (e) {
    console.log(e);
  }
}

run();

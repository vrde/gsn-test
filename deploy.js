#!/usr/bin/env node

require("dotenv").config({ path: "config" });

const etherea = require("etherea");
const { build } = require("etherea/lib/solidity");

async function compile(outdir = "./dist") {
  const wallet = await etherea.wallet({
    endpoint: "localhost",
  });

  //const np = await build("./contracts/NaivePaymaster.sol", outdir, wallet);
  //wallet.loadContracts(np);

  console.log("Forwarder set to", process.env.FORWARDER);
  const ctf = await build(
    "./contracts/CaptureTheFlag.sol",
    outdir,
    wallet,
    process.env.FORWARDER
  );
  wallet.loadContracts(ctf);

  //await wallet.contracts.NaivePaymaster.setRelayHub(
  //  "0x856e9117Ef8f7ECB581f9136A6ae6C4B89C5CC75"
  //);
  //await wallet.contracts.NaivePaymaster.setTarget(
  //  ctf.CaptureTheFlag.networks[666666].address
  //);
}

compile(process.argv[2]);

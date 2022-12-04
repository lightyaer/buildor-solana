import dotenv from "dotenv";
dotenv.config();
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { initializeKeypair, getAccountDetails } from "./initializeKeypair";
import { createBldToken } from "./createBldToken";
import { createTokenAccount } from "./createTokenAccount";
import { mintTokens } from "./mintToken";

async function main() {
  // const connection = new Connection(clusterApiUrl("devnet"));
  getAccountDetails();

  // const payer = await initializeKeypair(connection);

  // await createBldToken(connection, payer);

  const mint = new PublicKey("2YihLZsccFBTzb7HChDQSJ4XqqmrnXgdu3vavrLLAW18");
  // await createTokenAccount(connection, payer, mint, payer.publicKey);

  // await mintTokens(
  //   connection,
  //   payer,
  //   mint,
  //   new PublicKey("691U8mdtiPYyazdHkssh9gtwU4UNQHm9a9EsCJvQBPc3"),
  //   payer,
  //   100
  // );
}

main()
  .then(() => {
    console.log("DONE");
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

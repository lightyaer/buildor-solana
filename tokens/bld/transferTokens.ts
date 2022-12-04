import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { getMint, transfer } from "@solana/spl-token";
import fs from "fs";

export async function transferTokens(
  connection: Connection,
  payer: Keypair,
  source: PublicKey,
  destination: PublicKey,
  owner: PublicKey,
  amount: number,
  mint: PublicKey
) {
  const mintInfo = await getMint(connection, mint);

  const transactionSignature = await transfer(
    connection,
    payer,
    source,
    destination,
    owner,
    amount * 10 ** mintInfo.decimals
  );

  console.log(
    `Transfer Transaction: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
  );

  fs.appendFileSync(
    "tokens/bld/cache.json",
    JSON.stringify({
      name: "TRANSFER TOKENS",
      from: payer.publicKey,
      to: destination.toString(),
      transactionSignature: transactionSignature,
    })
  );
}

import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { burn } from "@solana/spl-token";
import fs from "fs";

export async function burnTokens(
  connection: Connection,
  payer: Keypair,
  account: PublicKey,
  mint: PublicKey,
  owner: Keypair,
  amount: number
) {
  const transactionSignature = await burn(
    connection,
    payer,
    account,
    mint,
    owner,
    amount
  );

  console.log(
    `Burn Transaction: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
  );

  fs.appendFileSync(
    "tokens/bld/cache.json",
    JSON.stringify({
      name: "BURN TOKENS",
      transactionSignature: transactionSignature,
    })
  );
}

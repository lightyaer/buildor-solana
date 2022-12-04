import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { getMint, mintTo } from "@solana/spl-token";
import fs from "fs";

export async function mintTokens(
  connection: Connection,
  payer: Keypair,
  mint: PublicKey,
  destination: PublicKey,
  authority: Keypair,
  amount: number
) {
  const mintInfo = await getMint(connection, mint);

  const transactionSignature = await mintTo(
    connection,
    payer,
    mint,
    destination,
    authority,
    amount * 10 ** mintInfo.decimals
  );

  console.log(
    `Mint Token Transaction: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
  );

  fs.appendFileSync(
    "tokens/bld/cache.json",
    JSON.stringify({
      name: "MINT TOKENS",
      transactionSignature: transactionSignature,
    })
  );
}

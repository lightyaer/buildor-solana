import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import fs from "fs";

export async function createTokenAccount(
  connection: Connection,
  payer: Keypair,
  mint: PublicKey,
  owner: PublicKey
) {
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    owner
  );

  console.log(
    `Token Account: https://explorer.solana.com/address/${tokenAccount.address}?cluster=devnet`
  );

  fs.appendFileSync(
    "tokens/bld/cache.json",
    JSON.stringify({
      name: "GET OR CREATE TOKEN ACCOUNT",
      tokenAccountAddress: tokenAccount.address,
    })
  );

  return tokenAccount;
}

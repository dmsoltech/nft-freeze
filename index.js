import {
    TokenStandard,
    mplTokenMetadata,
    lockV1,
  } from '@metaplex-foundation/mpl-token-metadata';
import * as bs58 from "bs58";
import { keypairIdentity } from '@metaplex-foundation/umi';
import { PublicKey } from '@solana/web3.js';
import { createUmi } from '@metaplex-foundation/umi';

export const privatekey = "your private key here"
export const nftMint = "nft mint address here"

async function main() {
    const umi = createUmi().use(mplTokenMetadata());
    
    const keypair = umi.eddsa.createKeypairFromSecretKey(bs58.decode(privatekey))

    umi.use(keypairIdentity(keypair))

    const mint = new PublicKey(nftMint)

    console.log("umi", umi.rpc.getEndpoint())
    console.log("mint", mint.toString())
    // When the standard delegate locks the asset.
    await lockV1(umi, {
      mint: mint,
      authority: keypair,
      tokenStandard: TokenStandard.NonFungible,
    }).sendAndConfirm(umi);
}
main()
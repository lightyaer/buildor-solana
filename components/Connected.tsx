import { FC, MouseEventHandler, useCallback, useState } from "react";
import {
  Container,
  Heading,
  HStack,
  Text,
  VStack,
  Image,
  Button,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { PublicKey } from "@solana/web3.js";
import { useRouter } from "next/router";

const Connected: FC = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const router = useRouter();
  const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      if (event.defaultPrevented) return;
      const candyMachine = await metaplex.candyMachinesV2().findByAddress({
        address: new PublicKey("HkMYuocTsTDPEbvNJdzyAKXzTHKGbh14DSjDP8oBKVdZ"),
      });
      console.log(candyMachine);

      if (!wallet.connected || !candyMachine) return;

      try {
        console.log(candyMachine.items);
        console.log(candyMachine.itemsMinted.toString());
        const nft = await metaplex.candyMachinesV2().mint({ candyMachine });
        console.log(nft);
        await router.push(`/newMint?mint=${nft.nft.address.toBase58()}`);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    [metaplex, router, wallet.connected]
  );

  return (
    <VStack spacing={20}>
      <Container>
        <VStack spacing={8}>
          <Heading
            color="white"
            as="h1"
            size="2xl"
            noOfLines={1}
            textAlign="center"
          >
            Welcome to buildor
          </Heading>
          <Text color="bodyText" fontSize="xl" textAlign="center">
            Each buildor is randomly generated and can be staked to receive
            <Text as="b">$BLD</Text> Use your <Text as="b">$BLD</Text> to
            upgrade your buildor and receive perks withing this community!
          </Text>
        </VStack>
      </Container>
      <HStack>
        <Image src="avatar1.png" alt="" />
        <Image src="avatar2.png" alt="" />
        <Image src="avatar3.png" alt="" />
        <Image src="avatar4.png" alt="" />
        <Image src="avatar5.png" alt="" />
      </HStack>
      <Button onClick={handleClick} bgColor="accent" color="white" maxW="380px">
        <HStack>
          <Text>mint buildor</Text>
          <ArrowForwardIcon />
        </HStack>
      </Button>
    </VStack>
  );
};

export default Connected;

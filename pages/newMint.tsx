import {
  Button,
  Text,
  HStack,
  Center,
  Spacer,
  Container,
  VStack,
  Heading,
  Stack,
  Box,
} from "@chakra-ui/react";
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import MainLayout from "../components/MainLayout";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { PublicKey } from "@solana/web3.js";
import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import NavBar from "../components/NavBar";
import Connected from "../components/Connected";
import Disconnected from "../components/Disconnected";

interface NewMintProps {
  mint: PublicKey;
}
const NewMint: NextPage<NewMintProps> = ({ mint }) => {
  const [isMinting, setIsMinting] = useState(false);
  const [metadata, setMetadata] = useState({ image: "" });
  const { connection } = useConnection();
  const router = useRouter();
  const wallet = useWallet();

  const metaplex = useMemo(() => {
    return Metaplex.make(connection).use(walletAdapterIdentity(wallet));
  }, [connection, wallet]);

  useEffect(() => {
    // What this does are to allow us to find the NFT object
    // based on the given mint address
    metaplex
      .nfts()
      .findByMint({ mintAddress: new PublicKey(mint) })
      .then((nft) => {
        // We then fetch the NFT uri to fetch the NFT metadata
        fetch(nft.uri)
          .then((res) => res.json())
          .then((metadata) => {
            setMetadata(metadata);
          });
      });
  }, [mint, metaplex, wallet]);

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {},
    []
  );

  return (
    <MainLayout>
      <Stack w="full" h="calc(100vh)" justify="center">
        <NavBar />
        <Spacer />
        <VStack spacing={8}>
          <Spacer />
          <Heading
            color="white"
            as="h1"
            size="2xl"
            noOfLines={1}
            textAlign="center"
          >
            😧A new buildor has appeared!
          </Heading>
          <Text color="bodyText" fontSize="xl" textAlign="center">
            Congratulations!, you minted a 1 of 1 buildoor!
            <br />
            Time to stage your character to earn rewards.
          </Text>
          <Spacer />

          <Image
            className={styles.image}
            width={300}
            height={300}
            src={metadata.image}
            alt="nft"
          />

          <Button
            bgColor="accent"
            color="white"
            maxWidth="380px"
            onClick={handleClick}
          >
            <HStack>
              <Text>stake my buildoor</Text>
              <ArrowForwardIcon />
            </HStack>
          </Button>
        </VStack>
        <Spacer />
        <Center>
          <Box marginBottom={4} color="white">
            <a
              href="https://twitter.com/lightyaer"
              target="_blank"
              rel="noopener noreferrer"
            >
              built by lightyaer
            </a>
          </Box>
        </Center>
      </Stack>
    </MainLayout>
  );
};

NewMint.getInitialProps = async ({ query }) => {
  const { mint } = query;
  if (!mint) throw { error: "No mint" };

  try {
    const mintPublicKey = new PublicKey(mint);
    return { mint: mintPublicKey };
  } catch {
    throw { error: "Invalid mint" };
  }
};

export default NewMint;

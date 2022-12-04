import { Box, Stack, Center, Spacer } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import Disconnected from "../components/Disconnected";
import { useWallet } from "@solana/wallet-adapter-react";
import Connected from "../components/Connected";
import MainLayout from "../components/MainLayout";

export default function Home() {
  const { connected } = useWallet();

  return (
    <MainLayout>
      <Stack w="full" h="calc(100vh)" justify="center">
        <NavBar />
        <Spacer />
        <Center>{connected ? <Connected /> : <Disconnected />}</Center>
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
}

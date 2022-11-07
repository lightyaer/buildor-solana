import { FC, MouseEventHandler, useCallback } from "react";
import {
  Container,
  VStack,
  Heading,
  Button,
  HStack,
  Text,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const Disconnected: FC = () => {
  const modalState = useWalletModal();
  const { wallet, connect } = useWallet();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      if (event.defaultPrevented) {
        return;
      }
      if (!wallet) {
        modalState.setVisible(true);
      } else {
        await connect();
      }
    },
    [wallet, connect, modalState]
  );

  return (
    <Container>
      <VStack spacing={20}>
        <Heading
          color="white"
          as="h1"
          size="3xl"
          noOfLines={2}
          textAlign="center"
        >
          Mint your buildor. Earn $BLD. Level up.
        </Heading>
        <Button
          bgColor="accent"
          color="white"
          maxW="380px"
          onClick={handleClick}
        >
          <HStack>
            <Text>become a buildor</Text>
            <ArrowForwardIcon />
          </HStack>
        </Button>
      </VStack>
    </Container>
  );
};

export default Disconnected;

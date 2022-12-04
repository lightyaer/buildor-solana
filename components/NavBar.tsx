import { FC } from "react";
import { HStack, Spacer } from "@chakra-ui/react";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";

const ReactUIWalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const NavBar: FC = () => {
  return (
    <HStack width="full" padding={4}>
      <Spacer />
      <ReactUIWalletMultiButtonDynamic
        className={styles.walletAdapterButtonTrigger}
      />
    </HStack>
  );
};

export default NavBar;

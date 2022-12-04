import { FC, ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

interface Props {
  children: ReactNode;
}
const MainLayout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>buildor</title>
        <meta name="The NFT Collection for buildor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        w="full"
        h="calc(100vh)"
        bgImage={"url(/home-background.svg)"}
        backgroundPosition="center"
      >
        {children}
      </Box>
    </div>
  );
};

export default MainLayout;

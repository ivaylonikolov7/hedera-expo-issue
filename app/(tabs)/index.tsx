import "react-native-get-random-values";
import "@ethersproject/shims";

import { Client, PrivateKey, AccountCreateTransaction } from "@hashgraph/sdk";

import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect } from "react";

/*
const sanitizeRecipientId = (input: string): string => {
  return input.replace(/[^a-zA-Z0-9.]/g, "");
};

const sanitizeAmount = (input: string): string => {
  return input.replace(/[^0-9.]/g, "");
};

const sanitizeMemo = (input: string): string => {
  return input.replace(/[^a-zA-Z0-9\s-.]/g, "");
};
*/

export default function HomeScreen() {
  //const logger = new Logger(LogLevel.Debug);

  const OPERATOR_ID = process.env.EXPO_PUBLIC_ACCOUNT_ID;

  const OPERATOR_KEY = PrivateKey.fromStringECDSA(
    process.env.EXPO_PUBLIC_PRIVATE_KEY ?? ""
  );

  const client = Client.forTestnet().setOperator(
    OPERATOR_ID ?? "",
    OPERATOR_KEY
  );
  //.setLogger(logger);

  if (process.env.EXPO_PUBLIC_ACCOUNT_ID === undefined) {
    throw new Error("EXPO_PUBLIC_ACCOUNT_ID is not set");
  }

  useEffect(() => {
    const createAccount = async () => {
      const privateKey = PrivateKey.generateECDSA();

      const response = await new AccountCreateTransaction()
        .setKey(privateKey)
        .execute(client);

      await response.getReceipt(client);

      //console.log(accountCreation.getReceipt(client));
      /*
      const memo = "test-memo";
      const sanitizedRecipientId = sanitizeRecipientId(accountId.toString());
      const sanitizedAmount = sanitizeAmount("1.0");
      const sanitizedMemo = sanitizeMemo(memo);
      const hbarAmount = Number(sanitizedAmount);

      /*
      try {
        const transaction = await new TransferTransaction()
          .addHbarTransfer(accountId, Hbar.fromTinybars("100"))
          .addHbarTransfer(sanitizedRecipientId, Hbar.fromTinybars("-100"))
          .setTransactionMemo(sanitizedMemo)
          .execute(client);

        console.log(await transaction.getReceipt(client));
      } catch (err) {
        console.log(err);
      }
      */
      /* const receipt = await transaction.getReceipt(client);
      const status = receipt.status;
      console.log(status);
      */
    };
    void createAccount();
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it 2</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{" "}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

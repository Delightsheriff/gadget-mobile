import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Tabslayout = () => {
  return (
    <SafeAreaView>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Tabs.Screen name="orders" options={{}} />
      </Tabs>
    </SafeAreaView>
  );
};

export default Tabslayout;

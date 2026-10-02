import { useSSO } from "@clerk/expo";
import React, { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import BottomModal from "../../../components/BottomModal";
import SafeAreaView from "../../../components/SafeAreaView";
import { OAUTH } from "../../../constant";

const SignUp = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { startSSOFlow } = useSSO();
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
  const isGoogleClicked = loadingStrategy === OAUTH.GOOGLE_OAUTH;
  const isAppleClicked = loadingStrategy === OAUTH.APPLE_OAUTH;

  const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
    setLoadingStrategy(strategy);
    try {
      const { createSessionId, setActive } = await startSSOFlow({ strategy });
      if (!createSessionId || !setActive) {
        Alert.alert(
          "Sign in incomplete",
          "Sign in did not complete, please try again",
        );
        return;
      }
      await setActive({ session: createSessionId });
      Alert.alert("Signed in succesfully");
    } catch (error) {
      console.log("Error in social auth", error);
      Alert.alert("Failed to sign in, Please try again.");
    } finally {
      setLoadingStrategy(null);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center relative bg-green-600">
      <View className="mt-2 p-4">
        <Text className="text-6xl font-bold mb-2 tracking-wide text-center">
          Go<Text className="text-red-700">L</Text>ine
        </Text>
        <View className="flex gap-2 items-center">
          <Text className="text-3xl font-bold ">Welcome Back!</Text>
          <Text className="text-black text-lg">
            Sign in to access your Goline store.
          </Text>
        </View>
        <View className="mt-10 flex gap-6">
          <Pressable
            onPress={() => handleSocialAuth("oauth_google")}
            className={`flex-row justify-center py-4 border gap-3 bg-white border-gray-200 rounded-xl items-center text-black ${isGoogleClicked ? "opacity-70" : ""}`}
            disabled={isGoogleClicked}
          >
            <Text className="uppercase font-medium text-md">
              {isGoogleClicked
                ? "Connecting Google..."
                : "Continue With Google"}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => handleSocialAuth("oauth_apple")}
            className={`flex-row justify-center py-4 border gap-3 bg-white border-gray-200 rounded-xl items-center text-black ${isAppleClicked ? "opacity-70" : ""}`}
            disabled={isAppleClicked}
          >
            <Text className="uppercase font-medium text-md">
              {isAppleClicked ? "Connecting with Apple" : "Continue With Apple"}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setModalVisible(true)}
            className="flex-row justify-center py-4 border gap-3 bg-white border-gray-200 rounded-xl items-center text-black"
          >
            <Text className="uppercase font-medium text-md">
              Continue With Email
            </Text>
          </Pressable>
          <View className="flex items-center py-2">
            <Pressable>
              <Text className="font-semibold bg-black text-white py-2 px-6 rounded-full">
                Skip
              </Text>
            </Pressable>
          </View>
        </View>
        <BottomModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title="Get Started 👋"
        >
          <View>
            <Text className="mb-6 text-gray-500">
              This modal smoothly slides up from underneath the screen.
            </Text>
            <View className="py-5">
              <TextInput
                className="mb-3 rounded-xl px-2"
                style={{
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 1,
                }}
                defaultValue="You can type in me"
              />
              <TextInput
                className="mb-3 rounded-xl px-2"
                style={{
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 1,
                }}
                defaultValue="You can type in me"
              />
              <TextInput
                className="mb-3 rounded-xl px-2"
                style={{
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 1,
                }}
                defaultValue="You can type in me"
              />
              <Pressable className="py-4 bg-black">
                <Text className="text-center text-white">Submit</Text>
              </Pressable>
            </View>
          </View>

          <Pressable
            onPress={() => setModalVisible(false)}
            className="rounded-xl bg-black py-4"
          >
            <Text className="text-center font-semibold text-white">Close</Text>
          </Pressable>
        </BottomModal>
      </View>
      <View className="flex-row justify-between absolute bottom-8 px-8 w-full">
        <Text className="uppercase">© 2026 Goline Stores.</Text>
        <View className="flex flex-row gap-4">
          <Text className="uppercase">Privacy</Text>
          <Text className="uppercase">Terms</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

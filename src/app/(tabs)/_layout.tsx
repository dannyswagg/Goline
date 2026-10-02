import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";

const TabsLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-up"} />;
  }

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon
          sf={{
            default: "house",
            selected: "house.fill",
          }}
          drawable="home"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="index">
        <Label>Cart</Label>
        <Icon
          sf={{
            default: "bag",
            selected: "bag.fill",
          }}
          drawable="bag"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="index">
        <Label>Wishlist</Label>
        <Icon
          sf={{
            default: "heart",
            selected: "heart.fill",
          }}
          drawable="heart"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

export default TabsLayout;

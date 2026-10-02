import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Modal,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

type BottomModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export default function BottomModal({
  visible,
  onClose,
  title,
  children,
}: BottomModalProps) {
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const [mounted, setMounted] = useState(visible);
  const translateY = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    if (visible) {
      setMounted(true);
    }

    Animated.timing(translateY, {
      toValue: visible ? 0 : screenHeight,
      duration: 350,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && !visible) {
        setMounted(false);
      }
    });
  }, [screenHeight, translateY, visible]);

  if (!mounted) {
    return null;
  }

  return (
    <Modal
      transparent
      visible={mounted}
      animationType="none"
      onRequestClose={onClose}
    >
      <View
        className="flex-1 justify-end"
        style={{ flex: 1, justifyContent: "flex-end" }}
      >
        <Pressable onPress={onClose} className="absolute inset-0 bg-black/50" />

        <Animated.View
          style={{
            transform: [{ translateY }],
            height: screenHeight * 0.65,
            width: screenWidth,
          }}
          className="rounded-t-3xl bg-white px-5 pt-4"
        >
          <View className="mx-auto mb-6 h-1.5 w-16 rounded-full bg-gray-300" />

          {title ? (
            <Text className="mb-2 text-2xl font-bold text-gray-900">
              {title}
            </Text>
          ) : null}

          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

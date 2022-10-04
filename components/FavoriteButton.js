import React from "react";
import { toggleFavorite } from "../utils/toggleFavorite";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  Extrapolate,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
  withSpring
} from "react-native-reanimated";
import { StyleSheet, Pressable } from "react-native";
import { Colors } from "../config";

const FavoriteButton = ({clinic_id, favorite, setFavorite, user}) => {
  const liked = useSharedValue(0);

  const outlineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
        },
      ],
    };
  });

  const fillStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: liked.value,
        },
      ],
    };
  });

  return (
    <Pressable
      onPress={() => {
        toggleFavorite(clinic_id, favorite, setFavorite, user);
        liked.value = withSpring(liked.value ? 0 : 1);
      }}
    >
      <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle]}>
        <MaterialCommunityIcons
          name={"heart-outline"}
          size={25}
          color={Colors.red}
        />
      </Animated.View>

      <Animated.View style={[fillStyle]}>
        <MaterialCommunityIcons name={"heart"} size={25} color={Colors.red} />
      </Animated.View>
    </Pressable>
  );
};

export default FavoriteButton

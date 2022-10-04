import { Audio } from "expo-av";

export const sound = async () => {
  try {
    const soundObject = new Audio.Sound();
    await soundObject.loadAsync(require("../assets/sound1.mp3"));
    await soundObject.playAsync();
  } catch (err) {
    console.error("Error with sound", err);
  }
};

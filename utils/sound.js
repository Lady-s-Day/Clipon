import { Audio } from "expo-av";

export const sound = async () => {
  try {
    const soundObject = new Audio.Sound();
    // await soundObject.loadAsync(require("../assets/sound1.mp3"));
    await soundObject.loadAsync(require("../assets/Onoma-Pop01-mp3/Onoma-Pop01-1(Dry).mp3"));
    await soundObject.playAsync();
  } catch (err) {
    console.error("Error with sound", err);
  }
};

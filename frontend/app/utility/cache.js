import AsyncStorageLib from "@react-native-async-storage/async-storage";
import moment from "moment";

const expiryInMinutes = 5;

const store = async (key, value) => {
  try {
    // اضفناه القيمه مع الوقت علشان نعرف متى اضفناه مب ضروري
    const item = {
      value,
      timestamp: Date.now(),
    };
    await AsyncStorageLib.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

const isExpired = (item) => {
  const now = moment(Date.now());
  const storedTime = moment(item.timestamp);
  return now.diff(storedTime, "minute") > expiryInMinutes;
};

const get = async (key) => {
  try {
    const value = await AsyncStorageLib.getItem(key);
    const item = JSON.parse(value);

    if (!item) return null;

    if (isExpired(item)) {
      await AsyncStorageLib.removeItem(key);
      return null;
    }

    return item.value;
  } catch (error) {
    console.log(error);
  }
};

export default {
  store,
  get,
};

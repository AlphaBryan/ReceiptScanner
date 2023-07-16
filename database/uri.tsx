import Constants from 'expo-constants';


function getBaseServerAdressDev() {
  let BASE_SERVER: string | undefined = ({} = "");
  BASE_SERVER = `http://${Constants.experienceUrl
    .split("//")
    .pop()
    ?.split(":")
    .shift()}:3000/`;
  return BASE_SERVER;
}

// const URI =__DEV__ ?  getBaseServerAdressDev() : "https://.com/";
const URI = getBaseServerAdressDev() ;
export default URI;

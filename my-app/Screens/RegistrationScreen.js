import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisrationScreen() {
  return (
    <View style={styles.form}>
      <View style={styles.photoWrap}></View>
      <Text style={styles.formTitle}>Реєстрація</Text>
      <View style={{ gap: 16 }}>
        <TextInput
          style={styles.input}
          placeholder={"Логін"}
          placeholderTextColor={"#BDBDBD"}
        />
        <TextInput
          style={styles.input}
          placeholder={"Адреса електронної пошти"}
          placeholderTextColor={"#BDBDBD"}
        />
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            placeholder={"Пароль"}
            placeholderTextColor={"#BDBDBD"}
          />
          <Text style={styles.show}>Показати</Text>
        </View>
      </View>
      <View style={{ paddingTop: 43, paddingBottom: 16 }}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textButton}>Зареєструватися</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textLogWrap}>
        <Text style={styles.textLog}>Вже є акаунт? Ввійти</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  form: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 78,
  },
  photoWrap: {
    // width: 120,
    // height: 120,
    // backgroundColor: "#F6F6F6",
    // borderRadius: 16,
    // // position: "absolute",
    // justifyContent: "center",
  },
  // titleWrap: {  },
  formTitle: {
    paddingBottom: 32,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "500",
    letterSpacing: 0.01,
    color: "#212121",
  },
  input: {
    backgroundColor: "#F6F6F6",
    padding: 16,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderRadius: 8,
    borderWidth: 1,
    color: "#212121",
    height: 50,
  },

  inputTitle: {
    color: "#f0f8ff",
    marginBottom: 10,
    fontSize: 18,
  },
  inputWrap: {},
  show: {
    position: "absolute",
    right: 16,
    top: 13,
    fontWeight: "400",
    fontSize: 16,
    textAlign: "right",
    color: "#1B4371",
  },
  button: {
    alignItems: "center",
    paddingTop: 16,
    paddingRight: 32,
    paddingBottom: 16,
    paddingLeft: 32,
    gap: 12,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  textButton: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  textLogWrap: {},
  textLog: {
    fontWeight: "400",
    fontSize: 16,
    textAlign: "center",
    color: "#1B4371",
  },
});

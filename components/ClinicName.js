import { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View, TextInput, Button, FormErrorMessage } from "./login_components";
import { Colors } from "../config";
import { set } from "react-native-reanimated";

const ClinicName = ({ navigation }) => {
  const [errorState, setErrorState] = useState("");
  const [clinicName, setClinicName] = useState("");

  const handleClinicNameRegister = (values) => {
    const { clinicName: cName } = values;
    setClinicName(cName);

    // values.clinicName = "";
  };

  useEffect(() => {
    if (clinicName) {
      navigation.navigate("Camera", {
        clinicName: clinicName,
      });
    }
  }, [clinicName]);

  // const handleGoBack = () => {navigation.goBack()};

  return (
    <>
      <View isSafe style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid={true}>
          {/* LogoContainer: consits app logo and screen title */}
          <View style={styles.logoContainer}>
            <Text style={styles.screenTitle}>病院名を入力</Text>
          </View>
          <Formik
            initialValues={{
              clinicName: "",
            }}
            // validationSchema={clinicNameValidationSchema}
            onSubmit={(values) => handleClinicNameRegister(values)}
          >
            {({
              values,
              touched,
              errors,
              handleChange,
              handleSubmit,
              handleBlur,
            }) => (
              <>
                {/* Input fields */}
                <TextInput
                  name="clinicName"
                  leftIconName="hospital-building"
                  placeholder="病院名"
                  autoCapitalize="none"
                  keyboardType="default"
                  textContentType="clinicName"
                  autoFocus={true}
                  value={values.uName}
                  onChangeText={handleChange("clinicName")}
                  onBlur={handleBlur("clinicName")}
                />
                <FormErrorMessage
                  error={errors.clinicName}
                  visible={touched.clinicName}
                />
                {/* Display Screen Error Mesages */}
                {errorState !== "" ? (
                  <FormErrorMessage error={errorState} visible={true} />
                ) : null}
                {/* Register button */}
                <Button style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>登録</Text>
                </Button>
              </>
            )}
          </Formik>
          {/* <Button
            style={styles.borderlessButtonContainer}
            borderless
            title={"戻る"}
            onPress={handleGoBack}
          /> */}
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: "center",
    // resizeMode: "stretch",
    // height: 100,
    // width: 200,
  },
  screenTitle: {
    fontSize: 25,
    fontWeight: "500",
    color: Colors.navy,
    paddingTop: 20,
  },
  footer: {
    backgroundColor: Colors.light,
    paddingHorizontal: 12,
    paddingBottom: 48,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.orange,
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: Colors.red,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: "700",
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ClinicName;

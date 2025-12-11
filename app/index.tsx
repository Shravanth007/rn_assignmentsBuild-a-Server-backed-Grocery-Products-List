import "./global.css";
import { Text, View, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#059669" />
      
      {/* Decorative circles */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <View style={styles.circle3} />
      
      <View style={styles.content}>
        {/* App Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.iconEmoji}>🥬</Text>
        </View>
        
        <Text style={styles.brandName}>Market</Text>
        <Text style={styles.tagline}>Fresh groceries at your doorstep</Text>
        
        <View style={styles.featureContainer}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>⚡</Text>
            <Text style={styles.featureText}>10-min delivery</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>✨</Text>
            <Text style={styles.featureText}>Fresh produce</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>💰</Text>
            <Text style={styles.featureText}>Best prices</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={() => router.push("/(auth)/login")}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.signupButton} 
            onPress={() => router.push("/(auth)/signup")}
            activeOpacity={0.8}
          >
            <Text style={styles.signupButtonText}>Create Account</Text>
          </TouchableOpacity>
          
          <Text style={styles.guestText}>or</Text>
          <TouchableOpacity onPress={() => router.push("/(main)/home")}>
            <Text style={styles.guestLink}>Continue as Guest →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0fdf4",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  circle1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  circle2: {
    position: 'absolute',
    bottom: -80,
    left: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(52, 211, 153, 0.15)',
  },
  circle3: {
    position: 'absolute',
    top: '40%',
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
  },
  content: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    zIndex: 1,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 25,
    backgroundColor: "#059669",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#059669",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  iconEmoji: {
    fontSize: 50,
  },
  brandName: {
    fontSize: 36,
    fontWeight: "800",
    color: "#047857",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 16,
    color: "#059669",
    marginBottom: 40,
    textAlign: "center",
    opacity: 0.8,
  },
  featureContainer: {
    flexDirection: 'row',
    marginBottom: 50,
    gap: 20,
  },
  feature: {
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 12,
    color: '#047857',
    fontWeight: '600',
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  loginButton: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 14,
    alignItems: "center",
    backgroundColor: "#059669",
    shadowColor: "#059669",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },
  signupButton: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#059669",
  },
  signupButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#059669",
    letterSpacing: 0.5,
  },
  guestText: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },
  guestLink: {
    fontSize: 15,
    color: "#059669",
    fontWeight: "600",
  },
});
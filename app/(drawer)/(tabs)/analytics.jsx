import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Progress from "react-native-progress";

export default function Analytics  () {
  return (
    <>

      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
 <Text style={styles.header}>Analytics</Text>
          <View style={styles.card}>
            <Text style={styles.cardNum}>0</Text>
            <Text style={styles.cardLabel}>Total Tasks</Text>
            <View style={styles.cardInnerBox}>
              <Text style={styles.cardInnerText}>Weekly Progress</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardInner}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Progress.Circle
        size={100}
        progress={0}
        showsText={true}
        thickness={8}
        color="#3b82f6"
        unfilledColor="#e5e7eb"
        borderWidth={0}
        formatText={() => `${0}%`}
        textStyle={{ color: "#3b82f6", fontWeight: "bold", fontSize: 16 }}
      />
    </View>
              <Text style={styles.smallText}>Completion Rate</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardNum}>0</Text>
            <Text style={styles.cardLabel}>Productivity Score</Text>
            <View style={styles.cardInnerBoxBig}>
              <Text style={styles.cardInnerText}>Daily Activity</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardNum}>5</Text>
            <Text style={styles.cardLabel}>Day Streak</Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};



const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: "gray",
    fontSize: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 15,
    paddingLeft: 10,
    gap: 5,
  },
  iconText: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
  },
  container: {
    padding: 15,
    gap: 20,
  },
   header: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    gap: 10,
  },
  cardNum: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardLabel: {
    fontSize: 20,
    textTransform: "uppercase",
    color: "gray",
  },
  cardInnerBox: {
    backgroundColor: "#f0eef2",
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cardInnerBoxBig: {
    backgroundColor: "#f0eef2",
    borderRadius: 10,
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  cardInner: {
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  cardInnerText: {
    fontSize: 12,
  },
  smallText: {
    fontSize: 12,
    textTransform: "uppercase",
    color: "gray",
  },
});

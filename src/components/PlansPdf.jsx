import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { format } from "date-fns";
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#555",
  },
  value: {
    fontSize: 12,
    marginBottom: 10,
    color: "#333",
  },
  task: {
    marginBottom: 15,
  },
});

const PlansPdf = ({ planData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Plan Information</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Plan Name:</Text>
          <Text style={styles.value}>{planData.planName}</Text>
          <Text style={styles.label}>Type:</Text>
          <Text style={styles.value}>{planData.planType}</Text>
          <Text style={styles.label}>Duration:</Text>
          <Text style={styles.value}>{planData.duration}</Text>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>
            {format(new Date(planData.date), "yyyy-MM-dd")}
          </Text>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>
            {format(new Date(planData.time), "HH:mm:ss")}
          </Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Tasks</Text>
        {planData?.tasks.map((task, index) => (
          <View key={index} style={styles.task}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{task.taskName}</Text>
            <Text style={styles.label}>Duration:</Text>
            <Text style={styles.value}>{task.duration}</Text>
            <Text style={styles.label}>Assignee:</Text>
            <Text style={styles.value}>{task.assigne}</Text>
            <Text style={styles.label}>Notes:</Text>
            <Text style={styles.value}>{task.notes}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default PlansPdf;

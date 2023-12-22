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
});

const EventsPdf = ({ eventData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Event Information</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{eventData.eventName}</Text>
          <Text style={styles.label}>Type:</Text>
          <Text style={styles.value}>{eventData.eventType}</Text>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>
            {format(new Date(eventData.date), "yyyy-MM-dd")}{" "}
          </Text>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>
            {" "}
            {format(new Date(eventData.time), "HH:mm:ss")}
          </Text>
          <Text style={styles.label}>Fee:</Text>
          <Text style={styles.value}>${eventData.fee}</Text>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{eventData.description || "N/A"}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default EventsPdf;

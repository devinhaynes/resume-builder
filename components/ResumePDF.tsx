import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
  Font,
} from "@react-pdf/renderer";

import type { RequestorInformation } from "@/types/Resume";

Font.register({
  family: "Nunito",
  fonts: [
    { src: "/assets/Nunito-Regular.ttf" },
    { src: "/assets/Nunito-Bold.ttf", fontWeight: 700 },
  ],
});

const width = 525;
const height = width * 1.4375;

// Create styles
const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "white",
    fontSize: "10px",
    width: width,
    position: "relative",
    paddingTop: 48,
    paddingBottom: 48,
    paddingLeft: 48,
    paddingRight: 48,
    lineHeight: 1.7,
    fontFamily: "Nunito",
  },
  section: {
    paddingBottom: 16,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 16,
    borderBottom: "1px solid gray",
  },
  col: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
  },
  contact: {
    textAlign: "right",
    alignSelf: "flex-end",
  },
  sectionHeader: {
    textTransform: "uppercase",
    color: "rgb(0, 0, 180)",
    paddingBottom: 4,
  },
  bold: {
    fontWeight: "bold",
  },
  date: {
    fontSize: 10,
    color: "rgba(0, 0, 0, .5)",
    marginTop: -4,
    marginBottom: 4,
  },
  pageBreak: {
    position: "absolute",
    top: height,
    width: "100%",
    borderTop: "1px dotted gray",
    left: 0,
  },
  pageBreakText: {
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    left: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
    borderRadius: ".25rem",
    outline: "1px solid gray",
    transform: "translate(-50%, -50%)",
    color: "gray",
  },
  workItem: {
    paddingBottom: 8,
    lineHeight: 1.5,
    display: "flex",
    marginLeft: 8,
    alignItems: "center",
  },
});

type ResumePDFProps = {
  title: string;
  resumeData: RequestorInformation;
};

// Create Document Component
export default function ResumePDF({ title, resumeData }: ResumePDFProps) {
  const { applicant_info, resume } = resumeData;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* <View style={styles.pageBreak}>
          <Text style={styles.pageBreakText}>Page Break</Text>
        </View> */}

        {/* Header */}
        <View style={styles.section}>
          <View style={styles.header}>
            <View style={styles.col}>
              <Text style={styles.name}>
                {applicant_info.first_name + " " + applicant_info.last_name}
              </Text>
              <View style={styles.row}>
                <Text>Connect on Linkedin: </Text>
                <Link src={applicant_info.linkedin_profile}>
                  {applicant_info.linkedin_profile}
                </Link>
              </View>
            </View>
            <View style={mergeStyles(["col", "contact"])}>
              <Text>{applicant_info.contact.address}</Text>
              <Text>{applicant_info.contact.email}</Text>
              <Text>{applicant_info.contact.phone}</Text>
            </View>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Summary</Text>
          <Text>{resume.summary}</Text>
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Education</Text>
          {resume.education.map((entry, i) => (
            <View style={styles.col} key={"eduction" + i}>
              <Text style={styles.bold}>{entry.school}</Text>
              <Text>{entry.degree}</Text>
            </View>
          ))}
        </View>

        {/* Work Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Experience</Text>
          {resume.work_experience.map((entry, i) => (
            <View style={styles.section} key={"experience" + i}>
              <View style={styles.row}>
                <Text style={styles.bold}>{entry.job_title}</Text>
                <Text>, {entry.company_name}</Text>
              </View>
              <Text style={styles.date}>
                {entry.start_date} - {entry.end_date}
              </Text>
              {entry.responsibilities.map((responsibility, i) => (
                <View key={"responsibility" + i} style={styles.row}>
                  <Text>- </Text>
                  <Text style={styles.workItem}>{responsibility}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Skills</Text>
          {resume.skills.map((skill, i) => (
            <View style={styles.col} key={"skill" + i}>
              <Text>{skill}</Text>
            </View>
          ))}
        </View>

        {/* Certifications */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Certifications</Text>
          {resume.certifications.map((cert, i) => (
            <View key={"cert" + i}>
              <Text>{cert.name}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

function mergeStyles(styleList: (keyof typeof styles)[]) {
  let stylesObj = {};

  styleList.forEach((style) => Object.assign(stylesObj, styles[style]));

  return stylesObj;
}

import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { RequestorInformation } from "@/types/Resume";

// Define styles for the resume
const styles = StyleSheet.create({
  page: {
    fontFamily: "Arial",
    fontSize: 12,
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  content: {
    marginLeft: 10,
  },
  summary: {
    fontStyle: "italic",
    marginBottom: 10,
  },
  listItem: {
    marginLeft: 10,
  },
});

// Create the Resume component
const Resume = ({ applicant_info, resume }: RequestorInformation) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <Text style={styles.content}>
            Name: {applicant_info.first_name + " " + applicant_info.last_name}
          </Text>
          <Text style={styles.content}>
            Email: {applicant_info.contact.email}
          </Text>
          <Text style={styles.content}>
            Phone: {applicant_info.contact.phone}
          </Text>
          <Text style={styles.content}>
            Address: {applicant_info.contact.address}
          </Text>
          <Text style={styles.content}>
            LinkedIn: {applicant_info.linkedin_profile}
          </Text>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summary}>{resume.summary}</Text>
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {resume.education.map((edu, index) => (
            <View key={index} style={styles.content}>
              <Text>{edu.degree}</Text>
              <Text>{edu.school}</Text>
            </View>
          ))}
        </View>

        {/* Work Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {resume.work_experience.map((exp, index) => (
            <View key={index} style={styles.content}>
              <Text style={styles.listItem}>
                {exp.job_title} at {exp.company_name}
              </Text>
              <Text>
                {exp.start_date} - {exp.end_date}
              </Text>
              {exp.responsibilities.map((resp, idx) => (
                <Text key={idx} style={styles.listItem}>
                  {resp}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.content}>
            {resume.skills.map((skill, index) => (
              <Text key={index}>{skill}</Text>
            ))}
          </View>
        </View>

        {/* Certifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          {resume.certifications.map((cert, index) => (
            <Text key={index} style={styles.content}>
              {cert.name}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default Resume;

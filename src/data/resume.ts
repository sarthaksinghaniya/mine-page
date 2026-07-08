/**
 * @file src/data/resume.ts
 * @description JSON Resume format structure
 */

export const resumeData = {
  basics: {
    name: "Jane Doe",
    label: "Creative Technologist",
    image: "",
    email: "jane@example.com",
    phone: "(555) 123-4567",
    url: "https://janedoe.com",
    summary: "A passionate Creative Technologist specializing in WebGL, interactive 3D, and robust React architectures. Bridging the gap between technical execution and breathtaking design.",
    location: {
      address: "123 Tech Lane",
      postalCode: "94107",
      city: "San Francisco",
      countryCode: "US",
      region: "California"
    },
    profiles: [
      {
        network: "Twitter",
        username: "janedoe",
        url: "https://twitter.com/janedoe"
      },
      {
        network: "GitHub",
        username: "janedoe",
        url: "https://github.com/janedoe"
      }
    ]
  },
  education: [
    {
      institution: "University of Technology",
      url: "https://university.example.com",
      area: "Computer Science",
      studyType: "Bachelor",
      startDate: "2015-09-01",
      endDate: "2019-06-01",
      score: "3.8/4.0",
      courses: [
        "Data Structures",
        "Computer Graphics",
        "Human Computer Interaction"
      ]
    }
  ],
  awards: [
    {
      title: "Best Interactive Experience",
      date: "2023-11-01",
      awarder: "Awwwards",
      summary: "Awarded for the Nexus OS portfolio."
    }
  ]
};

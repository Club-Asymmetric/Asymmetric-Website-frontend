export interface EventData {
  id: string;
  name: string;
  participants: number;
  date: string;
  photos: string[];
  registration_start: Date;
  location: string;
  min_team_size: number;
  max_team_size: number;
  description: string;
}

export const events = {
  1: {
    id: "1",
    name: "Quiz",
    participants: 100,
    date: "26-06-2024",
    photos: ["QUIZ_1.jpg", "QUIZ_2.jpg"],
    registration_start: new Date(),
    location: "Online",
    min_team_size: 1,
    max_team_size: 1,
    description:
      "Quiz on cybersecurity basics tested participants' knowledge of key concepts such as malware types, phishing, firewalls, and encryption. Questions covered best practices for securing personal and organizational data, recognizing cyber threats, and implementing preventive measures. The interactive format encouraged engagement and reinforced fundamental cybersecurity principles. Scores were tallied, and top performers were recognized, providing a fun and educational experience for all involved.",
  },
  2: {
    id: "2",
    name: "WEBINAR",
    participants: 200,
    date: "29-07-2024",
    registration_start: new Date(),
    location: "Online",
    min_team_size: 1,
    max_team_size: 1,
    photos: ["WEBINAR_1.jpg", "WEBINAR_2.jpg"],
    description:
      "Webinar on Linux basics covered essential commands, file management, and permissions. Participants learned how to navigate the filesystem, use command-line tools, and handle user permissions. The session also introduced package management and basic shell scripting. Attendees gained hands-on experience through practical exercises, enhancing their understanding of Linux system administration. The webinar concluded with a Q&A session to address specific queries.",
  },
  3: {
    id: "3",
    name: "WORKSHOP",
    participants: 100,
    date: "29-11-2024",
    registration_start: new Date(),
    location: "CIT Chennai",
    min_team_size: 1,
    max_team_size: 4,
    photos: ["WORKSHOP_1.jpg", "WORKSHOP_1.jpg"],
    description:
      "The 'Beyond Your Organisation' workshop focused on enhancing cybersecurity skills. Attendees learned about advanced threat detection, incident response, and secure coding practices. The workshop emphasized the importance of proactive defense mechanisms and the latest cybersecurity trends. Participants engaged in hands-on activities, including network vulnerability assessments and simulated cyber-attacks. Expert speakers provided insights into real-world cyber threats and mitigation strategies, concluding with a Q&A session for in-depth discussions.",
  },
};

export default events;

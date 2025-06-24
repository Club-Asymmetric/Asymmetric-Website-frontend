export interface PodcastData {
  id: string;
  name: string;
  publish: boolean;
  guests: string[];
  description: string;
  image: string;
  mime: string;
  spotify: string;
}

export const podcasts = {
  EP1: {
    id: "EP1",
    name: "Everyday Cybersecurity: Practical Tips for the Digital Era",
    publish: true,
    guests: ["Syed Suhail Ikraam, Cybersecurity Practitioner"],
    description:
      "In this episode, we're breaking down cybersecurity essentials! Discover why it's not for everyone and get a roadmap for ethical hacking, with a focus on mastering Linux OS. Packed with practical tips, this episode is a must-listen for anyone interested in cybersecurity! Tune in now!",
    image: "EP1.jpg",
    mime: "mp3",
    spotify:
      "https://open.spotify.com/episode/0ZMwdwTLYCyAtFK3gqun3R?si=60bd2edd73f34c5a",
  },
  EP2: {
    id: "EP2",
    name: "Unveiling Cyber Threats: Defensive Strategies with Vignesh Sir",
    publish: true,
    guests: ["Vignesh Sir, CEO of CyberXtron"],
    description:
      "Join Vignesh Sir, CEO of CyberXtron, in the first episode of our podcast series as we delve into essential defensive strategies against cyber threats. Discover proactive measures, best practices, and insights on staying ahead in the dynamic world of cybersecurity.",
    image: "EP2.jpg",
    mime: "mp3",
    spotify:
      "https://open.spotify.com/episode/2xc30vPB1UHp5AdWiiJwaA?si=cSXluBf9Rgey0NXQFf9g6w",
  },
  EP3: {
    id: "EP3",
    name: "Cybersecurity Roadmap Unlocked:Your Ultimate Guide to Success!",
    publish: true,
    guests: ["Rakesh Sir"],
    description:
      "Ready to crack the code on cybersecurity? Join Rakesh Sir on this high-voltage episode of Syntax Stories! In Part 1, get the inside scoop on their journey, must-have certifications, and standout projects. Discover why hackathons are your secret weapon and what makes you a top hire. Tune in and kickstart your journey to cybersecurity stardom!",
    image: "EP3.jpg",
    mime: "mp3",
    spotify:
      "https://open.spotify.com/episode/7actC0aaJZpDpn4INXaRMP?si=8w7V0n44Ri6uVBrWzOs2cg",
  },
};

export default podcasts;

// Episode data (titles, descriptions, cover art, release dates) pulled from
// the public Spotify show page for "SYNTAX STORIES" (Club Asymmetric's
// podcast): https://open.spotify.com/show/0iMKRNbZOWxKWIAUYD7T0C
// Cover art is Spotify's real CDN artwork (i.scdn.co) for each episode.
// Episodes without a locally-hosted full-length file (audioSrc: "") render
// Spotify's official per-episode embed player instead — Spotify's own
// preview-clip CDN URLs are session-scoped and expire, so they can't be
// hardcoded reliably.

export interface PodcastData {
  id: string;
  name: string;
  publish: boolean;
  guests: string[];
  description: string;
  image: string;
  audioSrc: string;
  spotify: string;
  releaseDate: string;
}

export const podcasts = {
  EP9: {
    id: "EP9",
    name: "The Billion-Dollar Question: Can Democracy Be Hacked?",
    publish: true,
    guests: ["Club Asymmetric"],
    description:
      "This episode explores the hidden cybersecurity risks behind electronic voting systems — from real-world vulnerabilities and hacked demonstrations to outdated software, memory card exploits, and the growing global debate between digital voting and paper ballots. As technology becomes deeply connected to elections, one critical question remains: how much trust should we place in invisible systems deciding the future of nations? A deep dive into cybersecurity, technology, human error, digital trust, and the fragile systems quietly shaping modern democracy.",
    image: "https://i.scdn.co/image/ab6765630000ba8a6e20706509d32500713ebb00",
    audioSrc: "", // no stable local/preview file — falls back to the Spotify embed
    spotify: "https://open.spotify.com/episode/2tr2otxTRTyQlPXFukIE7U",
    releaseDate: "2026-05-11",
  },
  EP8: {
    id: "EP8",
    name: "Human-in-the-Loop: The Illusion of Supervisory Control",
    publish: true,
    guests: ["Club Asymmetric"],
    description:
      "A runway, two aircraft, and no system failure — yet something still went wrong. In this episode of Asymmetric Frequencies, we break down the Tokyo Haneda incident where fully functional safety systems couldn't prevent a critical incursion. The real issue wasn't broken technology, but the gap between human decision-making and advisory automation. From cognitive overload to expectation bias, this episode explores how modern safety depends not just on systems, but on how we respond to them.",
    image: "https://i.scdn.co/image/ab6765630000ba8aaf76444dfe9a3efcfd2a69d4",
    audioSrc: "", // no stable local/preview file — falls back to the Spotify embed
    spotify: "https://open.spotify.com/episode/4xLuCYqTjIlsRAVJJDYFob",
    releaseDate: "2026-03-24",
  },
  EP7: {
    id: "EP7",
    name: "The Password Myth — Why Security Still Fails",
    publish: true,
    guests: ["Club Asymmetric"],
    description:
      "We still trust passwords. Hackers don't bother breaking them — they just reuse them. In this episode of Asymmetric Frequencies, we talk about why passwords are quietly failing, how attacks really happen in the real world, and why modern security is built on one assumption: breaches will happen. If you think a “strong password” is enough to keep you safe... this episode might make you rethink that.",
    image: "https://i.scdn.co/image/ab6765630000ba8a8b58a25c64e0a79503372499",
    audioSrc: "", // no stable local/preview file — falls back to the Spotify embed
    spotify: "https://open.spotify.com/episode/3PyqkRs8JgazFZ2Iv46Nyf",
    releaseDate: "2026-01-13",
  },
  EP6: {
    id: "EP6",
    name: "Digital Forensics — Behind Famous Cases",
    publish: true,
    guests: ["Club Asymmetric"],
    description:
      "Crimes can be planned. Evidence can be erased. But the digital world... never forgets. In this episode of Syntax Stories, we step into the silent battlefield where detectives don't search for fingerprints — they search for data. A vanished chat, a late-night location ping, an unnoticed photo timestamp: these tiny fragments have cracked some of the world's most puzzling cases. Dive into the real stories, the shocking techniques, and the hidden mechanisms that solved cases thought unsolvable — not through luck, but through digital forensics.",
    image: "https://i.scdn.co/image/ab6765630000ba8a7aa2449b3305e2e794693057",
    audioSrc: "", // no stable local/preview file — falls back to the Spotify embed
    spotify: "https://open.spotify.com/episode/0kDUcw4z5eMyqqNtgn8aMu",
    releaseDate: "2025-11-28",
  },
  EP5: {
    id: "EP5",
    name: "Deepfake: The Art of Digital Deception",
    publish: true,
    guests: ["Club Asymmetric"],
    description:
      "Nothing but data — reality itself is being rewritten. This episode of Asymmetric Frequencies dives into the chilling new frontier where technology doesn't just mimic humans, it becomes them. When trust is synthetic, and illusions come with human faces, even simple phone calls may be more costly than you could have ever imagined. Because in the age of AI, even trust can be faked.",
    image: "https://i.scdn.co/image/ab6765630000ba8a297db6fa8ec7a61b8fb11f8c",
    audioSrc: "", // no stable local/preview file — falls back to the Spotify embed
    spotify: "https://open.spotify.com/episode/0Mgb7PuGBEkSJZv4kVpJXy",
    releaseDate: "2025-11-12",
  },
  EP4: {
    id: "EP4",
    name: "Stock Market-il Cyber Thiruttu",
    publish: true,
    guests: ["Club Asymmetric"],
    description:
      "In a recent shocking case, cyber criminals lured unsuspecting victims through fake stock trading apps and WhatsApp groups that promised huge returns. Victims were added to groups that looked professional and legitimate — using names like “IBKR” or “Zerodha VIP.” Initially, they were shown fake profits to gain trust. Once they invested large amounts, sometimes over 50 lakhs, the scammers vanished, removed them from the app or group, and routed the money through multiple bank accounts opened using fake identities.",
    image: "https://i.scdn.co/image/ab6765630000ba8ac5fb452137d57cf573f92a45",
    audioSrc: "", // no stable local/preview file — falls back to the Spotify embed
    spotify: "https://open.spotify.com/episode/0XQOfu2c9Jue9YPE5PPwH9",
    releaseDate: "2025-05-26",
  },
  EP1: {
    id: "EP1",
    name: "Everyday Cybersecurity: Practical Tips for the Digital Era",
    publish: true,
    guests: ["Syed Suhail Ikraam, Cybersecurity Practitioner"],
    description:
      "In this episode, we're breaking down cybersecurity essentials! Discover why it's not for everyone and get a roadmap for ethical hacking, with a focus on mastering Linux OS. Packed with practical tips, this episode is a must-listen for anyone interested in cybersecurity! Tune in now!",
    image: "https://i.scdn.co/image/ab6765630000ba8acb881b2aeca82fdec0ac2989",
    audioSrc: "/audio/EP1.mp3",
    spotify: "https://open.spotify.com/episode/0ZMwdwTLYCyAtFK3gqun3R",
    releaseDate: "2024-06-10",
  },
  EP2: {
    id: "EP2",
    name: "Unveiling Cyber Threats: Defensive Strategies with Vignesh Sir",
    publish: true,
    guests: ["Vignesh Sir, CEO of CyberXtron"],
    description:
      "Join Vignesh Sir, CEO of CyberXtron, in the first episode of our podcast series as we delve into essential defensive strategies against cyber threats. Discover proactive measures, best practices, and insights on staying ahead in the dynamic world of cybersecurity.",
    image: "https://i.scdn.co/image/ab6765630000ba8a0a8bd70762c8c4482d81053c",
    audioSrc: "/audio/EP2.mp3",
    spotify: "https://open.spotify.com/episode/2xc30vPB1UHp5AdWiiJwaA",
    releaseDate: "2024-07-28",
  },
  EP3: {
    id: "EP3",
    name: "Cybersecurity Roadmap Unlocked: Your Ultimate Guide to Success!",
    publish: true,
    guests: ["Rakesh Sir"],
    description:
      "Ready to crack the code on cybersecurity? Join Rakesh Sir on this high-voltage episode of Syntax Stories! In Part 1, get the inside scoop on their journey, must-have certifications, and standout projects. Discover why hackathons are your secret weapon and what makes you a top hire. Tune in and kickstart your journey to cybersecurity stardom!",
    image: "https://i.scdn.co/image/ab6765630000ba8a90ef48391450dd44df98f2b4",
    audioSrc: "/audio/EP3.mp3",
    spotify: "https://open.spotify.com/episode/7actC0aaJZpDpn4INXaRMP",
    releaseDate: "2024-08-03",
  },
};

export default podcasts;

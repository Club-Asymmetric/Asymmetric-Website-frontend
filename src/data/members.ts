export interface MemberData {
  id: string;
  name: string;
  role: string;
  photos: string[];
  description: string;
  portfolio: string;
  energySource: string;
  dimension: string;
  type: string;
  hobbiesInstalled: string;
  specialFeatures: string;
}

export const members = {
  1: {
    id: "1",
    name: "SITHARSHAN",
    role: "President",
    photos: [
      "Sitharshan1.jpg",
      "Sitharshan2.jpg",
      "Sitharshan3.jpg",
      "Sitharshan4.jpg",
    ],
    description:
      "I'm a tech wizard with a passion for C++ (the supreme language, obviously) and an undying love for cybersecurity. Most of my time is split between battling malware like a digital gladiator and spending quality moments with my girlfriend, who somehow puts up with my nerdy rants. As the self-proclaimed supreme leader of my team, I excel at pushing them to their limits—usually by making them work so hard they question their life choices (all in good spirit, of course). Chaos, code, and a little bit of romance—that's how I roll!",
    portfolio: "I don't have one",
    energySource: "Pepsi, Snickers, Podcast, Linux",
    dimension: "1920 x 1080",
    type: "Girlzzzz",
    hobbiesInstalled: "Malware Building, Team Torturing",
    specialFeatures:
      "Code, Command, Conquer (with a side of caffeine-induced evil laughter)",
  },
  2: {
    id: "2",
    name: "LINNGESHWAR B",
    role: "Vice President",
    photos: ["Linngesh.jpg"],
    description:
      "I'm a teleportation connoisseur trapped in a world that insists on walking coz why settle for ordinary when you can dream extraordinary? At 6 feet (copium), my life runs on video games, mountains of food, and sitcom reruns that work better than any therapy. If it were a TV show, it'd be a comedy where my love handles steal the spotlight. Chaos, cravings, and attempts at clever comebacks that fail miserably but hey this is just another day in the world of linngesh!",
    portfolio: "I don't have one",
    energySource:
      "Good Chocolate cake, rom-coms, AAA battery ,procrastination fuel",
    dimension: "The friend zone",
    type: "Tall sum/total XX",
    hobbiesInstalled: "Mining and crafting, snack hunting, coding",
    specialFeatures:
      "Will gladly follow the crowd, as long as the destination has snacks",
  },
  3: {
    id: "3",
    name: "AKSHAYA",
    role: "Secretary",
    photos: ["Akshaya.jpg"],
    description:
      "I'm like the mitochondria of the team—small, kinda useless, but somehow managing to stay around. I can follow instructions to perfection (if I don't get distracted by snacks) and try my best to add some cheer to everything, even if it's just by being the awkward one in the room. My dedication is only rivaled by my ability to procrastinate, making me the go-to person for doing things... eventually. But hey, at least I try!",
    portfolio: "I don't have one",
    energySource: "Sweet Treats and Endless Cups of Tea (mostly to stay awake)",
    dimension: "1920 x 1080",
    type: "Straight (but don't expect much)",
    hobbiesInstalled:
      "Helping when I remember, laughing awkwardly, and Spreading Mediocrity",
    specialFeatures: "Support, Smile, Succeed (with a lot of hesitation)",
  },
  4: {
    id: "4",
    name: "KAVIYA SREE",
    role: "Secretary",
    photos: ["Kaviya.jpg"],
    description:
      "A creative mind with a knack for innovation and a love for making ideas come to life. Standing at 5'1\" (without heels), I blend curiosity with a practical approach to exploring the world around me. Whether diving into books or watching movies(my escape to different worlds),I enjoy both the quiet moments and vibrant company.",
    portfolio: "I don't have one",
    energySource: "Random bursts of inspiration, good food, and quiet moments",
    dimension: "Ambivert in 4K resolution",
    type: "Quietly curious, with a spark of spontaneity",
    hobbiesInstalled:
      "Reading (but not too much), exploring new perspectives, and occasional deep dives into random topics",
    specialFeatures:
      "Ambivert switch ,masterful laugher (error rate: 10%) , a dependable listener, and excellent snack selection skills",
  },
  5: {
    id: "5",
    name: "VANATHI",
    role: "Chief Coordinator",
    photos: ["Vanathi.jpg"],
    description: "${CONTENT?'':DEFAULT}",
    portfolio: "I don't have one",
    energySource: "${CONTENT?'':DEFAULT}",
    dimension: "${CONTENT?'':DEFAULT}",
    type: "${CONTENT?'':DEFAULT}",
    hobbiesInstalled: "${CONTENT?'':DEFAULT}",
    specialFeatures: "${CONTENT?'':DEFAULT}",
  },
  6: {
    id: "6",
    name: "BINU",
    role: "Hiring Manager",
    photos: ["Binu.jpg"],
    description: "${CONTENT?'':DEFAULT}",
    portfolio: "I don't have one",
    energySource: "${CONTENT?'':DEFAULT}",
    dimension: "${CONTENT?'':DEFAULT}",
    type: "${CONTENT?'':DEFAULT}",
    hobbiesInstalled: "${CONTENT?'':DEFAULT}",
    specialFeatures: "${CONTENT?'':DEFAULT}",
  },
  7: {
    id: "7",
    name: "GURU",
    role: "CCO",
    photos: ["Guru.jpg"],
    description:
      "Guru - standing tall at 5'8\\\" (with shoes on), weighing a precise 69 kg, and carrying the charm of someone who's been battling migraines since childhood yet keeps experimenting with life. I embody the spirit of a 'jack of all trades' in the making. Whether it's dabbling in new hobbies or mastering skills, and also am on a relentless quest to unlock my potential with a side of humor and grit.",
    portfolio: "I don't have one",
    energySource: "Eggs , Caffeine, and Sheer Determination",
    dimension: "David Laid but 1080p",
    type: "just a Chill Guy",
    hobbiesInstalled: "Jack-of-all-trades beta testing",
    specialFeatures: "Migraine , Huge Biceps , knows Java , Bad Memory",
  },
  8: {
    id: "8",
    name: "JAYA KARAN",
    role: "Treasury",
    photos: ["JayaKaran.jpg"],
    description:
      "172 cm of pure enthusiasm and extra flesh—thanks to an unbreakable bond with food. Maa DIL runs on songs (more of Hindi), stand-up bits, and cricket highs. Vir Das wit and Samay Raina chaos fuel my daydreams. Makin' me partial Vadakkan—but no saffron art. Often physically present, mentally lost in a playlist or plotting my imaginary Netflix special. And yeah, I'm a bit more pessimistic—guess it's a flaw, but it keeps me grounded. Source: Wikipedia",
    portfolio: "I don't have one",
    energySource: "Arijit and Atif songs, Red Bull, Biryani",
    dimension: "0.5 ft shorter than Kyrie",
    type: "Limited edition—pessimistically optimistic",
    hobbiesInstalled: "Coding, learning new cyber stuffs, cooking",
    specialFeatures: "Can do MID anchoring sometimes, and therapy sessions",
  },
  9: {
    id: "9",
    name: "HEMANTH RAJ",
    role: "Technical Lead",
    photos: ["Hemanth.jpg"],
    description:
      "Based on the Given Prompt: I'm a developur who depends on Caffeine and Googling. Whether it's teaching a 3D avatar to show emotions, building a chatbot that talks back (literally), or debugging jwt tokens, I'm always up for a challenge. My projects range from crafting immersive virtual experiences to creating elegant UI components BECAUSE why settle for simple when you can make it extraordinary? Tailwind CSS is my comfort zone, Prisma keeps my databases in check, and Next.js is where all the magic happens. And no this isn't ChatGPT generated, TRUST ME!",
    portfolio: "https://hemanthraj0c.github.io/My-First-Portfolio/",
    energySource: "Coffee, Coke or anything with caffeine",
    dimension: "800 x 600 (4:3)",
    type: "As long as it Breaths",
    hobbiesInstalled: "Thinking about hobbies... (Still can't figure out)",
    specialFeatures:
      "Sometimes Human, Runs a simulation before an actual scenario, Sarcasm Yes",
  },
  10: {
    id: "10",
    name: "AKSHAY KUMAR",
    role: "Chief Designer",
    photos: ["Akshay.jpg"],
    description:
      "Legend tells of a being known only as 'Legendary AK' — forged in caffeine, tempered by deadlines, and  powered by panic. I specialize in making simple things complicated, and complicated things... even more complicated. I have no idea what i'm doing most of the time, but i do it with confidence and a weird smile that makes people think I've got a plan (i don't). I respond to stress with memes, avoid responsibilities like a professional ninja, and somehow end up in charge of things I didn't even sign up for. My presence in the team is something, unexpected, and somehow still part of the main storyline. I believe in doing things last minute, making things weird on purpose, and pretending everything is under control. If life had patch notes, I'd still skip the tutorial and click 'continue'.Either way, you won't forget me.",
    portfolio: "I don't have one",
    energySource: "Panic + coffee + pretending I have a plan.",
    dimension: "Somewhere between 'almost there' and 'lost again.'",
    type: "Professional procrastinator.",
    hobbiesInstalled:
      "Starting projects, forgetting projects, and googling 'how to fix my life'.",
    specialFeatures:
      "Can turn any situation into awkward silence with a single look.",
  },
  11: {
    id: "11",
    name: "VISHAL",
    role: "Project Lead",
    photos: ["Vishal.jpg"],
    description: "NOT A GOOD WORKER AND A USELESS WASTE OF THE CLUB",
    portfolio: "https://cosmic-striker.github.io/",
    energySource: "WILL INFORM AFTER FINDING ",
    dimension: "3 DIMENISION IN SPACE AND 1 DIMENISION IN TIME ",
    type: "Person who lives at the corner of the EARTH, but unfortunately the EARTH is round.",
    hobbiesInstalled: "SLEEPING",
    specialFeatures: "Trying to hack time to finish side Projects!",
  },
  12: {
    id: "12",
    name: "ALWIN ARUL SHELVAN",
    role: "Documentation",
    photos: ["Alwin1.jpg", "Alwin2.jpg"],
    description:
      "A Floridian Guy who acts like the team's Wi-Fi—always there when you need me, but somehow vanishing when you don't. I'm a master of creating problems (Case karan eyy namma tha) and, when I feel like it, solving them. I bring calm to the chaos, unless I'm the one making it, of course. Whether I'm adding unnecessary complexity to simple tasks or motivating everyone (by sheer force of my silent presence), I make sure no day is ever boring. I'm the quiet storm that gets things done—whether anyone asked for it or not.",
    portfolio: "I don't have one",
    energySource: "Any restaurant (Non-veg) at Florida… :)",
    dimension: "1:1 (Perfect balance of skill and dedication)",
    type: "Processing…. :( <Process Failed>",
    hobbiesInstalled:
      'Playing Basketball (Indian Stephen Curry), Watching \\"Tamil\\" Movies (Anil mode activated)',
    specialFeatures: "Orator, Good listener, Punctual",
  },
  13: {
    id: "13",
    name: "DHANISH BALA",
    role: "Event Manager",
    photos: ["DhanishBala.jpg"],
    description: "${CONTENT?'':DEFAULT}",
    portfolio: "I don't have one",
    energySource: "${CONTENT?'':DEFAULT}",
    dimension: "${CONTENT?'':DEFAULT}",
    type: "${CONTENT?'':DEFAULT}",
    hobbiesInstalled: "${CONTENT?'':DEFAULT}",
    specialFeatures: "${CONTENT?'':DEFAULT}",
  },
  14: {
    id: "14",
    name: "KRISHNA KUMAR",
    role: "Technical Member",
    photos: ["KrishnaKumar.jpg"],
    description: "${CONTENT?'':DEFAULT}",
    portfolio: "I don't have one",
    energySource: "${CONTENT?'':DEFAULT}",
    dimension: "${CONTENT?'':DEFAULT}",
    type: "${CONTENT?'':DEFAULT}",
    hobbiesInstalled: "${CONTENT?'':DEFAULT}",
    specialFeatures: "${CONTENT?'':DEFAULT}",
  },
  15: {
    id: "15",
    name: "SAMEER",
    role: "Technical Member",
    photos: ["Sameer.jpg"],
    description: "${CONTENT?'':DEFAULT}",
    portfolio: "I don't have one",
    energySource: "${CONTENT?'':DEFAULT}",
    dimension: "${CONTENT?'':DEFAULT}",
    type: "${CONTENT?'':DEFAULT}",
    hobbiesInstalled: "${CONTENT?'':DEFAULT}",
    specialFeatures: "${CONTENT?'':DEFAULT}",
  },
  16: {
    id: "16",
    name: "SAMEUL JABEZ",
    role: "Technical Member",
    photos: ["Sameul-Jabez.jpg"],
    description: "${CONTENT?'':DEFAULT}",
    portfolio: "I don't have one",
    energySource: "${CONTENT?'':DEFAULT}",
    dimension: "${CONTENT?'':DEFAULT}",
    type: "${CONTENT?'':DEFAULT}",
    hobbiesInstalled: "${CONTENT?'':DEFAULT}",
    specialFeatures: "${CONTENT?'':DEFAULT}",
  },
  17: {
    id: "17",
    name: "SUDHARSHAN",
    role: "Member",
    photos: ["Sudharshan.jpg"],
    description: "${CONTENT?'':DEFAULT}",
    portfolio: "I don't have one",
    energySource: "${CONTENT?'':DEFAULT}",
    dimension: "${CONTENT?'':DEFAULT}",
    type: "${CONTENT?'':DEFAULT}",
    hobbiesInstalled: "${CONTENT?'':DEFAULT}",
    specialFeatures: "${CONTENT?'':DEFAULT}",
  },
  18: {
    id: "18",
    name: "THARUN",
    role: "Member",
    photos: ["Tharun.jpg"],
    description: "${CONTENT?'':DEFAULT}",
    portfolio: "I don't have one",
    energySource: "${CONTENT?'':DEFAULT}",
    dimension: "${CONTENT?'':DEFAULT}",
    type: "${CONTENT?'':DEFAULT}",
    hobbiesInstalled: "${CONTENT?'':DEFAULT}",
    specialFeatures: "${CONTENT?'':DEFAULT}",
  },
};

export default members;

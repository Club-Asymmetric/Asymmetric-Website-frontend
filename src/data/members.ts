export interface MemberData {
  id: string;
  name: string;
  role: string;
  generation: 1 | 2 | 3;
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
    generation: 1,
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
    generation: 1,
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
    name: "VIMANTHAN",
    role: "Vice President",
    generation: 3,
    photos: ["MemberPlaceholder.png"],
    description:
      "The kind of person who can get interested in something they know absolutely nothing about and refuse to leave until they've figured it out. Naturally drawn to technology, problem-solving, and trying things just to see where they lead, Vimanthan has a habit of turning random rabbit holes into actual projects. Usually juggling several ideas at once, learning something new with each one, and occasionally watching a \"simple\" idea evolve into something far more ambitious than intended. Where the next idea will lead is anyone's guess — but there's rarely a dull moment along the way.",
    portfolio: "I don't have one",
    energySource:
      "Good food, great music, good company, random adventures, and whatever new obsession shows up that week",
    dimension: "Somewhere Between Curiosity, Creativity & Constant Motion",
    type: "The Explorer",
    hobbiesInstalled: "Technology, Creating, Music, Food, Travel, Learning, Experimenting & Chasing New Experiences",
    specialFeatures:
      "Rarely stays interested in just one thing — always looking for something new to understand, experience or create, with a tendency to take an ordinary idea and see how far it can actually go.",
  },
  4: {
    id: "4",
    name: "AKSHAYA",
    role: "Secretary",
    generation: 1,
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
  5: {
    id: "5",
    name: "KAVIYA SREE",
    role: "Secretary",
    generation: 1,
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
/*   5: {
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
  }, */
  6: {
    id: "6",
    name: "BINU",
    role: "Hiring Manager",
    generation: 1,
    photos: ["Binu.jpg"],
    description: "I’m the circuit whisperer and code conjurer, constantly toggling between “chill mode” and “project panic mode.” Whether it's securing the cloud, debugging with divine patience, or planning an entire startup mid-coffee, I run on ambition, ideas, and occasional existential crises. As the team’s official “does-it-all,” I’m known for managing tech, tasks, and tantrums—sometimes all at once. Organized chaos? Nah, just Jaison things.",
    portfolio: "I don't have one",
    energySource: "Black coffee, late-night YouTube rabbit holes, and well-timed motivational quotes",
    dimension: "EEE-core with a side quest in Cyber and UI (Extra Energy Everywhere)",
    type: "The one who makes the “final version” file five more times",
    hobbiesInstalled: "Tinkering with IoT, designing stuff that looks cooler than it functions (sometimes), automating the un-automatable, pretending to relax",
    specialFeatures: "Leadership unlocked, multitasking buff +10, cloud guardian, low battery warning after 2 AM",
  },
  7: {
    id: "7",
    name: "GURU",
    role: "CCO",
    generation: 1,
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
    generation: 1,
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
    generation: 1,
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
    generation: 1,
    photos: ["Akshay.jpg"],
    description:
      "People call me Legendary AK, built on caffeine, deadlines, and pure panic. I turn simple things into a mess and make complicated things even worse, but I still act confident with a smile that makes everyone think I have a plan (I really don’t). I deal with stress using memes, dodge responsibilities like a pro, and still end up in charge of things I never asked for. Somehow, I’m always part of the main story, even when I don’t know how. I work last minute, add a little weirdness on purpose, and pretend everything is fine. If life gave instructions, I’d skip them and press “continue” anyway.",
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
    generation: 1,
    photos: ["Vishal.jpg"],
    description: "A GOOD WORKER",
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
    generation: 1,
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
  19: {
    id: "19",
    name: "VYSHNAVEE",
    role: "President",
    generation: 3,
    photos: ["Vyshnavee.jpg"],
    description: "",
    portfolio: "I don't have one",
    energySource: "",
    dimension: "",
    type: "",
    hobbiesInstalled: "",
    specialFeatures: "",
  },
  20: {
    id: "20",
    name: "HARI PRIYAN R",
    role: "Core Member",
    generation: 3,
    photos: ["HariPriyanR.jpg"],
    description:
      "I'm a VLSI student who enjoys exploring technology and turning ideas into things that actually work. I like working on projects, trying out new ideas, and learning through the process rather than just sticking to the theory. I also enjoy speaking and presenting, especially when I get to share an idea and make others interested in it.",
    portfolio: "I don't have one",
    energySource: "Curiosity. That's pretty much it.",
    dimension: "Beyond the Blueprint.",
    type: "“Let's See What Happens” Type.",
    hobbiesInstalled: "Badminton, Drawing, Photography, Cycling",
    specialFeatures: "Turns “What if we try this?” into an actual project.",
  },
  21: {
    id: "21",
    name: "ATHINA KARTHIKEYAN",
    role: "Technical Lead",
    generation: 3,
    photos: ["AthinaKarthikeyan.jpg"],
    description:
      "Into coding rabbit holes, mechanical keyboards, F1, LEGO, classic books, and digital minimalism — which is ironic for someone with this many interests. A little piano, a lot of opinions, and a habit of collecting hobbies like browser tabs. Jack of all, master of none — happily committed to the side quests.",
    portfolio: "I don't have one",
    energySource:
      "Tok-tok keyboard sounds, F1 race weekends, pani puri, and spotting a badminton racquet that looks way too good.",
    dimension: "Somewhere between a terminal window, a library aisle, and a conversation that got unnecessarily loud.",
    type: "The Chatterbox Nerd (Human, allegedly)",
    hobbiesInstalled:
      "Coding, Mechanical Keyboards, LEGO, Classics, F1, Piano-On-The-Side, Digital Minimalism, Grammar Nazi",
    specialFeatures:
      "Can turn one conversation into six side quests, three random references, and at least one grammar correction.",
  },
  22: {
    id: "22",
    name: "DHANVANTH G S",
    role: "Media Lead",
    generation: 2,
    photos: ["DhanvanthGS.jpg"],
    description:
      "Curious by nature, creative by mind, and always interested in learning something new. I enjoy expressing ideas, exploring different perspectives, and finding interesting things in everyday life. Usually somewhere between overthinking, creating, and figuring things out.",
    portfolio: "I don't have one",
    energySource: "Curiosity, Interesting Conversations, Late-Night Thoughts",
    dimension: "Multiple Perspectives",
    type: "Experimental",
    hobbiesInstalled: "Expressive Writing, Exploring Things & Leaving the Ideas Behind, Music & Having Random Conversations",
    specialFeatures: "A curious mind that is always looking for the next idea — Brain.exe rarely stops running",
  },
  23: {
    id: "23",
    name: "VENKAT RAMAN",
    role: "Core member",
    generation: 3,
    photos: ["VenkatRaman1.png"],
    description:
      "I'm a Cyber Security student with a strong interest in coding and technology. I enjoy learning Python, C++, Java, AI, and Cyber Security concepts. I like building practical projects that can solve real-world problems. Participating in hackathons motivates me to explore new ideas and improve my skills. I'm a curious learner who believes in continuously learning, experimenting, and growing.",
    portfolio: "I don't have one",
    energySource: "Curiosity and Learning",
    dimension: "Ambivert in 4K resolution",
    type: "Friendly type",
    hobbiesInstalled: "Playing Chess and Watching anime",
    specialFeatures: "Curious learner and 3rd gen member",
  },
  24: {
    id: "24",
    name: "S SAJJAN",
    role: "Lead Editor",
    generation: 3,
    photos: ["SSajjan1.png"],
    description:
      "A highly caffeinated artisan of the edit, I spend my days making chaos look organized and my nights convincing Premiere Pro to behave. I believe every frame has a story, even if it's just me fighting with a timeline and losing my mind over frame-perfect cuts. If you need a miracle in post, I'm the one who makes it look like it took way less time than it actually did.",
    portfolio: "I don't have one",
    energySource: "Cold brew (lots of it), indie game soundtracks, and the sheer panic of deadline adrenaline.",
    dimension: "The Liminal Space Between Final Cut Pro and Reality",
    type: "The Glitch (Human, mostly)",
    hobbiesInstalled: "Frame-Fiddling, Keyboard-Mashing, Snack-Seeking (Advanced), Pretending to Understand VFX",
    specialFeatures:
      "Can magically transform a 3-hour rant into a 30-second clip while maintaining a totally straight face and a steady blood-caffeine level. Also known for \"accidentally\" deleting a project and restoring it in the exact same motion.",
  },
  25: {
    id: "25",
    name: "KRISHNASWAMY KV",
    role: "Technical Lead",
    generation: 3,
    photos: ["KrishnaswamyKV1.png"],
    description:
      "A builder who loves turning an idea into something real from scratch. From messing around with electronics and robotics to diving into completely new things, I'm usually trying to figure out how something works — and then wondering if I can build it better. I like experimenting, making things, accidentally breaking them, fixing them, and occasionally having a sudden burst of midnight enlightenment that somehow turns into an entirely new project.",
    portfolio: "I don't have one",
    energySource:
      "Curiosity, random bursts of motivation, and the satisfaction of seeing a pile of parts, wires, and ideas finally come to life.",
    dimension: "Somewhere Between Circuits, Machines & Motion",
    type: "The Tinkerer",
    hobbiesInstalled: "Building Things, Random Experiments, Designing, Exploring New Stuff, Overthinking Simple Problems",
    specialFeatures:
      "Can turn a completely random idea into an actual project before fully figuring out what went wrong. Has a habit of turning \"I wonder if this is possible?\" into \"Okay, it's done\" — and convincing the team to join the chaos along the way.",
  },
  26: {
    id: "26",
    name: "GITIKA OMPRAKASH",
    role: "Treasurer",
    generation: 3,
    photos: ["GitikaOmprakash1.png"],
    description:
      "I run my whole life on a shuffled playlist and unresolved git branches. A mildly feral debugger who treats every console error as a personal insult. I split my time between convincing badly-behaved APIs to cooperate and pretending Stack Overflow didn't just save my entire hackathon. Half the time I'm debugging, half the time I'm humming, both halves involve a lot of trial, error, and refusing to give up on a bad idea until it becomes a good one. My code works, I have no idea why, we don't ask questions, we ship it and back away slowly.",
    portfolio: "I don't have one",
    energySource:
      "2 AM Inspiration, Coffee, Deadlines that arrived faster than expected, a good problem statement, and the specific satisfaction of watching a build finally run clean.",
    dimension: "Somewhere Between \"It Runs Locally\" and \"Please Work On Stage\"",
    type: "The Improviser",
    hobbiesInstalled: "Badminton, Music, Stack-Stitching, Building Full-Stack Apps, Aggressive Googling, Overthinking Architecture Decisions.",
    specialFeatures:
      "Can build an entire AI agent system the night before a deadline and somehow present it like it was the plan all along. One ear on the debugger, one ear on the mix, and somehow neither one ever gets crossed.",
  },
  27: {
    id: "27",
    name: "VIJAYARAMANUJAM N",
    role: "Chief Communication Officer",
    generation: 3,
    photos: ["MemberPlaceholder.png"],
    description:
      "I'm someone who is genuinely curious and doesn't like to stop at \"just knowing\" something—I want to understand how and why it works. I'm ambitious about my ideas, sometimes very particular about the details, and I keep refining my work until it matches the vision I have in my mind. I may ask a lot of questions, but that comes from wanting to learn deeply, build something meaningful, and prove to myself that I can turn my ideas into reality.",
    portfolio: "I don't have one",
    energySource: "Food, Songs and series",
    dimension: "Restless Resilient",
    type: "Open to talk and disclosed person, shortly an omnivert",
    hobbiesInstalled: "Exploring stuffs, Randomly debating",
    specialFeatures: "Curiosity",
  },
  28: {
    id: "28",
    name: "HANISHA GOVINDARAJ",
    role: "Secretary and Designer",
    generation: 3,
    photos: ["HanishaGovindaraj1.png"],
    description:
      "Passionate about technology, design, and the process of turning ideas into meaningful projects. Currently exploring quantum computing while continuing to experiment with different areas of technology and creative problem-solving. I enjoy learning by building, paying attention to the details, and occasionally figuring things out under pressure.",
    portfolio: "I don't have one",
    energySource: "Samosa, Axe oil, Good songs",
    dimension: "Superposition between dreams and reality",
    type: "Homo> cd Homo_Sapien.exe",
    hobbiesInstalled: "Collecting odd looking things, Designing and Doodling, Wikipedia Surfing, Yapping without content and context.",
    specialFeatures:
      "Finds fun in things that were definitely not supposed to be fun, has a slight tendency to panic but usually figures things out eventually.",
  },
  29: {
    id: "29",
    name: "DHIYAA SHARADHA",
    role: "Core Member",
    generation: 3,
    photos: ["DhiyaaSharadha1.png"],
    description:
      "I run on random ideas, questionable amounts of curiosity, and the occasional \"wait, I can actually make this\" moment. I like turning chaos into something useful, whether that means building things, designing things, solving problems, or going down a three-hour rabbit hole over something that was supposed to take ten minutes. My brain has approximately 27 tabs open at all times, at least 6 of them are playing music, and somehow I'm still getting things done.",
    portfolio: "I don't have one",
    energySource:
      "Caffeine, last-minute deadlines, and good music on full volume—the holy trinity that somehow turns \"I'll do it tomorrow\" into \"how did I finish this at 3 AM?\"",
    dimension: "50% reality, 10% daydreams, 40% pure \"why not?\" energy.",
    type: "The Curious Creator",
    hobbiesInstalled:
      "Music on repeat, playlist curating, photo editing, exploring new apps, experimenting with tech, café hopping, and turning random ideas into little digital projects.",
    specialFeatures:
      "Runs on caffeine, good music, and a scattered brain—multitasking is basically a built-in feature.",
  },
  /* 13: {
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
  }, */
};

export default members;

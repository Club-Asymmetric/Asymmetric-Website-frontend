// Blog post data pulled from Club Asymmetric's Medium profile:
// https://medium.com/@asymmetric_97099
// Each entry links out to the full article on Medium — there is no
// locally-hosted copy, mirroring how unreleased podcast episodes fall back
// to the external Spotify embed.

export interface BlogData {
  id: string;
  title: string;
  description: string;
  url: string;
  publishDate: string;
}

export const blogs: BlogData[] = [
  {
    id: 'agentic-era',
    title: "Beyond the Prompt: A Developer's Deep Dive into the Agentic Era",
    description:
      'Explores transitioning from prompt engineering to AI agents — the "Brain-Memory-Hands" architecture, multi-agent orchestration, tool integration, and why security-first thinking matters when granting agents data access.',
    url: 'https://medium.com/@asymmetric_97099/beyond-the-prompt-a-developers-deep-dive-into-the-agentic-era-c792c0fa5299',
    publishDate: '2026-08-21',
  },
  {
    id: 'beat-the-market',
    title: "Can a Python Developer Beat the Market? Here's What I Built to Try",
    description:
      'Building a momentum-based algorithmic trading system in Python — data fetching, technical indicators, signal generation, backtesting, and paper trading via broker APIs.',
    url: 'https://medium.com/@asymmetric_97099/can-a-python-developer-beat-the-market-heres-what-i-built-to-try-f23c0ce2635d',
    publishDate: '2026-05-21',
  },
  {
    id: 'human-firewall',
    title: 'The Human Firewall: Why People Are the Weakest Link in Cybersecurity',
    description:
      'Social engineering, phishing, and weak passwords cause most breaches — not broken tech. A look at the CIA Triad and how awareness training builds real organizational resilience.',
    url: 'https://medium.com/@asymmetric_97099/the-human-firewall-why-people-are-the-weakest-link-in-cybersecurity-8609510c958e',
    publishDate: '2026-03-28',
  },
  {
    id: 'reverse-shell-nasm',
    title: 'Linux Password-Protected Reverse Shell: Simple NASM Example',
    description:
      'Constructing a Linux/x64 reverse shell in NASM assembly — socket creation, file descriptor duplication, and secure byte-by-byte password validation that resists command injection.',
    url: 'https://medium.com/@asymmetric_97099/linux-password-protected-reverse-shell-simple-nasm-example-1d8b26e1cada',
    publishDate: '2026-02-22',
  },
  {
    id: 'black-boxes-thinking-machines',
    title: 'Machine Learning: Black Boxes or Thinking Machines?',
    description:
      'Do sophisticated ML systems actually "think," or just pattern-match? A look at the black box problem, and the gap between AI competence and genuine understanding.',
    url: 'https://medium.com/@asymmetric_97099/machine-learning-black-boxes-or-thinking-machines-711f09c9a589',
    publishDate: '2026-02-01',
  },
  {
    id: 'data-exfiltration-ai',
    title: 'When Normal Traffic Becomes Dangerous: Detecting Data Exfiltration Through Legitimate APIs Using AI',
    description:
      'How attackers misuse trusted services like Slack, GitHub, and Google Drive for data theft — and why behavioral anomaly detection beats signature-based tools here.',
    url: 'https://medium.com/@asymmetric_97099/when-normal-traffic-becomes-dangerous-detecting-data-exfiltration-through-legitimate-apis-using-ai-e19c94589bb6',
    publishDate: '2026-01-12',
  },
  {
    id: 'secret-chef-api',
    title: 'The Secret Chef: API and Its Role in Food Delivery Apps',
    description:
      'How APIs orchestrate restaurant discovery, payments, and real-time tracking — plus the supporting cast of Kafka and Redis that makes it feel seamless.',
    url: 'https://medium.com/@asymmetric_97099/the-secret-chef-api-and-its-role-in-food-delivery-apps-d891504682bf',
    publishDate: '2025-12-29',
  },
  {
    id: 'captcha-training-robots',
    title: "Are You a Robot? No — But You're Training One.",
    description:
      'CAPTCHA as a dual-purpose system: blocking bots while quietly crowdsourcing the training data behind Google Maps, autonomous vehicles, and OCR.',
    url: 'https://medium.com/@asymmetric_97099/are-you-a-robot-no-but-youre-training-one-10f745b4522d',
    publishDate: '2025-12-11',
  },
  {
    id: 'quantum-vs-encryption',
    title: 'The Silent War of Our Generation: Quantum vs. Encryption',
    description:
      '"Harvest now, decrypt later" attacks, Google\'s Willow chip, and why Post-Quantum Cryptography migration is becoming urgent for RSA and ECC-dependent systems.',
    url: 'https://medium.com/@asymmetric_97099/the-silent-war-of-our-generation-quantum-vs-encryption-1fd5d2798fef',
    publishDate: '2025-11-21',
  },
  {
    id: 'vision-systems-cybersecurity',
    title: 'When Vision Systems Meet Cybersecurity: An Intern\'s Perspective',
    description:
      'An internship journey implementing facial recognition for access control — spoofing detection, privacy-preserving design, and balancing innovation with responsibility.',
    url: 'https://medium.com/@asymmetric_97099/when-vision-systems-meet-cybersecurity-an-interns-perspective-3d60d838406a',
    publishDate: '2025-11-07',
  },
];

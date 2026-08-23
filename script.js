// Small enhancement: mark the active section in the navigation as the reader scrolls.
const links = [...document.querySelectorAll('.nav a')];
const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => observer.observe(section));

const paperPdfs = [
  'https://arxiv.org/pdf/2608.05485',
  'https://arxiv.org/pdf/2605.18652',
  'https://arxiv.org/pdf/2605.18748',
  'https://arxiv.org/pdf/2511.21087',
  'https://dl.acm.org/doi/pdf/10.1145/3788680',
  'https://arxiv.org/pdf/2410.09733',
  'https://arxiv.org/pdf/2505.19415',
  'https://arxiv.org/pdf/2503.08677',
  'https://par.nsf.gov/servlets/purl/10580797',
  'https://arxiv.org/pdf/2405.16785',
  'https://arxiv.org/pdf/2308.14710'
];
document.querySelectorAll('.publication').forEach((publication, index) => {
  const paperLink = [...publication.querySelectorAll('.pub-links a')].find(link => link.textContent.trim() === 'Paper');
  if (paperLink && paperPdfs[index]) paperLink.href = paperPdfs[index];
});

const profilePhoto = document.querySelector('#profile-photo');
const profileToggle = document.querySelector('.photo-toggle');
const portraits = ['assets/datou.jpg', 'assets/datou_avatar.gif', 'assets/datou2_avatar.gif'];
let portraitIndex = 0;
profileToggle?.addEventListener('click', () => {
  portraitIndex = (portraitIndex + 1) % portraits.length;
  profilePhoto.src = portraits[portraitIndex];
  profilePhoto.alt = portraitIndex === 0 ? 'Portrait of Ziyun Zeng' : 'Animated portrait of Ziyun Zeng';
});

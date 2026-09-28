// Keep the navigation in sync with the section being read.
const navigationLinks = [...document.querySelectorAll('.topbar nav a')];
const navigationSections = navigationLinks
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

function updateNavigation() {
  const readingLine = document.querySelector('.topbar').getBoundingClientRect().bottom + 70;
  let currentSection = null;
  for (const section of navigationSections) {
    if (section.getBoundingClientRect().top <= readingLine) currentSection = section;
  }
  if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
    currentSection = navigationSections.at(-1);
  }
  navigationLinks.forEach(link => {
    const active = currentSection?.id === link.hash.slice(1);
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

let navigationFrame = null;
function scheduleNavigationUpdate() {
  if (navigationFrame !== null) return;
  navigationFrame = requestAnimationFrame(() => {
    updateNavigation();
    navigationFrame = null;
  });
}
window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true });
window.addEventListener('resize', scheduleNavigationUpdate);
window.addEventListener('load', updateNavigation);
updateNavigation();

// Selected keeps its illustrated layout; topic tabs use compact publication lists.
const publicationTablist = document.querySelector('.publication-tabs');
const publicationTabs = [...document.querySelectorAll('.publication-tabs [role="tab"]')];
const publicationPanels = [...document.querySelectorAll('.publication-panel')];

function selectPublicationTab(activeTab) {
  publicationTabs.forEach(tab => {
    const selected = tab === activeTab;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  const activePanelId = activeTab.getAttribute('aria-controls');
  publicationPanels.forEach(panel => { panel.hidden = panel.id !== activePanelId; });
  scheduleNavigationUpdate();
}

publicationTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectPublicationTab(tab));
  tab.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    let nextIndex;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % publicationTabs.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + publicationTabs.length) % publicationTabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = publicationTabs.length - 1;
    else return;
    event.preventDefault();
    const nextTab = publicationTabs[nextIndex];
    selectPublicationTab(nextTab);
    nextTab.focus();
  });
});
if (publicationTablist && publicationTabs.length) {
  selectPublicationTab(publicationTabs[0]);
  publicationTablist.hidden = false;
}

// Cycle through the original still portrait and the two animated portraits.
const profilePhoto = document.querySelector('#profile-photo');
const profileToggle = document.querySelector('.photo-toggle');
const portraitStatus = document.querySelector('#portrait-status');
const portraits = ['assets/datou.jpg', 'assets/datou_avatar.gif', 'assets/datou2_avatar.gif'];
let portraitIndex = 0;
profileToggle?.addEventListener('click', () => {
  portraitIndex = (portraitIndex + 1) % portraits.length;
  profilePhoto.src = portraits[portraitIndex];
  profilePhoto.alt = portraitIndex === 0 ? 'Portrait of Ziyun Zeng' : 'Animated portrait of Ziyun Zeng';
  portraitStatus.textContent = 'Portrait ' + (portraitIndex + 1) + ' of ' + portraits.length;
});

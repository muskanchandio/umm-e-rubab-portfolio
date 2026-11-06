'use strict';
const $  = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---- Mobile menu ---- */
const menuBtn = $('#menuBtn'), nav = $('#nav');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
$$('#nav a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', false);
}));

/* ---- Hero: animated bar chart (replays on hover/tap) ---- */
const chart = $('#heroChart');
function playChart() {
  chart.classList.remove('play');
  void chart.getBoundingClientRect(); // restart CSS animation
  chart.classList.add('play');
}
playChart();
$('.studio').addEventListener('mouseenter', playChart);
$('.studio').addEventListener('click', playChart);

/* ---- Footer year ---- */
$('#year').textContent = new Date().getFullYear();


/* =====================================================================
   EDIT THIS BLOCK: your links and projects
   ===================================================================== */
const CONFIG = {
  email:        'muskanmuhammad323@gmail.com',
  linkedin:     'https://www.linkedin.com/in/umm-e-rubab-1239b030b',
  github:       'https://github.com/muskanchandio',
  certificate:  'https://coursera.org/verify/LVYLKNU6LKA0'   // Coursera verification link (leave '' to hide the button)
};

// One object per project. repo = GitHub link. live = optional live website link ('' hides the button).
// category: 'Excel', 'Website' or 'Forms & UI' (these become the filter buttons). tags are the small labels on each card.
const PROJECTS = [
  { title: 'SuperStore Sales Dashboard', category: 'Excel',
    repo: 'https://github.com/muskanchandio/SuperStore-Sales-Dashboard', live: '',
    desc: 'Interactive Excel dashboard on a sample retail dataset, built with PivotTables, PivotCharts and slicers. It shows a 12.6% profit margin and that profit turns negative once discounts reach 30% or more.',
    tags: ['Excel', 'PivotTables', 'Slicers', 'KPIs'] },
  { title: 'Rent Hives: Clothing Rental Website', category: 'Website',
    repo: 'https://github.com/muskanchandio/renthivehomepage', live: 'https://muskanchandio.github.io/renthivehomepage/',
    desc: 'Multi-section homepage for a clothing-rental brand: rotating hero banner, search bar, brand logos, category grids and a newsletter sign-up with validation.',
    tags: ['HTML', 'CSS', 'Responsive'] },
  { title: 'Rent Hives: Contact Form', category: 'Forms & UI',
    repo: 'https://github.com/muskanchandio/Renthivecontactform', live: '',
    desc: 'A contact page for the Rent Hives project, designed to match the homepage.',
    tags: ['HTML', 'CSS', 'Forms'] },
  { title: 'Intern Sign-in Page', category: 'Forms & UI',
    repo: 'https://github.com/muskanchandio/internsigninpage', live: '',
    desc: 'A clean sign-in page with Google, Facebook and Apple sign-in options.',
    tags: ['HTML', 'CSS', 'UI design'] },
  { title: 'CodePro Blog Platform Homepage', category: 'Website',
    repo: 'https://github.com/muskanchandio/task4', live: 'https://muskanchandio.github.io/task4/',
    desc: 'Internship task: homepage for a content platform with navigation, "The Week\'s Best" posts, membership and a call for blog contributors.',
    tags: ['HTML', 'CSS', 'Internship task'] },
  { title: 'CodePro Theme Store Landing Page', category: 'Website',
    repo: 'https://github.com/muskanchandio/complexlayout', live: 'https://muskanchandio.github.io/complexlayout/',
    desc: 'Landing page for a website-theme store with a hero, "Buy Theme" call to action and a three-column footer, built in a CodePro session to practise complex layouts.',
    tags: ['HTML', 'CSS', 'Layout'] },
  { title: "Jane's Fashion Blog", category: 'Website',
    repo: 'https://github.com/muskanchandio/boostraptemplate', live: 'https://muskanchandio.github.io/boostraptemplate/',
    desc: 'Responsive blog layout built from a Bootstrap template: posts, author card, popular posts, tag cloud and a newsletter footer.',
    tags: ['Bootstrap', 'HTML', 'CSS'] }
];

/* ---- Fill links from CONFIG ---- */
$('#linkedinLink').href = CONFIG.linkedin;
$('#githubLink').href = CONFIG.github;
if (CONFIG.certificate) { const c = $('#certLink'); c.href = CONFIG.certificate; c.hidden = false; }

/* ---- Projects: render cards + filter ---- */
const grid = $('#projGrid'), filters = $('#filters');
const esc = s => String(s).replace(/[&<>"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
grid.innerHTML = PROJECTS.map(p => `
  <article class="proj" data-cat="${esc(p.category)}">
    <div class="proj-top"><span class="lights"><i></i><i></i><i></i></span><span>${esc(p.category.toLowerCase())}</span></div>
    <div class="proj-body">
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.desc)}</p>
      <ul class="chips">${(p.tags||[]).map(t=>`<li>${esc(t)}</li>`).join('')}</ul>
      <div class="proj-links">
        <a class="repo" href="${esc(p.repo)}" target="_blank" rel="noopener">View on GitHub</a>
        ${p.live ? `<a class="live" href="${esc(p.live)}" target="_blank" rel="noopener">Live site &nearr;</a>` : ''}
      </div>
    </div>
  </article>`).join('');
const cats = ['All', ...new Set(PROJECTS.map(p => p.category))];
filters.innerHTML = cats.map((c, i) => `<button class="filter${i ? '' : ' active'}" data-f="${esc(c)}">${esc(c)}</button>`).join('');
filters.addEventListener('click', e => {
  const b = e.target.closest('.filter'); if (!b) return;
  $$('.filter').forEach(x => x.classList.toggle('active', x === b));
  $$('.proj').forEach(card => card.classList.toggle('hide', b.dataset.f !== 'All' && card.dataset.cat !== b.dataset.f));
});

/* ---- Contact: conversation starters build the email ---- */
const TOPICS = {
  internship: { subject: 'Internship opportunity',
    body: 'Hi Umm E Rubab,\n\nI came across your portfolio and would like to talk about an internship opportunity. Are you available for a short call this week?\n\nBest regards,' },
  collab:     { subject: 'Collaboration idea',
    body: 'Hi Umm E Rubab,\n\nI have an idea I think you would enjoy working on. Could we find a time to talk it through?\n\nBest regards,' },
  project:    { subject: 'About your project',
    body: 'Hi Umm E Rubab,\n\nI had a look at your projects and wanted to share some thoughts and questions.\n\nBest regards,' },
  hello:      { subject: 'Hello from your portfolio',
    body: 'Hi Umm E Rubab,\n\nI visited your portfolio and just wanted to say hello.\n\nBest regards,' }
};
let topic = 'internship';
function renderMail() {
  const t = TOPICS[topic];
  $('#mailTo').textContent = CONFIG.email;
  $('#mailSubject').textContent = t.subject;
  $('#mailBody').textContent = t.body;
  $('#mailSend').href = 'mailto:' + CONFIG.email + '?subject=' + encodeURIComponent(t.subject) + '&body=' + encodeURIComponent(t.body);
}
$('#starters').addEventListener('click', e => {
  const b = e.target.closest('.starter'); if (!b) return;
  topic = b.dataset.topic;
  $$('.starter').forEach(x => x.classList.toggle('active', x === b));
  renderMail();
});
renderMail();
$('#copyMail').addEventListener('click', async () => {
  const msg = $('#copiedMsg');
  try { await navigator.clipboard.writeText(CONFIG.email); msg.textContent = 'Email address copied.'; }
  catch (e) { msg.textContent = 'Copy failed. My email is ' + CONFIG.email; }
  setTimeout(() => msg.textContent = '', 2500);
});

/* ---- Scroll reveal ---- */
const reveal = new IntersectionObserver(entries => entries.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add('visible'); reveal.unobserve(en.target); }
}), { threshold: 0.12 });
$$('.reveal').forEach(el => reveal.observe(el));

/* ---- Highlight current section in the nav ---- */
const navLinks = $$('#nav a:not(.nav-cta)');
const spy = new IntersectionObserver(entries => entries.forEach(en => {
  if (en.isIntersecting) navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
$$('main section[id]').forEach(s => spy.observe(s));


/* ---- Back to top (the sticky header is always "in view", so scroll the window itself) ---- */
$('#toTop').addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

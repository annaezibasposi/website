let lang='fr';

function scrollToSection(id){
  const element=document.getElementById(id);
  if(element){
    element.scrollIntoView({behavior:'smooth'});
    updateActiveNav(id);
  }
}

function updateActiveNav(id){
  document.querySelectorAll('.nav-link').forEach(a=>a.classList.remove('active'));
  const link=[...document.querySelectorAll('.nav-link')].find(a=>a.getAttribute('onclick')===`scrollToSection('${id}')`);
  if(link) link.classList.add('active');
}

function setLang(l){lang=l;render();}

function render(){
const t=data[lang];
document.getElementById('subtitle').innerText=t.subtitle;
document.getElementById('countdownTitle').innerText=t.countdown;
document.getElementById('infoTitle').innerText=t.info;
document.getElementById('churchInfo').innerText=t.church;
document.getElementById('venueInfo').innerText=t.venue;
document.getElementById('stayInfo').innerText=t.stay;
document.getElementById('aboutText').innerText=t.about;
document.getElementById('giftsTitle').innerText=t.gifts||'Lisa nozze';
document.getElementById('rsvpTitle').innerText=t.rsvp||'RSVP';
document.getElementById('aboutTitle').innerText=t.aboutTitle||'Gli sposi';
document.getElementById('rsvpLink').href=data.rsvp;
renderCountdown();
renderGifts();
}

function renderCountdown(){
const target=new Date(data.date).getTime();
setInterval(()=>{
const diff=target-Date.now();
const days=Math.floor(diff/86400000);
document.getElementById('countdown').innerText=days+' days';
},1000);
}

function renderGifts(){
const c=document.getElementById('giftList');
c.innerHTML='';
data.gifts.forEach((g,i)=>{
const d=document.createElement('div');
d.className='card';
d.innerHTML=`<h4>${g.name}</h4><p>${g.price}€</p><button onclick="buyGift(${i})">Buy</button>`;
c.appendChild(d);
});
}

function buyGift(i){
data.gifts[i].price-=50;
renderGifts();
}

// Update active nav on scroll
window.addEventListener('scroll',()=>{
  const sections=['home','info','gifts','rsvp','about'];
  let current='home';
  sections.forEach(id=>{
    const el=document.getElementById(id);
    if(el && el.getBoundingClientRect().top<200){
      current=id;
    }
  });
  updateActiveNav(current);
});

render();

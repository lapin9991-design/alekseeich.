'use strict';
const $=id=>document.getElementById(id);
const node=(tag,text,cls)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(cls)el.className=cls;return el;};
const img=(src,alt)=>{const el=node('img');el.src=src;el.alt=alt;el.loading='lazy';return el;};
const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
const status=e=>e.date>=today()?'future':'past';
const date=e=>new Date(e.date+'T12:00:00').toLocaleDateString('ru-RU',{day:'numeric',month:'long',year:'numeric'});
$('name').textContent=SITE.name;$('intro').textContent=SITE.intro;$('aboutText').textContent=SITE.about;$('contactText').textContent=SITE.contact;document.title=SITE.name+' — персональный сайт';
if(SITE.email){$('email').hidden=false;$('email').href='mailto:'+SITE.email;$('email').textContent='Написать: '+SITE.email;}
function details(e){$('detailBody').replaceChildren(img(e.image,e.title),node('p',date(e)+' · Пример','meta'),node('h2',e.title),node('p',e.details));$('details').showModal();}
function render(filter='all'){const list=$('eventList');list.replaceChildren();const events=SITE.events.filter(e=>filter==='all'||status(e)===filter).sort((a,b)=>a.date.localeCompare(b.date));for(const e of events){const card=node('article',undefined,'card reveal');const body=node('div',undefined,'card-body');const btn=node('button','Подробнее','btn');btn.onclick=()=>details(e);body.append(node('p',date(e)+' · '+(status(e)==='future'?'Предстоящее':'Прошедшее')+' · Пример','meta'),node('h3',e.title),node('p',e.description),btn);card.append(img(e.image,e.title),body);list.append(card);}if(!events.length)list.append(node('p','В этой категории пока нет мероприятий.'));}
document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));render(b.dataset.filter);});
for(const p of SITE.gallery){const f=node('figure');f.append(img(p.image,p.caption),node('figcaption',p.caption));$('photos').append(f);}
$('close').onclick=()=>$('details').close();$('details').addEventListener('click',e=>{if(e.target===$('details'))$('details').close();});
function menu(open){$('links').classList.toggle('open',open);$('menu').setAttribute('aria-expanded',String(open));$('menu').setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');$('menu').textContent=open?'✕':'☰';}
$('menu').onclick=()=>menu($('menu').getAttribute('aria-expanded')!=='true');$('links').querySelectorAll('a').forEach(a=>a.onclick=()=>menu(false));document.addEventListener('keydown',e=>{if(e.key==='Escape')menu(false);});render();

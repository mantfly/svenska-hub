'use strict';
const groups=[{id:'courses',name:'课程与申请',subs:['SFI','SIFA','大学课程']},{id:'podcasts',name:'Podcast 播客',subs:[]},{id:'youtube',name:'YouTube 频道',subs:[]},{id:'films',name:'电影 / 电视剧',subs:['SFI 入门','生活喜剧','爱情与关系','会心一笑','生活与家庭','青春成长','悬疑']},{id:'levels',name:'语言等级',subs:['SFI A–D','CEFR A1–C2']},{id:'learning',name:'学习资料',subs:['跟读练习','学习工具','学习网站','语法','词汇','阅读与词典']},{id:'books',name:'书籍推荐',subs:['已读','在读','计划中']},{id:'music',name:'听歌学瑞典语',subs:['歌曲合集','歌词与词汇解析']},{id:'notes',name:'我的学习笔记',subs:['个人笔记','收藏的资源']}];
const navIcons={books:'book',courses:'school',podcasts:'headphones',youtube:'video',films:'film',levels:'levels',learning:'library',music:'music',notes:'edit',saved:'heart'};
const shortLabels={books:'书籍',courses:'课程',podcasts:'播客',youtube:'视频',films:'影视',levels:'等级',learning:'资料',music:'音乐',notes:'笔记'};
const positions={home:60,courses:60,podcasts:171,youtube:282,films:391,levels:502,learning:502,music:613,notes:724,saved:724};
const paths={search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',arrow:'<path d="m9 5 7 7-7 7"/>',external:'<path d="M14 4h6v6M20 4 10 14M10 4H4v16h16v-6"/>',heart:'<path d="M20.5 5.6a5 5 0 0 0-7.1 0L12 7l-1.4-1.4a5 5 0 0 0-7.1 7.1L12 21l8.5-8.3a5 5 0 0 0 0-7.1Z"/>',edit:'<path d="m15 5 4 4M4 20l5-1L21 7l-4-4L5 15l-1 5Z"/>',delete:'<path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7M14 10v7"/>',plus:'<path d="M12 4v16M4 12h16"/>',download:'<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>',upload:'<path d="M12 16V4m-5 5 5-5 5 5M4 17v4h16v-4"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',headphones:'<path d="M4 14v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="12" width="4" height="9" rx="2"/><rect x="17" y="12" width="4" height="9" rx="2"/>',video:'<rect x="3" y="5" width="18" height="14" rx="4"/><path d="m10 9 5 3-5 3Z"/>',book:'<path d="M12 5v16M12 5Q6 1 2 5v15q5-3 10 1 5-4 10-1V5q-4-4-10 0Z"/>',star:'<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',list:'<path d="M8 5h13M8 12h13M8 19h13M3 5h1M3 12h1M3 19h1"/>',crown:'<path d="m2 6 5 5 5-8 5 8 5-5-3 14H5L2 6Z"/>',music:'<path d="M9 18V5l11-2v13M9 8l11-2"/><ellipse cx="6" cy="19" rx="3" ry="2"/><ellipse cx="17" cy="17" rx="3" ry="2"/>',home:'<path d="m3 11 9-8 9 8M6 9v12h12V9M10 21v-7h4v7"/>'};
paths.school='<path d="M3 21V9l9-6 9 6v12M1 21h22M9 21v-7h6v7M6 10h1M17 10h1M6 14h1M17 14h1"/><path d="M11 7h2"/>';
paths.film='<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v18M17 3v18M3 8h4M3 16h4M17 8h4M17 16h4"/>';paths.levels='<path d="M3 21V15h6V9h6V3h6M3 21h18"/>';paths.library='<path d="M4 4v16M9 4v16M14 4v16M18 4l3 16"/>';
const icon=(name,filled=false)=>`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="${filled?'currentColor':'none'}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name]||paths.book}</svg>`;
const avatarCells={books:5,home:0,courses:0,podcasts:1,youtube:2,films:3,levels:4,learning:5,music:6,notes:7,saved:8};
const avatar=(id,extra='')=>{const cell=avatarCells[id]??0;return `<span class="nav-avatar ${extra}" aria-hidden="true"><svg class="plush-avatar" viewBox="${cell%3*100} ${Math.floor(cell/3)*100} 100 100" xmlns="http://www.w3.org/2000/svg"><use href="#plush-avatar-sheet"/></svg></span>`};
const sprite=(id,size='')=>avatar(id,size==='big'?'avatar-large':size==='small'?'avatar-small':'');
const $=id=>document.getElementById(id),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeURL=s=>/^https?:\/\//i.test(String(s||''))?String(s):'';
const KEY='svenska_hub_resources_v1',MIGRATION='svenska_hub_plush_v2';
let records,hadStorage=false;
try{const data=JSON.parse(localStorage.getItem(KEY));if(Array.isArray(data)&&data.every(x=>x&&typeof x.title==='string')){records=data;hadStorage=true}}catch{}
if(!records) records=initial.map(x=>({...x}));
records=records.filter(r=>!(['11 Best Swedish Movies on Netflix','Learn Swedish on YouTube: 11 Best Channels','13 Amazing Swedish Podcasts for Learners'].includes(r.title)&&r.category==='media'));
records.forEach(r=>{if(r.category==='media')r.category=r.subcategory==='Podcast 播客'?'podcasts':r.subcategory==='YouTube 频道'?'youtube':'films'});
let migrated=false;try{migrated=localStorage.getItem(MIGRATION)==='1'}catch{}
if(!hadStorage||!migrated){for(const r of curated){if(!records.some(x=>x.id===r.id||x.title===r.title&&x.category===r.category))records.push({...r})}}
const COURSE_MIGRATION='svenska_hub_courses_v3';
let coursesMigrated=false;try{coursesMigrated=localStorage.getItem(COURSE_MIGRATION)==='1'}catch{}
if(!coursesMigrated){
 const oldCourses=records.filter(r=>r.category==='courses');
 const defs=initial.filter(r=>r.category==='courses');
 const updated=defs.map(def=>{const old=oldCourses.find(r=>r.id===def.id)||oldCourses.find(r=>def.id==='seed-2'?/KTH/i.test(r.title):def.subcategory==='SIFA'?/SIFA/i.test(r.title):/SFI(?![A-Z])/i.test(r.title));return {...def,saved:!!old?.saved,notes:Array.isArray(old?.notes)?old.notes:[]}});
 records=records.filter(r=>r.category!=='courses').concat(updated);
 try{localStorage.setItem(COURSE_MIGRATION,'1')}catch{}
}
const sfiDirectory=__SFI_DIRECTORY__;
let sfiNational=false;try{sfiNational=localStorage.getItem('svenska_sfi_national_v1')==='1'}catch{}
if(!sfiNational){const r=records.find(x=>x.id==='seed-0'&&x.category==='courses')||records.find(x=>x.category==='courses'&&x.subcategory==='SFI'&&/solna\.se/.test(x.url||''));if(r){const def=initial.find(x=>x.id==='seed-0');if(def){r.title=def.title;r.url=def.url;r.description=def.description}}try{localStorage.setItem('svenska_sfi_national_v1','1')}catch{}}
const learningSites=__LEARNING_SITES__;
let sitesAdded=false;try{sitesAdded=localStorage.getItem('svenska_learning_sites_v1')==='1'}catch{}
if(!hadStorage||!sitesAdded){for(const r of learningSites){if(!records.some(x=>x.id===r.id||x.url===r.url))records.push({...r,notes:[]})}try{localStorage.setItem('svenska_learning_sites_v1','1')}catch{}}
let immersiveAdded=false;try{immersiveAdded=localStorage.getItem('svenska_immersive_v1')==='1'}catch{}
if(!hadStorage||!immersiveAdded){const r=learningSites.find(x=>x.id==='tool-immersive-translate');if(r&&!records.some(x=>x.id===r.id||x.url===r.url))records.push({...r,notes:[]});try{localStorage.setItem('svenska_immersive_v1','1')}catch{}}
const bookSeeds=__BOOKS__;
let booksMigrated=false;try{booksMigrated=localStorage.getItem('svenska_books_v1')==='1'}catch{}
if(!hadStorage||!booksMigrated){for(const r of bookSeeds){if(!records.some(x=>x.id===r.id||x.category==='books'&&x.title===r.title))records.push({...r,notes:[]})}try{localStorage.setItem('svenska_books_v1','1')}catch{}}
const showSeeds=__SHOWS__;
let showsAdded=false;try{showsAdded=localStorage.getItem('svenska_shows_v1')==='1'}catch{}
if(!hadStorage||!showsAdded){
 for(const r of showSeeds){if(!records.some(x=>x.id===r.id||x.category==='films'&&x.title===r.title))records.push({...r,saved:false,notes:[]})}
 const sharedFilm=records.find(r=>r.id==='collection-films-11');if(sharedFilm){sharedFilm.subcategory='悬疑';sharedFilm.description+=' 原分享：想通过成为对方来怀念对方，却未必真正理解对方。'}
 try{localStorage.setItem('svenska_shows_v1','1')}catch{}
}
const youtubePopular=__YOUTUBE_POPULAR__;
const xhsShows=__XHS_SHOWS__;
let xhsAdded=false;try{xhsAdded=localStorage.getItem('svenska_xhs_shows_v1')==='1'}catch{}
if(!hadStorage||!xhsAdded){for(const r of xhsShows){if(!records.some(x=>x.id===r.id||x.category==='films'&&x.title===r.title))records.push({...r,saved:false,notes:[]})}
 const quicksand=records.find(x=>x.id==='show-quicksand');if(quicksand){quicksand.title='流沙 / Quicksand / Störst av allt';if(!quicksand.description.includes('校园枪击'))quicksand.description+=' 原分享补充：校园枪击案背后的亲密关系、阶级差异与家庭创伤。'}
 try{localStorage.setItem('svenska_xhs_shows_v1','1')}catch{}
}
for(const r of records){const channel=youtubePopular[r.id]?.channel;if(r.category==='youtube'&&channel&&/youtube\.com\/results\?/.test(r.url||''))r.url=channel}
const shadowing=__SHADOWING__;
let shadowAdded=false;try{shadowAdded=localStorage.getItem('svenska_shadowing_v1')==='1'}catch{}
if(!hadStorage||!shadowAdded){for(const r of shadowing.resources){if(!records.some(x=>x.id===r.id||x.title===r.title&&x.category===r.category))records.push({...r,saved:false,notes:[]})}
 const radio=records.find(x=>x.id==='collection-podcasts-9');if(radio){radio.url='https://www.sverigesradio.se/radio-sweden-pa-latt-svenska';radio.description+=' 跟读推荐 A2–B1：先从约两分钟的新闻片段开始，再挑战完整节目。'}
 const news=records.find(x=>x.id==='collection-podcasts-11');if(news)news.description+=' 跟读推荐 A2–B1：先读简明新闻，再听音频，最后跟读与复述。';
 try{localStorage.setItem('svenska_shadowing_v1','1')}catch{}
}
const schoolCourses=__SCHOOL_COURSES__;
let schoolsAdded=false;try{schoolsAdded=localStorage.getItem('svenska_schools_v1')==='1'}catch{}
if(!hadStorage||!schoolsAdded){for(const r of schoolCourses){if(!records.some(x=>x.id===r.id||x.category==='courses'&&x.url===r.url))records.push({...r,saved:false,notes:[]})}try{localStorage.setItem('svenska_schools_v1','1')}catch{}}
const sifaRequirements=__SIFA_REQUIREMENTS__;
for(const r of records){if(r.category==='courses'&&['KTH','其他大学'].includes(r.subcategory))r.subcategory='大学课程'}
let sifaUpdated=false;try{sifaUpdated=localStorage.getItem('svenska_sifa_requirements_v1')==='1'}catch{}
if(!sifaUpdated){const r=records.find(x=>x.id==='seed-1'&&x.category==='courses');if(r)r.description=initial.find(x=>x.id==='seed-1').description;try{localStorage.setItem('svenska_sifa_requirements_v1','1')}catch{}}
const coverCatalog=__COVERS__;
function imageFor(r){const match=coverCatalog[r.id]||Object.values(coverCatalog).find(c=>c.title===r.title&&c.category===r.category);return match?.image||''}
let current='home',sub='',filter='全部',view='grid',q='',previousFocus=null;
let toastTimer;
function toast(s){$('toast').textContent=s;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').textContent='',3500)}
function save(){try{localStorage.setItem(KEY,JSON.stringify(records));localStorage.setItem(MIGRATION,'1')}catch{toast('浏览器无法保存，请导出 JSON 备份。')}}
function count(id){return records.filter(r=>r.category===id).length}
function go(id,s=''){if(!leaveDetail())return;document.title='Svenska Hub · 我的瑞典语学习资源站';history.pushState({},'', '#category/'+encodeURIComponent(id));current=id;sub=s;filter='全部';q='';$('search').value='';closeNav();render();$('content').scrollTop=0;window.scrollTo({top:0,behavior:'instant'})}
function closeNav(){$('sidebar').classList.remove('open');$('menu').setAttribute('aria-expanded','false')}
function nav(){
 $('nav').innerHTML=groups.map(g=>`<button class="navbtn ${current===g.id?'active':''}" data-cat="${g.id}" title="${g.name}" aria-label="${g.name}" ${current===g.id?'aria-current="page"':''}><span class="navleft"><span class="nav-category-icon">${icon(navIcons[g.id])}</span><span class="nav-label">${shortLabels[g.id]||g.name}</span></span><span class="nav-chevron">${icon('arrow')}</span></button>${current===g.id&&g.subs.length?`<div class="subnav"><button data-sub="" class="${!sub?'active':''}">全部资源 (${count(g.id)})</button>${g.subs.map(s=>`<button class="${sub===s?'active':''}" data-sub="${esc(s)}">${s}</button>`).join('')}</div>`:''}`).join('')+`<button class="navbtn ${current==='saved'?'active':''}" data-cat="saved" title="收藏" aria-label="收藏"><span class="navleft"><span class="nav-category-icon">${icon('heart')}</span><span class="nav-label">收藏</span></span></button>`;
 document.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>go(b.dataset.cat));
 document.querySelectorAll('[data-sub]').forEach(b=>b.onclick=()=>{sub=b.dataset.sub;filter='全部';closeNav();render()});
}
const descriptions={books:['书籍推荐','找到真正想读的瑞典语书','从故事、插画到日常知识，让阅读更有趣。'],home:['我的瑞典语学习资源站','一点一点，更靠近说瑞典语的自己。','课程、声音与故事，都收进自己的小世界。'],podcasts:['Podcast 播客','用声音打开瑞典语的世界','在日常对话中自然地进步。'],youtube:['YouTube 频道','跟着喜欢的频道，听懂更多表达','字幕、发音与真实对话，慢慢积累。'],films:['电影 / 电视剧','把瑞典语学习，放进好故事里','按主题选剧；观看感受沿用原分享，可观看情况以平台为准。'],courses:['课程与申请','找到适合自己的学习起点','SFI、SIFA 与大学课程申请资料，一起整理。'],levels:['语言等级','每一个小进步，都值得记下来','对照 SFI 与 CEFR，了解下一步的方向。'],learning:['学习资料','把新词和语法，变成日常表达','词典、阅读与学习工具，随时回来查一查。'],music:['听歌学瑞典语','让喜欢的旋律，陪你学会新表达','听一首歌，记住一个词，留下一点感受。'],notes:['我的学习笔记','留住今天听懂的那一句','把新词、想法与练习，慢慢写进笔记。'],saved:['我的收藏','喜欢的内容，留着再听一次','每一次重温，都有新的收获。']};
function hero(){const d=descriptions[current]||descriptions.home;return `<section class="hero" aria-label="${esc(d[0])}"><img class="hero-bg" src="__BANNER__" alt="暖黄色房间里，戴着耳机的橘白毛绒猫坐在针织毯上" fetchpriority="high"><div class="hero-copy"><div class="eyebrow">LÄR DIG LITE VARJE DAG</div><h1>${icon(current==='podcasts'?'headphones':current==='youtube'||current==='films'?'video':current==='music'?'music':'book')}${d[0]}</h1><p>${d[1]}<br>${d[2]}</p></div><div class="hero-speech" lang="sv">Ny dag<br>Nytt ord<br>Samma dröm</div></section>`}
function panels(){return `<div class="quick-panels"><section class="panel"><h3>${icon('star')} 按语言等级筛选</h3><div class="levels">${[['A1–A2','A1 / A2','入门 · 初级'],['B1–B2','B1 / B2','中级'],['C1–C2','C1 / C2','高级']].map(([v,l,n])=>`<button class="leveltile" data-level="${v}" aria-label="筛选 ${v}"><b>${l}</b><small>${n}</small></button>`).join('')}</div></section><section class="panel"><h3>${icon('book')} 常用主题</h3><div class="topics">${['日常','文化','新闻','语法','发音','故事'].map(t=>`<button data-topic="${t}">${t==='日常'?'日常生活':t==='文化'?'瑞典文化':t==='新闻'?'新闻时事':t==='语法'?'语法学习':t==='发音'?'发音练习':'故事与对话'}</button>`).join('')}</div></section><section class="panel journal"><h3>${icon('edit')} 我的学习小记录</h3><p>已收藏资源 <b>${records.filter(r=>r.saved).length}</b></p><p>个人笔记 <b>${count('notes')}</b></p><button data-open-notes>写下今天学到的一句</button></section></div>`}
function resourceType(r){if(r.category==='films')return ({series:'电视剧',reality:'综艺',film:'电影'})[r.mediaType]||'电影';return ({books:'书籍',courses:'课程申请',podcasts:'播客',youtube:'YouTube 频道',films:'电影',levels:'语言等级',learning:'学习资料',music:'音乐',notes:'学习笔记'})[r.category]||'学习资源'}
const podcastUpdates=__PODCAST_UPDATES__;
function latestEpisode(r){return r.category==='podcasts'?podcastUpdates[r.id]?.latest:null}
function episodeMarkup(r){if(r.category!=='podcasts')return '';const e=latestEpisode(r);if(!e)return '<div class="episode-unavailable">暂未核实最新一期</div>';const date=new Intl.DateTimeFormat('zh-CN',{timeZone:'Europe/Stockholm',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(e.date));const content=`<small>最新一期 · ${esc(date)}</small><span>${esc(e.title)}</span>`;return safeURL(e.url)?`<a class="latest-episode" href="${esc(safeURL(e.url))}" target="_blank" rel="noopener noreferrer">${content}</a>`:`<div class="latest-episode">${content}</div>`}
function card(r){
 const url=safeURL(r.url),desc=String(r.description||'暂无介绍，可点击编辑补充自己的学习笔记。').split(' · 来源：')[0];
 const coverLabels={podcasts:'LYSSNA / 播客时光',youtube:'TITTA / 视频课堂',films:'FILM / 好故事时间',courses:'BÖRJA / 学习起点',levels:'NÄSTA STEG / 每天进步',learning:'LÄRA / 学习小工具',music:'MUSIK / 听见瑞典语',notes:'MINA ORD / 我的记录'};
 const action=`<button class="card-link note-link" data-note-open="${esc(r.id)}" aria-label="查看资源详情：${esc(r.title)}">${esc(r.title)}</button>`;
 const cover=imageFor(r);

 return `<article data-resource-id="${esc(r.id)}" class="card simple-card pin-card ${r.category==='courses'?'course-card':''}"><div class="pin-media"><div class="resource-cover cover-${esc(r.category)}" aria-hidden="true">${cover?`<img class="actual-cover ${['levels','learning'].includes(r.category)?'reference-art resource-'+r.id:''} ${r.category==='podcasts'?'podcast-art':''} ${r.category==='courses'?'site-art site-'+r.id:''}" src="${esc(cover)}" alt="" loading="lazy">`:r.category==='books'?`<div class="book-cover-placeholder"><span>SVENSKA BÖCKER</span><strong>${esc(r.title)}</strong><small>封面待确认</small></div>`:sprite(r.category,'big')}</div><div class="pin-shade"></div><button class="pin-save ${r.saved?'saved':''}" aria-label="${r.saved?'取消收藏':'收藏'}：${esc(r.title)}" aria-pressed="${!!r.saved}" title="${r.saved?'取消收藏':'收藏'}" data-save="${esc(r.id)}">${icon('heart',r.saved)}</button><button class="pin-edit" aria-label="编辑：${esc(r.title)}" title="编辑" data-edit="${esc(r.id)}">${icon('edit')}</button>${url?`<a class="pin-visit" href="${esc(url)}" target="_blank" rel="noopener noreferrer" aria-label="访问网站：${esc(r.title)}">访问网站 ${icon('external')}</a>`:''}${r.category!=='courses'?`<button class="write-note pin-note" data-write-note="${esc(r.id)}">${icon('edit')} 写笔记${r.notes?.length?`<span class="note-count">${r.notes.length}</span>`:''}</button>`:''}</div><div class="pin-caption"><div class="cardtop">${esc(r.category==='books'?r.subcategory+(r.rating?' · 原书单 '+r.rating+'/5':''):resourceType(r))}</div><h3>${action}</h3><p>${esc(desc)}</p>${episodeMarkup(r)}</div></article>`
}
function render(){
 document.body.classList.toggle('is-home',current==='home');
 document.body.dataset.category=current;
 if(current==='home')$('home').setAttribute('aria-current','page');else $('home').removeAttribute('aria-current');
 nav();const isSaved=current==='saved'||current==='notes'&&sub==='收藏的资源';
 const isShadow=current==='learning'&&sub==='跟读练习';
 let list=records.filter(r=>(isShadow?!!shadowing.guides[r.id]:(current==='home'||(isSaved?r.saved:r.category===current)))&&(isShadow||!sub||isSaved||r.subcategory===sub)&&(!q||[r.title,r.description,r.subcategory,r.level,r.category,...(r.notes||[]).map(n=>n.title+' '+n.text)].join(' ').toLowerCase().includes(q))&&(filter==='全部'||r.level===filter));
 if(isShadow){const order=Object.keys(shadowing.guides);list.sort((a,b)=>order.indexOf(a.id)-order.indexOf(b.id))}
 if(current==='books')list.sort((a,b)=>(b.rating||0)-(a.rating||0));
 if(current==='podcasts')list.sort((a,b)=>(Date.parse(latestEpisode(b)?.date)||0)-(Date.parse(latestEpisode(a)?.date)||0));
 const sectionTitle=current==='home'?'全部学习资源':isSaved?'我的收藏':sub?sub:current==='podcasts'?'精选播客推荐':groups.find(g=>g.id===current)?.name||'学习资源';
 $('content').innerHTML=`${current==='home'?hero():''}<div class="inside">${current==='home'?`<div class="stats"><div class="stat"><b>${records.length}</b><span>已收录资源</span></div><div class="stat"><b>${records.filter(r=>['podcasts','youtube','films'].includes(r.category)).length}</b><span>播客 / 视频 / 影视</span></div><div class="stat"><b>${records.filter(r=>r.saved).length}</b><span>我的收藏</span></div></div>`:''}${current==='home'?panels():''}${current==='books'?'<div class="book-intro"><h2>野路子学瑞典语，找到真正想看的书</h2><p>从故事到动物百科、食物和蘑菇：读有兴趣的内容，慢慢积累瑞典语。</p><small>阅读状态与推荐度沿用你提供的分享书单；封面为检索到的版本。</small></div>':''}<div class="section-row resource-page-heading">${current!=='home'?`<div class="heading-mascot" aria-hidden="true">${avatar(current==='saved'?'saved':current)}</div>`:''}${current==='home'?'<h2>':'<h1 class="page-title">'}${icon(current==='courses'?'school':current==='podcasts'?'headphones':'book')}${esc(sectionTitle)}${current==='home'?'</h2>':'</h1>'}${q||filter!=='全部'?'<button class="textbtn" id="clearFilters">清除筛选</button>':current==='podcasts'?'<span class="update-stamp">最近更新优先 · 10月29日核对</span>':'<span class="note">听一点，学一点，每天一点点。</span>'}</div><div class="filters">${['全部','A1–A2','B1–B2','C1–C2'].map(v=>`<button class="filter ${v===filter?'active':''}" data-filter="${v}" aria-pressed="${v===filter}">${v}</button>`).join('')}<span class="result-count" role="status">${list.length} 条资源${q?' · 搜索中':''}</span><button class="btn" id="toggleView" aria-label="切换为${view==='grid'?'列表':'卡片'}视图">${icon(view==='grid'?'list':'grid')}${view==='grid'?'列表':'卡片'}</button></div>${current==='notes'&&!sub?resourceNotebook():''}<div class="cards ${view==='list'?'listmode':''}">${list.length?list.map(card).join(''):`<div class="empty"><p>这里还没有匹配的资源。<br>试试其他关键词，或添加自己的学习资料。</p><button class="btn" id="emptyAdd">${icon('plus')}添加资源</button></div>`}</div></div>`;
 document.querySelectorAll('[data-homecat]').forEach(b=>b.onclick=()=>go(b.dataset.homecat));
 document.querySelectorAll('[data-filter],[data-level]').forEach(b=>b.onclick=()=>{filter=b.dataset.filter||b.dataset.level;render()});
 document.querySelectorAll('[data-topic]').forEach(b=>b.onclick=()=>{q=b.dataset.topic;$('search').value=q;render()});
 const notesButton=document.querySelector('[data-open-notes]');if(notesButton)notesButton.onclick=()=>openModal(null,'notes');
 $('toggleView').onclick=()=>{view=view==='grid'?'list':'grid';render()};
 if($('clearFilters'))$('clearFilters').onclick=()=>{q='';filter='全部';$('search').value='';render()};
 if($('emptyAdd'))$('emptyAdd').onclick=()=>openModal();
 document.querySelectorAll('[data-save]').forEach(b=>b.onclick=()=>{const r=records.find(x=>x.id===b.dataset.save);r.saved=!r.saved;save();render();toast(r.saved?'已加入我的收藏':'已取消收藏')});
 document.querySelectorAll('[data-resource-id]').forEach(el=>el.onclick=e=>{if(!e.target.closest('button,a,input,textarea,select'))openNotes(el.dataset.resourceId)});
 document.querySelectorAll('[data-note-open]').forEach(b=>b.onclick=()=>openNotes(b.dataset.noteOpen));
 document.querySelectorAll('[data-write-note]').forEach(b=>b.onclick=()=>openNotes(b.dataset.writeNote,true));
 document.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>openModal(b.dataset.edit));

}
function fillSubs(value,selected){const g=groups.find(x=>x.id===value)||groups[0];const subs=g.subs.filter(x=>x!=='收藏的资源');if(selected&&!subs.includes(selected))subs.push(selected);$('subcategory').innerHTML=(subs.length?subs:['资源清单']).map(s=>`<option value="${esc(s)}">${esc(s)}</option>`).join('')}
function openModal(id,defaultCategory){const r=records.find(x=>x.id===id);previousFocus=document.activeElement;$('modalTitle').textContent=r?'编辑资源':'添加新资源';$('deleteResource').hidden=!r;$('resourceForm').reset();$('editid').value=r?r.id:'';$('title').value=r?.title||'';const category=r?.category||defaultCategory||(groups.some(g=>g.id===current)?current:'podcasts');$('category').value=category;fillSubs(category,r?.subcategory);if(r?.subcategory)$('subcategory').value=r.subcategory;$('url').value=r?.url||'';$('level').value=r?.level||'全部';if(!$('level').value)$('level').value='全部';$('description').value=r?.description||'';$('modalback').classList.add('open');document.body.style.overflow='hidden';$('title').focus()}
function closeModal(){$('modalback').classList.remove('open');document.body.style.overflow='';if(previousFocus?.isConnected)previousFocus.focus();else $('add').focus()}
$('category').innerHTML=groups.map(g=>`<option value="${g.id}">${g.name}</option>`).join('');$('category').onchange=()=>fillSubs($('category').value);
$('resourceForm').onsubmit=e=>{e.preventDefault();const id=$('editid').value,old=records.find(r=>r.id===id);const obj={...old,id:id||('r-'+Date.now()+'-'+Math.random().toString(36).slice(2)),title:$('title').value.trim(),category:$('category').value,subcategory:$('subcategory').value,url:safeURL($('url').value.trim()),level:$('level').value,description:$('description').value.trim(),saved:!!old?.saved};if(!obj.title)return;if(id)records=records.map(r=>r.id===id?obj:r);else records.push(obj);save();closeModal();go(obj.category);toast('资源已保存')};
$('deleteResource').onclick=()=>{const id=$('editid').value;if(!id||!confirm('确定删除这条资源及它的学习笔记吗？'))return;records=records.filter(r=>r.id!==id);save();closeModal();render();toast('资源已删除')};
$('add').onclick=()=>openModal();$('cancel').onclick=closeModal;$('modalback').onclick=e=>{if(e.target===$('modalback'))closeModal()};
$('modalback').onkeydown=e=>{if(e.key==='Tab'){const els=[...$('modalback').querySelectorAll('button,input:not([type="hidden"]),select,textarea')].filter(el=>!el.disabled&&!el.hidden);if(e.shiftKey&&document.activeElement===els[0]){e.preventDefault();els.at(-1).focus()}else if(!e.shiftKey&&document.activeElement===els.at(-1)){e.preventDefault();els[0].focus()}}};
window.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!$('notesback').hidden)return;if($('modalback').classList.contains('open'))closeModal();closeNav()}});
$('search').oninput=e=>{q=e.target.value.toLowerCase().trim();render()};$('menu').onclick=()=>{const open=$('sidebar').classList.toggle('open');$('menu').setAttribute('aria-expanded',String(open))};$('navOverlay').onclick=closeNav;
function setSidebarCollapsed(value){document.body.classList.toggle('sidebar-collapsed',value);$('sidebarToggle').setAttribute('aria-expanded',String(!value));$('sidebarToggle').setAttribute('aria-label',value?'展开侧栏':'收起侧栏');$('sidebarToggle').title=value?'展开侧栏':'收起侧栏';$('sidebarToggle').innerHTML=icon('menu');try{localStorage.setItem('svenska_sidebar_collapsed',String(value))}catch{}}
$('sidebarToggle').onclick=()=>setSidebarCollapsed(!document.body.classList.contains('sidebar-collapsed'));let collapsed=false;try{collapsed=localStorage.getItem('svenska_sidebar_collapsed')==='true'}catch{}setSidebarCollapsed(collapsed);
$('home').onclick=()=>go('home');
$('export').onclick=()=>{const blob=new Blob([JSON.stringify({format:'svenska-hub-v1',resources:records},null,2)],{type:'application/json'}),u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download='svenska-hub-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);toast('已保存资源和笔记备份，可在其他设备恢复')};
$('importBtn').onclick=()=>$('importFile').click();$('importFile').onchange=async e=>{try{const file=e.target.files?.[0];if(!file)return;const raw=JSON.parse(await file.text()),data=Array.isArray(raw)?raw:raw.resources;if(!Array.isArray(data)||!data.every(x=>x&&typeof x.title==='string'&&groups.some(g=>g.id===x.category)))throw new Error('无效文件');if(confirm('导入将替换当前资源库。建议先导出备份。确定继续？')){const ids=new Set();records=data.map((x,i)=>{let id=String(x.id||'import-'+i);if(ids.has(id))id='import-'+i+'-'+Date.now();ids.add(id);return {id,title:String(x.title),category:x.category,subcategory:String(x.subcategory||''),url:safeURL(x.url),level:String(x.level||'全部'),description:String(x.description||''),mediaType:['series','reality','film'].includes(x.mediaType)?x.mediaType:'',learningTip:String(x.learningTip||''),saved:!!x.saved,notes:normalizeNotes(x.notes),lyricStudy:normalizeLyricStudy(x.lyricStudy),...(x.category==='books'?{author:String(x.author||''),isbn:String(x.isbn||''),rating:Number(x.rating)>=1&&Number(x.rating)<=5?Number(x.rating):null}:{}),...(safeURL(x.source)?{source:safeURL(x.source)}:{})}});save();go('home');toast('已导入 '+records.length+' 条资源')}}catch{alert('导入失败：请使用 Svenska Hub 导出的 JSON 文件。')}finally{e.target.value=''}};
__NOTES__
save();render();applyRoute();

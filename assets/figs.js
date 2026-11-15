/* Statiske figurer. Teksten bruker currentColor, så de virker i lyst og mørkt tema. */
(function(){const F=C.F;
const svg=(w,h,a,b)=>`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${a}" style="color:var(--ink);font-family:var(--sans)"><defs><marker id="fa" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="context-stroke"/></marker></defs>${b}</svg>`;
const box=(x,y,w,h,t,f,s)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="${f||'var(--panel2)'}" stroke="${s||'var(--line)'}"/>`+(t||'').split('|').map((l,i,a)=>`<text x="${x+w/2}" y="${y+h/2+4+(i-(a.length-1)/2)*14}" text-anchor="middle" font-size="12.5" fill="currentColor">${l}</text>`).join('');
const ar=(x1,y1,x2,y2,c,d,w)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c||'currentColor'}" stroke-width="${w||1.6}" ${d?'stroke-dasharray="6 4"':''} marker-end="url(#fa)"/>`;
const ln=(x1,y1,x2,y2,c,w,d)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c||'currentColor'}" stroke-width="${w||1.6}" ${d?'stroke-dasharray="6 4"':''}/>`;
const tx=(x,y,t,o)=>`<text x="${x}" y="${y}" font-size="${(o&&o.s)||12}" text-anchor="${(o&&o.a)||'middle'}" fill="${(o&&o.c)||'currentColor'}">${t}</text>`;
const awg=(x,y,t)=>`<polygon points="${x},${y-24} ${x+58},${y-48} ${x+58},${y+48} ${x},${y+24}" fill="var(--optbg)" stroke="var(--opt)"/>`+tx(x+30,y+4,t||'AWG');

F.map=svg(760,250,'Hele nettet fra bruker til stamnett',
 tx(115,18,'AKSESSNETT: trådløst (del I)',{c:'var(--acc)'})+tx(395,18,'AKSESS: optisk',{c:'var(--opt)'})+tx(640,18,'TRANSPORTNETT',{c:'var(--opt)'})+
 box(10,40,86,34,'Mobil (UE)')+box(10,88,86,34,'PC (Wi-Fi)')+box(10,136,86,34,'Hodetelefon')+ar(96,57,178,57,'var(--acc)',1)+tx(137,50,'4G/5G')+box(180,40,84,34,'Basestasjon','var(--accbg)')+ar(96,105,178,105,'var(--acc)',1)+tx(137,98,'802.11')+box(180,88,84,34,'AP','var(--accbg)')+ar(53,136,53,124,'var(--acc)',1)+tx(140,157,'Bluetooth til PC',{c:'var(--mut)'})+
 box(300,60,70,40,'ONU','var(--optbg)')+ln(264,57,300,72)+ln(264,105,300,90)+ar(370,80,420,80,'var(--opt)',0,2)+tx(395,74,'')+`<polygon points="422,62 452,50 452,110 422,98" fill="var(--optbg)" stroke="var(--opt)"/>`+tx(437,126,'splitter')+ar(452,80,500,80,'var(--opt)',0,2)+box(502,60,66,40,'OLT','var(--optbg)')+
 ar(568,80,610,80,'var(--opt)',0,3)+box(612,40,136,80,'WDM-stamnett|SONET/SDH, OTN|Carrier Ethernet','var(--optbg)')+
 tx(380,205,'Hver modul i kurset forklarer ett ledd i denne kjeden. All trafikk ender opp i fiber, så optisk transport bærer også mobilnettet.',{s:12.5})+tx(380,226,'Stiplet: radio. Heltrukket: fiber.',{s:12,c:'var(--mut)'}));

F.layers=svg(640,250,'OSI-lag og hvor emnet befinner seg',
 ['Applikasjon (HTTP, DNS)','Presentasjon (TLS)','Sesjon (RPC)','Transport (TCP, UDP)','Nettverk (IP)'].map((t,i)=>box(30,6+i*34,260,30,t)).join('')+box(30,176,260,30,'Datalink (MAC, Ethernet)','var(--accbg)','var(--acc)')+box(30,210,260,30,'Fysisk (radio, fiber, OTN)','var(--optbg)','var(--opt)')+
 tx(320,195,'Her: hvem får sende? MAC, Wi-Fi, Ethernet',{a:'start',s:13})+tx(320,229,'Her: hvordan blir bit til bølger og lys?',{a:'start',s:13})+tx(320,60,'Dette ligger utenfor emnet.',{a:'start',s:13,c:'var(--mut)'}));

F.ranges=svg(640,220,'Sender med tre rekkevidder',
 `<circle cx="120" cy="110" r="105" fill="var(--badbg)" stroke="var(--bad)"/><circle cx="120" cy="110" r="72" fill="var(--ambbg)" stroke="var(--amb)"/><circle cx="120" cy="110" r="40" fill="var(--accbg)" stroke="var(--acc)"/><circle cx="120" cy="110" r="5" fill="currentColor"/>`+
 ln(150,90,270,50,'var(--acc)',1)+tx(276,54,'Overføring: kommunikasjon med lav BER',{a:'start',s:13})+ln(185,110,270,110,'var(--amb)',1)+tx(276,114,'Deteksjon: merkes, men kan ikke leses',{a:'start',s:13})+ln(215,140,270,170,'var(--bad)',1)+tx(276,174,'Interferens: bare økt bakgrunnsstøy',{a:'start',s:13}));

F.fddtdd=svg(640,170,'FDD og TDD i tid og frekvens',
 tx(160,14,'FDD: to frekvensbånd',{s:13})+tx(480,14,'TDD: samme frekvens, ulik tid',{s:13})+
 box(30,30,260,40,'Nedlink, frekvens f₁','var(--accbg)')+box(30,100,260,40,'Opplink, frekvens f₂','var(--optbg)')+tx(160,90,'guard band',{c:'var(--mut)'})+
 [0,1,2].map(i=>box(345+i*92,60,44,44,'DL','var(--accbg)')+box(393+i*92,60,36,44,'UL','var(--optbg)')).join('')+tx(480,126,'mellomrom = guard period: rundtur + Tx/Rx-bytte',{c:'var(--mut)'})+ar(30,158,290,158)+tx(160,152,'tid')+ar(345,158,620,158)+tx(480,152,'tid'));

F.fiber=svg(640,170,'Lys som reflekteres i fiberkjernen',
 `<rect x="10" y="30" width="620" height="110" fill="var(--panel2)"/><rect x="10" y="55" width="620" height="60" fill="var(--optbg)"/>`+tx(60,48,'kappe n₂')+tx(60,132,'kappe n₂')+tx(60,90,'kjerne n₁ > n₂')+
 `<polyline points="110,85 190,115 290,55 390,115 490,55 590,115 620,104" fill="none" stroke="var(--c2)" stroke-width="2.4"/>`+tx(320,162,'Lyset treffer grensen med vinkel større enn kritisk vinkel og reflekteres hver gang.',{s:12.5}));

F.oxc=svg(640,160,'Opak og transparent OXC',
 box(20,20,80,40,'lys inn')+ar(100,40,140,40)+box(142,20,70,40,'O→E','var(--ambbg)')+ar(212,40,248,40)+box(250,20,90,40,'elektronisk|svitsj')+ar(340,40,376,40)+box(378,20,70,40,'E→O','var(--ambbg)')+ar(448,40,488,40)+box(490,20,80,40,'lys ut')+tx(320,78,'Opak: kan lese, rense og konvertere, men er bundet til bitrate og format')+
 box(20,100,80,40,'lys inn')+ar(100,120,258,120,'var(--opt)')+box(260,100,110,40,'MEMS-speil','var(--optbg)')+ar(370,120,488,120,'var(--opt)')+box(490,100,80,40,'lys ut')+tx(320,156,'Transparent: alltid lys, uavhengig av bitrate, men ingen regenerering'));

F.ftth=svg(640,150,'Fiber nærmere hjemmet',
 box(10,50,70,40,'Sentral','var(--optbg)')+ln(80,70,250,70,'var(--opt)',3)+tx(165,62,'fiber')+[[250,'FTTN','skap i gata'],[370,'FTTC','~300 m'],[480,'FTTB','bygget'],[580,'FTTH','hjemmet']].map(([x,a,b])=>ln(x,58,x,82,'var(--opt)',2)+tx(x,44,a,{s:13})+tx(x,104,b,{c:'var(--mut)'})).join('')+ln(250,70,580,70,'var(--opt)',3,1)+tx(320,134,'Jo lenger fiberen går, desto kortere blir den trege kobberdelen, og desto høyere blir båndbredden.',{s:12.5}));

F.pon=svg(640,190,'PON med OLT, splitter og ONU',
 box(20,70,90,50,'OLT|(sentral)','var(--optbg)')+ln(110,95,300,95,'var(--opt)',3)+tx(205,86,'1490 nm ned')+tx(205,112,'1310 nm opp')+tx(205,130,'1550 nm TV')+`<polygon points="300,80 350,62 350,128 300,110" fill="var(--optbg)" stroke="var(--opt)"/>`+tx(325,150,'passiv splitter')+
 [0,1,2,3].map(i=>ln(350,95,500,25+i*46,'var(--opt)',1.8)+box(500,10+i*46,120,32,'ONU '+(i+1))).join('')+tx(205,20,'ca. 20 km, ingen strøm ute i felten',{c:'var(--mut)'}));

F.ritenet=svg(720,318,'RITENET-arkitektur',
 box(10,70,120,50,'Avstembar|laser','var(--optbg)')+box(10,170,120,50,'WDM-mottaker','var(--optbg)')+tx(70,50,'CO/OLT',{s:13})+
 ar(130,95,240,130,'var(--opt)',0,2.4)+tx(182,100,'λ₁…λₙ')+ar(240,170,130,195,'var(--c2)',0,2.4)+tx(182,205,'oppstrøms')+
 awg(242,150,'AWG')+
 [0,1].map(i=>{const y=30+i*160;return ln(300,150,380,y+45,'var(--opt)',2)+`<rect x="382" y="${y}" width="326" height="100" rx="7" fill="var(--panel)" stroke="var(--line)"/>`+tx(702,y+20,'ONU '+(i?'N':1),{a:'end'})+box(392,y+28,74,36,'Kobler','var(--optbg)')+ar(466,y+38,548,y+30)+box(550,y+14,112,30,'Mottaker')+ar(466,y+54,548,y+70)+box(550,y+56,112,32,'Modulator','var(--ambbg)','var(--amb)')+tx(510,y+97,'')}).join('')+
 tx(360,310,'Rammen fra CO: data + tom del. ONU leser data og modulerer den tomme delen tilbake. Ingen laser i ONU.',{s:12.5}));

F.larnet=svg(720,250,'LARNET-arkitektur',
 box(10,50,120,44,'Multifrekvens-|laser','var(--optbg)')+box(10,150,120,44,'WDM-mottaker|(demux)','var(--optbg)')+tx(70,32,'CO/OLT',{s:13})+ar(130,72,240,110,'var(--opt)',0,2.4)+ar(240,140,130,172,'var(--c2)',0,2.4)+awg(242,125,'AWG')+
 [0,1].map(i=>{const y=20+i*120;return ln(300,125,380,y+42,'var(--opt)',2)+`<rect x="382" y="${y}" width="326" height="92" rx="7" fill="var(--panel)" stroke="var(--line)"/>`+tx(702,y+20,'ONU '+(i?'N':1),{a:'end'})+box(392,y+26,70,34,'Kobler','var(--optbg)')+ar(462,y+36,548,y+28)+box(550,y+14,112,28,'Mottaker')+ar(548,y+68,462,y+50)+box(550,y+52,112,30,'LED (bredbåndet)','var(--ambbg)','var(--amb)')}).join('')+
 tx(360,240,'LED-en sender et bredt spekter. AWG slipper bare gjennom sin smale bit (spectral slicing).',{s:12.5}));

F.sonetlayers=svg(640,170,'Path, line og section',
 ['TM','Regen','ADM','TM'].map((n,i)=>box([20,210,370,550][i],120,70,36,n,i===1?'var(--ambbg)':'var(--panel2)')).join('')+ln(90,138,210,138)+ln(280,138,370,138)+ln(440,138,550,138)+
 ar(90,100,210,100,'var(--c3)')+tx(150,94,'section')+ar(280,100,370,100,'var(--c3)')+tx(325,94,'section')+ar(440,100,550,100,'var(--c3)')+tx(495,94,'section')+ar(90,66,370,66,'var(--c2)')+tx(230,60,'line')+ar(440,66,550,66,'var(--c2)')+tx(495,60,'line')+ar(55,30,585,30,'var(--c1)')+tx(320,24,'path (ende til ende)'));

F.tcm=svg(640,150,'Nestede overvåkingsnivåer i OTN',
 box(10,100,60,34,'Kunde')+box(570,100,60,34,'Kunde')+`<rect x="100" y="94" width="210" height="46" rx="7" fill="var(--accbg)"/><rect x="330" y="94" width="210" height="46" rx="7" fill="var(--optbg)"/>`+tx(205,122,'operatør A')+tx(435,122,'operatør B')+ln(70,117,570,117,'var(--mut)',1)+
 ar(40,22,600,22,'var(--c1)')+tx(320,16,'Path monitoring: ende til ende')+ar(105,48,305,48,'var(--c2)')+tx(205,42,'TCM-nivå (A)')+ar(335,48,535,48,'var(--c3)')+tx(435,42,'TCM-nivå (B)')+ar(140,74,270,74,'var(--c4)')+tx(205,70,'TCM (leid del)',{s:11}));

F.eaves=svg(640,130,'Avlytting av en bølgelengde',
 ln(10,100,630,100,'var(--opt)',4)+tx(40,92,'fiber')+`<rect x="210" y="92" width="110" height="10" fill="var(--bad)"/>`+tx(265,122,'klemme med linse, eller kobler')+ar(265,92,330,46)+box(332,20,90,50,'Filter|eller DMUX','var(--ambbg)')+ar(422,45,500,45)+box(502,22,110,46,'Mottaker (Rx)'));

F.prot3=svg(640,190,'Trekant med beskyttelse',
 `<circle cx="120" cy="40" r="18" fill="var(--panel2)" stroke="currentColor"/><circle cx="520" cy="40" r="18" fill="var(--panel2)" stroke="currentColor"/><circle cx="320" cy="160" r="18" fill="var(--panel2)" stroke="currentColor"/>`+tx(120,45,'A',{s:14})+tx(520,45,'B',{s:14})+tx(320,165,'C',{s:14})+
 ln(138,40,502,40,'var(--opt)',2)+ln(508,54,336,150,'var(--opt)',2)+ln(132,54,304,150,'var(--bad)',2,1)+tx(218,110,'✕',{s:18,c:'var(--bad)'})+tx(320,30,'A-B: λ₁–λ₅ + λ₆–λ₉ som passerer B')+tx(490,120,'B-C: λ₁–λ₄ + λ₆–λ₉',{a:'start'})+tx(120,120,'kuttet'));
/* Eksamenstegninger med engelske etiketter, til oppgaver og fasit som står på engelsk */
const EN=[['Rammen fra CO: data + tom del. ONU leser data og modulerer den tomme delen tilbake. Ingen laser i ONU.','Frame from the CO: data + empty part. The ONU reads the data and modulates the empty part back. No laser in the ONU.'],
['LED-en sender et bredt spekter. AWG slipper bare gjennom sin smale bit (spectral slicing).','The LED emits a broad spectrum. The AWG lets through only its narrow slice (spectral slicing).'],
['ca. 20 km, ingen strøm ute i felten','approx. 20 km, no power in the field'],['klemme med linse, eller kobler','clamp with lens, or coupler'],['path (ende til ende)','path (end to end)'],['som passerer B','passing through B'],
['Mottaker (Rx)','Receiver (Rx)'],['Mottaker','Receiver'],['WDM-mottaker','WDM receiver'],['WDM-Receiver','WDM receiver'],['Avstembar','Tunable'],['Multifrekvens-','Multi-frequency'],['oppstrøms','upstream'],['Kobler','Coupler'],['LED (bredbåndet)','LED (broadband)'],['(sentral)','(central office)'],['nm ned','nm down'],['nm opp','nm up'],['passiv splitter','passive splitter'],['eller DMUX','or DMUX'],['kuttet','cut']];
C.enFig=k=>F[k].replace(/>([^<]+)</g,(m,t)=>'>'+EN.reduce((x,[a,b])=>x.split(a).join(b),t)+'<');
})();

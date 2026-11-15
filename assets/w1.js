/* Interaktive figurer: grunnlag, trådløs overføring, feilkontroll */
(function(){const W=C.W,ui=C.ui,plot=C.plot,R=C.range,nb=C.nb;
const rng=s=>()=>{s=(s*1664525+1013904223)%4294967296;return s/4294967296};
const gauss=r=>Math.sqrt(-2*Math.log(r()+1e-12))*Math.cos(2*Math.PI*r());

W.sine=r=>{const u=ui(r,'Sinusbølgen');u.params({
 A:{l:'Amplitude A',min:0,max:2,step:.1,v:1,f:x=>x.toFixed(1)},
 f:{l:'Frekvens f (Hz)',min:.5,max:5,step:.5,v:1,f:x=>x.toFixed(1)},
 p:{l:'Fase φ',min:0,max:360,step:15,v:0,f:x=>x+'°'}},v=>{
 const t=R(0,2,300);u.svg(plot({h:210,x:[0,2],y:[-2.2,2.2],xl:'tid t (s)',yl:'s(t)',xt:[0,.5,1,1.5,2],yt:[-2,-1,0,1,2],aria:'Sinusbølge',
  s:[{p:t.map(x=>[x,Math.sin(2*Math.PI*x)]),c:'var(--c5)',d:'4 4',w:1.2},{p:t.map(x=>[x,v.A*Math.sin(2*Math.PI*v.f*x+v.p*Math.PI/180)])}]}));
 u.out(`Periode $T=1/f=$ <span class="v">${(1/v.f).toFixed(2)} s</span>. Stiplet linje er referansen $A=1,\\ f=1,\\ \\varphi=0$. Hvis dette var en radiobølge, ville $\\lambda=c/f$ gitt ${(3e8/v.f/1000).toLocaleString('nb-NO')} km.`)})};

W.sampling=r=>{const u=ui(r,'Sampling og aliasing');u.params({
 f:{l:'Signalfrekvens f',min:1,max:10,step:.5,v:3,f:x=>x+' kHz'},
 s:{l:'Samplingsfrekvens fs',min:2,max:30,step:.5,v:8,f:x=>x+' kHz'}},v=>{
 const T=2,t=R(0,T,500);const k=Math.round(v.f/v.s),al=Math.abs(v.f-k*v.s);const ok=v.s>=2*v.f;
 const n=Math.floor(T*v.s),sm=Array.from({length:n+1},(_,i)=>i/v.s);
 const sg=v.f-k*v.s<0?-1:1;
 u.svg(plot({h:220,x:[0,T],y:[-1.3,1.3],xl:'tid (ms)',xt:[0,.5,1,1.5,2],yt:[-1,0,1],aria:'Signal med sampler',
  s:[{p:t.map(x=>[x,Math.sin(2*Math.PI*v.f*x)]),c:'var(--c5)',w:1.3}].concat(ok?[]:[{p:t.map(x=>[x,sg*Math.sin(2*Math.PI*al*x)]),c:'var(--c2)',w:2.2,d:'7 4'}]),
  post:(X,Y)=>sm.map(x=>`<circle cx="${X(x)}" cy="${Y(Math.sin(2*Math.PI*v.f*x))}" r="3.2" fill="var(--c1)"/>`).join('')}));
 u.out(ok?`<span class="okc">Ingen aliasing.</span> $f_s=${v.s}$ kHz $\\ge 2f=${2*v.f}$ kHz. Prøvene bestemmer signalet entydig.`:`<span class="noc">Aliasing.</span> $f_s=${v.s}$ kHz $< 2f=${2*v.f}$ kHz. De samme prøvene passer også på den stiplede bølgen på $|f-k f_s|=$ ${al.toFixed(1)} kHz, der $k$ er det hele tallet nærmest $f/f_s$. Mottakeren kan ikke se forskjell.`)})};

W.quant=r=>{const u=ui(r,'Kvantisering: lineær mot ikke-lineær');u.params({
 b:{l:'Antall bit',min:2,max:6,v:3,f:x=>x+' bit = '+2**x+' nivåer'},
 m:{l:'Metode',opt:[['lin','Lineær'],['nl','Ikke-lineær (companding)']]}},v=>{
 const L=2**v.b,mu=100;const comp=x=>Math.sign(x)*Math.log(1+mu*Math.abs(x))/Math.log(1+mu),exp=y=>Math.sign(y)*(Math.pow(1+mu,Math.abs(y))-1)/mu;
 const q=y=>{const s=2/L;return Math.max(-1+s/2,Math.min(1-s/2,(Math.floor((y+1)/s)+.5)*s-1))};
 const Q=x=>v.m==='lin'?q(x):exp(q(comp(x)));
 const t=R(0,1,400),sig=x=>Math.exp(-3.4*x)*Math.sin(2*Math.PI*9*x);
 let eL=0,eS=0,sL=0,sS=0;t.forEach(x=>{const a=sig(x),e=(a-Q(a))**2;if(x<.3){eL+=e;sL+=a*a}if(x>.65){eS+=e;sS+=a*a}});
 const db=(a,b)=>10*Math.log10(a/Math.max(b,1e-9));
 u.svg(plot({h:210,x:[0,1],y:[-1,1],xl:'tid',yt:[-1,0,1],aria:'Kvantisert signal',s:[{p:t.map(x=>[x,sig(x)]),c:'var(--c5)',w:1.2},{p:t.map(x=>[x,Q(sig(x))]),c:'var(--c1)',w:1.8}]}));
 u.out(`Signal-til-kvantiseringsstøy $=10\\log_{10}(P_\\text{signal}/P_\\text{støy})$: sterk del <span class="v">${db(sL,eL).toFixed(1)} dB</span>, svak del <span class="v">${db(sS,eS).toFixed(1)} dB</span>. Bytt metode og se at den svake delen blir mye bedre med companding, fordi nivåene ligger tettest ved lave amplituder.`)})};

W.filter=r=>{const u=ui(r,'Filtre i frekvensplanet');const tones=[.3,.7,1,1.5,2,3,4,5];u.params({
 t:{l:'Filtertype',opt:[['lp','Lavpass'],['hp','Høypass'],['bp','Båndpass']]},
 a:{l:'Knekkfrekvens (nedre)',min:.5,max:4,step:.1,v:1,f:x=>x.toFixed(1)+' kHz'},
 b:{l:'Øvre knekkfrekvens (båndpass)',min:1,max:5,step:.1,v:3,f:x=>x.toFixed(1)+' kHz'}},v=>{
 const H=f=>{const lp=(f,c)=>1/Math.sqrt(1+(f/c)**8),hp=(f,c)=>1/Math.sqrt(1+(c/f)**8);return v.t==='lp'?lp(f,v.a):v.t==='hp'?hp(f,v.a):lp(f,Math.max(v.b,v.a))*hp(f,v.a)};
 const fs=R(.05,5.5,220);
 u.svg(plot({h:210,x:[0,5.5],y:[0,1.1],xl:'frekvens (kHz)',yl:'slipper gjennom',xt:[0,1,2,3,4,5],yt:[0,.5,1],aria:'Filterkurve',
  s:[{p:fs.map(f=>[f,H(f)]),c:'var(--c2)',w:2.4}],post:(X,Y)=>tones.map(f=>`<line x1="${X(f)}" x2="${X(f)}" y1="${Y(0)}" y2="${Y(H(f))}" stroke="var(--c1)" stroke-width="7"/>`).join('')}));
 const pass=tones.filter(f=>H(f)>.7);u.out(`Komponenter som slipper gjennom: <span class="v">${pass.length?pass.map(x=>x+' kHz').join(', '):'ingen'}</span>.`)})};

W.db=r=>{const u=ui(r,'Desibel-kalkulator: effekt gjennom en link');u.params({
 p:{l:'Sendereffekt',min:.01,max:100,log:1,v:2,f:x=>(x<1?x.toFixed(3):x.toFixed(2))+' mW'},
 l:{l:'Tap i linken',min:0,max:40,step:.5,v:10,f:x=>x+' dB'},
 g:{l:'Forsterkning',min:0,max:20,step:.5,v:0,f:x=>x+' dB'}},v=>{
 const pd=10*Math.log10(v.p),o=pd-v.l+v.g,om=Math.pow(10,o/10),W_=640,x=[60,250,430,590];
 u.svg(`<svg viewBox="0 0 ${W_} 120" role="img" aria-label="Effektnivå gjennom link"><defs><marker id="ar" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="currentColor"/></marker></defs>
 <g style="color:var(--mut)"><line x1="115" y1="60" x2="195" y2="60" stroke="currentColor" marker-end="url(#ar)"/><line x1="305" y1="60" x2="375" y2="60" stroke="currentColor" marker-end="url(#ar)"/><line x1="485" y1="60" x2="535" y2="60" stroke="currentColor" marker-end="url(#ar)"/></g>
 <rect x="10" y="35" width="104" height="50" rx="7" fill="var(--accbg)"/><text x="62" y="56" text-anchor="middle" class="m" font-size="14">${pd.toFixed(1)} dBm</text><text x="62" y="75" text-anchor="middle" font-size="12">sender</text>
 <rect x="197" y="35" width="106" height="50" rx="7" fill="var(--badbg)"/><text x="250" y="56" text-anchor="middle" class="m" font-size="14">−${v.l} dB</text><text x="250" y="75" text-anchor="middle" font-size="12">tap</text>
 <rect x="377" y="35" width="106" height="50" rx="7" fill="var(--goodbg)"/><text x="430" y="56" text-anchor="middle" class="m" font-size="14">+${v.g} dB</text><text x="430" y="75" text-anchor="middle" font-size="12">forsterker</text>
 <rect x="537" y="35" width="100" height="50" rx="7" fill="var(--accbg)"/><text x="587" y="56" text-anchor="middle" class="m" font-size="14">${o.toFixed(1)} dBm</text><text x="587" y="75" text-anchor="middle" font-size="12">mottaker</text></svg>`);
 u.out(`$P_{dBm}=10\\log_{10}(P/1\\,\\text{mW})=10\\log_{10}(${v.p<1?v.p.toFixed(3):v.p.toFixed(2)}/1)=${pd.toFixed(2)}$ dBm. Ut: $P_{ut}=P_{inn}-L+G=${o.toFixed(1)}$ dBm, og $P_{mW}=10^{P_{dBm}/10}=10^{${o.toFixed(1)}/10}=$ <span class="v">${om<.001?om.toExponential(2):om.toFixed(4)} mW</span>. Legg merke til regnestykket: dBm − dB + dB = dBm. To dBm-verdier adderes aldri.`)})};

W.lambda=r=>{const u=ui(r,'Frekvens, bølgelengde og antennestørrelse');const apps=[[3e3,'Stemme (300 Hz–3 kHz)'],[1e6,'AM-radio'],[1e8,'FM-radio (100 MHz)'],[8e8,'4G/5G lavbånd'],[2.4e9,'Wi-Fi, Bluetooth'],[3.5e9,'5G midtbånd'],[5e9,'Wi-Fi 5 GHz'],[2.8e10,'5G mmWave'],[1e11,'Sub-THz (6G)']];
 u.params({f:{l:'Frekvens',min:300,max:3e11,log:1,v:2.4e9,f:x=>C.fmt(x,2)+'Hz'}},v=>{
 const lam=3e8/v.f,ap=apps.reduce((a,b)=>Math.abs(Math.log(b[0]/v.f))<Math.abs(Math.log(a[0]/v.f))?b:a);
 const fmtL=l=>l>=1000?nb(l/1000,1)+' km':l>=1?nb(l,2)+' m':l>=.01?nb(l*100,2)+' cm':nb(l*1000,2)+' mm';
 const n=Math.min(14,Math.max(1,Math.round(14-Math.log10(lam*1e3+1)*2)));const pts=R(0,620,500).map(x=>[x,Math.sin(2*Math.PI*n*x/620)]);
 u.svg(plot({h:120,l:10,x:[0,620],y:[-1.3,1.3],aria:'Bølgeform',s:[{p:pts}]}));
 u.out(`$\\lambda=c/f=$ <span class="v">${fmtL(lam)}</span>. Halvbølgeantenne ($\\lambda/2$): <span class="v">${fmtL(lam/2)}</span>. Kvartbølge ($\\lambda/4$): <span class="v">${fmtL(lam/4)}</span>. Nærmeste bruk: ${ap[1]}.`)})};

W.capacity=r=>{const u=ui(r,'Nyquist mot Shannon');u.params({
 B:{l:'Båndbredde B',min:1,max:100,v:20,f:x=>x+' MHz'},
 s:{l:'SNR',min:-10,max:50,v:24,f:x=>x+' dB'},
 M:{l:'Signalnivåer M',opt:[[2,'2'],[4,'4'],[16,'16'],[64,'64'],[256,'256']],v:16}},v=>{
 const snr=10**(v.s/10),sh=v.B*Math.log2(1+snr),ny=2*v.B*Math.log2(v.M),ss=R(-10,50,120);const ym=v.B*17.5;
 u.svg(plot({h:230,x:[-10,50],y:[0,ym],xl:'SNR (dB)',yl:'kapasitet (Mbps)',xt:[-10,0,10,20,30,40,50],yt:[0,ym/2,ym].map(Math.round),aria:'Kapasitet som funksjon av SNR',
  s:[{p:ss.map(x=>[x,v.B*Math.log2(1+10**(x/10))])},{p:[[-10,ny],[50,ny]],c:'var(--c2)',d:'6 4'}],post:(X,Y)=>`<circle cx="${X(v.s)}" cy="${Y(sh)}" r="5" fill="var(--c1)"/>`}));
 u.out(`Lineær SNR $=10^{${v.s}/10}=$ <span class="v">${snr<100?snr.toFixed(2):Math.round(snr)}</span>. Shannon $C=B\\log_2(1+SNR)=$ <span class="v">${sh.toFixed(1)} Mbps</span> (heltrukket). Nyquist $C=2B\\log_2 M$ med $M=${v.M}$: <span class="v">${ny.toFixed(0)} Mbps</span> (stiplet). Reelt tak: <b>${Math.min(sh,ny).toFixed(1)} Mbps</b>, fordi ${sh<ny?'støyen er begrensningen':'antall signalnivåer er begrensningen'}.`)})};

W.fspl=r=>{const u=ui(r,'Frittromstap');u.params({
 f:{l:'Frekvens',min:1e8,max:1e11,log:1,v:2.4e9,f:x=>C.fmt(x,2)+'Hz'},
 d:{l:'Avstand',min:1,max:4e7,log:1,v:1000,f:x=>x>=1000?nb(x/1000,1)+' km':nb(x,0)+' m'},
 g:{l:'Gt + Gr (sum antennegain)',min:0,max:100,v:0,f:x=>x+' dB'}},v=>{
 const lam=3e8/v.f,L=d=>20*Math.log10(4*Math.PI*d/lam)-v.g,ds=R(0,7.7,100).map(x=>10**x);
 u.svg(plot({h:220,logx:1,x:[1,5e7],y:[0,280],xl:'avstand (m), logaritmisk',yl:'tap (dB)',xt:[1,100,1e4,1e6],xf:x=>x>=1000?x/1000+' km':x+' m',yt:[0,100,200],aria:'Tap mot avstand',s:[{p:ds.map(d=>[d,L(d)])}],post:(X,Y)=>`<circle cx="${X(v.d)}" cy="${Y(L(v.d))}" r="5" fill="var(--c2)"/>`}));
 u.out(`$\\lambda=c/f=$ <span class="v">${lam<1?nb(lam*100,2)+' cm':nb(lam,2)+' m'}</span>. Tap $L=20\\log_{10}(4\\pi d/\\lambda)-G_t-G_r=$ <span class="v">${L(v.d).toFixed(1)} dB</span>. Doble avstanden gir +6 dB. Doble frekvensen gir også +6 dB. Prøv satellittoppgaven: 10 GHz, 40 000 km og 92 dB gain gir 112,5 dB.`)})};

W.multipath=r=>{const u=ui(r,'Flerveis og ISI');u.params({
 T:{l:'Symboltid',min:1,max:20,step:.5,v:4,f:x=>x+' µs'},
 d:{l:'Veiforskjell',min:0,max:3000,step:30,v:900,f:x=>x+' m'}},v=>{
 const tau=v.d/300,W_=640,N=3,sc=560/(N*v.T+Math.max(tau,1));
 const bar=(y,off,h,al)=>[0,1,2].map(i=>`<rect x="${60+(i*v.T+off)*sc}" y="${y}" width="${v.T*sc-1.5}" height="${h}" fill="var(--c${i+1})" opacity="${al}"/><text x="${60+(i*v.T+off+v.T/2)*sc}" y="${y+h/2+4}" text-anchor="middle" font-size="12">${'ABC'[i]}</text>`).join('');
 u.svg(`<svg viewBox="0 0 ${W_} 130" role="img" aria-label="Direkte og forsinket signal"><text x="4" y="38" font-size="12">Direkte</text>${bar(20,0,30,.85)}<text x="4" y="86" font-size="12">Ekko</text>${bar(68,tau,30,.45)}<line x1="${60+v.T*sc}" x2="${60+v.T*sc}" y1="12" y2="104" stroke="var(--bad)" stroke-dasharray="4 3"/><text x="${60+v.T*sc}" y="120" font-size="11" text-anchor="middle" class="axt">symbol A slutter</text></svg>`);
 const q=tau/v.T;u.out(`Forsinkelse $\\tau=\\Delta d/c=$ <span class="v">${tau.toFixed(1)} µs</span> ($\\tau/T_s=${(q*100).toFixed(0)}\\,\\%$ av symboltiden). ${q<.1?'<span class="okc">Lite overlapp.</span>':q<1?'<span class="amc">Ekkoet av A faller inn i B: ISI.</span>':'<span class="noc">Ekkoet er lengre enn et helt symbol, så ISI er alvorlig.</span>'} Gjør symbolet lengre og se hva som skjer. Det er akkurat det OFDM gjør.`)})};

W.fading=r=>{const u=ui(r,'Hvilken fading er det?');u.params({
 Tc:{l:'Koherenstid Tc',min:.01,max:1000,log:1,v:70,f:x=>x>=1?nb(x,1)+' ms':nb(x*1000,0)+' µs'},
 rb:{l:'Bitrate',min:1,max:1e4,log:1,v:100,f:x=>x>=1000?nb(x/1000,1)+' Mbps':nb(x,0)+' kbps'},
 Bc:{l:'Koherensbåndbredde Bc',min:1,max:1e4,log:1,v:150,f:x=>nb(x,0)+' kHz'},
 Bs:{l:'Signalbåndbredde Bs',min:1,max:1e4,log:1,v:100,f:x=>nb(x,0)+' kHz'}},v=>{
 const Tb=1/v.rb,sl=v.Tc>10*Tb,fl=v.Bc>10*v.Bs;
 u.html(`<div class="tw"><table><tr><th></th><th>Sammenligning</th><th>Regel</th><th>Resultat</th></tr><tr><td>Tid</td><td class="mono">Tc = ${nb(v.Tc,3)} ms, Tb = ${nb(Tb,4)} ms</td><td>$T_c>10T_b$?</td><td class="${sl?'okc':'noc'}">${sl?'Langsom fading':'Rask fading'}</td></tr><tr><td>Frekvens</td><td class="mono">Bc = ${nb(v.Bc,0)} kHz, Bs = ${nb(v.Bs,0)} kHz</td><td>$B_c>10B_s$?</td><td class="${fl?'okc':'noc'}">${fl?'Flat fading':'Frekvensselektiv'}</td></tr></table></div>`);
 u.out(`Startverdiene er forelesningseksempelet: $T_c=70$ ms, 100 kbps, $B_c=150$ kHz, $B_s=100$ kHz. «Mye større» tolkes som faktor 10, som i eksamensløsningen fra 2023.`)})};

W.modwave=r=>{const u=ui(r,'ASK, FSK og PSK');u.params({bits:{l:'Bit (skriv 0 og 1)',text:'10110010'}},v=>{
 const b=(v.bits.replace(/[^01]/g,'')||'0').slice(0,12).split('').map(Number),n=b.length,t=R(0,n,n*60);
 const fc=3,ask=x=>b[Math.min(n-1,Math.floor(x))]*Math.sin(2*Math.PI*fc*x),fsk=x=>Math.sin(2*Math.PI*(b[Math.min(n-1,Math.floor(x))]?5:2)*x),psk=x=>Math.sin(2*Math.PI*fc*x+(b[Math.min(n-1,Math.floor(x))]?0:Math.PI));
 const row=(lab,fn,c)=>`<div style="display:flex;align-items:center;gap:6px"><span style="width:38px;font:500 12px var(--mono)">${lab}</span><div style="flex:1;min-width:0">${plot({w:600,h:62,l:4,x:[0,n],y:[-1.2,1.2],aria:lab,s:[{p:t.map(x=>[x,fn(x)]),c,w:1.4}],post:(X,Y)=>b.map((_,i)=>`<line class="gr" x1="${X(i)}" x2="${X(i)}" y1="6" y2="40"/>`).join('')})}</div></div>`;
 u.html(`<div class="mono" style="padding-left:48px;display:grid;grid-template-columns:repeat(${n},1fr);text-align:center;font-size:15px">${b.map(x=>`<span>${x}</span>`).join('')}</div>`+row('ASK',ask,'var(--c1)')+row('FSK',fsk,'var(--c3)')+row('PSK',psk,'var(--c4)'));
 u.out('ASK skrur amplituden av og på. FSK bytter frekvens. PSK snur fasen 180° ved bit 0, og bølgen hopper der bitverdien skifter.')})};

const CONS={BPSK:()=>[[-1,0],[1,0]],QPSK:()=>[[1,1],[-1,1],[-1,-1],[1,-1]].map(p=>p.map(x=>x/Math.SQRT2)),'8PSK':()=>R(0,7,7).map(i=>[Math.cos(i*Math.PI/4),Math.sin(i*Math.PI/4)]),
 '16QAM':()=>qamg(4),'64QAM':()=>qamg(8)};
function qamg(n){const p=[],s=[];for(let i=0;i<n;i++)s.push(2*i-n+1);s.forEach(a=>s.forEach(b=>p.push([a,b])));const e=Math.sqrt(p.reduce((t,q)=>t+q[0]**2+q[1]**2,0)/p.length);return p.map(q=>q.map(x=>x/e))}
W.constell=r=>{const u=ui(r,'Konstellasjon under støy');u.params({
 m:{l:'Modulasjon',opt:Object.keys(CONS).map(k=>[k,k]),v:'16QAM',w:'100%'},
 s:{l:'SNR',min:0,max:35,v:18,f:x=>x+' dB'}},v=>{
 const P=CONS[v.m](),sig=Math.sqrt(10**(-v.s/10)/2),g=rng(7);let err=0,dots='';const N=500,S=118,cx=130,cy=130;
 for(let i=0;i<N;i++){const k=Math.floor(g()*P.length),x=P[k][0]+sig*gauss(g),y=P[k][1]+sig*gauss(g);let best=0,bd=1e9;P.forEach((p,j)=>{const d=(p[0]-x)**2+(p[1]-y)**2;if(d<bd){bd=d;best=j}});const bad=best!==k;if(bad)err++;
  const px=cx+x*S*.72,py=cy-y*S*.72;if(px>2&&px<258&&py>2&&py<258)dots+=bad?`<circle cx="${px}" cy="${py}" r="3" fill="none" stroke="var(--bad)" stroke-width="1.3"/>`:`<circle cx="${px}" cy="${py}" r="1.6" fill="var(--c1)" opacity=".65"/>`}
 const bits=Math.log2(P.length),ideal=P.map(p=>`<circle cx="${cx+p[0]*S*.72}" cy="${cy-p[1]*S*.72}" r="3" fill="none" stroke="currentColor"/>`).join('');
 u.svg(`<svg viewBox="0 0 260 260" style="max-width:300px;margin:auto" role="img" aria-label="Konstellasjonsdiagram med støy"><line class="gr" x1="0" x2="260" y1="130" y2="130"/><line class="gr" x1="130" x2="130" y1="0" y2="260"/>${dots}<g style="color:var(--ink)">${ideal}</g></svg>`);
 u.out(`$\\log_2 M=\\log_2 ${P.length}=$ <span class="v">${bits} bit/symbol</span>, ${P.length} symboler. Feiltolkede symboler (ringer): <span class="${err/N>.01?'noc':'okc'}">${(100*err/N).toFixed(1)} %</span>. Flere bit per symbol gir høyere datarate, men punktene står tettere, så samme støy gir flere feil.`)})};

const CQI=[[1,'QPSK',78,.1523,-6.3],[2,'QPSK',193,.377,-2.6],[3,'QPSK',449,.877,1.2],[4,'16QAM',378,1.4766,5.1],[5,'16QAM',490,1.9141,6.9],[6,'16QAM',616,2.4063,8.8],[7,'64QAM',466,2.7305,10.8],[8,'64QAM',567,3.3223,12.7],[9,'64QAM',666,3.9023,14.6],[10,'64QAM',772,4.5234,16.3],[11,'64QAM',873,5.1152,18.2],[12,'256QAM',711,5.5547,20.2],[13,'256QAM',797,6.2266,21.9],[14,'256QAM',885,6.9141,23.8],[15,'256QAM',948,7.4063,25.8]];
W.amc=r=>{const u=ui(r,'AMC: terminalen beveger seg bort fra masten');u.params({d:{l:'Avstand fra masten',min:50,max:3000,log:1,v:300,f:x=>Math.round(x)+' m'},B:{l:'Kanalbredde',min:5,max:20,step:5,v:20,f:x=>x+' MHz'}},v=>{
 const snr=35-35*Math.log10(v.d/50)/1.6*1;const c=[...CQI].reverse().find(x=>snr>=x[4]);const cq=c||null;const W_=640,bw=W_/15;
 let h=`<svg viewBox="0 0 ${W_} 110" role="img" aria-label="CQI-skala">`;CQI.forEach((x,i)=>{const on=cq&&x[0]===cq[0],hh=x[3]*11;h+=`<rect x="${i*bw+2}" y="${88-hh}" width="${bw-4}" height="${hh}" fill="${on?'var(--c2)':'var(--c1)'}" opacity="${on?1:.3}"/><text x="${i*bw+bw/2}" y="103" text-anchor="middle" class="axt">${x[0]}</text>`});u.svg(h+'</svg>');
 u.out(cq?`SNR ≈ <span class="v">${snr.toFixed(1)} dB</span> gir CQI <b>${cq[0]}</b>: ${cq[1]}, koderate ${cq[2]}/1024, $\\eta=${cq[3]}$ bit/s/Hz. Datarate $R=\\eta B\\approx$ <span class="v">${(cq[3]*v.B).toFixed(1)} Mbps</span>. Stolpene viser spektraleffektivitet for hver CQI.`:`SNR ≈ <span class="v">${snr.toFixed(1)} dB</span>. Kanalen er for dårlig selv for CQI 1, så forbindelsen faller ut.`)})};

W.diversity=r=>{const u=ui(r,'Diversitet: uavhengig fading');const mk=s=>{const g=rng(s),a=[];for(let i=0;i<7;i++)a.push([g()*18+2,g()*6.28]);return t=>{let re=0,im=0;a.forEach(([f,p])=>{re+=Math.cos(f*t+p);im+=Math.sin(f*t+p)});return 10*Math.log10((re*re+im*im)/7+1e-3)}};const B=[mk(3),mk(11),mk(29)];
 u.params({n:{l:'Antall antenner',opt:[[1,'1'],[2,'2'],[3,'3']],v:1},th:{l:'Terskel for brukbart signal',min:-15,max:0,v:-6,f:x=>x+' dB'}},v=>{
 const t=R(0,10,500),best=x=>Math.max(...B.slice(0,v.n).map(f=>f(x)));const out=t.filter(x=>best(x)<v.th).length/t.length;
 u.svg(plot({h:220,x:[0,10],y:[-25,10],xl:'tid',yl:'dB',yt:[-20,-10,0,10],aria:'Fading på antennegrener',s:B.slice(0,v.n).map((f,i)=>({p:t.map(x=>[x,f(x)]),c:`var(--c${i+3})`,w:1})).concat([{p:t.map(x=>[x,best(x)]),c:'var(--c1)',w:2.2,d:'0'},{p:[[0,v.th],[10,v.th]],c:'var(--bad)',d:'5 4',w:1.4}])}));
 u.out(`Tid under terskel: <span class="${out>.05?'noc':'okc'}">${(100*out).toFixed(1)} %</span>. Mottakeren velger her den sterkeste grenen til enhver tid. Dype dykk i én gren faller sjelden sammen med dykk i en annen.`)})};

W.dsss=r=>{const u=ui(r,'DSSS: spre med XOR');u.params({d:{l:'Databit',text:'0110'},c:{l:'Chipping-sekvens',text:'101100'},e:{l:'Støy flipper chip nr. (0 = ingen)',min:0,max:12,v:0}},v=>{
 const d=(v.d.replace(/[^01]/g,'')||'0').slice(0,5).split('').map(Number),c=(v.c.replace(/[^01]/g,'')||'1').slice(0,8).split('').map(Number);
 const tx=[];d.forEach(b=>c.forEach(x=>tx.push(b^x)));const rx=tx.slice();if(v.e>0&&v.e<=rx.length)rx[v.e-1]^=1;
 const cell=(x,f)=>`<td style="${f?'background:var(--badbg)':x?'background:var(--accbg)':''}">${x}</td>`;
 const rowd=d.map(b=>`<td colspan="${c.length}"><b>${b}</b></td>`).join(''),rowc=d.map(()=>c.map(x=>cell(x)).join('')).join(''),rowt=rx.map((x,i)=>cell(x,i===v.e-1)).join('');
 const dec=d.map((_,i)=>{const seg=rx.slice(i*c.length,(i+1)*c.length).map((x,j)=>x^c[j]);const ones=seg.reduce((a,b)=>a+b,0);return ones*2>c.length?1:0});
 u.html(`<div class="tw"><table class="gridt"><tr><th>Data</th>${rowd}</tr><tr><th>Kode</th>${rowc}</tr><tr><th>Sendt</th>${rowt}</tr></table></div>`);
 u.out(`Hvert databit blir ${c.length} chips, så båndbredden blir ${c.length} ganger større. Mottaker XOR-er med samme kode og tar flertallet: <span class="v">${dec.join('')}</span> ${dec.join('')===d.join('')?'<span class="okc">(riktig, selv om en chip kan være feil)</span>':'<span class="noc">(feil)</span>'}.`)})};

W.fhss=r=>{const u=ui(r,'FHSS: langsom eller rask hopping?');u.params({
 R_:{l:'Datarate R',min:.1,max:10,step:.1,v:2,f:x=>x.toFixed(1)+' Mbps'},
 M:{l:'Modulasjon',opt:[[2,'BPSK'],[4,'QPSK'],[16,'16-QAM'],[64,'64-QAM']],v:16},
 h:{l:'Hopptid',min:.1,max:1000,log:1,v:400,f:x=>nb(x,2)+' µs'}},v=>{
 const k=Math.log2(v.M),rs=v.R_*1e6/k,ts=1e6/rs,per=v.h/ts,fast=per<1;const g=rng(5),seq=Array.from({length:16},()=>Math.floor(g()*7));const bad=3;
 let h=`<svg viewBox="0 0 640 180" role="img" aria-label="Hoppmønster"><rect x="40" y="${10+bad*22}" width="590" height="22" fill="var(--badbg)"/><text x="4" y="${26+bad*22}" font-size="11" fill="var(--bad)">fade</text>`;
 seq.forEach((c,i)=>{h+=`<rect x="${42+i*36.6}" y="${12+c*22}" width="34" height="18" fill="${c===bad?'var(--bad)':'var(--c1)'}"/>`});u.svg(h+`<text x="335" y="175" text-anchor="middle" class="axt">tid → hver blokk er ett hopp</text></svg>`);
 const hit=seq.filter(c=>c===bad).length;
 u.out(`Symbolrate $R_s=R/\\log_2 M=$ <span class="v">${nb(rs,0)} symboler/s</span>. Symboltid $T_s=1/R_s=$ <span class="v">${nb(ts,3)} µs</span>. Per hopp $T_{hopp}/T_s=$ <span class="v">${nb(per,per<1?3:1)} symboler</span>. Dette er <b>${fast?'rask':'langsom'} hopping</b>. Bare ${hit} av ${seq.length} hopp lander i det fadede kanalområdet, så skaden blir kortvarig.`)})};

W.parity2d=r=>{const u=ui(r,'Todimensjonal paritet: klikk på bit for å flippe dem','Prøv selv');const D=[[1,1,0,0,1,1,1],[1,0,1,1,1,0,1],[0,1,1,1,0,0,1],[0,1,0,1,0,0,1]];const fl=new Set();const par=a=>a.reduce((x,y)=>x^y,0);
 const rp=D.map(par),cp=D[0].map((_,j)=>par(D.map(x=>x[j]))),cc=par(rp);
 const draw=()=>{const G=D.map((row,i)=>row.map((b,j)=>b^(fl.has(i+','+j)?1:0)));const rbad=G.map((row,i)=>par(row)!==rp[i]),cbad=cp.map((c,j)=>par(G.map(x=>x[j]))!==c);
  let h='<table class="gridt nomath" style="width:auto">';G.forEach((row,i)=>{h+='<tr>'+row.map((b,j)=>`<td style="padding:0"><div class="bits"><button class="${b?'b1':''} ${fl.has(i+','+j)?'flip':''}" data-c="${i},${j}" aria-label="Bit rad ${i+1} kolonne ${j+1}">${b}</button></div></td>`).join('')+`<td style="background:${rbad[i]?'var(--badbg)':'var(--ambbg)'}">${rp[i]}</td></tr>`});
  h+='<tr>'+cp.map((c,j)=>`<td style="background:${cbad[j]?'var(--badbg)':'var(--ambbg)'}">${c}</td>`).join('')+`<td style="background:var(--ambbg)">${cc}</td></tr></table>`;u.html(h);
  C.$$('button',u.s).forEach(b=>b.onclick=()=>{const k=b.dataset.c;fl.has(k)?fl.delete(k):fl.add(k);draw()});
  const nr=rbad.filter(Boolean).length,nc=cbad.filter(Boolean).length,n=fl.size;
  u.out(n===0?'Ingen feil. Den siste raden og kolonnen er paritetsbit. Klikk en bit for å lage en feil.':nr===1&&nc===1&&n===1?'<span class="okc">Oppdaget og rettet.</span> Én rad og én kolonne feiler, og krysningspunktet er feilen.':nr+nc===0?`<span class="noc">IKKE oppdaget.</span> ${n} feil gir partall i alle rader og kolonner. Dette er Case D fra forelesningen.`:`<span class="amc">Oppdaget, men kan ikke rettes entydig.</span> ${n} feil gir ${nr} rad(er) og ${nc} kolonne(r) som feiler.`)};draw();
 u.btn('Nullstill',()=>{fl.clear();draw()})};

W.checksum=r=>{const u=ui(r,'Sjekksum med enerkomplement');u.params({a:{l:'Seksjon 1',text:'10011001'},b:{l:'Seksjon 2',text:'11100010'},c:{l:'Seksjon 3',text:'00100100'},d:{l:'Seksjon 4',text:'10000100'}},v=>{
 const ps=x=>parseInt((x.replace(/[^01]/g,'')||'0').slice(0,8),2),a=[v.a,v.b,v.c,v.d].map(ps),bin=x=>x.toString(2).padStart(8,'0');
 const sum=a.reduce((x,y)=>x+y,0);let w=sum;while(w>255)w=(w&255)+(w>>8);const ck=(~w)&255;
 let rs=a.reduce((x,y)=>x+y,0)+ck;while(rs>255)rs=(rs&255)+(rs>>8);
 u.html(`<div class="mono" style="font-size:17px;line-height:1.5">${a.map(x=>bin(x)).join('<br>')}<br>─────────<br>Sum:&nbsp;${sum.toString(2)}<br>Bær rundt: ${bin(w)}<br>Komplement = <b>sjekksum ${bin(ck)}</b></div>`);
 u.out(`Mottakeren legger sammen alt, også sjekksummen, og bærer rundt: <span class="v">${bin(rs)}</span> ${rs===255?'<span class="okc">bare enere, godtatt</span>':''}. Forelesningseksempelet gir 11011010.`)})};

W.crc=r=>{const u=ui(r,'CRC: binær divisjon steg for steg');u.params({d:{l:'Dataord',text:'100100'},g:{l:'Divisor',text:'1101'}},v=>{
 const d=(v.d.replace(/[^01]/g,'')||'1').slice(0,12),g=(v.g.replace(/[^01]/g,'').replace(/^0+/,'')||'11').slice(0,6),n=g.length;let a=(d+'0'.repeat(n-1)).split('').map(Number);const G=g.split('').map(Number);let rows=[];
 for(let i=0;i<=a.length-n;i++){if(a[i]){const before=a.slice(i,i+n).join('');for(let j=0;j<n;j++)a[i+j]^=G[j];{const pad=`<span style="display:inline-block;width:${i}ch"></span>`;rows.push(`${pad}${before}<br>${pad}${g} <span style="color:var(--mut)">XOR</span><br>${pad}<span style="display:inline-block;width:${n}ch;border-top:1px solid currentColor;vertical-align:middle"></span>`)}}}
 const rem=a.slice(a.length-n+1).join('');
 u.html(`<div class="mono" style="font-size:17px;line-height:1.3">Utvidet: ${d}<span style="color:var(--amb)">${'0'.repeat(n-1)}</span><br><br>${rows.join('<br>')}<br>Rest: <b>${rem}</b></div>`);
 u.out(`Divisor med ${n} bit gir ${n-1} nuller bak og ${n-1} bit CRC. Kodeord: <span class="v">${d}<span class="amc">${rem}</span></span>. Dividerer mottakeren dette med ${g}, blir resten 0 når ingen feil har skjedd.`)})};

const BOOKS={'Forelesning (5,2)':['00000','00111','11001','11110'],'Eksamen 2023, skjema 1':['00000','01011','10101','11110'],'Eksamen 2023, skjema 2':['00000','00011','01100','11011'],'Eksamen 2022, skjema 1':['00000','00010','00100','01000']};
W.hamming=r=>{const u=ui(r,'Minimum distance decoding');const hd=(a,b)=>[...a].filter((c,i)=>c!==b[i]).length;u.params({b:{l:'Kodebok',opt:Object.keys(BOOKS).map(k=>[k,k]),v:'Forelesning (5,2)',w:'100%'},x:{l:'Mottatt ord (5 bit)',text:'01100'}},v=>{
 const B=BOOKS[v.b],x=(v.x.replace(/[^01]/g,'')+'00000').slice(0,5);let dm=9;B.forEach((a,i)=>B.forEach((b,j)=>{if(i<j)dm=Math.min(dm,hd(a,b))}));
 const ds=B.map(c=>hd(c,x)),mn=Math.min(...ds),w=ds.filter(d=>d===mn).length;
 u.html(`<div class="tw"><table class="gridt" style="width:auto"><tr><th>Data</th><th>Kodeord</th><th>Avstand til ${x}</th></tr>${B.map((c,i)=>`<tr style="${ds[i]===mn?'background:var(--ambbg)':''}"><td>${i.toString(2).padStart(2,'0')}</td><td>${c}</td><td>${ds[i]}</td></tr>`).join('')}</table></div>`);
 const t=Math.floor((dm-1)/2);u.out(`$d_{min}=$ <span class="v">${dm}</span>. Retter $t=\\lfloor(d_{min}-1)/2\\rfloor=$ <span class="v">${t}</span> bitfeil. Oppdager $d_{min}-1=$ <span class="v">${dm-1}</span>. Redundans $(n-k)/k=3/2$. ${mn===0?'<span class="okc">Gyldig kodeord.</span>':w>1?`<span class="noc">Kan ikke dekodes:</span> ${w} kodeord har samme avstand ${mn}.`:`<span class="okc">Dekodes til ${B[ds.indexOf(mn)]}</span> (avstand ${mn}).`}`)})};
})();

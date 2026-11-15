C.add({id:'m3',nr:3,part:'wl',short:'Multipleksing og MAC',src:'Forelesning 3 · Schiller 2.5 og 3',
title:'Multipleksing og MAC: hvordan mange deler én kanal',
lead:String.raw`Spekteret er delt, og alle vil sende. Først deler vi kanalen i biter (multipleksing). Så lager vi regler for hvem som får bruke dem (MAC). Her ligger noen av de mest brukte eksamensoppgavene: OFDM med syklisk prefiks, CDMA og hidden terminal.`,
goals:[String.raw`skille FDD og TDD, og de fire dimensjonene i multipleksing`,String.raw`forklare hvorfor OFDM slår ISI, og regne på syklisk prefiks`,String.raw`kode og dekode CDMA for hånd`,String.raw`forklare hvorfor CSMA/CD ikke virker trådløst`,String.raw`bruke ALOHA-tall, CSMA/CA og RTS/CTS`],
sections:[
{id:'duplex',title:'Dupleksing: begge veier på én link',html:String.raw`
<p>Tre kommunikasjonsmoduser:</p>
<ul><li><b>Simpleks:</b> én vei, for eksempel en radiostasjon.</li><li><b>Halv dupleks:</b> begge veier, men ikke samtidig, for eksempel walkie-talkie.</li><li><b>Full dupleks:</b> begge veier samtidig, typisk med to kanaler.</li></ul>
<p>For å få toveiskommunikasjon mellom terminal og basestasjon trenger vi <b>nedlink</b> (fra basestasjonen) og <b>opplink</b> (til basestasjonen). To teknikker:</p>
[[f:fddtdd|FDD skiller retningene i frekvens. TDD skiller dem i tid.]]
<p><b>FDD</b> bruker to frekvensbånd. En duplekser filtrerer dem fra hverandre. Dette var vanlig i 2G og 3G.</p>
<p><b>TDD</b> bruker én frekvens og deler tiden. Fordelen er at forholdet mellom opp og ned kan tilpasses trafikken. Kravet er presis synkronisering, og et <b>guard period</b> som må dekke minst rundturstid pluss tid for å bytte mellom sending og mottak. Bluetooth bruker TDD. Fra 4G brukes begge.</p>
<div class="ana"><b>Analogi: Tofeltsvei og lysregulert bro</b><p>FDD er en tofeltsvei: hver retning har sitt felt, men er det rushtrafikk én vei, står det andre feltet halvtomt. TDD er en smal bro med lyskryss: lyset kan gi mest grønt til den travle retningen, men broen må tømmes før retningen snus. Den tømmingen er guard period.</p></div>
<div class="exam"><b>Eksamen 2024, MC 9</b><p>«In TDD, what is the guard period used for?» For å bytte mellom sende- og mottaksmodus.</p></div>`,
quiz:[
{t:'mc',y:'2024',q:'In TDD, what is the guard period used for?',o:['To switch between transmit and receive modes','To separate frequencies','To improve signal strength','To encode data'],a:0},
{t:'num',q:'En TDD-celle har radius 30 km. Hva må guard period minst være for rundturstiden? ($c=3\\cdot10^8$)',a:200,tol:.01,u:'µs',e:'<b>Formel:</b> $GP\\ge2R/c$ (tur og retur). <b>Utregning:</b> $\\dfrac{2\\cdot30\\,000}{3\\cdot10^8}=2\\cdot10^{-4}$ s $=200$ µs.'},
{t:'ref',q:'Hvorfor kan TDD være bedre enn FDD for nettsurfing?',m:'Surfing har mest trafikk ned og lite opp. TDD kan gi nedlink flere tidsluker. FDD har faste bånd med fast kapasitet hver vei, så opplink-båndet står delvis tomt.',k:['Trafikken er asymmetrisk','TDD kan justere tidsdelingen','FDD har faste bånd']}
]},
{id:'mux',title:'Multipleksing i fire dimensjoner',html:String.raw`
<p><b>Multipleksing</b> lar flere signaler dele et medium med lite eller ingen interferens. Vi kan dele i rom, frekvens, tid og kode, og trenger <b>guard</b>-mellomrom mellom delene.</p>
<div class="ana"><b>Analogi: Samtaler i et selskap</b><p>Gjester kan unngå å forstyrre hverandre på fire måter: gå i hvert sitt rom (rom), snakke etter tur (tid), snakke i ulikt toneleie (frekvens) eller snakke hvert sitt språk (kode). Litt luft mellom gruppene er guard-mellomrommet.</p></div>
[[w:muxgrid]]
<div class="tw"><table><tr><th></th><th>Deler</th><th>Fordeler</th><th>Ulemper</th><th>Eksempel</th></tr>
<tr><td><b>SDM</b></td><td>Rom</td><td>Samme frekvens kan gjenbrukes</td><td>Trenger avstand</td><td>Cellulære nett</td></tr>
<tr><td><b>FDM</b></td><td>Frekvens</td><td>Enkel, trenger lite koordinering</td><td>Lite fleksibel, sløser ved ujevn trafikk</td><td>Radio, WDM i fiber</td></tr>
<tr><td><b>TDM</b></td><td>Tid</td><td>Én bærebølge, høy throughput</td><td>Presis synkronisering</td><td>GSM</td></tr>
<tr><td><b>CDM</b></td><td>Kode</td><td>Effektiv, vern mot interferens og avlytting, trenger ikke frekvensplanlegging</td><td>Mer kompleks mottaker, trenger effektkontroll</td><td>3G</td></tr></table></div>
<div class="exam"><b>Eksamen 2024, MC 3</b><p>«Multiplexing is used to allow multiple signals to share the same transmission medium.» Dette er definisjonen.</p></div>`,
quiz:[
{t:'mc',y:'2024',q:'Multiplexing in telecommunications is used to:',o:['Allow multiple signals to share the same transmission medium','Encode data for security purposes','Transmit data over multiple channels simultaneously','Increase the distance a signal can travel'],a:0},
{t:'mc',q:'Hvilken teknikk trenger effektkontroll?',o:['CDM','FDM','TDM','SDM'],a:0,e:'Alle sender samtidig på samme frekvens, så en sterk sender drukner de andre.'},
{t:'num',q:'Et bånd på 10 MHz deles i kanaler på 200 kHz med 25 kHz guard band mellom kanalene. Hvor mange hele kanaler får du plass til?',a:44,tol:0,e:'<b>Formel:</b> antall $=\\lfloor B/(B_{kanal}+B_{guard})\\rfloor$. <b>Utregning:</b> $\\dfrac{10\\,000}{200+25}=44{,}4$, altså 44 hele kanaler.'},
{t:'ref',q:'Hvorfor sløser FDM med kapasitet når trafikken er sprutende (bursty)?',m:'Hver kanal har sitt faste bånd enten den sender eller ikke. Tomme perioder gir tomt spektrum, og ingen andre kan låne det.',k:['Fast tildeling','Stille brukere holder på båndet','Andre kan ikke bruke det']}
]},
{id:'ofdm',title:'OFDM og syklisk prefiks',html:String.raw`
<div class="why"><b>Problemet OFDM løser</b><p>Vi vil ha høy datarate, men høy datarate betyr korte symboler, og korte symboler ødelegges av ISI (modul 1). Trikset: i stedet for én rask strøm sender vi $N$ langsomme strømmer parallelt. Totalraten er den samme, men hvert symbol blir $N$ ganger lengre.</p></div>
<div class="ana"><b>Analogi: Mange som snakker sakte</b><p>Husker du ekkoet i idrettshallen? I stedet for at én person snakker veldig fort, deler du talen på hundre personer som leser hver sin del sakte og samtidig. Antall ord per minutt er det samme, men hvert ord varer så lenge at ekkoet ikke rekker å ødelegge det.</p></div>
<p><b>OFDM</b> deler en strøm på $R$ bps i $N$ parallelle strømmer på <b>underbærebølger</b>:</p>
<ul><li>Hver strøm har rate $R/N$.</li><li>Bit-tiden er $N/R$, altså $N$ ganger lengre.</li></ul>
<p>Eksempel fra 5G: 100 MHz med 15 kHz underbærebølger gir omtrent 6600 underbærebølger.</p>
<h3>Hvorfor «ortogonal»?</h3>
<p>Vanlig FDM trenger guard bands. I OFDM overlapper underbærebølgene, men de er <b>ortogonale</b>: ved toppen til hver bærer er alle andre nøyaktig null.</p>
<div class="ana"><b>Analogi: Karusellen</b><p>Hestene på en karusell går opp og ned i ulikt tempo, men hver gjør et helt antall svingninger per runde. Regner du snittet over en hel runde, er hver hest like mye over som under midten. Mottakeren ser på sin egen rytme over ett symbol, og de andre underbærebølgene snitter til null selv om de er der hele tiden.</p></div>
[[w:ofdm]]
<p>Dermed sparer OFDM spektrum. To gevinster: bedre spektraleffektivitet og robusthet mot ISI og frekvensselektiv fading, fordi hver smal underbærebølge ser nesten flat fading.</p>
<h3>Syklisk prefiks</h3>
<p>Selv med lange symboler renner en hale av forrige symbol inn i neste. Løsningen: legg et beskyttelsesintervall foran hvert symbol. <b>Syklisk prefiks</b> er en kopi av <b>slutten</b> av symbolet, satt inn i <b>starten</b>. Mottakeren kaster CP-delen og leser bare $T_{sym}$. Der lander ISI-halen.</p>
<div class="ana"><b>Analogi: Vindfanget</b><p>Gjestene tar med seg snø inn. Har du et vindfang, faller snøen der, og du går rett forbi det inn i stua. CP er vindfanget foran hvert symbol: halen fra forrige symbol lander der, og mottakeren kaster den delen.</p></div>
<p>Kravet er $T_{CP}\ge$ maks flerveisforsinkelse.</p>
[[w:cp]]
<p>CP er ren overhead:</p>
$$\text{overhead}=\frac{T_{CP}}{T_{sym,TX}}=\frac{T_{CP}}{T_{sym}+T_{CP}}$$
<div class="tw"><table><tr><th>LTE</th><th>CP</th><th>Brukes</th></tr><tr><td>Normal</td><td>≈ 4,7 µs</td><td>Vanlige celler</td></tr><tr><td>Utvidet</td><td>≈ 16,7 µs</td><td>Store celler, sterk flerveis. Overhead ≈ 20 %</td></tr></table></div>
<div class="ex"><b>Eksamen 2025, oppgave 1</b><p>$T_{sym,TX}=20$ µs med 4 µs CP, 16-QAM.</p><p>Overhead: $4/20=20\,\%$. Symbolrate: $1/20\text{ µs}=50\,000$ symboler/s. Bitrate per underbærebølge: $4\cdot50\,000=0{,}2$ Mbps.</p><p>Flerveis 5 µs: ISI oppstår, fordi $5>4$. Maks tillatt når CP skal være faktor 10 større: $T_{max}=4/10=0{,}4$ µs.</p></div>
<div class="trap"><b>Felle</b><p>Eksamen 2025 hadde et alternativ som sa at CP kopierer <i>begynnelsen</i> og legges <i>bakerst</i>. Det er feil. Husk: slutten, foran. CP er overhead og forbedrer ikke spektraleffektiviteten, men den er prisen for å unngå ISI.</p></div>
<h3>OFDMA</h3>
<p>I <b>OFDMA</b> fordeles underbærebølgene på brukere for en viss tid. Mer data gir flere underbærebølger. Det er fleksibelt og robust, men krever mer kompleks elektronikk (FFT).</p>
<div class="ana"><b>Analogi: Hovmesteren</b><p>Ved faste reservasjoner står bordene tomme når gjesten uteblir. En hovmester gir derimot det store selskapet mange bord denne timen og færre neste time. OFDMA deler ut underbærebølger på samme måte, etter hvem som har data nå.</p></div>`,
quiz:[
{t:'mc',y:'2025',fix:1,q:'Select the correct statement about OFDM.',o:['OFDM symbol duration (bit times) are shorter than the channel delay spread to minimize inter-symbol interference.','The cyclic prefix in OFDM is a copy of the beginning portion of the symbol and is added at the end to improve spectral efficiency.','OFDM improves spectral efficiency and combats inter-symbol interference by making symbol durations much longer than the delay spread and adding a cyclic prefix that acts as a guard interval.','The cyclic prefix reduces the number of subcarriers in OFDM, which lowers data rate but eliminates multipath effects completely.'],a:2},
{t:'mc',y:'2024',q:'What is one major advantage of using OFDM in wireless communications?',o:['It improves robustness against multipath fading','It decreases latency','It simplifies signal processing','It enhances the data security'],a:0},
{t:'num',q:'Lengste vei er 1140 m lengre enn den direkte. Hva må $T_{CP}$ minst være?',a:3.8,tol:.01,u:'µs',e:'<b>Formel:</b> $T_{CP}\\ge\\tau=\\Delta d/c$. <b>Utregning:</b> $\\dfrac{1140}{3\\cdot10^8}=3{,}8$ µs. LTE normal CP på 4,7 µs holder.'},
{t:'num',q:'LTE: $T_{sym}=66{,}7$ µs og utvidet CP $=16{,}7$ µs. Hva er overheaden av overføringstiden? Svar i prosent.',a:20,tol:.02,u:'%',e:'<b>Formel:</b> overhead $=T_{CP}/(T_{sym}+T_{CP})$. <b>Utregning:</b> $\\dfrac{16{,}7}{66{,}7+16{,}7}=\\dfrac{16{,}7}{83{,}4}=0{,}20=20\\,\\%$.'},
{t:'num',q:'En strøm på 20 Mbps fordeles på 1000 underbærebølger. Hva er bit-tiden på hver, i µs?',a:50,tol:.01,u:'µs',e:'<b>Formel:</b> rate per underbærebølge $=R/N$, og $T_b=N/R$. <b>Utregning:</b> $\\dfrac{20\\cdot10^6}{1000}=20$ kbps. $T_b=\\dfrac{1}{20\\,000}=50$ µs.'},
{t:'ref',y:'2025',q:'Explain what the Cyclic Prefix is and describe its primary purpose in OFDM systems.',m:'The CP is a copy of the end part of an OFDM symbol, placed in front of the symbol. Its purpose is to avoid ISI from multipath propagation: the tail of the previous symbol lands in the CP, which the receiver discards.',k:['A copy of the end of the symbol','Placed at the start','Prevents ISI from multipath','The receiver ignores the CP']},
{t:'ref',q:'Hvorfor er lengre CP ikke alltid bedre?',m:'Lengre CP gir bedre vern mot ISI, men er overhead som ikke bærer data. Throughput og spektraleffektivitet synker. Man velger derfor CP akkurat over forventet delay spread.',k:['CP bærer ikke nye data','Lavere throughput','Må tilpasses delay spread']}
]},
{id:'macproblem',title:'MAC: hvorfor trådløst er vanskelig',html:String.raw`
<p><b>MAC</b> avgjør hvem som får sende, når og hvordan. Det ligger på datalinklaget, mens multipleksing ligger på det fysiske laget.</p>
<p>I kablet nett er klassikeren <b>CSMA/CD</b>: lytt, send, og stopp hvis du merker kollisjon. Det virker fordi alle ser omtrent samme signal på kabelen. I luft bryter begge forutsetningene sammen:</p>
<ol><li><b>Du kan ikke høre mens du sender.</b> Din egen sendeeffekt drukner alt.</li><li><b>Kollisjonen skjer hos mottakeren, ikke hos senderen.</b> Signalstyrken faller så mye med avstanden at det senderen hører, er noe annet enn det mottakeren hører.</li></ol>
<div class="ana"><b>Analogi: Megafonen</b><p>Prøv å høre hva noen hvisker mens du roper i en megafon tett inntil øret. Din egen stemme drukner alt. Og selv om du hørte stille hos deg, sier det ingenting om bråket der mottakeren står. Derfor virker ikke kollisjonsdeteksjon i luft.</p></div>
<h3>Skjult terminal</h3>
<p>Den <b>skjulte terminalen</b> er en sender du ikke kan høre, men som mottakeren din hører.</p>
<div class="ana"><b>Analogi: Den lange korridoren</b><p>Du og en annen står i hver ende av en lang korridor. Dere hører ikke hverandre, men begge prater til personen i midten. Begge tror kanalen er ledig, og personen i midten hører bare rot. Lytting hjelper ikke, fordi problemet oppstår der du ikke står.</p></div>
[[w:hidden]]
<h3>Eksponert terminal</h3>
<p>Den <b>eksponerte terminalen</b> er det motsatte problemet: du hører en sender og holder igjen, selv om sendingen din ikke ville skadet noen.</p>
<div class="ana"><b>Analogi: Stille på bussen</b><p>Du vil si noe til vennen til venstre for deg, men holder munn fordi personen til høyre snakker med noen andre lenger bort. Vennen din hadde hørt deg helt fint. Du tar hensyn til noe som aldri var et problem der vennen sitter.</p></div>
[[w:hidden|exp]]
<div class="key"><b>Forskjellen i én setning</b><p>Skjult terminal gir kollisjoner som ikke burde skjedd. Eksponert terminal gir ventetid som ikke var nødvendig.</p></div>
<h3>Near-far-problemet</h3>
<p>A og B sender til C. A er langt unna, B er nær. B sitt signal drukner A hos C. Dette er avgjørende for CDMA, der alle sender samtidig. Løsningen er <b>effektkontroll</b>: basestasjonen ber nære terminaler sende svakere, så alle ankommer med omtrent lik styrke.</p>
<div class="ana"><b>Analogi: Rop i øret</b><p>Noen roper i øret ditt mens en venn prater fra andre siden av rommet. Vennen drukner selv om det ikke er noe galt med stemmen. Løsningen er at alle tilpasser stemmen, slik at de kommer like sterkt fram hos deg. Det er effektkontroll.</p></div>`,
quiz:[
{t:'mc',y:'2023',fix:1,q:'Choose the correct statement:',o:['In a hidden terminal/node problem two senders with overlapping transmission ranges are trying to simultaneously transmit to different receivers.','In a hidden terminal/node problem two nodes with overlapping transmission ranges are trying to simultaneously transmit to the same receiver.','In a hidden terminal/node problem two nodes with non-overlapping transmission ranges are trying to simultaneously send data to the same receiver.','In a hidden terminal/node problem two nodes are trying to simultaneously send data to the receivers which have overlapping transmission ranges.'],a:1,e:'The solution is b. The ranges overlap at the receiver, but the senders cannot hear each other. Read very carefully: alternative c is tempting.'},
{t:'mc',q:'S2 vil sende til R2, men hører S1 sende til R1 og venter unødvendig. Hva er S2?',o:['Eksponert terminal','Skjult terminal','Near-far','Slave'],a:0},
{t:'ref',y:'2022',q:'Why are acknowledgments used in WLAN but not in wired Ethernet?',m:'In wired Ethernet the sender can detect collisions. In wireless the collision happens at the receiver and cannot be detected by the sender, among other things because of hidden terminals. An acknowledgment is then the only way to know that the frame arrived.',k:['Wired: collisions can be detected','Wireless: not detected at the sender','ACK therefore confirms reception']},
{t:'ref',y:'2024',q:'Explain the near-far problem in wireless systems and describe a strategy to mitigate it.',m:'Users near the base station arrive with high power, while distant users arrive weakly. The strong signals drown out the weak ones. The remedy is power control: the base station adjusts the transmit power of each user so all signals arrive with similar strength.',k:['Near signals are much stronger','Far signals are drowned out','Power control gives equal received strength']},
{t:'num',q:'Bruker A er 1 km unna og B 100 m unna basestasjonen, med $n=4$ og lik sendeeffekt. Hvor mange dB sterkere er B hos basestasjonen?',a:40,tol:0,u:'dB',e:'<b>Formel:</b> $\\Delta P=10\\,n\\log_{10}(d_A/d_B)$. <b>Utregning:</b> $10\\cdot4\\cdot\\log_{10}(1000/100)=40\\cdot1=40$ dB.'}
]},
{id:'kanalisering',title:'Kanaliserende MAC og CDMA',html:String.raw`
<p>MAC-protokoller finnes i tre familier:</p>
<div class="tw"><table><tr><th>Familie</th><th>Idé</th><th>Eksempler</th></tr><tr><td><b>Kanalisering</b></td><td>Del kanalen, hver bruker eier en del</td><td>FDMA, TDMA, CDMA, OFDMA, SDMA</td></tr><tr><td><b>Tilfeldig aksess</b></td><td>Ingen koordinering. Håndter kollisjoner</td><td>ALOHA, CSMA/CA</td></tr><tr><td><b>Kontrollert aksess</b></td><td>Koordinert tur</td><td>DAMA, MACA, polling, token</td></tr></table></div>
<p>FDMA og TDMA er FDM og TDM brukt som tilgangsmetoder. SDMA bruker retningsantenner og plassering av basestasjoner.</p>
<div class="ana"><b>Analogi: Tre måter å dele et møterom</b><p>Kanalisering er en timeplan der alle har sin faste tid. Tilfeldig aksess er at du bare går inn og beklager deg hvis det er opptatt. Kontrollert aksess er en møteleder som gir ordet. Timeplanen sløser når folk uteblir, friheten kollapser når mange vil inn, og møtelederen koster tid.</p></div>
<h3>CDMA: alle snakker samtidig</h3>
<p>I <b>CDMA</b> sender alle samtidig på samme frekvens, og koden skiller dem.</p>
<div class="ana"><b>Analogi: Språkene i rommet</b><p>Alle snakker samtidig, men hvert par har sitt eget språk. Du forstår bare ditt eget, og resten blir summing i bakgrunnen. I CDMA er språket en kode, og mottakeren filtrerer ut alt som ikke er på «sitt språk».</p></div>
<p>Regler du må kunne:</p>
<ul><li>Bit 1 → $+1$, bit 0 → $-1$, stille → $0$.</li><li>Hver stasjon sender bit × kode.</li><li>Kanalen legger alle sammen, element for element.</li><li>Mottaker for stasjon $i$ regner indreproduktet av summen og koden, og deler på kodelengden.</li></ul>
<p>Kodene er ortogonale: indreproduktet av to ulike koder er 0, så alle andre faller bort.</p>
<div class="ana"><b>Analogi: Nord og øst</b><p>Går du rett østover, har du ikke flyttet deg noe nordover. Øst og nord er ortogonale. Indreproduktet spør: hvor langt peker dette signalet i min retning? Ortogonale koder svarer null, så alle andre stasjoner faller bort uansett hvor høyt de sender.</p></div>
$$\frac{1}{4}\,\mathbf{r}\cdot\mathbf{c}_i=\begin{cases}+1&\text{bit 1}\\-1&\text{bit 0}\\0&\text{stille}\end{cases}$$
[[w:cdma]]
<div class="ex"><b>Eksamen 2024</b><p>$\mathbf{r}=[2\ 2\ 2\ {-2}]$. $C_1=[1\ 1\ 1\ 1]$: $2+2+2-2=4$, delt på 4 er $1$: bit 1.</p><p>$C_2=[1\ {-1}\ 1\ {-1}]$: $2-2+2+2=4$: bit 1. $C_3=[1\ 1\ {-1}\ {-1}]$: $2+2-2+2=4$: bit 1. $C_4=[1\ {-1}\ {-1}\ 1]$: $2-2-2-2=-4$: bit 0.</p></div>
<div class="ex"><b>Eksamen 2025, MC 7</b><p>Bit 0, bit 1, stille med $c_1,c_2,c_3$: $-c_1+c_2+0=[0\ {-2}\ 0\ {-2}]$.</p></div>`,
quiz:[
{t:'mc',y:'2025',q:'c1=[+1 +1 +1 +1], c2=[+1 -1 +1 -1], c3=[+1 +1 -1 -1], stations send [0, 1, silence]. What is transmitted on the channel?',o:['[0 -2 0 -2]','[0 0 0 0]','[3 1 1 -1]','[2 0 2 0]'],a:0,e:'<b>Formula:</b> Bit 1 sends $+c$, bit 0 sends $-c$, silence sends nothing. Add the contributions chip by chip. <b>Calculation:</b> $-c_1+c_2=[-1+1,\\ -1-1,\\ -1+1,\\ -1-1]=[0\\ {-2}\\ 0\\ {-2}]$.'},
{t:'mc',y:'2025',q:'Channel carries [-1 -1 -3 1]. Receiving code is [+1 -1 +1 -1]. Which bit was sent?',o:['Bit 0','Bit 1','Silence','Not enough information'],a:0,e:'<b>Formula:</b> Inner product of the channel signal and the code, divided by the code length. <b>Calculation:</b> $(-1)(1)+(-1)(-1)+(-3)(1)+(1)(-1)=-1+1-3-1=-4$. $-4/4=-1$, which is bit 0.'},
{t:'mc',y:'2023',q:'Codes: S1 [+1 +1 +1 +1] sends bit 1; S2 [+1 -1 +1 -1] sends bit 0; S3 [+1 +1 -1 -1] sends bit 0; S4 [+1 -1 -1 +1] sends bit 0. What is the sum on the channel?',o:['[-2 2 2 2]','[-2 -2 2 2]','[-2 2 -2 2]','[-3 -1 2 2]'],a:0,e:'<b>Formula:</b> Bit 1 sends $+c$, bit 0 sends $-c$. Add the contributions chip by chip. <b>Calculation:</b> $c_1-c_2-c_3-c_4=[-2\\ 2\\ 2\\ 2]$.'},
{t:'num',q:'Indreprodukt av $[1\\ 1\\ {-1}\\ {-1}]$ og $[1\\ {-1}\\ {-1}\\ 1]$?',a:0,tol:0,e:'<b>Formel:</b> $a\\cdot b=\\sum a_ib_i$. <b>Utregning:</b> $1\\cdot1+1\\cdot(-1)+(-1)(-1)+(-1)\\cdot1=1-1+1-1=0$. Kodene er ortogonale.'},
{t:'ref',q:'Hvorfor trenger CDMA effektkontroll, mens TDMA ikke trenger det i samme grad?',m:'I CDMA sender alle samtidig på samme frekvens, så en nær bruker med høy effekt overdøver andre og koden kan ikke skille dem helt. I TDMA sender brukerne til ulike tider, så ulike nivåer ikke kolliderer.',k:['CDMA: samtidig på samme frekvens','Near-far gjør at sterke overdøver svake','TDMA skiller i tid']}
]},
{id:'random',title:'Tilfeldig aksess: ALOHA og CSMA/CA',html:String.raw`
<h3>ALOHA</h3>
<p>Den enkleste regelen som finnes: har du noe å si, si det. <b>ALOHA</b> virker slik: send, vent på ACK, og er ACK-en borte, vent tilfeldig og prøv igjen. Lett å lage, lav forsinkelse ved lite trafikk, men sårbar ved høy last.</p>
<p><b>Sårbar tid</b> er tidsrommet en annen sending kan ødelegge din. I ALOHA kan en ramme som startet like før din, eller like etter, kollidere. Sårbar tid er $2T_{fr}$.</p>
<p><b>Slotted ALOHA</b> deler tiden i luker. Alle sendinger starter ved en lukegrense, og en sentralstasjon gir taktslag. Sårbar tid halveres til $T_{fr}$, og maksimal effektivitet dobles.</p>
<div class="ana"><b>Analogi: Den smale døra</b><p>I ALOHA kan du krasje med alle som startet gjennom døra rett før deg, og alle som starter rett etter. Får døra bare åpnes når klokken slår, kan du bare krasje med dem som valgte akkurat samme slag. Sårbar tid halveres, og det er hele gevinsten.</p></div>
[[w:aloha]]
<div class="tw"><table><tr><th></th><th>ALOHA</th><th>Slotted ALOHA</th></tr><tr><td>Sårbar tid</td><td>$2T_{fr}$</td><td>$T_{fr}$</td></tr><tr><td>Throughput</td><td>$S=Ge^{-2G}$</td><td>$S=Ge^{-G}$</td></tr><tr><td>Maks</td><td>18 %</td><td>36 %</td></tr><tr><td>Krever</td><td>Ingenting</td><td>Synkronisering</td></tr></table></div>
<div class="trap"><b>Felle</b><p>Slotted ALOHA fjerner ikke kollisjoner. To stasjoner kan fortsatt starte i samme luke.</p></div>
<h3>CSMA: lytt før du snakker</h3>
<p><b>CSMA</b> lytter først. Ledig kanal: send. Opptatt: vent. Dette reduserer kollisjoner sterkt.</p>
<h3>CSMA/CA</h3>
<p><b>CSMA/CA</b> er laget for trådløst, der vi ikke kan oppdage kollisjoner. Derfor unngår vi dem i stedet, med tre verktøy:</p>
<div class="ana"><b>Analogi: «Etter deg»</b><p>To høflige møtes i en døråpning. Trekker begge seg like langt tilbake, møtes de igjen. Venter de hver sin tilfeldige tid, kommer én først. Møtes de på nytt, må de velge fra et større tidsrom. Tilfeldigheten skiller dem, og dobling av vinduet tilpasser seg antall personer i døra.</p></div>
<ol><li><b>IFS</b>: pause før sending. Kort IFS gir høy prioritet.</li><li><b>Contention window</b>: tilfeldig valgt antall tidsluker å vente. Etter hvert mislykket forsøk dobles vinduet ($0$ til $2^K-1$).</li><li><b>ACK</b>: kvittering. Uten ACK antas kollisjon.</li></ol>
<div class="key"><b>Slik går det</b><p>Lytt. Ledig? Vent IFS. Fortsatt ledig? Trekk tilfeldig $R$ i vinduet. Vent $R$ luker, stopp telleren hvis kanalen blir opptatt. Send. Vent på ACK. Uten ACK: $K=K+1$, prøv på nytt, gi opp etter maks antall.</p></div>`,
quiz:[
{t:'mc',y:'2025',fix:1,q:'Find the correct statement about random-access protocols:',o:['In Pure ALOHA, stations sense the channel before transmitting to avoid collisions, and retransmit immediately if no ACK is received.','Typically, in CSMA/CA acknowledgments are not used, since there exist mechanisms like IFS and contention window which guarantee a successful transmission of the frame.','CSMA/CA reduces collisions by avoiding transmission when the channel is busy, using mechanisms like Interframe Spaces (IFS), and a contention window with random backoff before sending data, making it suitable for wireless networks.','Slotted ALOHA eliminates collisions completely by dividing time into slots and requiring synchronization among users.'],a:2},
{t:'mc',y:'2023',q:'Compared to ALOHA, Slotted ALOHA:',o:['has coordination between a central station and the other stations.','has lower channel efficiency.','has no coordination among the stations','can detect hidden terminals.'],a:0,e:'A central station announces the start of each slot.'},
{t:'num',q:'Hva er maksimal throughput i Slotted ALOHA, i prosent (ett desimal)? Bruk $S=Ge^{-G}$ ved $G=1$.',a:36.8,tol:.01,u:'%',e:'<b>Formel:</b> $S=Ge^{-G}$. <b>Utregning:</b> $G=1$ gir $S=1\\cdot e^{-1}=0{,}368=36{,}8\\,\\%$. Slidene runder til 36 %.'},
{t:'num',q:'Etter 3 mislykkede forsøk ($K=3$): hvor mange luker er det i contention window ($2^K$)?',a:8,tol:0,e:'<b>Formel:</b> antall luker $=2^K$. <b>Utregning:</b> $2^3=8$. Tallet $R$ trekkes fra 0 til 7.'},
{t:'ref',q:'Hvorfor gir halvert sårbar tid dobbelt maksimal throughput i ALOHA? Forklar intuitivt.',m:'Antall sendinger som kan kollidere med din, er proporsjonalt med sårbar tid. Halvert tid gir halvparten av kollisjonsrisikoen ved samme last, så man tåler dobbelt så høy last før kollisjonene tar over.',k:['Kollisjonsrisiko følger sårbar tid','Halvert risiko ved samme last','Toppen flyttes og dobles']}
]},
{id:'kontrollert',title:'Kontrollert aksess: reservasjon, polling, token',html:String.raw`
<h3>DAMA</h3>
<p><b>DAMA</b>: send først en kort forespørsel for en framtidig tidsluke. Korte pakker kolliderer sjelden. Får du tildelt, sender du. Effektiviteten kan bli 80 %, men forsinkelsen blir større. Typisk på satellitt.</p>
<div class="ana"><b>Analogi: Ring og bestill bord</b><p>Møter hele selskapet opp uten å ringe, er det dyrt å bli avvist. Å ringe først tar et øyeblikk, og er linjen opptatt, har du tapt nesten ingenting. Korte forespørsler gjør kollisjoner billige.</p></div>
<h3>MACA</h3>
<p><b>MACA</b> bruker to korte kontrollrammer for å reservere kanalen. Senderen sender <b>RTS</b> med adresser og lengde. Mottakeren svarer med <b>CTS</b>, som hele naboskapet hører.</p>
<ul><li><b>Skjult terminal:</b> du hører CTS, altså er du i nærheten av mottakeren: hold deg stille.</li><li><b>Eksponert terminal:</b> du hører RTS, men ikke CTS, altså er du ikke nær mottakeren: du kan sende.</li></ul>
<p>Hvis to RTS kolliderer, er skaden liten, fordi de er korte.</p>
<div class="ana"><b>Analogi: Læreren gir ordet</b><p>Eleven spør «kan jeg si noe?» (RTS). Læreren svarer høyt «Ola har ordet» (CTS). Svaret er det viktige: det kommer fra den som skal høre, så alle som kunne forstyrret der, får beskjed. Kollisjoner skjer hos mottakeren, og derfor må det være mottakeren som varsler.</p></div>
<div class="exam"><b>Eksamen 2023: når ranges ikke er like</b><p>MACA antar at alle som kan forstyrre, hører CTS. Men interferensrekkevidden er større enn overføringsrekkevidden. En node kan være utenfor rekkevidde for CTS og likevel forstyrre mottakeren. Da kan kollisjoner fortsatt skje.</p></div>
<h3>Polling</h3>
<p>En sentral stasjon hørt av alle spør terminalene etter tur. Bluetooth virker slik.</p>
<div class="ana"><b>Analogi: Læreren går rundt i klassen</b><p>Læreren spør hver elev etter tur. Det blir aldri kollisjoner, men hver runde koster tid, også hos elever som ikke har noe å si, og forsvinner læreren, stopper alt.</p></div>
<h3>Token passing</h3>
<p>Stasjonene står i en logisk ring. Bare den med token-rammen får sende. Den sendes videre etter bruk. Vi må ha token-håndtering: tidsgrenser og prioriteter.</p>
<div class="ana"><b>Analogi: Snakkepinnen</b><p>Bare den som holder pinnen, får snakke, og pinnen går videre etterpå. Kollisjoner er umulig. Til gjengjeld må noen passe på at pinnen ikke blir borte, og derfor trengs tidsgrenser.</p></div>`,
quiz:[
{t:'mc',q:'Hvilken protokoll er typisk for satellittlinker?',o:['DAMA','Slotted ALOHA','Token passing','CSMA/CD'],a:0},
{t:'mc',q:'En stasjon hører RTS, men ikke CTS. Hva kan den gjøre?',o:['Sende, fordi den ikke er nær mottakeren','Holde seg stille til ACK','Sende CTS','Sette NAV for sendingen'],a:0,e:'Dette er løsningen på eksponert terminal. Merk at i 802.11 setter stasjoner likevel NAV ut fra RTS, så dette er prinsippet i MACA.'},
{t:'ref',y:'2023',q:'Transmission, detection and interference range are not equal in reality. Describe the problem this causes for RTS/CTS.',m:'In MACA, stations that do not hear the CTS are allowed to transmit. But the interference and detection ranges are larger than the transmission range. Stations outside the transmission range of the receiver can therefore still disturb it, so collisions can happen.',k:['Stations without CTS may transmit','The interference range is larger','They can still disturb the receiver']},
{t:'num',q:'RTS er 20 byte og data er 1500 byte. Hvor mange ganger billigere er en RTS-kollisjon enn en datakollisjon (i tid)?',a:75,tol:.01,e:'<b>Formel:</b> Med samme bitrate er tiden proporsjonal med lengden: forhold $=L_{data}/L_{RTS}$. <b>Utregning:</b> $1500/20=75$.'}
]},
{id:'eks',title:'Eksamensoppgaver',quizTitle:'Som på eksamen',html:String.raw`<p>Denne oppgaven var verdt 10 av 100 poeng i 2025. Bruk OFDM- og CP-figuren til å kontrollere deg.</p>`,
quiz:[
{t:'ex',y:'2025',pts:10,q:'OFDM with 16-QAM. $T_{sym,TX}=20$ µs of which 4 µs are CP. A CP should be "much longer" than the channel delay, meaning a factor of 10.<br>a) i. Explain what CP is and its primary purpose. [3p] ii. Calculate the time overhead. [1p]<br>b) Calculate the symbol rate and bit rate for a single subcarrier stream. [3p]<br>c) Maximum delay spread is 5 µs. i. Will ISI occur? Why? [2p] ii. What is the maximum allowable delay spread $T_{max}$? [1p]',s:String.raw`<p>a) i. A copy of the end of the symbol, placed in front of it. It prevents ISI from multipath. ii. Overhead $=T_{CP}/T_{sym,TX}=4/20=20\,\%$.</p><p>b) $R_s=1/T_{sym,TX}=1/(20\cdot10^{-6})=50\,000$ symbols/s. $R_b=R_s\log_2M=50\,000\cdot4=200\,000$ bps $=0.2$ Mbps.</p><p>c) i. Yes, $5\text{ µs}>4\text{ µs}$. Delayed components go beyond the guard interval. ii. $T_{CP}\ge10\,T_{max}$, so $T_{max}=T_{CP}/10=4/10=0.4$ µs.</p>`},
{t:'ex',y:'2024',pts:4,q:'C1=[1 1 1 1], C2=[1 -1 1 -1], C3=[1 1 -1 -1], C4=[1 -1 -1 1]. Received r=[2 2 2 -2]. Determine the bits from stations 1–4.',s:String.raw`<p>Take the inner product $C_k\cdot r=\sum C_{k,i}r_i$ for each station. A positive result is bit 1, a negative result is bit 0.</p><p>$C_1\cdot r=2+2+2-2=4$: bit 1. $C_2\cdot r=2-2+2+2=4$: bit 1. $C_3\cdot r=2+2-2+2=4$: bit 1. $C_4\cdot r=2-2-2-2=-4$: bit 0.</p>`},
{t:'ex',y:'2025',pts:2,q:'What is the key difference between multiplexing and medium access control? State the primary function of each and the layer where each operates.',s:String.raw`<p>Multiplexing operates at the physical layer and combines several signals on a shared medium. MAC operates at the data link layer and decides who transmits, when and how, using methods based on multiplexing.</p>`}
]}
]});

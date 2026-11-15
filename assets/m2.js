C.add({id:'m2',nr:2,part:'wl',short:'Trådløs overføring II',src:'Forelesning 2 · Stallings 5.4 · Schiller 2.7 · Kurose & Ross 6',
title:'Trådløs overføring II: hvordan vi slår tilbake',
lead:String.raw`Modul 1 viste hva kanalen ødelegger. Denne modulen er verktøykassen: tilpass deg (AMC), lag reserver (diversitet og MIMO), spre deg (spredt spektrum), og oppdag og rett feil (koding).`,
goals:[String.raw`forklare AMC og beregne spektraleffektivitet`,String.raw`skille diversitet, romlig multipleksing og beamforming`,String.raw`avgjøre om FHSS er rask eller langsom ut fra tallene`,String.raw`regne paritet, sjekksum og CRC for hånd`,String.raw`finne $d_{min}$, antall bitfeil som kan rettes, og dekode med minimumsavstand`],
sections:[
{id:'amc',title:'AMC: tilpass deg kanalen',html:String.raw`
<div class="why"><b>Hvorfor?</b><p>Kanalen endrer seg hele tiden. Velger du én fast modulasjon, må du velge noe som tåler den verste situasjonen, og da kaster du kapasitet på gode dager. Tanken bak <b>AMC</b> er å se på kanalen hele tiden og tilpasse seg den.</p></div>
<p><b>Kanalkoding</b> legger til ekstra bit så mottakeren kan rette feil. <b>Koderaten</b> er andelen nyttige bit:</p>
$$\text{koderate}=\frac{\text{databit}}{\text{totale bit}}$$
<p>Koderate 3/4 betyr at hvert fjerde bit er beskyttelse. <b>Lav koderate gir mye beskyttelse</b>, og det er lett å bytte om.</p>
<div class="ana"><b>Analogi: Bokstavering på telefonen</b><p>Over en dårlig linje sier du «N som i Nils». Du bruker flere ord for å få fram én bokstav. Det er lav koderate: mye av det du sier, er ekstra, men budskapet overlever støyen.</p></div>
<p>AMC justerer begge deler. God kanal: høy modulasjon og høy koderate. Dårlig kanal: lav modulasjon og lav koderate. For å gjøre det trenger senderen <b>CSI</b>, altså kunnskap om tilstanden til kanalen.</p>
<div class="ana"><b>Analogi: Fart etter føret</b><p>På tørr vei kjører du 80, og i snøstorm kjører du 40. Kjørte du alltid 40, ville du kastet bort tid på alle gode dager. AMC gjør det samme: høy modulasjon og lite ekstra når kanalen er god, forsiktig og med mye beskyttelse når den er dårlig. CSI er at du ser ut av frontruten.</p></div>
<h3>Slik gjør LTE det</h3>
<p>Terminalen måler kanalen og rapporterer en <b>CQI</b> fra 1 til 15. Basestasjonen slår opp modulasjon og koding i en tabell.</p>
[[w:amc]]
<p><b>Spektraleffektivitet</b> er nyttige bit per sekund per Hz: bit per symbol ganger koderate. For CQI 15 med 256-QAM og koderate 948/1024:</p>
$$\eta=8\cdot\frac{948}{1024}=7{,}4063\ \text{bit/s/Hz}$$
<h3>Utfordringer</h3>
<ul><li>Endrer kanalen seg raskere enn målingen, velges feil modus.</li><li>Feil kanalestimat gir feil rate eller feil effekt.</li><li>Høy kompleksitet.</li></ul>
<div class="exam"><b>Eksamen 2025, Wi-Fi 2d</b><p>SNR faller og AMC skal reagere: bytt til lavere modulasjon (QPSK, BPSK) og lavere koderate (1/2). Avveiningen er høyere pålitelighet mot lavere datarate.</p></div>`,
quiz:[
{t:'num',q:'CQI 7: 64-QAM med koderate 466/1024. Finn spektraleffektiviteten.',a:2.73,tol:.01,u:'bit/s/Hz',e:'<b>Formel:</b> $\\eta=\\log_2M\\cdot R_c$. <b>Utregning:</b> $\\log_264=6$. $\\eta=6\\cdot\\dfrac{466}{1024}=6\\cdot0{,}455=2{,}73$ bit/s/Hz.'},
{t:'num',q:'En kanal på 10 MHz bruker CQI 11 med $\\eta=5{,}1152$ bit/s/Hz. Hva er raten?',a:51.2,tol:.01,u:'Mbps',e:'<b>Formel:</b> $R=\\eta\\cdot B$. <b>Utregning:</b> $5{,}1152\\cdot10$ MHz $=51{,}15$ Mbps $\\approx51{,}2$ Mbps.'},
{t:'mc',q:'SNR faller. Hva gjør AMC?',o:['Senker modulasjonsordenen og koderaten','Øker modulasjonsordenen og koderaten','Senker modulasjonen, men øker koderaten','Bytter til høyere frekvens'],a:0,e:'Mer robust modulasjon og mer redundans.'},
{t:'ref',q:'Hvorfor er AMC vanskelig på et tog i høy fart?',m:'Kanalen endrer seg raskt, så målingen er utdatert før den brukes. Da velger basestasjonen feil modulasjon: for aggressiv gir feil, for forsiktig gir lav rate.',k:['Kanalen endrer seg raskere enn målingen','Rapportert CQI er utdatert','Valgt rate blir feil']}
]},
{id:'mimo',title:'Diversitet og MIMO',html:String.raw`
<div class="why"><b>Hovedidéen</b><p>Fading er en tilfeldig uflaks. Er uflaksen uavhengig på to kanaler, er det svært usannsynlig at begge er dårlige samtidig. <b>Diversitet</b> bygger på akkurat dette: send samme informasjon over kanaler som fader uavhengig.</p></div>
<div class="ana"><b>Analogi: To kolleger til samme møte</b><p>Sender du to kolleger med hvert sitt tog, kommer minst én fram med mindre begge togene blir stående. Med samme tog hjelper det ikke, for da rammer forsinkelsen begge. Diversitet virker bare når kanalene fader uavhengig.</p></div>
<div class="tw"><table><tr><th>Type</th><th>Hva</th><th>Mot</th></tr><tr><td>Frekvens</td><td>Samme signal på flere frekvenser</td><td>Frekvensselektiv fading</td></tr><tr><td>Tid</td><td>Samme data til ulik tid</td><td>Tidsvarierende fading</td></tr><tr><td>Rom</td><td>Flere antenner</td><td>Fading generelt</td></tr></table></div>
[[w:diversity]]
<h3>MIMO</h3>
<p><b>MIMO</b> betyr flere antenner på sender og mottaker. $M\times N$ MIMO har $M$ sendeantenner og $N$ mottakerantenner. Det samme antennesettet kan brukes til tre ulike mål:</p>
<div class="ana"><b>Analogi: Tre venner med megafon</b><p>Tre venner kan rope det samme fra ulike steder, slik at du hører minst én (diversitet). De kan rope hver sin setning, slik at du får tre setninger samtidig (romlig multipleksing). Eller de kan rope helt i takt, slik at stemmene forsterker hverandre akkurat der du står (beamforming). Samme folk, tre formål.</p></div>
<div class="tw"><table><tr><th>Bruk</th><th>Hva sendes</th><th>Gevinst</th></tr><tr><td><b>Romlig diversitet</b></td><td>Samme signal over uavhengige veier</td><td>Pålitelighet</td></tr><tr><td><b>Romlig multipleksing</b></td><td>Ulike delstrømmer på ulike antenner</td><td>Datarate</td></tr><tr><td><b>Beamforming</b></td><td>Samme signal, koordinert i fase mot mottakeren</td><td>Rekkevidde, mindre interferens</td></tr></table></div>
<p>Merk det som overrasker: flerveis hjelper MIMO. Forskjellige veier er det som gjør at strømmene kan skilles. Fienden fra modul 1 er blitt en ressurs.</p>
<div class="ana"><b>Analogi: Stemmer fra hvert sitt hjørne</b><p>Du skiller to personer som snakker samtidig fordi stemmene treffer de to ørene dine ulikt. Står de på samme sted, klarer du det ikke. Flerveis gir hver strøm sitt eget fingeravtrykk ved mottakeren, og det er det som gjør at strømmene kan skilles.</p></div>
<p>På eksamen dukker MIMO opp i datarateformelen for Wi-Fi: 2 romlige strømmer dobler raten. Eksamen 2024 spurte hvilken teknologi som er avgjørende for høye rater i 5G. Svaret var MIMO.</p>`,
quiz:[
{t:'mc',q:'Du vil doble dataraten med to antenner. Hvilken MIMO-funksjon bruker du?',o:['Romlig multipleksing','Romlig diversitet','Beamforming','Frekvensdiversitet'],a:0,e:'Parallelle strømmer gir høyere rate.'},
{t:'mc',y:'2024',q:'Which of the following technologies is crucial for achieving the high data rates promised by 5G?',o:['Multiple Input Multiple Output (MIMO)','Frequency Hopping Spread Spectrum (FHSS)','Time Division Multiplexing (TDM)','Circuit switching'],a:0},
{t:'num',q:'Sannsynligheten for dyp fade på én antenne er 5 %. Antennene er uavhengige. Hva er sannsynligheten for at alle tre fader samtidig? Svar i prosent.',a:.0125,tol:.01,u:'%',e:'<b>Formel:</b> Uavhengige hendelser: $P=p^n$. <b>Utregning:</b> $0{,}05^3=0{,}000125=0{,}0125\\,\\%$. Dette er kraften i diversitet.'},
{t:'ref',q:'Hvorfor må antennene i et MIMO-system stå et stykke fra hverandre for å gi diversitet?',m:'Diversitet krever at kanalene fader uavhengig. Antenner tett på hverandre ser nesten samme kanal og fader samtidig. Med avstand, typisk minst en halv bølgelengde, blir veiene forskjellige.',k:['Diversitet krever uavhengig fading','Tette antenner ser samme kanal','Avstand gir ulike veier']}
]},
{id:'ss',title:'Spredt spektrum',html:String.raw`
<p><b>Spredt spektrum</b> virker unaturlig: vi bruker med vilje langt mer båndbredde enn vi trenger. Gevinsten er at et smalt problem, som en fade eller en forstyrrer, bare treffer en liten del av signalet.</p>
<div class="ana"><b>Analogi: Eggene i flere kurver</b><p>Har du alle eggene i én kurv, mister du alt hvis noen tråkker på den. Fordeler du dem på mange kurver, er en ulykke bare en liten skade. En smal fade eller forstyrrer treffer bare en liten del av et bredt signal.</p></div>
<h3>DSSS: gang med en rask kode</h3>
<p>I <b>DSSS</b> XOR-es hvert databit med en rask pseudotilfeldig <b>chipping-sekvens</b>. Hvert bit blir mange chips, så båndbredden vokser. Mottakeren XOR-er med samme kode og får tilbake dataene. En feil chip kan rettes, fordi flertallet av chipsene fortsatt stemmer.</p>
<div class="ana"><b>Analogi: Avstemningen</b><p>Hvert bit blir sendt som en komité på mange chips som alle skal stemme likt. Blir noen få stemmer forvansket underveis, vinner flertallet likevel. Du betaler med mer båndbredde og får igjen robusthet.</p></div>
[[w:dsss]]
<h3>FHSS: hopp rundt</h3>
<p>I <b>FHSS</b> hopper senderen mellom frekvenser etter et pseudotilfeldig mønster begge kjenner. Treffer du en dårlig frekvens, er du snart ute av den igjen.</p>
<div class="ana"><b>Analogi: Samtalen som bytter rom</b><p>To venner bytter rom etter en hemmelig liste. Er det bråk i ett rom, varer det bare til neste bytte. Den som ikke kjenner listen, hører bare biter av samtalen.</p></div>
<ul><li><b>Langsom hopping:</b> flere symboler per hopp.</li><li><b>Rask hopping:</b> flere hopp per symbol.</li></ul>
[[w:fhss]]
<div class="ex"><b>Eksamen 2024, oppgave 1</b><p>$R=2$ Mbps, 16-QAM, hopptid 400 µs.</p><p>4 bit per symbol gir symbolrate $2\cdot10^6/4=5\cdot10^5$ symboler/s.</p><p>Symboltid $T_s=1/5\cdot10^5=2$ µs.</p><p>$T_s\ll T_{hop}$: $400/2=200$ symboler per hopp, altså <b>langsom hopping</b>.</p></div>
<h3>FHSS eller DSSS?</h3>
<div class="tw"><table><tr><th></th><th>FHSS</th><th>DSSS</th></tr><tr><td>Kompleksitet</td><td>Enkel</td><td>Kompleks</td></tr><tr><td>Spektrum om gangen</td><td>Liten del</td><td>Hele bredden</td></tr><tr><td>Robusthet</td><td>Begrenser skaden til kort tid</td><td>Mer robust mot interferens</td></tr><tr><td>Sikkerhet</td><td>Lettere å oppdage</td><td>Sikrere</td></tr><tr><td>Effektbruk</td><td>Lavt</td><td>Høyere</td></tr></table></div>
<div class="exam"><b>Eksamen 2023</b><p>Hvorfor bruker Bluetooth FHSS og ikke DSSS? Lavt effektforbruk: FHSS er mindre kompleks. Senderen bytter bare kanal, mens DSSS må behandle selve signalet.</p></div>`,
quiz:[
{t:'num',q:'R = 2 Mbps, 16-QAM, hopptid 400 µs. Hvor mange symboler sendes per hopp?',a:200,tol:0,e:'<b>Formel:</b> $R_s=R/\\log_2M$, $T_s=1/R_s$, symboler per hopp $=T_{hop}/T_s$. <b>Utregning:</b> $R_s=\\dfrac{2\\cdot10^6}{4}=5\\cdot10^5$ symb/s. $T_s=2$ µs. $400/2=200$.'},
{t:'mc',q:'Systemet sender 1 symbol over 3 hopp. Hva slags hopping er det?',o:['Rask hopping','Langsom hopping'],a:0,e:'Flere hopp per symbol.'},
{t:'num',q:'En DSSS-kode har 11 chips per bit. Dataraten er 1 Mbps. Hva er chipraten?',a:11,tol:0,u:'Mchip/s',e:'<b>Formel:</b> chiprate $=$ chips per bit $\\cdot$ datarate. <b>Utregning:</b> $11\\cdot1$ Mbps $=11$ Mchip/s.'},
{t:'ref',y:'2024',q:'How can FHSS help reduce the effect of frequency selective fading?',m:'Frequency selective fading hits specific frequency ranges. By hopping over many frequencies, the transmission never stays in a range with a deep fade. Only a small part of the time is lost, and error coding can correct that.',k:['Selective fading hits specific frequencies','Hopping spreads the transmission over many frequencies','The damage is limited to a short time']},
{t:'ref',y:'2023',q:'Why does Bluetooth use FHSS and not DSSS?',m:'Bluetooth was meant to use as little power as possible. FHSS is less complex and less power-hungry. The transmitter only changes channel, while DSSS has to process the whole output signal.',k:['The goal is low power consumption','FHSS is simpler','DSSS requires processing of the signal']}
]},
{id:'deteksjon',title:'Feildeteksjon: paritet, sjekksum, CRC',html:String.raw`
<p>Feil vil alltid skje. Grunntanken bak all feilkontroll er å legge til ekstra informasjon som må stemme med dataene. Tre metoder med stigende styrke:</p>
<h3>Enkel paritet</h3>
<p>Legg til et <b>paritetsbit</b> slik at antall enere blir partall (even parity). 0111000110101011 har 9 enere, så paritetsbitet blir 1.</p>
<p>Svakhet: to feil oppheves. Metoden oppdager alle odde antall bitfeil, men ingen like.</p>
<div class="ana"><b>Analogi: Partall på bussen</b><p>Sjåføren husker bare om antall passasjerer var partall. Går én person av, stemmer det ikke lenger. Går to av, er det fortsatt partall, og sjåføren merker ingenting. Derfor ser enkel paritet bare et odde antall feil.</p></div>
<h3>Todimensjonal paritet</h3>
<p>Legg dataene i rader og kolonner, og beregn paritet for hver. En enkelt feil gir nøyaktig én rad og én kolonne som feiler, og krysningspunktet viser hvor den er. Altså kan den også <b>rette</b> enkeltfeil.</p>
<div class="ana"><b>Analogi: Regnearket med summer</b><p>Har du summer for hver rad og kolonne, gir ett feil tall én rad og én kolonne som ikke stemmer. Krysningspunktet peker rett på feilen. Derfor kan du rette i tillegg til å oppdage.</p></div>
[[w:parity2d]]
<p>Prøv de fire tilfellene fra forelesningen:</p>
<div class="tw"><table><tr><th>Tilfelle</th><th>Feil</th><th>Pariteter berørt</th><th>Resultat</th></tr><tr><td>A</td><td>1</td><td>2</td><td>Oppdaget og rettet</td></tr><tr><td>B</td><td>2 (samme rad)</td><td>2</td><td>Oppdaget, ikke rettet</td></tr><tr><td>C</td><td>3</td><td>4</td><td>Oppdaget, ikke rettet</td></tr><tr><td>D</td><td>4 (rektangel)</td><td>0</td><td><b>Ikke oppdaget</b></td></tr></table></div>
<h3>Sjekksum</h3>
<p><b>Sjekksum</b> brukes for eksempel i IP og TCP. Fremgangsmåten:</p>
<ol><li>Del dataene i seksjoner på $n$ bit.</li><li>Legg sammen. Overflow legges til nederst (bæres rundt).</li><li>Ta enerkomplementet, altså bytt 0 og 1.</li><li>Send det med dataene. Mottaker summerer alt og skal få bare enere.</li></ol>
[[w:checksum]]
<p>Svakhet: endrer du samme bitposisjon i to seksjoner med motsatte verdier, er summen uendret.</p>
<div class="ana"><b>Analogi: Pengebunten</b><p>På banderolen står summen av sedlene. Teller du og får noe annet, mangler det noe. Men hvis én seddel er 100 for mye og en annen 100 for lite, stemmer summen likevel. Det er sjekksummens blinde flekk.</p></div>
<h3>CRC</h3>
<p><b>CRC</b> er en binær divisjon med XOR i stedet for subtraksjon:</p>
<div class="ana"><b>Analogi: Kontrollsifferet i kontonummeret</b><p>Det siste sifferet i kontonummeret ditt er regnet ut som en rest etter divisjon. Skriver du feil siffer, blir resten feil, og nettbanken sier fra før pengene går. CRC bruker samme idé: nesten alle feil endrer resten, fordi hver bit påvirker hele divisjonen.</p></div>
<ol><li>Divisoren har $n$ bit. Legg til $n-1$ nuller bak dataordet.</li><li>Del med divisoren. Resten er CRC.</li><li>Kodeord = dataord + CRC.</li><li>Mottakeren deler kodeordet med samme divisor. Rest 0 betyr ingen feil.</li></ol>
[[w:crc]]
<div class="tw"><table><tr><th>Metode</th><th>Kompleksitet</th><th>Styrke</th></tr><tr><td>Paritet</td><td>Svært enkel</td><td>Lurt av to feil. Fint for små rammer</td></tr><tr><td>Sjekksum</td><td>Enkel</td><td>Sterkere enn paritet</td></tr><tr><td>CRC</td><td>Mest komplisert</td><td>Sterkest. IEEE 802 bruker CRC-32</td></tr></table></div>`,
quiz:[
{t:'mc',y:'2023',fix:1,q:'When it comes to error detection:',o:['Single parity check cannot detect errors when two bits are flipped.','CRC is less powerful than checksum but also less complex.','CRC and checksum have the same complexity level.','Parity check has the same complexity as checksum.'],a:0,e:'Two errors leave the parity unchanged.'},
{t:'num',q:'Dataord 1001, divisor 1011. Hvor mange bit lang er CRC-en?',a:3,tol:0,u:'bit',e:'<b>Formel:</b> CRC-lengde $=$ antall bit i divisoren $-1$. <b>Utregning:</b> Divisoren 1011 har 4 bit. $4-1=3$ bit.'},
{t:'ref',q:'Regn CRC for dataordet 1001 med divisor 1011. Vis stegene.',m:'Utvidet: 1001000. 1001 XOR 1011 = 0010. Trekk ned: 0100, ledende 0 hopper over; 1000 XOR 1011 = 0011; trekk ned siste 0: 0110. Rest 110. Kodeord: 1001110. Sjekk gjerne i CRC-figuren.',k:['Legger til 3 nuller','Bruker XOR i hvert steg','Rest 110, kodeord 1001110']},
{t:'num',q:'Regn sjekksummen av de 8-bits seksjonene 11110000 og 00001111. Svar som desimaltall.',a:0,tol:0,e:'<b>Formel:</b> sjekksum $=$ komplementet av summen av seksjonene. <b>Utregning:</b> $11110000+00001111=11111111$. Komplementet er $00000000$, altså 0.'},
{t:'mc',q:'4 feil i et rektangel i todimensjonal paritet. Hva skjer?',o:['Feilene oppdages ikke','Feilene oppdages og rettes','Feilene oppdages, men kan ikke rettes','Alle rader feiler'],a:0,e:'Hver rad og kolonne har to feil, så alle pariteter stemmer.'},
{t:'ref',q:'Hvorfor kan enkel paritet bare oppdage, mens todimensjonal paritet også kan rette en feil?',m:'Enkel paritet gir én opplysning: noe er galt. Todimensjonal paritet gir to opplysninger: hvilken rad og hvilken kolonne. Sammen peker de på nøyaktig ett bit, og et bit har bare to verdier, så det kan snus tilbake.',k:['Enkel paritet viser ikke hvor feilen er','Rad og kolonne gir posisjonen','Vet du posisjonen, kan du snu bitet']}
]},
{id:'korreksjon',title:'Feilretting: FEC og Hamming-avstand',html:String.raw`
<p>Oppdager vi en feil, har vi to valg:</p>
<ul><li><b>BEC</b> (Backward Error Correction): be om ny sending. Billig i ekstra bit, men dyrt i tid.</li><li><b>FEC</b> (Forward Error Correction): legg til nok redundans til at mottakeren retter selv.</li></ul>
<div class="ana"><b>Analogi: «Hva sa du?» eller gjett fra sammenhengen</b><p>På telefonen kan du spørre om igjen (BEC). Det er billig, men koster tid. En tekstmelding med skrivefeil forstår du uten å spørre, fordi språket har innebygd redundans (FEC). Snakker du med en romsonde, må du velge det siste, for svaret tar timer.</p></div>
<p>Retransmisjon passer dårlig når:</p>
<ul><li>det gjelder multimedia i sanntid,</li><li>linken ikke er toveis, for eksempel HDTV,</li><li>BER er høy, slik at retransmisjoner tar over,</li><li>forsinkelsen er høy, for eksempel satellitt.</li></ul>
<p>FEC trenger ikke returkanal og kan brukes ved kringkasting. Men deteksjon + retransmisjon er billigere enn korreksjon når feil er sjeldne. Derfor kombinerer ekte systemer dem i <b>HARQ</b> (LTE og 5G). Har rammen for mange feil, må den sendes på nytt uansett.</p>
<div class="ana"><b>Analogi: Prøv å tyde først</b><p>Du prøver å tyde et utydelig ord selv, og spør om igjen bare hvis det er helt uleselig. Da slipper du både å spørre hele tiden og å skrive alt tre ganger. Det er HARQ.</p></div>
<h3>Kodebøker og Hamming-avstand</h3>
<p>En FEC-kode er en kodebok som gjør $k$ databit om til $n$ bit <b>kodeord</b>, $n>k$. Koderate $r=k/n$.</p>
<p>Tenk geometrisk: bare noen få av alle mulige bitmønstre er gyldige. Mottar du et ugyldig mønster, antar du at det nærmeste gyldige var det som ble sendt. <b>Hamming-avstanden</b> er antall posisjoner der to ord er ulike:</p>
<p class="mono">v1 = 011011, v2 = 110001, XOR = 101010, d = 3</p>
<p>Koden er ikke sterkere enn de to kodeordene som ligger nærmest hverandre, så det avgjørende tallet er $d_{min}$:</p>
$$\text{oppdager }d_{min}-1\text{ feil}\qquad\text{retter }t=\left\lfloor\frac{d_{min}-1}{2}\right\rfloor\text{ feil}$$
<p>Hvorfor halve? Ligger to kodeord 3 fra hverandre, er det 1 skritt fra hvert til midten. Et ord 1 feil unna er fortsatt nærmest sin rette eier. 2 feil unna er det nærmest den andre.</p>
<div class="ana"><b>Analogi: Byene på kartet</b><p>Gyldige kodeord er byer som ligger langt fra hverandre. En bitfeil flytter deg ett skritt, og du går til nærmeste by. Så lenge du er under halvveis mellom to byer, havner du riktig. Derfor retter en kode feil opp til halve avstanden, og det er de to nærmeste byene som bestemmer.</p></div>
<p>Redundans er det du betaler: $(n-k)/k$. Vi vil ha stor $d_{min}$ og lav redundans.</p>
<div class="ex"><b>Forelesning: hvilken kode er best?</b><p>Kode 1: (5,2), $d_{min}=3$, redundans 3/2. Kode 2: (3,1), $d_{min}=3$, redundans 2. Samme beskyttelse, men kode 1 er billigere, så den er bedre.</p></div>
[[w:hamming]]
<div class="exam"><b>Eksamen 2022 og 2023</b><p>Metoden er alltid den samme: regn alle seks parvise avstander, velg koden med størst $d_{min}$, og regn avstanden fra mottatt ord til alle fire kodeord. Er to like nære, kan ordet ikke dekodes. Prøv 00111 i figuren.</p></div>
<div class="trap"><b>Felle</b><p>FEC reduserer feil, men fjerner dem ikke. Moderne systemer bruker Turbo-, LDPC- og Polar-koder, men avveiningen er den samme: bedre vern krever mer redundans og gir lavere throughput.</p></div>`,
quiz:[
{t:'num',q:'Hamming-avstand mellom 10101 og 01011?',a:4,tol:0,e:'<b>Formel:</b> Hamming-avstand $=$ antall enere i XOR av ordene. <b>Utregning:</b> $10101\\oplus01011=11110$, som har 4 enere.'},
{t:'num',q:'En kode har $d_{min}=7$. Hvor mange bitfeil kan den rette?',a:3,tol:0,e:'<b>Formel:</b> $t=\\lfloor(d_{min}-1)/2\\rfloor$. <b>Utregning:</b> $\\lfloor(7-1)/2\\rfloor=3$.'},
{t:'num',q:'En kode har $d_{min}=4$. Hvor mange bitfeil kan den rette?',a:1,tol:0,e:'<b>Formel:</b> $t=\\lfloor(d_{min}-1)/2\\rfloor$. <b>Utregning:</b> $\\lfloor(4-1)/2\\rfloor=\\lfloor1{,}5\\rfloor=1$.'},
{t:'num',q:'En (7,4)-kode: hva er koderaten?',a:.571,tol:.01,e:'<b>Formel:</b> $R_c=k/n$ for en $(n,k)$-kode. <b>Utregning:</b> $4/7=0{,}571$.'},
{t:'mc',y:'2023',q:'Scheme 1: 00000, 01011, 10101, 11110. 00111 is received. What happens?',o:['It cannot be decoded, because two codewords are equally close','It is decoded to 00000','It is decoded to 01011','It is decoded to 11110'],a:0,e:'<b>Formula:</b> Decode to the codeword with the smallest Hamming distance (number of ones in the XOR). <b>Calculation:</b> To 00000: 3. To 01011: $00111\\oplus01011=01100$, so 2. To 10101: $10010$, so 2. To 11110: $11001$, so 3. Two codewords tie at 2, so the word cannot be decoded.'},
{t:'ref',y:'2023',q:'Give two reasons why backward error correction may not be suitable in wireless transmissions.',m:'Two of these: real-time multimedia cannot tolerate the waiting time; the link is not two-way (HDTV); a high BER gives very many retransmissions; high delay, as on satellite links.',k:['Gives at least two valid reasons','The reasons are briefly explained']},
{t:'ref',y:'2022',q:'What is the difference between FEC and re-transmission?',m:'FEC adds redundancy so the receiver can both detect and correct common errors. With re-transmission the error is detected but not corrected, and the sender must send the data again.',k:['FEC: the receiver corrects by itself','Re-transmission: the error is detected and the sender sends again']}
]},
{id:'eks',title:'Eksamensoppgaver',quizTitle:'Som på eksamen',html:String.raw`<p>Regn alle avstander for hånd. Kontroller svaret i figuren over etterpå.</p>`,
quiz:[
{t:'ex',y:'2023',pts:4,q:'Scheme 1: 00000, 01011, 10101, 11110. Scheme 2: 00000, 00011, 01100, 11011.<br>i) Which scheme has better performance for error correction? [2p]<br>ii) Invalid codeword v = 00111 is received. How is it decoded with scheme 1? [2p]',s:String.raw`<p>i) The Hamming distance is the number of positions where two codewords differ. Compare all six pairs. Scheme 1: distances 3, 3, 4, 4, 3, 3, so $d_{min}=3$. Scheme 2: 2, 2, 4, 4, 2, 4, so $d_{min}=2$. A code corrects $t=\lfloor(d_{min}-1)/2\rfloor$ errors: scheme 1 corrects 1, scheme 2 corrects 0. Scheme 1 is better.</p><p>ii) Decode to the closest codeword. $d(v,v_1)=3$, $d(v,v_2)=2$, $d(v,v_3)=2$, $d(v,v_4)=3$. Two codewords are equally close, so v cannot be decoded.</p>`},
{t:'ex',y:'2024',pts:10,q:'A system transmits with R = 2 Mbps using 16-QAM and FHSS with hop time 400 µs.<br>a) How can FHSS help reduce the effect of frequency selective fading? [4p]<br>b) Calculate the symbol rate and symbol transmission time. [4p]<br>c) Fast or slow frequency hopping? [2p]',s:String.raw`<p>a) Selective fading hits specific frequencies. Hopping over a wide range means the transmission never stays in a deep fade.</p><p>b) $R_s=R/\log_2M=2\cdot10^6/\log_216=2\cdot10^6/4=5\cdot10^5$ symbols/s. $T_s=1/R_s=2$ µs.</p><p>c) Symbols per hop: $T_{hop}/T_s=400/2=200$. $T_s\ll T_{hop}$, so this is slow hopping.</p>`}
]}
]});

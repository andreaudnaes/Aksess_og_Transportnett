C.add({id:'m1',nr:1,part:'wl',short:'Trådløs overføring I',src:'Forelesning 1 · Stallings 2.1–2.4, 5.1–5.3, 5.5 · Schiller 2.3, 2.4, 2.6',
title:'Trådløs overføring I: hva skjer med et radiosignal?',
lead:String.raw`Radio er gratis å legge ut, men et elendig medium. Her lærer du hvor grensene går for hva en kanal kan bære, hva luften gjør med signalet, og hvordan vi pakker bit inn i bølger.`,
goals:[String.raw`regne med Nyquist, Shannon og frittromstap`,String.raw`skille refleksjon, refraksjon, diffraksjon, spredning og skyggelegging`,String.raw`avgjøre om en kanal har rask eller langsom fading, og flat eller frekvensselektiv fading`,String.raw`lese konstellasjonsdiagram og velge modulasjon etter kanalkvalitet`],
sections:[
{id:'rf',title:'Radiofrekvenser og antenner',html:String.raw`
<p><b>Radiofrekvens</b> er elektromagnetiske bølger brukt til trådløs kommunikasjon. Valget av frekvens er det første en ingeniør må ta, fordi frekvensen styrer nesten alt annet:</p>
<div class="tw"><table><tr><th></th><th>Lav frekvens (lang $\lambda$)</th><th>Høy frekvens (kort $\lambda$)</th></tr><tr><td>Rekkevidde</td><td>Lang</td><td>Kort</td></tr><tr><td>Går gjennom vegger</td><td>Godt</td><td>Dårlig, blokkeres lett</td></tr><tr><td>Bøyer rundt hindringer</td><td>Ja</td><td>Trenger fri sikt</td></tr><tr><td>Antenne</td><td>Stor</td><td>Liten</td></tr><tr><td>Tilgjengelig båndbredde</td><td>Lite</td><td>Mye</td></tr></table></div>
<p>Derfor bruker 5G tre bånd (modul 5): lavbånd for dekning, midtbånd som kompromiss, og <b>mmWave</b> for ekstrem kapasitet over korte avstander.</p>
<div class="ana"><b>Analogi: Bassen fra naboen</b><p>Gjennom veggen hører du bassen fra naboens anlegg, ikke diskanten. Lave toner kommer gjennom og rundt ting, høye stopper opp. Slik er det med radio også: lave frekvenser når langt, men det er lite ledig plass der. Høye frekvenser har mye plass, men kort rekkevidde.</p></div>
[[w:lambda]]
<p><b>ISM-bånd</b> er lisensfrie frekvensbånd som 2,4 GHz. Alle kan bruke dem, derfor må enhetene tåle interferens fra hverandre. Wi-Fi og Bluetooth lever her. Et <b>frekvensbånd</b> er ellers et område satt av til et formål, for eksempel n78 i 5G.</p>
<div class="ana"><b>Analogi: Allmenningen</b><p>Et ISM-bånd er som en offentlig park. Alle kan bruke den uten å spørre, men ingen har rett på ro. Derfor må utstyr i ISM-bånd tåle at naboen er der også. Et lisensiert bånd er som et leid lokale der du selv bestemmer.</p></div>
<h3>Rekkevidde er tre ting</h3>
[[f:ranges|Tre ringer rundt en sender. Forskjellen mellom dem blir viktig i MAC-modulene, fordi en stasjon kan forstyrre uten at noen kan høre den.]]
<p>Innenfor overføringsrekkevidden kan du kommunisere. I deteksjonsrekkevidden kan du merke at noen sender, men ikke lese det. I interferensrekkevidden merkes signalet bare som økt bakgrunnsstøy. Rekkefølgen er: <b>overføring &lt; deteksjon &lt; interferens</b>.</p>
<div class="ana"><b>Analogi: Samtalen på kafeen</b><p>Ved nabobordet skjønner du hva folk sier. Lenger unna hører du at noen snakker, men ikke hva. Enda lenger unna er det bare en summing som gjør det litt vanskeligere å høre din egen samtale. Stemmen forstyrrer altså mye lenger enn den kan forstås.</p></div>
<h3>Antenner</h3>
<p>Antennen gjør elektriske signaler om til radiobølger og tilbake. Den tenkte <b>isotrope antennen</b> stråler likt i alle retninger og er referansen vi måler mot. En ekte antenne samler energien i noen retninger, og <b>antennegain</b> sier hvor mye sterkere den er i beste retning. Gain skaper ikke energi, den flytter den. Antennelengden er knyttet til bølgelengden: en <b>dipolantenne</b> er typisk $\lambda/2$, eller $\lambda/4$ på biltak.</p>
<div class="ana"><b>Analogi: Lommelykten</b><p>Samme batteri og samme pære, men reflektoren samler lyset i en kjegle. Det blir sterkere foran deg og mørkere ved siden av. Antennegain virker på samme måte: effekten blir flyttet, ikke skapt.</p></div>`,
quiz:[
{t:'num',y:'2024',q:'What is the wavelength of an electromagnetic wave with a frequency of 2.4 GHz? Answer in centimetres.',a:12.5,tol:.01,u:'cm',e:'<b>Formula:</b> $\\lambda=c/f$. <b>Calculation:</b> $\\lambda=\\dfrac{3\\cdot10^8}{2.4\\cdot10^9}=0.125$ m $=12.5$ cm.'},
{t:'num',q:'Lengden på en kvartbølgeantenne for 900 MHz, i cm?',a:8.33,tol:.02,u:'cm',e:'<b>Formel:</b> $\\lambda=c/f$, og antennen er $\\lambda/4$. <b>Utregning:</b> $\\lambda=\\dfrac{3\\cdot10^8}{9\\cdot10^8}=0{,}333$ m. $0{,}333/4=0{,}0833$ m $=8{,}33$ cm.'},
{t:'mc',q:'Hvorfor er mmWave dårlig innendørs når masten står utendørs?',o:['Kort bølgelengde gir dårlig gjennomtrenging, og signalet absorberes eller blokkeres','Det er for lite båndbredde','Antennene blir for store','mmWave ligger i ISM-båndet'],a:0,e:'Korte bølgelengder går dårlig gjennom hindringer og bøyer lite rundt dem.'},
{t:'mc',y:'2023',q:'The order of the ranges from smallest to largest is:',o:['Transmission < detection < interference','Interference < detection < transmission','Detection < transmission < interference','All are equally large in reality'],a:0,e:'In the 2023 exam you had to match R1, R2 and R3 to these.'},
{t:'ref',q:'En venn sier at en antenne med 10 dB gain «lager ti ganger mer effekt». Hva vil du svare?',m:'Antennen lager ingen ekstra effekt. Den samler effekten i en retning, så den er ti ganger sterkere der enn en isotrop antenne, og tilsvarende svakere i andre retninger.',k:['Gain samler energi i en retning','Gain måles mot en isotrop antenne','Total effekt øker ikke']}
]},
{id:'kapasitet',title:'Kanalkapasitet: Nyquist og Shannon',html:String.raw`
<div class="why"><b>Spørsmålet vi vil besvare</b><p>Gitt en kanal med båndbredde $B$: hvor mange bit per sekund kan den bære? <b>Kanalkapasitet</b> er det øvre taket. To formler besvarer spørsmålet under ulike antagelser, og det er vesentlig at du velger riktig.</p></div>
<h3>Nyquist: kanalen er støyfri</h3>
$$C=2B\log_2 M$$
<p>En kanal med båndbredde $B$ kan bære maks $2B$ symboler per sekund. Hvert symbol kan ha $M$ ulike verdier og bærer dermed $\log_2M$ bit. Flere nivåer gir flere bit, men de ligger tettere og tåler mindre støy.</p>
<div class="ana"><b>Analogi: Flaggsignaler</b><p>Du kan bare vifte med flagget $2B$ ganger i sekundet. For å si mer per vift må du ha flere flaggstillinger. Det virker fint i stille vær. Står stillingene tett, blir det derimot vanskelig for den andre å se forskjell, og det er der Shannon kommer inn.</p></div>
<div class="ex"><b>Eksamen 2025, MC 1</b><p>3 MHz, 16 nivåer: $C=2\cdot3\cdot10^6\cdot\log_216=2\cdot3\cdot4=24$ Mbps.</p></div>
<h3>Shannon: kanalen har støy</h3>
$$C=B\log_2(1+SNR)$$
<p>Shannon sier at uansett hvor smart du koder, kan du ikke sende feilfritt over denne raten. <b>SNR</b> er forholdet mellom signaleffekt og støyeffekt:</p>
$$SNR_{dB}=10\log_{10}\frac{\text{signaleffekt}}{\text{støyeffekt}}$$
<div class="ex"><b>Forelesningseksempel</b><p>Kanal 3–4 MHz, SNR 24 dB. $B=1$ MHz. $SNR=10^{2{,}4}\approx251$. $C=10^6\log_2(252)\approx8$ Mbps.</p></div>
<div class="ex"><b>Eksamen 2024, MC 10</b><p>$B=300$ Hz, SNR 3 dB. Lineært er det 2. $C=300\log_2(3)\approx475$ bit/s.</p></div>
<div class="trap"><b>Felle</b><p>SNR skal være lineær i formelen. Setter du inn 24 i stedet for 251, blir svaret helt feil. Får du et stort SNR-tall i dB, gjør om først.</p></div>
<h3>Hvordan skal du regne $\log_2$?</h3>
<p>Bruk $\log_2x=\dfrac{\log_{10}x}{0{,}301}$, eller kjenn potenser av 2. En rask kontroll: når SNR er stor, er $\log_2(1+SNR)$ omtrent $SNR_{dB}/3$. For 24 dB gir det 8.</p>
[[w:capacity]]
<p>Forstå hva grafen sier: å doble $B$ dobler $C$, mens å doble effekten (+3 dB) bare gir rundt én ekstra bit/s/Hz. <b>Båndbredde er derfor mer verdifull enn effekt.</b> Det er en hovedgrunn til at nye generasjoner søker høyere frekvenser. Formelen forutsetter hvit støy, så ekte kanaler ligger under.</p>
<div class="ana"><b>Analogi: To samtaler i et bråkete rom</b><p>Får du en ekstra telefonlinje, kan du si dobbelt så mye. Roper du dobbelt så høyt på én linje, blir du bare litt lettere å forstå. Båndbredde legger til nye linjer, mens effekt bare gjør den ene linjen litt klarere. Derfor vokser $C$ rett med $B$, men bare logaritmisk med SNR.</p></div>`,
quiz:[
{t:'num',y:'2023',q:'Noise-free channel, bandwidth 8 MHz, 16 different signal values. Maximum bit rate?',a:64,tol:0,u:'Mbps',e:'<b>Formula:</b> Nyquist (noise-free channel): $C=2B\\log_2M$. <b>Calculation:</b> $\\log_216=4$. $C=2\\cdot8\\cdot4=64$ Mbps.'},
{t:'num',y:'2024',q:'Maximum data capacity of a channel with 300 Hz bandwidth and SNR 3 dB?',a:475,tol:.01,u:'bit/s',e:'<b>Formula:</b> Shannon: $C=B\\log_2(1+SNR)$ with linear $SNR=10^{dB/10}$. <b>Calculation:</b> $SNR=10^{0.3}\\approx2$. $C=300\\cdot\\log_2(3)=300\\cdot1.585\\approx475$ bit/s.'},
{t:'num',q:'Kanal med $B=20$ MHz og SNR 30 dB. Finn Shannon-kapasiteten.',a:199.3,tol:.01,u:'Mbps',e:'<b>Formel:</b> Shannon: $C=B\\log_2(1+SNR)$ med lineær $SNR=10^{dB/10}$. <b>Utregning:</b> $SNR=10^{3}=1000$. $C=20\\cdot\\log_2(1001)=20\\cdot9{,}967\\approx199{,}3$ Mbps.',h:'$\\log_2(1001)\\approx9{,}97$.'},
{t:'num',q:'Du vil oppnå 10 Mbps over 2 MHz. Hvilken SNR i dB trengs minst?',a:14.9,tol:.02,u:'dB',e:'<b>Formel:</b> Shannon løst for SNR: $SNR=2^{C/B}-1$. <b>Utregning:</b> $C/B=10/2=5$. $SNR=2^5-1=31$. $10\\log_{10}31=14{,}9$ dB.'},
{t:'mc',q:'En kanal har Shannon-kapasitet 8 Mbps og Nyquist-kapasitet 16 Mbps med valgt $M$. Hva er reell øvre grense?',o:['8 Mbps','16 Mbps','24 Mbps','12 Mbps'],a:0,e:'<b>Formel:</b> reell grense $=\\min(C_{Shannon},C_{Nyquist})$. <b>Utregning:</b> $\\min(8,16)=8$ Mbps. Her er støyen flaskehalsen.'},
{t:'ref',q:'Hvorfor kan du ikke øke $M$ i Nyquist-formelen i det uendelige for å få høyere datarate?',m:'Med flere nivåer ligger symbolene tettere, så en gitt støy gjør det umulig å skille dem. Shannon setter et tak som bare avhenger av båndbredde og SNR. Nyquist antar støyfri kanal og gjelder ikke alene.',k:['Flere nivåer ligger tettere','Støy gjør at de ikke kan skilles','Shannon setter et tak ut fra SNR']}
]},
{id:'tap',title:'Attenuasjon og frittromstap',html:String.raw`
<p>Tenk på en lyspære i rommet. Lyset fordeler seg på en kule som blir stadig større. Overflaten vokser med $d^2$, så effekt per areal faller med $1/d^2$. Radiobølger oppfører seg likt. Dette kalles <b>banetap</b>.</p>
<div class="ana"><b>Analogi: Malingen på ballongen</b><p>Mal en flekk på en ballong og blås den opp. Mengden maling er den samme, men laget blir tynnere fordi det dekker en større flate. Radiobølger forsvinner ikke, men energien fordeles på en stadig større kuleflate. Derfor får mottakeren så lite.</p></div>
<h3>Frittromstap</h3>
<p>Med isotrope antenner er <b>frittromstapet</b>:</p>
$$\frac{P_t}{P_r}=\frac{(4\pi d)^2}{\lambda^2}=\frac{(4\pi fd)^2}{c^2}$$
<p>Med antenner som har gain $G_t$ og $G_r$:</p>
$$\frac{P_t}{P_r}=\frac{(4\pi d)^2}{G_rG_t\lambda^2}$$
<p>I dB blir ganging til addisjon:</p>
$$L_{dB}=20\log_{10}\frac{4\pi d}{\lambda}-G_{t,dB}-G_{r,dB}$$
<div class="ex"><b>Eksamen 2023: satellitt</b><p>$d=40\,000$ km, $f=10$ GHz, gain 44 og 48 dB. $\lambda=0{,}03$ m.</p><p>Isotropt tap: $20\log_{10}\dfrac{4\pi\cdot4\cdot10^7}{0{,}03}=204{,}48$ dB. Med antenner: $204{,}48-44-48=112{,}48$ dB.</p></div>
<div class="ex"><b>Eksamen 2022</b><p>$f=600$ MHz, $d=3$ km. $\lambda=0{,}5$ m. $L=(4\pi\cdot3000)^2/0{,}5^2\approx5{,}7\cdot10^9$, som er 97,5 dB.</p></div>
<p>Merk at formelen sier at høy frekvens gir mer tap. Det kommer av at en mottakerantenne for kort bølgelengde er mindre og fanger mindre energi, ikke at luften demper mer.</p>
<div class="ana"><b>Analogi: Den lille bøtta i regnet</b><p>Regnet er like tett overalt, men en liten bøtte fanger mindre enn en stor. Antenner for korte bølgelengder er små, så de fanger mindre av energien. Luften er ikke skyld i tapet.</p></div>
[[w:fspl]]
<h3>Virkeligheten: banetapseksponent</h3>
<p>I virkeligheten faller effekten raskere: $P_r\propto1/d^n$. <b>Banetapseksponenten</b> $n$ er målt empirisk:</p>
<div class="tw"><table><tr><th>Miljø</th><th>$n$</th></tr><tr><td>Fritt rom</td><td>2</td></tr><tr><td>By, cellulær radio</td><td>2,7–3,5</td></tr><tr><td>Skyggelagt by</td><td>3–5</td></tr><tr><td>Innendørs med fri sikt</td><td>1,6–1,8</td></tr><tr><td>Innendørs med hindringer</td><td>4–6</td></tr><tr><td>Fabrikk med hindringer</td><td>2–3</td></tr></table></div>
<p>Innendørs med fri sikt kan $n$ bli under 2, fordi korridorer og refleksjoner holder signalet samlet. Log-distance-modellen til Rappaport skriver dette i dB: $PL(d)=PL(d_0)+10n\log_{10}(d/d_0)$. Hver tidobling av avstanden koster $10n$ dB.</p>
<div class="ana"><b>Analogi: Rop i tunnel og i skog</b><p>I en tunnel holder veggene ropet samlet, og det bærer langt ($n<2$). På en åpen slette tynnes det bare ut av avstanden ($n=2$). I tett skog tar hvert tre litt av lyden i tillegg, så hver ekstra meter koster mer ($n>3$).</p></div>`,
quiz:[
{t:'num',y:'2022',q:'f = 600 MHz, d = 3 km. Find the free space path loss in dB.',a:97.5,tol:.01,u:'dB',e:'<b>Formula:</b> $\\lambda=c/f$ and $L_{dB}=20\\log_{10}\\dfrac{4\\pi d}{\\lambda}$. <b>Calculation:</b> $\\lambda=\\dfrac{3\\cdot10^8}{6\\cdot10^8}=0.5$ m. $\\dfrac{4\\pi\\cdot3000}{0.5}=75\\,398$. $20\\log_{10}(75\\,398)=97.5$ dB.'},
{t:'num',y:'2023',q:'Satellite 40 000 km away, antenna gains 44 dB and 48 dB, 10 GHz. Free space loss in dB?',a:112.48,tol:.005,u:'dB',e:'<b>Formula:</b> $L_{dB}=20\\log_{10}\\dfrac{4\\pi d}{\\lambda}-G_t-G_r$. <b>Calculation:</b> $\\lambda=\\dfrac{3\\cdot10^8}{10^{10}}=0.03$ m. $\\dfrac{4\\pi\\cdot4\\cdot10^7}{0.03}=1.676\\cdot10^{10}$, which is $204.48$ dB. $204.48-44-48=112.48$ dB.'},
{t:'num',q:'Du dobler avstanden i fritt rom. Hvor mange dB øker tapet?',a:6,tol:.02,u:'dB',e:'<b>Formel:</b> Fritt rom: $L\\propto d^2$, så $\\Delta L=20\\log_{10}(d_2/d_1)$. <b>Utregning:</b> $20\\log_{10}2=20\\cdot0{,}301\\approx6$ dB.'},
{t:'num',q:'I et miljø med $n=4$ øker avstanden fra 100 m til 1000 m. Hvor mange dB svakere blir signalet?',a:40,tol:0,u:'dB',e:'<b>Formel:</b> $\\Delta L=10\\,n\\log_{10}(d_2/d_1)$. <b>Utregning:</b> $10\\cdot4\\cdot\\log_{10}(1000/100)=40\\cdot1=40$ dB.'},
{t:'mc',q:'Hvilken påstand om frittromstap er riktig?',o:['Tapet øker med både frekvens og avstand','Tapet avhenger bare av avstand','Antennegain øker tapet','Tapet synker når frekvensen øker'],a:0,e:'$L\\propto(fd)^2$.'},
{t:'ref',q:'Hvorfor kan $n$ være lavere enn 2 i en korridor, når fritt rom gir nøyaktig 2?',m:'I fritt rom sprer energien seg på en stadig større kule. I en korridor styrer vegger og refleksjoner energien langs korridoren, så den spres mindre. Reflekterte bølger legger seg til den direkte og holder signalet sterkt.',k:['Fritt rom sprer energi i alle retninger','Vegger reflekterer energien tilbake','Korridoren virker som en bølgeleder']}
]},
{id:'hindringer',title:'Hva luften gjør: utbredelse og flerveis',html:String.raw`
<p>I tillegg til avstandstapet endres signalet av det det møter. Dette er pensum du må kunne ordrett, fordi eksamen spør om størrelsen på hindringen i forhold til $\lambda$.</p>
<div class="tw"><table><tr><th>Effekt</th><th>Skjer når</th><th>Huskeregel</th></tr>
<tr><td><b>Skyggelegging</b></td><td>Store hindringer blokkerer, for eksempel en murvegg</td><td>Skygge bak et hus</td></tr>
<tr><td><b>Refleksjon</b></td><td>Glatt flate <b>større</b> enn $\lambda$</td><td>Speil</td></tr>
<tr><td><b>Refraksjon</b></td><td>Passerer mellom medier med ulik tetthet, bøyes</td><td>Sugerør i vannglass</td></tr>
<tr><td><b>Spredning</b></td><td>Små objekter, <b>mindre</b> enn $\lambda$</td><td>Lys i tåke</td></tr>
<tr><td><b>Diffraksjon</b></td><td>Skarpe kanter på objekter <b>store</b> i forhold til $\lambda$</td><td>Lyd rundt hjørner</td></tr></table></div>
<div class="ana"><b>Analogi: Bølger i havna</b><p>Tenk på vannbølger. En stor glatt molo sender bølgen tilbake (refleksjon). En tynn stolpe gir små ringer til alle kanter (spredning). Ved enden av moloen bøyer bølgen seg inn rundt kanten (diffraksjon). Det avgjørende er hindringens størrelse i forhold til bølgen, ikke størrelsen i seg selv.</p></div>
<div class="exam"><b>Eksamen 2025, MC 4</b><p>«Scattering happens when the signal encounters small objects while diffraction happens when the signal encounters large objects (relative to the wavelength).» Riktig. Refleksjon og refraksjon var byttet om i de andre alternativene.</p></div>
<h3>Flerveisutbredelse og ISI</h3>
<p>Fordi signalet reflekteres, spres og bøyes, kommer det fram langs mange veier. Kopiene har ulik forsinkelse, fase og styrke. Det gir to problemer:</p>
<ol><li>Kopier i motfase slukker hverandre, noe som gir dype dykk i signalstyrken.</li><li><b>ISI</b>: en forsinket kopi av ett symbol kommer samtidig med neste symbol, og mottakeren får blandingen av to symboler.</li></ol>
<p>Tidsforskjellen mellom første og siste kopi er <b>delay spread</b>. ISI blir et problem når delay spread er stor i forhold til symboltiden.</p>
<div class="ana"><b>Analogi: Ekkoet i idrettshallen</b><p>I en hall med ekko må du snakke sakte. Snakker du fort, kommer ekkoet av forrige ord oppå det neste, og alt blir grøt. Hallen er like ekkoete uansett. Det er talehastigheten som avgjør om ekkoet ødelegger, akkurat som symboltiden avgjør om delay spread gir ISI.</p></div>
[[w:multipath]]
<div class="key"><b>Hovedpoeng</b><p>Høy datarate betyr korte symboler, og da blir samme delay spread mer skadelig. Dette er den fysiske grunnen til at OFDM finnes (modul 3).</p></div>
<h3>Doppler</h3>
<p>Beveger noe seg, forskyves frekvensen, akkurat som lyden fra en ambulanse. Fordi kopiene kommer fra ulike retninger, får de ulik forskyvning, og signalet sprer seg i frekvens. Dette kalles <b>Doppler-spredning</b>.</p>
<div class="ana"><b>Analogi: Sirenen i bakgården</b><p>Sirenen låter lysere når ambulansen kommer mot deg og mørkere når den kjører fra deg. Står du i en bakgård, når lyden deg fra flere vegger, og hver kopi har sin egen tonehøyde. Tonen blir utsmurt. Det er Doppler-spredning.</p></div>
<div class="exam"><b>Eksamen 2025, MC 3</b><p>Ekko = multipath. Svakere med avstanden = path loss. Frekvensskift ved 80 km/t = Doppler spread. Lær å gjenkjenne fenomenene ut fra symptomene.</p></div>`,
quiz:[
{t:'mc',y:'2025',fix:1,q:'Select the correct statement:',o:['Reflection happens when the signal bends as it passes through media with different densities.','Refraction happens when the signal encounters objects which are significantly smaller than the wavelength.','Scattering happens when the signal encounters small objects while diffraction happens when the signal encounters large objects (relative to the wavelength)','None of the alternatives is correct.'],a:2,e:'Alternative a describes refraction. Alternative b describes scattering.'},
{t:'mc',y:'2025',q:'Multiple delayed copies at the receiver; signal strength decreases with distance; frequency shifts at 80 km/h. Dominant phenomena?',o:['Multipath propagation, path loss, Doppler spread','Noise, multipath propagation, diffraction','Path loss and multipath propagation','Multipath propagation, reflection, Doppler spread'],a:0,e:'Three symptoms give three phenomena: delayed copies are multipath propagation, a signal that weakens with distance is path loss, and frequency shifts from movement are Doppler spread.'},
{t:'num',q:'To veier avviker 1140 m i lengde. Hva er delay spread? ($c=3\\cdot10^8$)',a:3.8,tol:.01,u:'µs',e:'<b>Formel:</b> $\\tau=\\Delta d/c$. <b>Utregning:</b> $\\dfrac{1140}{3\\cdot10^8}=3{,}8\\cdot10^{-6}$ s $=3{,}8$ µs. Forelesning 3.'},
{t:'ref',y:'2022',q:'What is intersymbol interference (ISI) and what causes it?',m:'ISI occurs when one or more delayed copies of a pulse arrive at the same time as the primary pulse of a subsequent bit. The cause is multipath propagation created by reflection, diffraction and scattering.',k:['Delayed copies overlap the next symbol','The cause is multipath propagation','Multipath comes from reflection, diffraction and scattering']}
]},
{id:'fading',title:'Fading: i tid og i frekvens',html:String.raw`
<p><b>Fading</b> betyr at signalstyrken varierer. Du må kunne klassifisere fading langs to uavhengige akser. Dette gir nesten sikre poeng på eksamen fordi metoden er mekanisk.</p>
<h3>Tidsaksen: rask eller langsom?</h3>
<p><b>Koherenstid</b> $T_c$ er hvor lenge kanalen er omtrent uforandret. Sammenlign den med bittiden $T_b=1/R$.</p>
<ul><li>$T_c\gg T_b$: kanalen er stabil gjennom mange bit. <b>Langsom fading</b>. Kommer av skyggelegging, altså bygg og åser.</li><li>Ellers: kanalen endrer seg underveis. <b>Rask fading</b>. Kommer av bevegelse (Doppler).</li></ul>
<p>Eksamensløsningen fra 2023 tolker $\gg$ som $T_c>10T_b$.</p>
<div class="ana"><b>Analogi: Været på turen</b><p>Koherenstiden er hvor lenge været holder seg. Bittiden er hvor lang turen din er. Er turen mye kortere enn værskiftene, har du samme vær hele veien, og det er langsom fading. Skifter været mens du går, er det rask fading.</p></div>
<h3>Frekvensaksen: flat eller selektiv?</h3>
<p><b>Koherensbåndbredde</b> $B_c$ er frekvensområdet der kanalen oppfører seg likt. Sammenlign den med signalets båndbredde $B_s$.</p>
<ul><li>$B_c\gg B_s$: hele signalet fades likt. <b>Flat fading</b>.</li><li>Ellers: noen frekvenser fades, andre ikke. <b>Frekvensselektiv fading</b>. Kommer av flerveis.</li></ul>
<p>De to aksene henger sammen med hver sin årsak: tiden med bevegelse, frekvensen med flerveis.</p>
<div class="ana"><b>Analogi: Volumknapp og equalizer</b><p>Flat fading er som å skru ned volumknappen: alle toner blir svakere samtidig. Frekvensselektiv fading er som en equalizer der noen toner forsvinner mens andre står urørt. Den ene gjør musikken svakere, den andre gjør den ødelagt.</p></div>
[[w:fading]]
<div class="ex"><b>Eksamen 2023</b><p>$T_c=50$ µs, $R=25$ kbps. $T_b=1/25\,000=40$ µs. Er $50>10\cdot40$? Nei. Altså <b>rask fading</b>.</p></div>
<div class="ex"><b>Eksamen 2022</b><p>$T_c=50$ ms, $R=500$ kbps. $T_b=2$ µs. $T_c\gg T_b$. Altså <b>langsom fading</b>.</p></div>
<h3>Oversikt over mottiltak</h3>
<p>Modul 2 og 3 går gjennom verktøykassen. Her er kartet:</p>
<div class="tw"><table><tr><th>Mottiltak</th><th>Idé</th><th>Hjelper mot</th></tr><tr><td>Feilkoding</td><td>Legg til ekstra bit</td><td>Bitfeil</td></tr><tr><td>AMC</td><td>Tilpass modulasjon og koding</td><td>Varierende SNR</td></tr><tr><td>MIMO</td><td>Flere antenner</td><td>Fading, kapasitet</td></tr><tr><td>Spredt spektrum</td><td>Utvid båndbredden</td><td>Selektiv fading, interferens</td></tr><tr><td>OFDM</td><td>Mange langsomme delstrømmer</td><td>ISI, selektiv fading</td></tr></table></div>`,
quiz:[
{t:'mc',y:'2022',q:'Coherence time 50 ms, bit rate 500 kbps. Slow or fast fading?',o:['Slow fading','Fast fading','Flat fading','Frequency-selective fading'],a:0,e:'<b>Formula:</b> $T_b=1/R$. Slow fading when $T_c\\gg T_b$ (at least $10T_b$). <b>Calculation:</b> $T_b=\\dfrac{1}{500\\,000}=2$ µs. $10T_b=20$ µs. $T_c=50$ ms is much larger, so the fading is slow.'},
{t:'mc',y:'2023',q:'Coherence time 50 µs, bit rate 25 kbps. Slow or fast fading?',o:['Fast fading','Slow fading'],a:0,e:'<b>Formula:</b> $T_b=1/R$. Slow fading requires $T_c\\ge10T_b$. <b>Calculation:</b> $T_b=\\dfrac{1}{25\\,000}=40$ µs. $10T_b=400$ µs. $T_c=50$ µs is smaller, so the fading is fast.'},
{t:'num',q:'For hvilken bitrate blir $T_b$ nøyaktig en tidel av $T_c=1$ ms?',a:10,tol:.01,u:'kbps',e:'<b>Formel:</b> $T_b=1/R$, altså $R=1/T_b$. <b>Utregning:</b> $T_b=T_c/10=0{,}1$ ms. $R=\\dfrac{1}{10^{-4}}=10\\,000$ bps $=10$ kbps. Høyere rate enn dette gir langsom fading etter regelen.'},
{t:'mc',q:'$B_c=150$ kHz, $B_s=100$ kHz. Hvilken fading?',o:['Frekvensselektiv','Flat'],a:0,e:'<b>Formel:</b> Flat fading krever $B_c\\gg B_s$ (minst $10B_s$). <b>Utregning:</b> $10B_s=1000$ kHz. $B_c=150$ kHz er mindre, så fadingen er frekvensselektiv. Dette er forelesningseksempelet.'},
{t:'mc',q:'Hvilken endring kan gjøre en kanal mer frekvensselektiv?',o:['Øke signalets båndbredde','Senke datarate','Stå stille','Bruke kortere kabel'],a:0,e:'Større $B_s$ sammenlignet med samme $B_c$.'},
{t:'ref',q:'Forklar hvorfor en høyere bitrate faktisk kan gjøre fading mindre «rask», men samtidig gjøre den mer frekvensselektiv.',m:'Høyere bitrate gir kortere bittid, så kanalen rekker mindre å endre seg i løpet av et bit, og det ligner langsom fading. Samtidig krever høyere rate større båndbredde. Da overskrider signalet lettere koherensbåndbredden, så forskjellige deler av spekteret fades ulikt.',k:['Kortere $T_b$ sammenlignes med samme $T_c$','Høyere rate krever større $B_s$','Større $B_s$ gir selektiv fading']}
]},
{id:'modulasjon',title:'Digital modulasjon',html:String.raw`
<p>Nå skal bit på en bølge. Vi har tre knapper fra modul 0, og hver gir en grunnform:</p>
<ul><li><b>ASK:</b> bit bestemmer amplituden.</li><li><b>FSK:</b> bit bestemmer frekvensen.</li><li><b>PSK:</b> bit bestemmer fasen.</li></ul>
<div class="ana"><b>Analogi: Morse med lommelykt</b><p>Du kan blinke sterkt eller svakt (ASK), bytte mellom to farger (FSK), eller holde samme lys, men blinke litt før eller etter takten (PSK). Mottakeren må bare vite hvilken av de tre tingene den skal se etter.</p></div>
[[w:modwave]]
<p>Selve radioen gjør to ting: digital modulasjon lager et analogt basisbåndsignal av bit, og analog modulasjon flytter det opp på bærefrekvensen.</p>
<h3>Flere bit per symbol</h3>
<p>Et <b>symbol</b> er én tilstand bølgen kan være i. Har vi $M$ symboler, kan hvert bære $n$ bit:</p>
$$M=2^n$$
<p>Et <b>konstellasjonsdiagram</b> viser alle symbolene som punkter. Avstand fra origo er amplitude, vinkel er fase.</p>
<div class="tw"><table><tr><th>Modulasjon</th><th>Symboler $M$</th><th>Bit per symbol</th><th>Kjennetegn</th></tr><tr><td>BPSK</td><td>2</td><td>1</td><td>Punkter på én sirkel</td></tr><tr><td>QPSK</td><td>4</td><td>2</td><td>Bare fase, én sirkel</td></tr><tr><td>8-PSK</td><td>8</td><td>3</td><td>Bare fase, én sirkel</td></tr><tr><td>16-QAM</td><td>16</td><td>4</td><td>Amplitude og fase</td></tr><tr><td>64-QAM</td><td>64</td><td>6</td><td>Amplitude og fase</td></tr><tr><td>256-QAM</td><td>256</td><td>8</td><td>Amplitude og fase</td></tr></table></div>
<p><b>QAM</b> endrer både amplitude og fase. Punktene ligger derfor i et rutenett, ikke på én sirkel. Det utnytter hele planet, slik at punktene kan stå lengst mulig fra hverandre.</p>
<div class="ana"><b>Analogi: Dartskiven</b><p>Del skiven i 64 felter, så sier ett kast mye. Men skjelver hånden, treffer du nabofeltet. Skjelvingen er støy. PSK bruker bare ytterkanten av skiven, mens QAM bruker hele flaten. Derfor får QAM plass til flere felter med lengst mulig avstand mellom dem.</p></div>
[[w:constell]]
<div class="exam"><b>Eksamen 2025, MC 5</b><p>«16-QAM can achieve twice the data rate of QPSK, but it requires a higher SNR.» Riktig: 4 bit mot 2 bit. Fellen var at QPSK skulle bruke amplitude, eller at alle QAM-punkter ligger på én sirkel.</p></div>
<h3>Valget av modulasjon</h3>
<ul><li><b>Høy orden (64-QAM):</b> mange bit, krever høy SNR. Brukes nær masten.</li><li><b>Lav orden (BPSK, QPSK):</b> få bit, tåler støy. Brukes ved cellekanten.</li></ul>
<p>Når antall symboler øker: datarate øker, støyfølsomhet øker, og implementasjonen blir mer kompleks. Dette kommer vi tilbake til under AMC.</p>
<div class="key"><b>Sammenheng å huske</b><p>Symbolrate $=$ bitrate $/$ bit per symbol. For eksempel 2 Mbps med 16-QAM gir 500 000 symboler/s og 2 µs symboltid.</p></div>`,
quiz:[
{t:'num',q:'Hvor mange bit bærer et symbol i 256-QAM?',a:8,tol:0,u:'bit',e:'<b>Formel:</b> bit per symbol $=\\log_2M$. <b>Utregning:</b> $\\log_2256=8$, fordi $2^8=256$.'},
{t:'num',q:'En radio sender 10 Mbps med 64-QAM. Hva er symbolraten?',a:1.667,tol:.01,u:'Msymb/s',e:'<b>Formel:</b> $R_s=R/\\log_2M$. <b>Utregning:</b> $\\log_264=6$. $R_s=10/6\\approx1{,}667$ Msymb/s.'},
{t:'mc',y:'2025',fix:1,q:'Which of the following statements about QAM and QPSK is correct?',o:['QPSK uses both amplitude and phase variations to encode data, while QAM uses only amplitude variation.','Both QPSK and QAM modify the carrier frequency resulting in the possibility for more efficient antenna design.','In QAM, all points lie on one circle in the constellation diagram.','16-QAM can achieve twice the data rate of QPSK, but it requires a higher signal-to-noise ratio.'],a:3,e:'4 bits versus 2 bits per symbol: $\\log_216=4$ and $\\log_24=2$. The points lie closer together, so a higher SNR is needed.'},
{t:'mc',q:'I et 16-QAM-diagram har 0011 og 0001 samme vinkel, men ulik avstand fra origo. Hva betyr det?',o:['Samme fase, ulik amplitude','Samme amplitude, ulik fase','Samme frekvens, ulik fase','Ulik fase og ulik amplitude'],a:0,e:'Vinkel er fase og avstand er amplitude.'},
{t:'mc',y:'2023',q:'The figure shows a carrier wave that jumps in phase when the digital signal goes from 0 to 1, while amplitude and frequency are unchanged. Which modulation is this?',o:['Phase modulation','QAM','Amplitude modulation','Frequency modulation'],a:0,e:'Only the phase changes.'},
{t:'ref',q:'En terminal er nær masten og en annen ved cellekanten. Hvilken modulasjon vil du gi hver av dem, og hvorfor?',m:'Terminalen nær masten har høy SNR og kan få høy orden, for eksempel 64-QAM, for høy datarate. Terminalen ved kanten har lav SNR og må bruke lav orden, for eksempel QPSK, for å unngå feil. Avveiningen er datarate mot robusthet.',k:['Høy SNR kan bruke høy orden','Lav SNR må bruke lav orden','Tettere punkter gir flere feil ved støy']}
]},
{id:'eks',title:'Eksamensoppgaver',quizTitle:'Som på eksamen',html:String.raw`<p>Løs disse på papir med tidtaking før du ser løsningen. Etter hver oppgave gir du deg selv poeng etter løsningen.</p>`,
quiz:[
{t:'ex',y:'2022',pts:7,q:'a) What is intersymbol interference (ISI) and what causes it? [3p]<br>b) A mobile receiver communicates with a transmitter 3 km away at 600 MHz. Find (i) the wavelength [2p] and (ii) the path loss [2p].',s:String.raw`<p>a) Delayed copies of a pulse arrive at the same time as the main pulse of a later bit. The cause is multipath propagation created by reflection, diffraction and scattering.</p><p>b) (i) $\lambda=c/f=3\cdot10^8/(6\cdot10^8)=0.5$ m. (ii) $L=(4\pi d/\lambda)^2=(4\pi\cdot3000/0.5)^2=5.7\cdot10^9$. In dB: $10\log_{10}(5.7\cdot10^9)=97.5$ dB.</p>`},
{t:'ex',y:'Practice',pts:6,q:'A channel has a bandwidth of 5 MHz and an SNR of 20 dB.<br>a) Find the Shannon capacity. [2p]<br>b) According to Nyquist, how many signal levels are needed to reach this rate? [2p]<br>c) The terminal moves away from the mast and the SNR drops to 10 dB. What happens to the capacity? [2p]',s:String.raw`<p>a) $SNR=10^{20/10}=100$. Shannon: $C=B\log_2(1+SNR)=5\cdot\log_2101=5\cdot6.66=33.3$ Mbps.</p><p>b) Nyquist: $C=2B\log_2M$. $\log_2M=33.3/(2\cdot5)=3.33$, so $M=2^{3.33}\approx10$. In practice 16 levels.</p><p>c) $SNR=10^{10/10}=10$. $C=5\cdot\log_211=5\cdot3.46=17.3$ Mbps. The capacity is almost halved.</p>`}
]}
]});

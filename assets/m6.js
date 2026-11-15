C.add({id:'m6',nr:6,part:'op',short:'Fiber og optiske komponenter',src:'Forelesning 6 · Ramaswami 1.3, 1.7, 1.8, 2.1, 2.2, kap. 3 og 7 (konsepter)',
title:'Optiske nett: fiber, komponenter og svitsjing',
lead:String.raw`Nå bytter vi medium. Fiberen er nesten perfekt: dempingen er lav, og kapasiteten er enorm. Spørsmålene blir derfor andre: hvordan holder vi lyset i glasset, hvordan fyller vi fiberen, og hvordan bygger vi nett av lys? Målet her er å forstå hva hver komponent er til for, ikke hvordan den er bygd.`,
goals:[String.raw`forklare totalrefleksjon og regne kritisk vinkel`,String.raw`skille demping fra dispersjon, og forklare hva som kompenserer for hva`,String.raw`sammenligne single-mode og multimode, og CWDM og DWDM`,String.raw`si hva hver optiske komponent gjør, og velge rett nodetype`],
sections:[
{id:'intro',title:'Hvorfor fiber?',html:String.raw`
<p>Fiber gir enorm båndbredde, lav demping (rundt 0,2 dB/km), immunitet mot elektromagnetisk støy, og lavt energibruk per bit. Fiber er vanskelig å avlytte. Ulempene er komplisert skjøting og at den er skjør. Selv om det er dyrt å starte, blir kostnaden per bit lav over tid.</p>
<h3>Tre nivåer i et fibernett</h3>
<div class="tw"><table><tr><th>Nivå</th><th>Rekkevidde</th><th>Kobler</th></tr><tr><td>Aksessnett</td><td>Noen km</td><td>Sentral til kunder</td></tr><tr><td>Interoffice</td><td>Noen til titalls km</td><td>Sentraler i en by eller region</td></tr><tr><td>Long haul</td><td>Hundrevis til tusenvis av km</td><td>Byer og regioner</td></tr></table></div>
<p>Metronett er oftest bygd som ringer, fordi en ring gir to veier mellom alle noder. Spurt om i eksamen 2023.</p>
<h3>To generasjoner</h3>
<p><b>Første generasjon:</b> optikk brukes bare til transmisjon. All svitsjing skjer elektrisk. SONET og SDH er eksempler.</p>
<p><b>Andre generasjon:</b> ruting og svitsjing flyttes inn i det optiske laget, og WDM gir mange bølgelengder per fiber. Det gir <b>lysbaner</b>: en ende-til-ende-forbindelse der transittrafikken holder seg optisk, uten å gå gjennom elektronikk underveis.</p>
<div class="why"><b>Hvorfor er lysbaner viktige?</b><p>Hvis 90 % av trafikken gjennom en node bare skal videre, er det sløsing å gjøre den om til elektrisk, behandle den og gjøre den til lys igjen. Med lysbane passerer den rett gjennom.</p></div>
<div class="ana"><b>Analogi: Ekspresstoget</b><p>Tenk om alle passasjerer måtte gå av og på ved hver stasjon, også dem som skal videre. Et ekspresstog kjører rett gjennom. En lysbane er ekspresstoget: bare de som skal av, stopper i noden.</p></div>
<h3>Vinduene</h3>
<p>Dempingen i glass avhenger av bølgelengden. Områder med lav demping heter <b>transmisjonsvinduer</b>.</p>
<div class="ana"><b>Analogi: Tre vinduer i en tykk vegg</b><p>Glassfiberen er som en vegg som stopper det meste av lyset, men som har tre vinduer. Sender du på en bølgelengde der vinduet er, slipper lyset gjennom med lite tap. Derfor velger vi ikke fritt, men holder oss til 850, 1310 og 1550 nm.</p></div>
[[w:windows]]
<div class="tw"><table><tr><th>Vindu</th><th>Bølgelengde</th><th>Demping</th><th>Bruk</th></tr><tr><td>1.</td><td>850 nm</td><td>4 dB/km</td><td>Multimode, korte avstander</td></tr><tr><td>2.</td><td>1310 nm</td><td>1,5 dB/km</td><td>Middels avstander</td></tr><tr><td>3.</td><td>1550 nm</td><td>0,2 dB/km</td><td>Long haul, størst båndbredde</td></tr></table></div>
<p>Mindre tap betyr lengre avstand mellom forsterkere, og altså billigere nett.</p>
<h3>Fiber eller satellitt?</h3>
<p>London–New York, 5570 km. I fiber går lyset med $2\cdot10^8$ m/s: $t=5{,}57\cdot10^6/2\cdot10^8=0{,}02785$ s, altså under 28 ms.</p>
<p>Geostasjonær satellitt 36 000 km over jorda, opp og ned: $t=7{,}2\cdot10^7/3\cdot10^8=0{,}24$ s.</p>
<div class="trap"><b>Feil i slidene</b><p>Forelesning 6 viser 0,002785 s. Det riktige er 0,02785 s. Konklusjonen står fast: fiber er rundt ti ganger raskere.</p></div>
<h3>MPLS</h3>
<p><b>MPLS</b> sender pakker etter korte etiketter i stedet for å slå opp IP-adresser. Ingress-ruteren setter på etikett, pakken følger en forhåndsoppsatt sti (<b>LSP</b>), og egress-ruteren fjerner den. Det gir raskere videresending, QoS og rask omruting, og det ligger mellom lag 2 og 3.</p>
<div class="ana"><b>Analogi: Bagasjelappen</b><p>På flyplassen leser ingen adressen din. De ser på en kort kode på bagasjelappen, og ruten er bestemt på forhånd. Det går raskere enn å lese og tenke ut veien på nytt ved hvert knutepunkt.</p></div>`,
quiz:[
{t:'num',q:'Lysets fart i fiber er $2\\cdot10^8$ m/s. Hvor lang tid tar 1000 km? Svar i ms.',a:5,tol:.01,u:'ms',e:'<b>Formel:</b> $t=d/v$. <b>Utregning:</b> $\\dfrac{10^6\\text{ m}}{2\\cdot10^8\\text{ m/s}}=5\\cdot10^{-3}$ s $=5$ ms.'},
{t:'num',q:'Hvor mye demping får du i 100 km fiber med 0,2 dB/km?',a:20,tol:0,u:'dB',e:'<b>Formel:</b> tap $=\\alpha\\cdot L$. <b>Utregning:</b> $0{,}2\\cdot100=20$ dB.'},
{t:'mc',y:'2023',q:'Optical metropolitan networks are usually structured in ……… topologies.',o:['Ring','Bus','Mesh','Star'],a:0},
{t:'mc',q:'Hva kjennetegner andre generasjons optiske nett?',o:['Svitsjing skjer i det optiske laget, med lysbaner over WDM','Optikk brukes bare til transmisjon','Alt signal blir elektrisk i hver node','Bare 850 nm brukes'],a:0},
{t:'ref',q:'Hvorfor bruker MPLS etiketter i stedet for IP-adresser?',m:'Et etikettoppslag er raskere og enklere enn longest-prefix-match på IP-adresser. Etiketter følger forhåndsoppsatte stier, slik at operatøren kan styre trafikken, gi QoS og omrute raskt.',k:['Enklere oppslag','Forhåndsoppsatte stier','Kontroll: QoS og rask omruting']}
]},
{id:'lys',title:'Hvordan lyset holder seg i fiberen',html:String.raw`
<p>Lys går saktere i glass enn i luft. <b>Brytningsindeksen</b> $n=c/v$ sier hvor mye saktere. Når lys går mellom to medier, endrer det retning, og det sier <b>Snells lov</b>:</p>
$$n_1\sin\theta_1=n_2\sin\theta_2$$
<p>Formelarket skriver det samme som $\dfrac{\sin\theta_2}{\sin\theta_1}=\dfrac{n_1}{n_2}$. Vinklene måles fra normalen, altså linjen rett på grenseflaten.</p>
<div class="ana"><b>Analogi: Bilen som treffer grus</b><p>En bil kjører på skrå ut i grusen. Hjulet som treffer først, bremses, og bilen svinger. Lyset gjør det samme ved en grenseflate: fartsendringen er grunnen til at retningen endres.</p></div>
<div class="trap"><b>Pass på</b><p>Forelesning 0 har uttrykket $\sin\theta_1/\sin\theta_2=n_1/n_2$. Det er opp ned. Bruk formelarkets versjon.</p></div>
<p>Går lyset fra tett til mindre tett medium, bøyes det <b>bort</b> fra normalen. Øker du $\theta_1$, når du en vinkel der $\theta_2=90°$: lyset går langs grensen. Dette er <b>kritisk vinkel</b>:</p>
$$\theta_c=\sin^{-1}\left(\frac{n_2}{n_1}\right),\quad n_1>n_2$$
<p>Over denne vinkelen slipper ingenting ut. Alt lyset reflekteres. Dette er <b>totalrefleksjon</b>, og det er selve prinsippet bak fiber.</p>
<div class="ana"><b>Analogi: Stein som spretter på vannet</b><p>Kaster du en stein bratt, går den rett ned. Kaster du den flatt nok, spretter den. Lys i fiber treffer veggen så flatt at det spretter tilbake og blir værende i kjernen, selv om fiberen bøyer seg.</p></div>
[[w:snell]]
[[f:fiber|Fiber består av kjerne og kappe. Fordi $n_1>n_2$, holdes lyset inne ved totalrefleksjon.]]
<div class="ex"><b>Regneeksempel</b><p>$n_1=1{,}48$, $n_2=1{,}46$. $\theta_c=\sin^{-1}(0{,}9865)=80{,}6°$.</p></div>`,
quiz:[
{t:'num',q:'$n_1=1{,}50$, $n_2=1{,}45$. Finn kritisk vinkel.',a:75.2,tol:.005,u:'°',e:'<b>Formel:</b> $\\theta_c=\\sin^{-1}(n_2/n_1)$. <b>Utregning:</b> $1{,}45/1{,}50=0{,}9667$. $\\sin^{-1}(0{,}9667)=75{,}2°$.'},
{t:'num',q:'Lys går fra $n_1=1{,}5$ til $n_2=1{,}0$ med $\\theta_1=30°$. Finn $\\theta_2$.',a:48.6,tol:.005,u:'°',e:'<b>Formel:</b> Snells lov: $n_1\\sin\\theta_1=n_2\\sin\\theta_2$. <b>Utregning:</b> $\\sin\\theta_2=\\dfrac{1{,}5\\cdot\\sin30°}{1{,}0}=1{,}5\\cdot0{,}5=0{,}75$. $\\theta_2=\\sin^{-1}(0{,}75)=48{,}6°$.'},
{t:'num',q:'Hva er lysets fart i glass med $n=1{,}5$? Oppgi i $10^8$ m/s.',a:2,tol:.001,e:'<b>Formel:</b> $v=c/n$. <b>Utregning:</b> $\\dfrac{3\\cdot10^8}{1{,}5}=2\\cdot10^8$ m/s.'},
{t:'mc',q:'Hva må gjelde for at totalrefleksjon skal kunne skje?',o:['Kjernen må ha høyere brytningsindeks enn kappen','Kappen må ha høyere brytningsindeks enn kjernen','Indeksene må være like','Lyset må gå fra luft inn i fiber'],a:0},
{t:'ref',q:'Forklar med egne ord hva som skjer når en lysstråle i fiberen treffer kappen, og hva det betyr hvis fiberen bøyes for mye.',m:'Treffer strålen grensen med vinkel større enn kritisk vinkel, reflekteres alt tilbake i kjernen. Bøyes fiberen for skarpt, blir innfallsvinkelen mindre enn kritisk vinkel, og lys lekker ut. Dette er bøyetap.',k:['Vinkel over kritisk vinkel gir totalrefleksjon','Bøying reduserer innfallsvinkelen','Lys lekker ut (bøyetap)']}
]},
{id:'tap',title:'Demping, dispersjon og hva vi gjør med dem',html:String.raw`
<p>To ting ødelegger signalet i fiber. Du må holde dem klart fra hverandre:</p>
<div class="ana"><b>Analogi: Maratonfeltet</b><p>Attenuasjon er at færre løpere kommer i mål. Dispersjon er at feltet strekker seg ut, slik at de som startet samlet, kommer i mål spredt. Klumper fra to starter kan da blande seg. Det ene løser du med flere løpere, det andre må du samle opp på en annen måte.</p></div>
<div class="tw"><table><tr><th></th><th>Attenuasjon (demping)</th><th>Dispersjon</th></tr><tr><td>Hva</td><td>Signalet blir svakere</td><td>Pulsen blir bredere</td></tr><tr><td>Gir</td><td>For lite lys hos mottakeren</td><td>ISI mellom pulser</td></tr><tr><td>Begrenser</td><td>Avstand</td><td>Bitrate og avstand</td></tr></table></div>
<h3>Demping</h3>
<ul><li><b>Absorpsjon:</b> urenheter i glasset gjør lys til varme. Knyttet til materialet og produksjonen.</li><li><b>Rayleigh-spredning:</b> små uregelmessigheter i glasset spreder lyset. Største årsak, rundt 96 % ifølge forelesning 0.</li><li><b>Bøyetap:</b> lys lekker ut ved skarpe bøyer.</li></ul>
<div class="ana"><b>Analogi: Tåke og asfalt</b><p>Rayleigh-spredning er billys i tåke: lyset forsvinner ikke, men det blir kastet til siden av små partikler. Absorpsjon er sola på svart asfalt: lyset blir til varme. Begge deler gjør at mindre kommer fram.</p></div>
<h3>Dispersjon</h3>
[[w:dispersion]]
<div class="tw"><table><tr><th>Type</th><th>Årsak</th><th>Gjelder</th></tr><tr><td><b>Modal dispersjon</b></td><td>Ulike lysveier har ulik lengde</td><td>Multimode</td></tr><tr><td><b>Kromatisk dispersjon</b></td><td>Ulike bølgelengder går i ulik fart</td><td>Alle</td></tr><tr><td><b>PMD</b></td><td>Ulike polarisasjoner går i ulik fart</td><td>Viktigst ved høy rate</td></tr></table></div>
<p>PMD begrenser hvor høy bitrate og avstand en bølgelengdekanal kan ha. Moderne systemer kompenserer med digital signalbehandling i mottakeren.</p>
<div class="ana"><b>Analogi: Tre måter å spre et løpefelt</b><p>Modal dispersjon er løpere som tar ulike ruter over fjellet, så noen får lengre vei. Kromatisk dispersjon er løpere på samme vei med ulik fart. PMD er to løpere som er nesten like, men som får litt ulik fart fordi de løper i hver sin side av veien.</p></div>
<h3>Mottiltak</h3>
<div class="tw"><table><tr><th>Mot demping</th><th>Mot dispersjon</th></tr><tr><td><b>EDFA</b>: forsterker lyset direkte, alle bølgelengder samtidig<br><b>Regenerator</b>: O-E-O, 3R</td><td><b>Dispersion-Compensating Fiber</b>: fiber som motvirker kromatisk dispersjon<br><b>EDC</b>: elektronikk i mottakeren</td></tr></table></div>
<div class="trap"><b>Felle</b><p>En forsterker kompenserer bare for demping, ikke for dispersjon. Den forsterker også støyen. Eksamen 2025 prøvde akkurat dette.</p></div>
<h3>1R, 2R og 3R</h3>
[[w:regen]]
<div class="tw"><table><tr><th></th><th>Gjør</th><th>Transparens</th><th>Ulempe</th></tr><tr><td><b>1R</b></td><td>Re-amplify</td><td>Full</td><td>Støy akkumuleres</td></tr><tr><td><b>2R</b></td><td>+ Re-shape</td><td>Bitrate, ikke modulasjonsformat</td><td>Jitter hoper seg opp, så antall steg er begrenset</td></tr><tr><td><b>3R</b></td><td>+ Re-time</td><td>Mistet: må kjenne bitrate og rammeformat</td><td>Dyrt, per bølgelengde</td></tr></table></div>
<div class="ana"><b>Analogi: Skrive av et utvisket brev</b><p>1R er å forstørre kopien: alt blir større, også flekkene. 2R er å spore over bokstavene så de blir skarpe, men de står litt skjevt. 3R er å skrive teksten på nytt på linjert ark: helt rent, men da må du kunne språket. Derfor mister 3R transparens.</p></div>
<h3>Single-mode og multimode</h3>
<div class="tw"><table><tr><th></th><th>Single-mode</th><th>Multimode</th></tr><tr><td>Kjerne</td><td>8–10 µm</td><td>50–100 µm</td></tr><tr><td>Lysveier</td><td>Én</td><td>Mange</td></tr><tr><td>Lyskilde</td><td>Laser</td><td>LED</td></tr><tr><td>Avstand</td><td>100+ km</td><td>Opptil 2 km</td></tr><tr><td>Båndbredde</td><td>Svært høy</td><td>Moderat</td></tr><tr><td>Pris</td><td>Høyere</td><td>Lavere</td></tr></table></div>
<p>Single-mode krever at kjernen er svært liten, slik at bare én vei er mulig. Da forsvinner modal dispersjon.</p>
<div class="ana"><b>Analogi: Smal sti og åpen slette</b><p>På en åpen slette kan folk gå i mange baner og komme fram til ulik tid. På en smal sti går alle samme vei, og da kommer de fram samlet. Liten kjerne gir bare én vei.</p></div>`,
quiz:[
{t:'mc',y:'2025',fix:1,q:'What is correct about signal transmission through the optical fiber?',o:['Signal power loss is approximately 0.2db/km and is wavelength independent.','Main causes of signal power loss are absorption and Rayleigh scattering, and one of the advantages of the optical fibers compared to other guided media is that bending loss does not occur.','Signal amplifiers boost the optical signal and can compensate for dispersion.','In a Single Mode fiber, the diameter of the core must be very small to allow only one propagation mode (one light path).'],a:3},
{t:'mc',y:'2024',q:'Which of the following optical regeneration techniques loses transparency to framing protocols?',o:['3R','1R','2R','Optical amplifier'],a:0},
{t:'mc',y:'2024',q:'2R electronic regeneration techniques ...',o:['limits the number of regeneration steps due to jitter accumulation at each step','does not offer transparency to bit rates','Regeneration without retiming and reshaping','similar to optical amplifiers'],a:0},
{t:'mc',y:'2024',fix:1,q:'Which of the following is correct about Polarization mode dispersion (PMD)?',o:['PMD imposes limitations on simultaneous maximum bit rate in a wavelength channel and fiber distances.','Occurs when multiple modes of the same signal propagate at different velocities along the fiber','PMD arises only in the fiber and not from individual components used in the network.','PMD has a higher effect than the pulse spreading in multimode fibers'],a:0},
{t:'mc',y:'2023',fix:1,q:'Which of the following statements best explain the concept of material absorption?',o:['A loss mechanism related to the material composition and fabrication of fiber','A transmission loss for optical fibers','Results in attenuation of transmitted light','Causes of transfer of optical power'],a:0},
{t:'num',y:'2023',q:'How many types of dispersion in fiber optics does the course cover?',a:3,tol:0,e:'Intermodal, chromatic and PMD.'},
{t:'ref',q:'En link er 200 km og 40 Gbps. Pulsene er for brede, men effekten er god nok. Hva er problemet, og hva gjør du?',m:'Problemet er dispersjon, ikke demping. En forsterker hjelper ikke. Du bruker dispersjonskompenserende fiber eller elektronisk kompensasjon, eller en 3R-regenerator som gjenskaper pulsene.',k:['Riktig diagnose: dispersjon','Forsterker hjelper ikke','Nevner DCF, EDC eller 3R']}
]},
{id:'wdm',title:'WDM: fyll fiberen med farger',html:String.raw`
<p>En fiber kan bære titalls terabit, men én laser med elektronikk klarer langt mindre. For å bruke kapasiteten har vi to verktøy:</p>
<ul><li><b>TDM:</b> flere strømmer deler én bølgelengde i tid. Krever svært rask elektronikk. For eksempel 64 × 155 Mb/s til 10 Gb/s.</li><li><b>WDM:</b> flere bølgelengder i samme fiber, akkurat som frekvenskanaler i radio.</li></ul>
<p>Moderne nett bruker begge: TDM på hver bølgelengde og WDM over dem. En multiplekser setter sammen bølgelengdene, en demultiplekser skiller dem.</p>
<div class="ana"><b>Analogi: Flere spor i samme tunnel</b><p>TDM er å kjøre ett tog fortere. Det stopper på grensen for hva elektronikken klarer. WDM er å legge flere spor i samme tunnel: hver farge er sitt eget tog, og tunnelen, altså fiberen, er den samme.</p></div>
[[w:wdm]]
<h3>CWDM og DWDM</h3>
<div class="tw"><table><tr><th></th><th>CWDM</th><th>DWDM</th></tr><tr><td>Kanaler</td><td>Opptil 18</td><td>Opptil 80 (noen ganger 160)</td></tr><tr><td>Avstand</td><td>20 nm</td><td>0,8 nm (100 GHz)</td></tr><tr><td>Rekkevidde</td><td>Opptil 70 km</td><td>Mye lengre</td></tr><tr><td>Rate per kanal</td><td>Opptil 10 Gbps</td><td>Opptil 100 Gbps</td></tr><tr><td>Forsterking</td><td>Nei</td><td>Ja</td></tr><tr><td>Teknologi</td><td>Enkel, eldre</td><td>Nyere</td></tr></table></div>
<p>Ved 1550 nm tilsvarer 0,8 nm omtrent 100 GHz: $\Delta f\approx c\Delta\lambda/\lambda^2$.</p>
<div class="ana"><b>Analogi: Parkeringsplassene</b><p>CWDM har romslige plasser: selv en dårlig sjåfør treffer, altså en billig laser som driver med temperaturen. DWDM har trange plasser: det får plass til mange flere biler, men hver bil må stå presist, og det krever dyrere og mer stabile lasere.</p></div>
<h3>Fordeler med WDM</h3>
<ul><li>Kapasiteten vokser med flere bølgelengder, gradvis («pay as you grow»).</li><li>Lavere bitrate per kanal enn i et enkanalsystem, så senderne blir enklere og signalet mindre sårbart.</li><li>Én forsterker tar alle bølgelengdene samtidig.</li><li>Transparent: mange regeneratorer spares.</li></ul>
<h3>Bølgelengdekonvertering</h3>
<p><b>Bølgelengdekonvertering</b> flytter et signal til en annen bølgelengde. Fordeler:</p>
<div class="ana"><b>Analogi: Omlasting mellom to sporvidder</b><p>Toget kommer inn på en sporvidde som ikke passer det neste nettet, så lasten flyttes over på en ny vogn. Lasten er den samme, men den går videre på et spor som passer. Transponderen gjør denne omlastingen.</p></div>
<ul><li>Data kan komme inn på feil bølgelengde, for eksempel SONET på 1310 nm til et WDM-nett på 1550 nm. Dette gjør en <b>transponder</b>.</li><li>Den gir bedre utnyttelse av bølgelengdene.</li><li>Den trengs på grensen mellom nett med ulik bølgelengdeplan.</li></ul>`,
quiz:[
{t:'mc',q:'Hva er kanalavstanden i CWDM?',o:['20 nm','0,8 nm','100 nm','1 nm'],a:0},
{t:'num',q:'En DWDM-fiber har 80 kanaler à 100 Gbps. Hva er total kapasitet i Tbps?',a:8,tol:0,u:'Tbps',e:'<b>Formel:</b> total kapasitet $=$ kanaler $\\cdot$ rate per kanal. <b>Utregning:</b> $80\\cdot100=8000$ Gbps $=8$ Tbps.'},
{t:'num',q:'Regn om 0,8 nm ved 1550 nm til GHz med $\\Delta f=c\\Delta\\lambda/\\lambda^2$. Rund av.',a:100,tol:.02,u:'GHz',e:'<b>Formel:</b> $\\Delta f=\\dfrac{c\\,\\Delta\\lambda}{\\lambda^2}$. <b>Utregning:</b> $\\dfrac{3\\cdot10^8\\cdot0{,}8\\cdot10^{-9}}{(1550\\cdot10^{-9})^2}=\\dfrac{0{,}24}{2{,}40\\cdot10^{-12}}\\approx1{,}0\\cdot10^{11}$ Hz $=100$ GHz.'},
{t:'ref',y:'2024',q:'Mention at least two beneficial properties of WDM.',m:'Two of: capacity can be increased step by step by adding wavelengths; a lower bit rate per channel gives simpler transmitters and less vulnerable transmission; optical amplifiers amplify many wavelengths at once; WDM is transparent compared with E/O/E regenerators per channel.',k:['At least two valid benefits']},
{t:'ref',y:'2024',q:'What is the difference between Coarse WDM and Dense WDM?',m:'The channel spacing: large for CWDM (20 nm), small for DWDM (50–100 GHz). Also: DWDM has more channels and higher capacity and can be amplified, while CWDM cannot.',k:['Channel spacing: 20 nm versus 0.8 nm','Number of channels and capacity','DWDM can be amplified']},
{t:'ref',y:'2023',q:'State two benefits of wavelength conversion.',m:'Two of: data may arrive on a wavelength that does not suit the network; reuse and better utilisation of wavelengths; needed at the border between networks with different allocations.',k:['Two valid benefits']}
]},
{id:'komponenter',title:'Komponentene',html:String.raw`
<p>Skillet er enkelt: <b>passive komponenter</b> trenger ikke strøm og endrer bare signalets vei. <b>Aktive komponenter</b> trenger strøm og kan forsterke, lage eller modulere lys.</p>
<div class="ana"><b>Analogi: Vannrør og pumpe</b><p>Et rør, et T-stykke og en ventil trenger ikke strøm. De leder bare vannet. En pumpe trenger strøm og kan gi vannet mer trykk. Passive komponenter kan aldri gi deg mer lys enn du sendte inn.</p></div>
<div class="tw"><table><tr><th>Komponent</th><th>Type</th><th>Funksjon</th></tr>
<tr><td><b>Laser</b></td><td>Aktiv</td><td>Fokusert, koherent lys. Lang avstand, høy fart. Dyrere</td></tr>
<tr><td><b>LED</b></td><td>Aktiv</td><td>Bredt spekter. Kort avstand. Billig</td></tr>
<tr><td><b>Forsterker</b></td><td>Aktiv</td><td>Øker effekten</td></tr>
<tr><td><b>Kobler</b></td><td>Passiv</td><td>Kombinerer eller deler signaler. 3 dB-kobler deler likt. Stjernekobler sender fra alle til alle</td></tr>
<tr><td><b>Isolator</b></td><td>Passiv</td><td>Slipper lys bare én vei. Beskytter lasere mot refleksjoner</td></tr>
<tr><td><b>Sirkulator</b></td><td>Passiv</td><td>Fra port $i$ til port $i+1$ i ring. Add/drop</td></tr>
<tr><td><b>Filter</b></td><td>Passiv</td><td>Velger bølgelengder. Tynnfilm er vanlig</td></tr>
<tr><td><b>MUX/DEMUX</b></td><td>Passiv</td><td>Samler og skiller bølgelengder</td></tr>
<tr><td><b>Splitter</b></td><td>Passiv</td><td>Deler ett signal likt på flere utganger</td></tr>
<tr><td><b>AWG</b></td><td>Passiv</td><td>Bølgelengderuter: sender hver bølgelengde til sin port. Se modul 7</td></tr></table></div>
<div class="ana"><b>Analogi: Rørleggeren</b><p>Isolator er tilbakeslagsventilen: vannet går bare én vei. Sirkulator er rundkjøringen der du alltid tar neste avkjørsel. Kobler er Y-røret. Splitter er fordeleren med like mange like store utganger. AWG er prismet som sender hver farge i sin retning.</p></div>
<div class="exam"><b>Eksamen 2023 (3 poeng)</b><p>Forklar kobler, sirkulator og AWG. Kobler: kombinerer og deler signaler. Sirkulator: multiport-enhet som slipper signalet én vei rundt. AWG: flere kopier av samme signal, faseforskjøvet og lagt sammen, brukes som MUX/DMUX eller fast bølgelengdekryss.</p></div>
<p><b>Kobler eller splitter?</b> Kobler er et generelt ord. Splitter deler alltid likt. En tapper er en svært skjev kobler (rundt 1:20).</p>`,
quiz:[
{t:'mc',q:'Hvilken komponent hindrer at refleksjoner skader laseren?',o:['Isolator','Sirkulator','AWG','Filter'],a:0},
{t:'mc',q:'Hvilken av disse er aktiv?',o:['Modulator','Splitter','Isolator','Tynnfilmfilter'],a:0},
{t:'num',q:'Hvor mange dB tap har en ideell 3 dB-kobler per utgang?',a:3,tol:0,u:'dB',e:'<b>Formel:</b> tap per utgang $=10\\log_{10}N$ for en 1:N-deling. <b>Utregning:</b> $10\\log_{10}2=3{,}01\\approx3$ dB. Effekten deles likt på to utganger.'},
{t:'ref',y:'2023',q:'Describe the functions of: Coupler, Circulator and Arrayed Waveguide Grating (AWG).',m:'Coupler: used to combine and split signals. Circulator: a device with 3–4 ports that passes light one way around. AWG: several phase-shifted copies of the signal are added together. It is used as an optical MUX/DEMUX and as a static wavelength crossconnect.',k:['Coupler correct','Circulator correct','AWG correct']}
]},
{id:'svitsj',title:'Optisk svitsjing',html:String.raw`
<p>En optisk svitsj sender lys fra inngangsport til utgangsport etter inngangsport og bølgelengde.</p>
<div class="ana"><b>Analogi: Tolken og vinduet</b><p>En opak svitsj er en tolk: den hører alt, kan rette feil og sende videre, men den må kunne språket, og det tar tid. En transparent svitsj er et vindu: lyset går rett gjennom uansett språk, men vinduet kan ikke lese noe.</p></div>
[[f:oxc|Opak og transparent svitsj. Forskjellen er om lyset blir elektrisk underveis.]]
<div class="tw"><table><tr><th></th><th>O-E-O (opak)</th><th>O-O-O (transparent)</th></tr><tr><td>Signal</td><td>Blir elektrisk</td><td>Forblir lys</td></tr><tr><td>Kan lese data</td><td>Ja</td><td>Nei</td></tr><tr><td>Forsinkelse</td><td>Elektronikk</td><td>Nesten null</td></tr><tr><td>Bitrate/format</td><td>Bundet</td><td>Uavhengig</td></tr></table></div>
<h3>Add/drop</h3>
<p>Mange noder skal bare plukke ut noen få bølgelengder og la resten gå forbi. <b>OADM</b> gjør det med faste kanaler valgt ved installasjon. Den er billig, passiv og krever manuell omkobling ved endringer. Den passer til enkle nett.</p>
<p><b>ROADM</b> gjør det samme, men fjernstyrt. Hjertet er en <b>WSS</b>, som svitsjer hver bølgelengde hver for seg. Én utgang er gjennomgang, og resten er lokal drop. Utgangene er fargeløse: de kan bære hvilken som helst bølgelengde.</p>
<div class="ana"><b>Analogi: Betongkant og sporveksel</b><p>En OADM er en avkjørsel støpt i betong: billig, men du må grave for å endre den. En ROADM er en fjernstyrt sporveksel: fra kontrollrommet kan du når som helst bestemme hvilket tog som tar av.</p></div>
[[w:oadm]]
<div class="key"><b>Slik velger du nodetype</b><p>Må noden kunne endre seg ved feil eller på fjernkommando? Da trenger du <b>ROADM/WSS</b>. Er kanalene faste? Da holder <b>passiv OADM eller MUX/DMUX</b>. Eksamen 2022 og 2023 spurte akkurat om dette.</p></div>
<h3>OXC</h3>
<p><b>OXC</b> er et stort krysspunkt for mesh-nett med mange bølgelengder. Den gir mer fleksibilitet enn en ROADM, dynamisk oppsett av lysbaner og god skalering. Den kan være opak eller transparent.</p>
<div class="ana"><b>Analogi: Skiftetomten</b><p>En ROADM er en sporveksel på én linje. En OXC er hele skiftetomten, der ethvert spor inn kan kobles til ethvert spor ut. MEMS er de små speilene som gjør denne omkoblingen for lys.</p></div>
<p><b>MEMS</b> er små speil som vipper for å styre lys fra inngangs- til utgangsfiber. Slik lages helt optiske svitsjer.</p>
<h3>Optisk pakkesvitsjing</h3>
<p>Dette står ikke i slidene for 2026, men eksamen 2023 og 2024 spurte om det. Optikk har ikke RAM. Kommer to pakker samtidig til samme utgang, må en vente. Da brukes <b>fiber delay lines</b>: en lang fiberspole som forsinker lyset.</p>
<div class="ana"><b>Analogi: Ekstrarunden i rundkjøringen</b><p>Lys kan ikke parkeres, for det finnes ikke noe optisk RAM. Skal en pakke vente, må du la den kjøre en ekstra runde. En fiberspole er rundkjøringen: lyset fortsetter å bevege seg, men kommer ut litt senere.</p></div>`,
quiz:[
{t:'mc',y:'2024',q:'In optical packet switching, optical buffers may be realized using ….',o:['Fiber delay lines','OADM','Optical Cross connects','Random Access Memory'],a:0},
{t:'mc',y:'2023',q:'……. is a multi-functional element of optical network.',o:['Optical node','Hop','Wavelength router','Optical attenuation'],a:0},
{t:'mc',y:'2022',q:'Node B only drops and adds fixed wavelengths and needs no reconfiguration on failure. Simplest element?',o:['Passive OADM or WDM MUX/DMUX','ROADM','OXC','Transponder'],a:0},
{t:'mc',y:'2022',q:'Node C must reroute traffic when the A-C path fails. Simplest element?',o:['ROADM or WSS','Passive OADM','Splitter','Isolator'],a:0},
{t:'num',q:'En WSS er 1×9. Én utgang er gjennomgang. Hvor mange utganger kan brukes til lokal drop?',a:8,tol:0,e:'<b>Formel:</b> drop-utganger $=N-1$. <b>Utregning:</b> $9-1=8$.'},
{t:'ref',q:'Hva er forskjellen på opak og transparent svitsjing i en OXC?',m:'I opak svitsjing gjøres lyset om til elektrisk og tilbake (O-E-O). Da kan signalet leses og regenereres, men noden er bundet til bitrate og format. Transparent svitsjing holder signalet optisk hele veien og er uavhengig av bitrate, men kan ikke rense signalet.',k:['Opak: O-E-O','Transparent: lys hele veien','Avveining: regenerering mot transparens']},
{t:'ref',q:'Hvorfor er optisk pakkesvitsjing vanskelig?',m:'Pakkesvitsjing krever at du kan lese headere og lagre pakker når det er konflikt. Lys kan ikke lagres i RAM. Fiber delay lines gir bare en fast forsinkelse.',k:['Lys kan ikke lagres i RAM','Delay lines er en begrenset erstatning']}
]},
{id:'mod',title:'Optisk modulasjon',html:String.raw`
<p>Lys skal bære bit. To måter:</p>
<div class="ana"><b>Analogi: Lampe med lukker</b><p>Direkte modulasjon er å slå lampen av og på veldig fort. Da rekker den ikke å bli stabil, og fargen sklir litt i hvert blink. Det er chirp. Ekstern modulasjon er å la lampen stå på og åpne og lukke en lukker foran. Det gir rene blink, men du trenger en ekstra del.</p></div>
<div class="tw"><table><tr><th></th><th>Direkte modulasjon</th><th>Ekstern modulasjon</th></tr><tr><td>Hvordan</td><td>Laseren slås av og på</td><td>Laseren lyser jevnt, en modulator koder</td></tr><tr><td>Pris</td><td>Billig</td><td>Dyrere</td></tr><tr><td>Maks rate</td><td>Rundt 2,5 Gbps</td><td>Mye høyere</td></tr><tr><td>Ulempe</td><td>Pulsene får <b>chirp</b>, som gir dispersjon</td><td>Mer komplekst</td></tr></table></div>
<h3>Designøvelse</h3>
<p>Velg komponenter etter behovet:</p>
<div class="tw"><table><tr><th></th><th>Datasenter, lang avstand</th><th>Hjemmebruker</th></tr><tr><td>Fiber</td><td>Single-mode</td><td>Single-mode (kort, men framtidssikker)</td></tr><tr><td>Modulasjon</td><td>Ekstern</td><td>Direkte</td></tr><tr><td>Sender</td><td>Laserdiode</td><td>Laserdiode eller LED</td></tr><tr><td>Multipleksing</td><td>DWDM</td><td>CWDM eller ingen</td></tr></table></div>`,
quiz:[
{t:'mc',q:'Du trenger 40 Gbps over lang avstand. Hvilken modulasjon?',o:['Ekstern','Direkte'],a:0,e:'40 Gbps er langt over grensen på rundt 2,5 Gbps for direkte modulasjon. Chirp gir dessuten dispersjon som vokser med avstanden, så du må bruke ekstern modulasjon.'},
{t:'num',q:'Omtrent hvor høy bitrate (i Gbps) kan direkte modulasjon håndtere?',a:2.5,tol:.01,u:'Gbps',e:'Ingen formel her, dette er et tall fra tabellen: direkte modulasjon holder til rundt 2,5 Gbps. Over det gir chirp for mye dispersjon, og da brukes ekstern modulasjon.'},
{t:'ref',q:'Hvorfor er direkte modulasjon uegnet over 2,5 Gbps?',m:'Når laseren slås raskt av og på, endres frekvensen under pulsen (chirp). Det gir mer dispersjon, som ødelegger signalet raskt ved høye rater.',k:['Chirp oppstår','Chirp gir dispersjon']}
]},
{id:'eks',title:'Eksamensoppgaver',quizTitle:'Som på eksamen',html:String.raw`<p>I 2023 og 2024 var denne typen teoribolk verdt 10 poeng.</p>`,
quiz:[
{t:'ex',y:'2023',pts:10,q:'a) Mention 3 types of dispersion in fiber optics. [3p]<br>b) What is the impact of PMD? [2p]<br>c) State two benefits of wavelength conversion. [2p]<br>d) Describe the functions of Coupler, Circulator, AWG. [3p]',s:String.raw`<p>a) Intermodal, chromatic, PMD.</p><p>b) It limits the bit rate in a channel and the fiber distance at the same time. Modern receivers compensate for it electronically.</p><p>c) Adapting the wavelength at the input; reuse of wavelengths; the border between networks.</p><p>d) Coupler: combines and divides signals. Circulator: multiport device that passes light one way around. AWG: phase-shifted copies of the signal are added, used as MUX/DEMUX or as a fixed wavelength crossconnect.</p>`},
{t:'ex',y:'2024',pts:10,q:'(1) Mention at least two beneficial properties of WDM. [3p]<br>(2) What is the difference between CWDM and DWDM? [4p]<br>(3) State two benefits of wavelength conversion. [3p]',s:String.raw`<p>(1) Capacity can grow step by step; a lower rate per channel; amplifiers handle many wavelengths at once; transparency.</p><p>(2) 20 nm against 50–100 GHz spacing. DWDM has more channels and higher capacity, and can be amplified.</p><p>(3) Adapting the wavelength at the input; better use of wavelengths; needed at the border between networks with different wavelength plans.</p>`},
{t:'ex',y:'2022',pts:7,q:'An intelligence service wants to eavesdrop on one wavelength in a fiber.<br>a) Which components are needed? [4p]<br>b) Make a drawing. [3p]',s:String.raw`<p>a) A coupler, or a clamp with a lens, to tap the fiber. A DMUX or filter to pick out the wavelength. A receiver.</p>`+C.enFig('eaves')}
]}
]});

C.add({id:'m7',nr:7,part:'op',short:'Optiske aksessnett',src:'Forelesning 7 · Ramaswami kap. 11',
title:'Optiske aksessnett: fiber til folk flest',
lead:String.raw`Det dyreste i et nett er å nå hvert enkelt hjem. Hvordan gir vi tusenvis av brukere fiber uten å grave ned tusenvis av fibre? Svaret er PON. Denne modulen gir eksamensoppgaver hvert år, og du må kunne tegne RITENET for hånd.`,
goals:[String.raw`sammenligne P2P, AON og PON med antall fibre og transceivere`,String.raw`forklare OLT, ONU, splitter og bølgelengdene i PON`,String.raw`skille TDMA-PON, broadcast-and-select og WRPON, og forklare AWG`,String.raw`tegne og forklare RITENET og LARNET`,String.raw`løse effektbudsjett raskt og feilfritt`],
sections:[
{id:'intro',title:'Aksessnett og FTTx',html:String.raw`
<p>Aksessnettet kobler brukeren til <b>sentralen</b>. Alternativene er <b>DSL</b> (telefonkobber, farten faller med avstanden), kabel-TV (koaks, delt båndbredde), fiber, Wi-Fi og mobilnett.</p>
<p>Utfordringen for fiber: holde dempingen nede og velge topologi og komponenter som gir høy kapasitet til lav pris.</p>
[[f:ftth|FTTx sier hvor fiberen stopper. Resten av veien er kobber.]]
<div class="tw"><table><tr><th></th><th>Fiber går til</th></tr><tr><td>FTTN</td><td>Skap i gata (Node)</td></tr><tr><td>FTTC</td><td>Rundt 300 m fra huset (Curb)</td></tr><tr><td>FTTB</td><td>Bygget</td></tr><tr><td><b>FTTH</b></td><td>Inn i hjemmet</td></tr></table></div>
<h3>Tre måter å bygge FTTH på</h3>
[[w:fttx]]
<div class="tw"><table><tr><th>Scenario</th><th>Fibre fra sentralen</th><th>Transceivere</th><th>Strøm ute</th><th>Vurdering</th></tr><tr><td><b>Punkt-til-punkt</b></td><td>$N$</td><td>$2N$</td><td>Nei</td><td>Enkelt, men dyrt</td></tr><tr><td><b>Curb-svitsjet (AON)</b></td><td>1</td><td>$2N+2$</td><td>Ja</td><td>Lang rekkevidde, krever strøm</td></tr><tr><td><b>PON</b></td><td>1</td><td>$N+1$</td><td>Nei</td><td>Mest brukt</td></tr></table></div>
<p>Disse tre formlene må du kunne utenat. Tell selv: P2P har sender og mottaker i hver ende av hver fiber. AON har to til linken og $2N$ på gren-siden. PON har én i sentralen og én per bruker.</p>
<div class="ana"><b>Analogi: Vannforsyning til et boligfelt</b><p>P2P er ett eget rør fra vannverket til hvert hus: enkelt, men enormt mye graving. AON er ett rør til feltet og en strømdrevet pumpestasjon der ute. PON er ett rør og et T-stykke uten strøm. Det siste har færrest deler og ingenting som kan gå tomt for strøm ute i gata.</p></div>
<h3>PON eller AON?</h3>
<div class="tw"><table><tr><th></th><th>PON</th><th>AON / P2P</th></tr><tr><td>Topologi</td><td>Punkt-til-multipunkt via splitter</td><td>Dedikert port per bruker</td></tr><tr><td>Felt</td><td>Passivt</td><td>Aktivt utstyr</td></tr><tr><td>Deling</td><td>Delt port</td><td>Dedikert</td></tr><tr><td>Rekkevidde</td><td>Rundt 20 km</td><td>10–40 km</td></tr><tr><td>Passer til</td><td>Masseutbygging</td><td>Bedrifter med garanti</td></tr></table></div>`,
quiz:[
{t:'num',q:'P2P med 32 abonnenter: hvor mange transceivere?',a:64,tol:0,e:'<b>Formel:</b> P2P: $2N$ transceivere. <b>Utregning:</b> $2\\cdot32=64$. Én i hver ende av hver fiber.'},
{t:'num',q:'AON med 32 abonnenter: hvor mange transceivere?',a:66,tol:0,e:'<b>Formel:</b> AON: $2N+2$ transceivere. <b>Utregning:</b> $2\\cdot32+2=66$. To til linken mellom sentralen og svitsjen, og to per bruker.'},
{t:'num',q:'PON med 32 abonnenter: hvor mange transceivere?',a:33,tol:0,e:'<b>Formel:</b> PON: $N+1$ transceivere. <b>Utregning:</b> $32+1=33$. Én i sentralen og én per bruker.'},
{t:'mc',y:'2025',fix:1,q:'In Passive Optical Networks (PON):',o:['One fiber line is needed, corresponding to 2N+2 transceivers, where N is the number of nodes.','There is no active power in the field, meaning that no splitters are needed.','Specific and different wavelengths are typically used for upstream and downstream, while 1550nm is used for broadcasting video/television.','In GPON and EPON systems, each user is assigned a dedicated wavelength for upstream and downstream transmission, similar to WDM-PON.'],a:2},
{t:'ref',y:'2025',q:'State two advantages of using a PON instead of an Active Optical Network.',m:'No active powered equipment in the field, which gives lower maintenance. Fewer fibers and transceivers, which gives lower cost.',k:['No power in the field','Fewer transceivers and lower cost']},
{t:'ref',y:'2025',q:'Identify two reasons why Point-to-Point fiber architectures become impractical for large-scale FTTH deployment.',m:'P2P requires a dedicated fiber per subscriber, which gives a high fiber count and large installation costs. It also requires a pair of transceivers per user, which makes it expensive at scale.',k:['A dedicated fiber per user','Two transceivers per user']}
]},
{id:'pon',title:'PON: oppbygging',html:String.raw`
[[f:pon|PON. Én fiber fra OLT deles passivt til mange ONU-er.]]
<ul><li><b>OLT</b> står i sentralen. Styrer nedstrøms kringkasting og oppstrøms multipleksing, og kobler til kjernenettet.</li><li><b>ONU</b> står hos kunden. Gjør lys om til Ethernet, tale eller TV, og sender oppstrøms under kontroll av OLT.</li><li><b>Splitter</b> deler signalet passivt, fra 2 til 32 eller 64 greiner.</li></ul>
<h3>Bølgelengder</h3>
<div class="tw"><table><tr><th>Bølgelengde</th><th>Retning</th></tr><tr><td><b>1490 nm</b></td><td>Nedstrøms data</td></tr><tr><td><b>1310 nm</b></td><td>Oppstrøms data</td></tr><tr><td><b>1550 nm</b></td><td>Kringkastet TV</td></tr></table></div>
<p>Ulike bølgelengder gjør at opp- og nedstrøms ikke forstyrrer hverandre i samme fiber.</p>
<h3>Sentralisert eller kaskadert</h3>
<p>Sentralisert: én 1:32-splitter i et skap, stjernetopologi, enkel å vedlikeholde. Kaskadert: flere trinn, for eksempel 1:4 og så 1:8, tre-og-grein-topologi som passer på landet.</p>
<h3>PON-standardene</h3>
<div class="tw"><table><tr><th>Standard</th><th>Ned</th><th>Opp</th><th>Merknad</th></tr><tr><td><b>APON/BPON</b></td><td>622 Mb/s</td><td>155 Mb/s</td><td>ATM-basert, 1990-tallet</td></tr><tr><td><b>EPON</b></td><td>1,25 G</td><td>1,25 G</td><td>Symmetrisk, Ethernet</td></tr><tr><td><b>GPON</b></td><td>2,5 G</td><td>1,25 G</td><td>Bærer Ethernet, ATM og TDM</td></tr><tr><td><b>XG-PON</b></td><td>10 G</td><td>2,5 G</td><td></td></tr><tr><td><b>XGS-PON</b></td><td>10 G</td><td>10 G</td><td>Sky, 5G, bedrifter</td></tr><tr><td><b>NG-PON2</b></td><td colspan="2">TWDM</td><td>Kombinerer tid og bølgelengde</td></tr></table></div>
<div class="exam"><b>Eksamen 2023 og 2024</b><p>Hvilken PON støtter ulike pakkeformater som Ethernet, ATM og TDM? <b>GPON</b>. Dette spørsmålet har kommet to år på rad.</p></div>`,
quiz:[
{t:'mc',y:'2024',q:'Which of the following PON technologies supports different packetized traffic formats such as Ethernet packets, ATM packets and native TDM?',o:['GPON','APON','EPON','BPON'],a:0},
{t:'num',q:'Hvilken bølgelengde (nm) brukes til oppstrøms data i PON?',a:1310,tol:0,u:'nm',e:'Ingen formel her, dette må pugges: 1310 nm oppstrøms og 1490 nm nedstrøms.'},
{t:'num',q:'Hvilken bølgelengde (nm) brukes til nedstrøms data?',a:1490,tol:0,u:'nm',e:'Ingen formel her, dette må pugges: 1490 nm nedstrøms og 1310 nm oppstrøms.'},
{t:'num',q:'GPON har 2,5 Gbps nedstrøms og splitt 1:64. Hvor mye får hver bruker i snitt når alle laster samtidig?',a:39,tol:.02,u:'Mbps',e:'<b>Formel:</b> rate per bruker $=R/N$. <b>Utregning:</b> $2500/64\\approx39$ Mbps.'},
{t:'mc',y:'2023',fix:1,q:'What is the most correct statement regarding capacity upstream and downstream in a NG-PON?',o:['The upstream capacity is shared and the downstream capacity is also shared.','The upstream capacity is always higher than the downstream capacity.','The downstream capacity is always higher than the upstream capacity.','It is always the same capacity upstream and downstream'],a:0},
{t:'ref',q:'Hvorfor er en passiv splitter en stor driftsfordel for operatøren?',m:'Den trenger ikke strøm, kjøling eller vedlikehold, så det er ingen aktive punkter ute i felten som kan feile, og ingen strømkontrakter. Dermed blir driftskostnadene lave og påliteligheten høy.',k:['Ingen strøm eller kjøling','Mindre vedlikehold','Lavere driftskostnad']}
]},
{id:'tdma',title:'TDMA-PON: hvordan ONU-ene deler fiberen',html:String.raw`
<h3>Nedstrøms: kringkasting</h3>
<p>OLT sender alt til alle gjennom splitteren. Hver ONU filtrerer på MAC-adresse. Sikkerhetsproblemet er at enhver ONU kan fange opp alt. Derfor brukes kryptering, for eksempel AES.</p>
<div class="ana"><b>Analogi: Høyttaleren på skolen</b><p>Rektor leser opp beskjeder over høyttaleren. Alle hører alt, og hver elev bryr seg bare om sitt navn. Det er enkelt, men alle kan høre andres beskjeder. Derfor må innholdet krypteres.</p></div>
<h3>Oppstrøms: tidsluker</h3>
<p>Oppstrøms er problemet større. Alle ONU-er sender på samme bølgelengde inn i samme fiber, men de kan ikke høre hverandre: splitteren sender lys bare mot OLT. Lange avstander gjør også kollisjonsdeteksjon upraktisk. Derfor styrer OLT alt med tidsluker.</p>
<div class="ana"><b>Analogi: Bekkene i trakten</b><p>Mange bekker renner ned i samme trakt, og de kan ikke se hverandre. De kan ikke vente på en pause, for de hører ingen pause. Noen må derfor bestemme fra toppen hvem som får slippe når. Den rollen har OLT.</p></div>
<p>ONU-ene står i ulik avstand fra OLT. For at sendingene skal passe inn i lukene, må hver ONU kjenne sin forsinkelse. Denne prosessen heter <b>ranging</b>.</p>
<div class="ana"><b>Analogi: Forskjøvet start på løpebanen</b><p>På løpebanen starter ytterbanene lenger fram, slik at alle får samme distanse. Ranging er det motsatte av å starte likt: hver ONU sender litt tidligere jo lenger unna den er, slik at alle kommer riktig fram hos OLT.</p></div>
<div class="exam"><b>Eksamen 2023 og 2024</b><p>Ranging: hver ONU måler sin forsinkelse til OLT og justerer klokken.</p></div>
[[w:pontdma]]
<div class="tw"><table><tr><th></th><th>Statisk</th><th>Statistisk</th></tr><tr><td>Tidsluke</td><td>Fast per ONU</td><td>Etter behov</td></tr><tr><td>Tom kapasitet</td><td>Idle-mønster</td><td>Gjenbrukes</td></tr><tr><td>Signalering</td><td>Ingen</td><td>Betydelig (køstørrelser)</td></tr></table></div>
<h3>TDMA oppsummert</h3>
<p>Rundt 20 km, splitt 1:16–1:64. Nedstrøms kringkastes. Oppstrøms bruker TDMA med statistisk multipleksing, med guard-tider mellom lukene.</p>
<p>Pros: enkel, billig, moden. Cons: krever presis synkronisering og skalerer dårlig.</p>
<h3>Andre aksessmetoder</h3>
<p>Eksamen 2023 spurte om disse:</p>
<ul><li><b>SCMA:</b> hver ONU bruker sin egen elektriske underbærer.</li><li><b>OCDMA:</b> hver ONU bruker sin egen signatursekvens av optiske pulser.</li></ul>`,
quiz:[
{t:'mc',y:'2024',q:'In PON for telephony (TPON), ONUs should be synchronized through a process called ………',o:['ranging','time division multiplexing','sub carrier multiplexing','zoning'],a:0},
{t:'mc',y:'2023',q:'Which multiple access technique requires each ONU to use a different signature sequence of optical pulses used to on-off modulate the data?',o:['OCDMA','TDMA','SCMA','WDMA'],a:0},
{t:'mc',q:'Hvorfor kan ikke ONU-er bruke CSMA/CD oppstrøms?',o:['De kan ikke høre hverandre gjennom splitteren','De har ikke lasere','OLT tillater ikke Ethernet','Fiberen er for tynn'],a:0},
{t:'num',q:'ONU-er er 2 km og 20 km fra OLT. Hva er forskjellen i enveis forsinkelse, med $2\\cdot10^8$ m/s?',a:90,tol:.01,u:'µs',e:'<b>Formel:</b> $\\Delta t=\\Delta d/v$. <b>Utregning:</b> $\\Delta d=20-2=18$ km. $\\dfrac{18\\,000}{2\\cdot10^8}=9\\cdot10^{-5}$ s $=90$ µs.'},
{t:'ref',q:'Forklar hvorfor nedstrøms kringkasting er en sikkerhetsrisiko i PON, og hvordan den håndteres.',m:'Splitteren sender samme signal til alle ONU-er, så en manipulert ONU kan lese andres trafikk. Trafikken krypteres, for eksempel med AES, slik at hver ONU bare kan dekryptere sin egen.',k:['Alle ONU-er mottar alt','Kryptering brukes']}
]},
{id:'wdmpon',title:'WDM-PON: egen bølgelengde til hver',html:String.raw`
<div class="why"><b>Hvorfor?</b><p>I TDMA-PON er kapasiteten delt, og hver ekstra bruker får mindre. <b>WDM-PON</b> gir hver bruker sin egen bølgelengde. Dermed trengs mindre synkronisering, kapasiteten blir høyere og sikkerheten bedre. Prisen er dyrere lasere og mottakere.</p></div>
<div class="ana"><b>Analogi: Privat felt</b><p>TDMA-PON er ett felt der bilene må vente på tur. WDM-PON gir hver bruker sitt eget felt. Du slipper både køen og synkroniseringen mot naboen, men hvert felt koster mer å bygge.</p></div>
[[w:wdmpon]]
<h3>Broadcast-and-select</h3>
<p>OLT sender mange bølgelengder gjennom en vanlig 1:N-splitter. Alle ONU-er får alle bølgelengdene og plukker ut sin med et filter eller en avstembar transceiver. Oppstrøms deler ONU-ene en felles bølgelengde i tid. Enkel utenfor sentralen, men splittertapet rammer hver bølgelengde, så rekkevidden blir kortere.</p>
<h3>WRPON</h3>
<p><b>WRPON</b> bytter splitteren med en <b>AWG</b>. Den sender hver bølgelengde til sin ONU. Dette gir dedikerte punkt-til-punkt-tjenester. Ulempen: det trengs to dyre lasere per ONU (én i ONU-en og én i OLT).</p>
<div class="ana"><b>Analogi: Avisen og postsorteringen</b><p>Broadcast-and-select er at alle får hele avisen og klipper ut sin side. Splitteren må dele papiret på alle, så hver får bare en tynn stripe av effekten. En AWG er postsorteringen: hvert brev går rett i riktig postkasse, og ingen effekt går til dem som ikke skal ha den.</p></div>
<h3>AWG</h3>
<p>AWG er en passiv bølgelengderuter og fungerer begge veier: nedstrøms demultiplekser den, oppstrøms multiplekser den. Fordeler: <b>ingen kringkastingstap</b>, bedre budsjett, lengre rekkevidde og god isolasjon mellom brukere.</p>
<div class="ana"><b>Analogi: Prismet</b><p>Et prisme sender hver farge i sin egen retning uten strøm. Sender du fargene motsatt vei, samles de igjen. Slik virker AWG også, og derfor kan samme enhet demultipleksere nedstrøms og multipleksere oppstrøms.</p></div>
<div class="trap"><b>Fra eksamen 2025, MC 13</b><p>«AWG is an active wavelength router» er feil: den er passiv. «Not used in WDM-PON because of broadcast loss» er feil. «Weak isolation» er feil.</p></div>
<h3>RITENET</h3>
<p>Hovedidé: en laser er dyr, så la ONU-en låne lys fra sentralen. Hver ONU har en <b>ekstern modulator</b> i stedet for en laser.</p>
<div class="ana"><b>Analogi: Speilet på fjelltoppen</b><p>Du står på en fjelltopp uten lykt. En venn lyser på deg fra dalen, og du holder opp et speil og vipper det for å blinke tilbake. Du sender beskjeder uten å ha egen lyskilde. ONU-en er speilet, og den eksterne modulatoren er håndleddet ditt.</p></div>
[[f:ritenet|RITENET må du kunne tegne: laser og WDM-mottaker i CO, AWG i feltet, og kobler, mottaker og modulator i hver ONU.]]
<ol><li>Rammen fra sentralen har to deler: nedstrøms data og en tom, umodulert del.</li><li>ONU-en leser datadelen.</li><li>Under den tomme delen modulerer ONU-en sine egne data på lyset fra sentralen.</li><li>Lyset går tilbake gjennom AWG, som samler bølgelengdene til sentralens mottaker.</li></ol>
<p>Merknad fra Canvas: i det opprinnelige RITENET brukes samme bølgelengde begge veier, og kobleren tapper av en del av lyset til mottakeren. I en oppgradert versjon skilles retningene med bølgelengde. Kobler er det generelle ordet. Derfor heter blokken «Coupler» i figuren.</p>
<h3>LARNET</h3>
<p><b>LARNET</b> bruker en billig LED i ONU-en i stedet for modulator. LED-en sender bredt, og AWG-en lar bare riktig smal bit passere. Det kalles spectral slicing.</p>
<div class="ana"><b>Analogi: Hvit lyspære bak farget glass</b><p>En vanlig lyspære lyser i alle farger. Setter du farget glass foran, slipper bare én farge ut. Mye av lyset går tapt, men pæren er billig. AWG-en er det fargede glasset som skjærer ut bølgelengden til hver ONU.</p></div>
[[f:larnet|LARNET. LED-en sender et bredt spekter, og AWG-en «skjærer» ut riktig bølgelengde.]]
<h3>Framtiden</h3>
<p>WDM-PON gir deterministisk båndbredde og sterk isolasjon. Kombinert med TDMA kan én enhet skaleres til 1:1000. <b>NG-PON2</b> bruker både tid og bølgelengde (TWDM).</p>`,
quiz:[
{t:'mc',y:'2025',fix:1,q:'Arrayed Waveguide Grating (AWG)',o:['Is an active wavelength router component, working in a reciprocal mode, i.e. same AWG is used to demultiplex downstream and multiplex upstream.','Plays an important role in Wavelength-Routed PON (WR-PON) since it combines different wavelengths coming from each ONU, back to OLT (in upstream). Furthermore, in downstream, the AWG directs different wavelengths to the corresponding ONUs.','Is not used in Wavelength Division Multiplexing Passive Optical Network (WDM-PON) because it suffers from broadcast loss.','Results in weak isolation between the users in WR-PON.'],a:1},
{t:'num',q:'Splittertap for 1:32 med $10\\log_{10}N$. Svar i dB (ett desimal).',a:15,tol:.01,u:'dB',e:'<b>Formel:</b> splittertap $=10\\log_{10}N$. <b>Utregning:</b> $10\\log_{10}32=10\\cdot1{,}505=15{,}05$ dB.'},
{t:'mc',q:'Hvilket utstyr har en RITENET-ONU i stedet for laser?',o:['Ekstern modulator','LED','Splitter','EDFA'],a:0},
{t:'mc',q:'Hva har en LARNET-ONU i stedet for laser?',o:['LED','Ekstern modulator','AWG','Sirkulator'],a:0},
{t:'ref',y:'2025',q:'Explain how downstream wavelength delivery works in Broadcast-and-Select WDM-PON and WRPON.',m:'B&S: the OLT sends several wavelengths at once, a passive 1:N splitter distributes all of them to all ONUs, and each ONU uses a filter or a tunable transceiver to pick out its own. WRPON: the OLT sends several wavelengths into an AWG, which routes the wavelengths so each ONU receives only its own.',k:['B&S: everyone gets all wavelengths through the splitter','B&S: filter in the ONU','WRPON: the AWG routes','WRPON: each ONU gets only its own']},
{t:'ref',y:'2025',q:'Name two advantages of using an AWG in a WDM-PON system.',m:'Two of: no broadcast loss, better power budget, longer reach, good isolation between users.',k:['Two valid advantages']},
{t:'ref',y:'2025',q:'Describe how ONUs in a RITENET system send upstream data to the OLT.',m:'The ONU takes the unmodulated light sent from the CO and uses an external modulator to imprint its upstream data on this blank carrier.',k:['Uses the light from the CO','External modulator','Sends back through the AWG']},
{t:'ref',y:'2023',q:'WRPONs are not economical due to the need of lasers at the ONU and OLT. Describe one WRPON architecture where this drawback can be addressed.',m:'RITENET: a tunable laser in the CO. The frame has a data part and a return part where the laser stays on. The ONU has an external modulator and modulates the light in the return part. No laser in the ONU. Alternatively LARNET: an LED in the ONU, and the spectrum is sliced by the AWG.',k:['Names RITENET or LARNET','Explains what replaces the laser','Explains the upstream mechanism']}
]},
{id:'budsjett',title:'Effektbudsjett',html:String.raw`
<div class="why"><b>Hvorfor?</b><p>Mottakeren trenger en minste effekt for å lese signalet. Spørsmålet er alltid: kommer det nok lys fram etter alle tap? Effektbudsjettet svarer på det med enkel addisjon, takket være dB.</p></div>
<div class="ana"><b>Analogi: Lønna og regningene</b><p>Sendereffekten er lønna. Hvert tap er en regning. Mottakerfølsomheten er det du minst må ha igjen for å klare deg, og systemmarginen er buffer på kontoen. Så lenge lønna dekker regningene, minstebeløpet og bufferen, går regnskapet opp.</p></div>
<p>Formelen fra formelarket:</p>
$$P_{tr}=P_{rec}+C_L+M_S$$
<ul><li>$P_{tr}$: sendereffekt (dBm).</li><li>$P_{rec}$: <b>mottakerfølsomhet</b> (dBm).</li><li>$C_L$: alle tap (dB).</li><li>$M_S$: <b>systemmargin</b> (dB), reserve for aldring og reparasjoner.</li></ul>
<p>Husk at −30 dBm er 1 µW. Optiske mottakere er svært følsomme.</p>
<h3>Hva går inn i $C_L$?</h3>
<div class="tw"><table><tr><th>Tap</th><th>Formel</th></tr><tr><td>Fiber</td><td>$\alpha L$</td></tr><tr><td>Skjøter</td><td>$n\cdot l_{sp}$, der $n=L/l-1$</td></tr><tr><td>Kontakter</td><td>Antall × tap per kontakt</td></tr><tr><td>Splitter 1:N</td><td>$10\log_{10}N$ (ideelt)</td></tr></table></div>
<p>Tall å huske: 1:2 = 3 dB, 1:4 = 6, 1:8 = 9, 1:16 = 12, 1:32 = 15, 1:64 = 18. Hvert trinn er +3 dB.</p>
<div class="ana"><b>Analogi: Kaken</b><p>Hver gang du deler i to, får hver gjest halvparten av kaken. Halvparten er $-3$ dB. Derfor koster hver dobling av antall utganger 3 dB, uansett hvor stor splitteren er fra før.</p></div>
<div class="trap"><b>Felle</b><p>Antall skjøter er $L/l-1$. 10 km med skjøt hver 2 km gir 5 strekk og 4 skjøter, ikke 5.</p></div>
<div class="ana"><b>Analogi: Gjerdestolper</b><p>Et gjerde med fem felt har seks stolper, og to av dem står i endene. Skjøtene er bare stolpene imellom. Endene er kontakter, så fem strekk gir fire skjøter.</p></div>
[[w:budget]]
<div class="ex"><b>Forelesning</b><p>10 km, $P_t=-6$ dBm, $\alpha=0{,}24$, skjøt hver 2 km à 0,3 dB, 2 kontakter à 0,5 dB, $P_r=-20$ dBm, margin 6 dB.</p><p>Tilgjengelig: $-6-(-20)=14$ dB. Tap + margin: $2{,}4+1{,}2+1+6=10{,}6$ dB. $10{,}6<14$: linken holder.</p></div>
<div class="ex"><b>Eksamen 2025</b><p>Splitter 15, $\alpha=0{,}25$, kontakter 1, margin 3, $P_t=3$, $P_r=-28$.</p><p>$19+0{,}25L\le31$, så $L\le48$ km.</p></div>
<div class="ex"><b>Eksamen 2024</b><p>$-4$ dBm, 20 km à 0,25, splitter 12, 4 kontakter à 0,5, margin 6.</p><p>$P_{rec}=-4-(5+12+2)-6=-29$ dBm.</p><p>Punktene langs linken: $-4$; $-4{,}5$; $-7$; $-7{,}5$; $-19{,}5$; $-20$; $-22{,}5$; $-23$.</p></div>
<h3>Hvor skal splitterne stå?</h3>
<p>Eksemplet bruker fiber med 0,3 dB/km. Tilfelle 1: alle brukere har samme fiberlengde, 11 km. Tapet er det samme hvor enn 1:32-splitteren står: $0{,}3+15+3=18{,}3$ dB.</p>
<p>Tilfelle 2: én bruker bor langt unna. Med én 1:32-splitter etter 10 km og 55 km videre ut til brukeren: $3+15+16{,}5=34{,}5$ dB. Med 1:2-splitter etter 1 km og 50 km videre: $0{,}3+3+15=18{,}3$ dB. De nære brukerne får samme tap i begge designene, fordi 1:2 og 1:16 gir $3+12=15$ dB.</p>
<div class="key"><b>Regel</b><p>Har brukerne svært ulik avstand: splitt litt nær sentralen, og plasser høye splittere nær klyngen med nære brukere.</p></div>`,
quiz:[
{t:'mc',q:'Hvilken av disse hører ikke hjemme i $C_L$?',o:['Systemmargin','Splittertap','Kontakttap','Fiberdemping'],a:0,e:'Marginen er et eget ledd, $M_S$.'},
{t:'num',y:'2025',q:'Splitter 15 dB, fiber 0.25 dB/km, connectors 1 dB total, margin 3 dB, OLT +3 dBm, ONU -28 dBm. Maximum fiber length?',a:48,tol:0,u:'km',e:'<b>Formula:</b> $P_{tr}=P_{rec}+C_L+M_S$, with $C_L=$ splitter + connectors + $\\alpha L$. <b>Calculation:</b> $C_L=P_{tr}-P_{rec}-M_S=3-(-28)-3=28$ dB. $15+1+0.25L=28$ gives $0.25L=12$, so $L=48$ km.'},
{t:'num',y:'2024',q:'20 km, 0.25 dB/km, splitter 12 dB, 4 connectors of 0.5 dB, margin 6 dB, transmitter -4 dBm. Required receiver sensitivity?',a:-29,tol:0,u:'dBm',e:'<b>Formula:</b> $P_{rec}=P_{tr}-C_L-M_S$, with $C_L=\\alpha L$ + splitter + connectors. <b>Calculation:</b> $C_L=20\\cdot0.25+12+4\\cdot0.5=5+12+2=19$ dB. $P_{rec}=-4-19-6=-29$ dBm.'},
{t:'num',q:'Antall skjøter i 12 km fiber med skjøt hver 3 km?',a:3,tol:0,e:'<b>Formel:</b> antall skjøter $n=L/l-1$. <b>Utregning:</b> $12/3-1=3$.'},
{t:'num',q:'Forelesningseksempelet: tap + margin?',a:10.6,tol:.001,u:'dB',e:'<b>Formel:</b> $C_L+M_S=\\alpha L+n\\cdot l_{sp}+$ kontakter $+M_S$, med $n=L/l-1$. <b>Utregning:</b> Fiber: $0{,}24\\cdot10=2{,}4$. Skjøter: $n=10/2-1=4$, og $4\\cdot0{,}3=1{,}2$. Kontakter: $2\\cdot0{,}5=1$. Margin: 6. Sum $2{,}4+1{,}2+1+6=10{,}6$ dB. Tilgjengelig er $-6-(-20)=14$ dB, så linken holder.'},
{t:'num',q:'Du bytter 1:16 med 1:64 i et budsjett. Hvor mye tap ekstra får du?',a:6,tol:.02,u:'dB',e:'<b>Formel:</b> splittertap $=10\\log_{10}N$. <b>Utregning:</b> $10\\log_{10}64-10\\log_{10}16=18-12=6$ dB. Det er to doblinger à 3 dB.'},
{t:'num',y:'2022',q:'Fibre 1800 km at 0.20 dB/km, plus 3 + 4 + 5 + 6 dB in nodes. Total attenuation?',a:378,tol:0,u:'dB',e:'<b>Formula:</b> total attenuation $=\\alpha L+$ loss in the nodes. <b>Calculation:</b> $1800\\cdot0.20=360$ dB. $3+4+5+6=18$ dB. $360+18=378$ dB.'},
{t:'num',y:'2022',q:'Same link: Tx 0 dBm, Rx -16 dBm, margin 2 dB. Minimum total amplification?',a:364,tol:0,u:'dB',e:'<b>Formula:</b> $P_{rec}=P_{tr}-\\text{loss}-M_S+G$, so $G=P_{rec}-P_{tr}+\\text{loss}+M_S$. <b>Calculation:</b> $G=-16-0+378+2=364$ dB.'},
{t:'ref',q:'Hvorfor trenger du systemmargin?',m:'Komponenter eldes, kontakter blir skitne, og reparasjoner legger til skjøter. Uten margin kan en link som virker i dag, slutte å virke etter noen år.',k:['Aldring','Reparasjoner og nye skjøter','Sikrer drift over levetiden']}
]},
{id:'eks',title:'Eksamensoppgaver',quizTitle:'Som på eksamen',html:String.raw`<p>Tegn på papir. Tegneoppgavene får også egen øvingsside under «Tegneoppgaver».</p>`,
quiz:[
{t:'ex',y:'2025',pts:5,q:'PON: splitter 15 dB, fibre 0.25 dB/km, connectors 1 dB total, margin 3 dB, OLT +3 dBm, ONU -28 dBm.<br>a) Maximum fiber length [2p]<br>b) Two advantages of PON over AON [1p]<br>c) Two reasons why P2P is impractical for large-scale FTTH [2p]',s:String.raw`<p>a) $P_{tr}=P_{rec}+C_L+M_S$. Available: $3-(-28)=31$ dB. Fixed losses and margin: $15+1+3=19$ dB. $19+0.25L\le31$ gives $0.25L\le12$, so $L\le48$ km.</p><p>b) No power in the field; fewer fibers and transceivers.</p><p>c) One fiber per user; one pair of transceivers per user.</p>`},
{t:'ex',y:'2025',pts:10,q:'An operator upgrades to WDM-PON. Option 1: Broadcast-and-Select. Option 2: WRPON.<br>a) How does downstream wavelength delivery work in each? [4p]<br>b) Two advantages of AWG [1p]<br>c) Draw RITENET, label the components, and explain why it is cost-effective. [3p]<br>d) How do ONUs send upstream? [2p]',s:String.raw`<p>a) B&S: the OLT sends several wavelengths, a passive 1:N splitter delivers all of them to all ONUs, and each ONU selects its own with a filter or tunable transceiver. WRPON: an AWG routes each wavelength to its own ONU.</p><p>b) No broadcast loss, better power budget, longer reach, good isolation.</p><p>c) The drawing must show the CO with laser and receiver, the AWG, and ONUs with coupler, receiver and modulator. It is cost-effective because the ONU has a modulator instead of a laser.</p><p>d) The ONU takes unmodulated light from the CO and modulates its data onto it.</p>`},
{t:'ex',y:'2024',pts:6,q:'Link: OLT -4 dBm, connectors at A and B, 10 km fiber, splitter 12 dB (1:16), 10 km fiber, connectors at the splitter and at the ONU (4 connectors of 0.5 dB in total), fiber 0.25 dB/km, margin 6 dB.<br>(i) Receiver sensitivity? [2p]<br>(ii) Optical power at A–H. [4p]',s:String.raw`<p>(i) $C_L=20\cdot0.25+12+4\cdot0.5=5+12+2=19$ dB. $P_{rec}=P_{tr}-C_L-M_S=-4-19-6=-29$ dBm.</p><p>(ii) Subtract each loss in turn: connector 0.5, 10 km fiber 2.5, connector 0.5, splitter 12, connector 0.5, 10 km fiber 2.5, connector 0.5. A $-4$; B $-4.5$; C $-7$; D $-7.5$; E $-19.5$; F $-20$; G $-22.5$; H $-23$ dBm. After the margin: $-29$ dBm.</p>`}
]}
]});

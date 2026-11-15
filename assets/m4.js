C.add({id:'m4',nr:4,part:'wl',short:'WLAN og Bluetooth',src:'Forelesning 4 · Schiller 7.2, 7.3–7.3.5.3, 7.5–7.5.5',
title:'WLAN og Bluetooth: MAC i praksis',
lead:String.raw`Nå ser du hva protokollene fra modul 3 blir til i to systemer du bruker hver dag. Eksamen elsker tre ting her: tidsregnskap med RTS/CTS, formelen for datarate i 802.11, og polling i Bluetooth.`,
goals:[String.raw`skille infrastruktur, ad hoc og mesh`,String.raw`bruke SIFS, DIFS, NAV og backoff til å regne kanaltid`,String.raw`beregne maksimal datarate i 802.11`,String.raw`beskrive piconet, hopping og polling i Bluetooth, og regne datarate per slave`],
sections:[
{id:'wlan',title:'802.11: arkitektur',html:String.raw`
<p>Wi-Fi er standardisert av IEEE. I 802-familien er 802.3 Ethernet, 802.11 <b>WLAN</b> og 802.15 <b>WPAN</b>. 802.11 definerer det fysiske laget og MAC-underlaget i datalinklaget. Det bruker lisensfrie bånd på 2,4 GHz, 5 GHz og 6 GHz.</p>
<p>Designmål: global drift, lavt effektbruk, ingen lisens, enkelt oppsett, beskyttelse av investeringen i kablet nett, og transparens for applikasjoner. Det siste betyr at programmene ikke skal merke at nettet er trådløst.</p>
<h3>DFS på 5 GHz</h3>
<p>Deler av 5 GHz-båndet brukes av radar. <b>DFS</b> gjør at Wi-Fi viker. Før bruk lytter AP-et i typisk 60 sekunder (Channel Availability Check). Under drift lytter det videre og må flytte seg innen typisk 10 sekunder hvis det finner radar.</p>
<div class="ana"><b>Analogi: Utrykningskjøretøyet</b><p>Du kan kjøre der du vil, men hører du sirener, må du vike straks. Radaren har forrang i dette båndet, så Wi-Fi må lytte hele tiden og flytte seg.</p></div>
<h3>Tre arkitekturer</h3>
<div class="tw"><table><tr><th>Arkitektur</th><th>Kjennetegn</th><th>Begreper</th></tr>
<tr><td><b>Infrastruktur</b></td><td>Stasjoner snakker gjennom et AP</td><td><b>BSS</b>: stasjonene hos ett AP. <b>ESS</b>: flere BSS. <b>Distribusjonssystem</b>: binder AP-ene sammen. <b>SSID</b>: nettnavnet</td></tr>
<tr><td><b>Ad hoc</b></td><td>Direkte, midlertidig, uten AP. Ingen videresending</td><td><b>IBSS</b></td></tr>
<tr><td><b>Mesh</b></td><td>Trafikken går over flere trådløse hopp</td><td>Mesh STA, Mesh AP, Mesh Portal</td></tr></table></div>
<div class="ana"><b>Analogi: Resepsjon, lapp og stafett</b><p>Infrastruktur er et kontor der alt går via resepsjonen. Ad hoc er to kolleger som sender en lapp direkte til hverandre. Mesh er en stafett der hver person leverer pinnen videre til neste, slik at beskjeden når langt uten resepsjon.</p></div>
<div class="ex"><b>Forelesningsoppgave</b><p>Overvåkingskameraer som videresender for hverandre: mesh. Campus-Wi-Fi med sentral styring: infrastruktur.</p></div>
<div class="trap"><b>Merk</b><p>Eksamen 2022 sa at ad hoc bruker «multi-hop routing». Forelesningen i 2026 sier at ad hoc (IBSS) har <i>ingen</i> videresending, og at det er mesh som bruker flere hopp. Følg 2026-definisjonen, men nevn gjerne «ingen AP», som er kjernen i svaret uansett.</p></div>
<h3>Lagene</h3>
<p>PHY har to underlag: <b>PLCP</b> gjør bærebølgelytting (Clear Channel Assessment) og lager rammeformat. Physical Medium Dependent tar seg av modulasjon og bit. MAC håndterer aksess, fragmentering, feilkontroll og kryptering. MAC management håndterer synkronisering, roaming og effektstyring.</p>`,
quiz:[
{t:'mc',q:'En sensor i ytterkanten kan bare nå kontrollsenteret via andre sensorer. Hvilken arkitektur?',o:['Mesh','Infrastruktur','Ad hoc (IBSS)','Scatternet'],a:0},
{t:'ref',y:'2022',q:'How is the ad hoc architecture different from the infrastructure architecture in WLAN?',m:'Ad hoc has no access points. The devices talk directly to each other. Infrastructure uses an AP as a hub that the stations go through.',k:['Ad hoc: no AP','The stations communicate directly','Infrastructure: all traffic goes through the AP']},
{t:'num',q:'Hvor lenge må et AP typisk lytte etter radar på en DFS-kanal i Europa før bruk?',a:60,tol:0,u:'s',e:'Channel Availability Check, typisk 60 s.'},
{t:'ref',q:'Hvorfor er ESS nyttig for en bruker som går rundt på campus?',m:'Alle AP-ene har samme SSID og er bundet sammen av distribusjonssystemet. Brukeren kan flytte seg mellom BSS-er uten å bytte nett, og forbindelsen fortsetter via roaming.',k:['Flere BSS med samme nett','Distribusjonssystem binder dem sammen','Roaming uten å miste nettet']}
]},
{id:'dcf',title:'802.11 MAC: DCF, IFS og backoff',html:String.raw`
<p>Tre aksessmetoder finnes i 802.11:</p>
<ol><li><b>CSMA/CA</b> (påkrevd): standardmetoden.</li><li><b>RTS/CTS</b> (valgfri): mot skjulte terminaler. Basert på MACA.</li><li><b>Polling</b> (valgfri): AP poller. Sjelden brukt i moderne nett.</li></ol>
<p>De to første er <b>DCF</b>, grunnmetoden. Polling er <b>PCF</b>, som bruker en sentral koordinator.</p>
<h3>Prioritet gjennom ventetid</h3>
<p>Det elegante trikset i 802.11 er at prioritet ikke trenger meldinger. Den som må vente kortest, kommer først til. <b>IFS</b> gir tre nivåer:</p>
<div class="ana"><b>Analogi: Pausen i samtalen</b><p>Får du et spørsmål, svarer du nesten med én gang. Andre venter på en lengre pause før de tar ordet. Ingen trenger å melde prioritet, for den som har kortest ventetid, kommer alltid først. SIFS er svaret, og DIFS er pausen de andre må vente.</p></div>
<div class="tw"><table><tr><th>IFS</th><th>Lengde</th><th>Brukes til</th></tr><tr><td><b>SIFS</b></td><td>Kortest</td><td>ACK, CTS, svar på polling</td></tr><tr><td><b>PIFS</b></td><td>Middels</td><td>Tidskritiske rammer</td></tr><tr><td><b>DIFS</b></td><td>Lengst</td><td>Vanlige data</td></tr></table></div>
<p>Derfor kommer alltid ACK foran nye data: SIFS &lt; DIFS, så mottakeren svarer før noen andre rekker å starte.</p>
<h3>CSMA/CA i 802.11</h3>
<ol><li>Lytt på mediet.</li><li>Ledig i hele IFS-en: send.</li><li>Opptatt: vent til det er ledig i en hel IFS, og vent deretter en tilfeldig backoff.</li><li>Blir kanalen opptatt under backoff: <b>frys telleren</b> og fortsett senere.</li></ol>
<p>Frysing gir rettferdighet. Den som taper en runde, starter neste med lavere tall.</p>
<div class="ana"><b>Analogi: Kølappen</b><p>Du beholder plassen når køen stopper, du går ikke bakerst. Telleren fryser og fortsetter der den var, så den som har ventet lenge, har stadig kortere igjen.</p></div>
[[w:backoff]]
<div class="ex"><b>Eksamen 2022</b><p>Etter første DIFS trekker S1 $B_1=5$ og S2 $B_2=9$. S1 får kanalen. S2 fryser på $9-5=4$. I neste runde har S2 rest 4 mens S1 trekker ny $B_1=7$. S2 vinner.</p></div>`,
quiz:[
{t:'mc',y:'2023',fix:1,q:'According to IEEE 802.11 standard for WLAN:',o:['MACA CANNOT be used for medium access control.','CDMA is applied to regulate access to the wireless medium.','ALOHA is being used for medium access control.','CSMA/CA is a mandatory mechanism for medium access control.'],a:3},
{t:'num',y:'2022',q:'S1 has backoff 5 and S2 has backoff 9. S1 wins. What is the remaining backoff of S2?',a:4,tol:0,e:'<b>Formula:</b> The backoff freezes while the channel is busy: remainder $=B_2-B_1$. <b>Calculation:</b> $9-5=4$.'},
{t:'ref',y:'2022',q:'How is the ACK given higher priority over data packets?',m:'The ACK is sent after SIFS, while data must wait DIFS. Since SIFS is shorter than DIFS, the receiver always answers before any other station can start.',k:['ACK uses SIFS','Data uses DIFS','SIFS is shorter']},
{t:'ref',q:'Hvorfor fryser backoff i stedet for å starte på nytt når kanalen blir opptatt?',m:'Frysing gir rettferdighet. Den som har ventet lenge, har lavt restnummer og kommer snart fram. Med nytrekk kunne en stasjon vært uheldig gang på gang.',k:['Rettferdighet','Tidligere ventetid telles','Unngår at noen sulter']}
]},
{id:'rtscts',title:'RTS/CTS og NAV',html:String.raw`
<p>RTS/CTS bruker MACA-ideen. En RTS-terskel avgjør bruken: rammer under terskelen sendes rett, større rammer bruker RTS/CTS. Begrunnelsen: en kollisjon med en stor ramme er dyr, så da lønner det seg å betale litt ekstra først.</p>
<p>Sekvensen er:</p>
<div class="key"><b>Tidsregnskapet</b><p>$$T=\text{DIFS}+\text{backoff}+\text{RTS}+\text{SIFS}+\text{CTS}+\text{SIFS}+\text{DATA}+\text{SIFS}+\text{ACK}$$</p></div>
<p>RTS inneholder <b>Duration</b>-feltet som sier hvor lenge resten av utvekslingen varer. Alle som hører RTS eller CTS setter sin <b>NAV</b>, en nedtellingsklokke. Så lenge NAV løper, betrakter stasjonen kanalen som opptatt, uten å lytte på den.</p>
<div class="ana"><b>Analogi: «Opptatt til 14.30»</b><p>Skiltet på møterommet sier hvor lenge det er opptatt. Du trenger ikke stå og lytte ved døra, du kan bare komme tilbake 14.30. NAV er det skiltet: stasjonen teller ned uten å lytte på kanalen.</p></div>
[[w:rtscts]]
<div class="ex"><b>Eksamen 2025, 3d</b><p>SIFS 10, DIFS 50, data 1 ms, kontrollrammer 100 µs, backoff 70 µs:</p><p>$50+70+100+10+100+10+1000+10+100=1450$ µs.</p></div>
<h3>Hvordan løser det hidden og exposed?</h3>
<p><b>Skjult node:</b> den hører ikke senderen, men hører CTS fra mottakeren. Den setter NAV og holder seg stille under DATA/ACK.</p>
<p><b>Eksponert node:</b> den hører RTS, men ikke CTS, og vet dermed at den ikke kan forstyrre mottakeren.</p>
<h3>Når lønner det seg?</h3>
<p>Forelesningen spør hvilken kurve som er hvilken når antall stasjoner øker:</p>
<ul><li><b>Høy last:</b> RTS/CTS er best, fordi kollisjoner bare koster en kort RTS og ikke en hel dataramme.</li><li><b>Lav last:</b> vanlig CSMA/CA er litt bedre, fordi kollisjoner er sjeldne, så RTS/CTS bare er overhead.</li></ul>
<div class="ana"><b>Analogi: Bordbestilling for store selskap</b><p>Skal du spise alene, går du bare inn. Er dere tretti og restauranten er full, ringer du først. En kort telefon koster lite i forhold til at hele selskapet må snu. RTS/CTS lønner seg for store rammer og høy last.</p></div>`,
quiz:[
{t:'mc',q:'En skjult node hører ikke senderen. Hvordan vet den at den må tie?',o:['Den hører CTS fra mottakeren og setter NAV','Den hører RTS fra senderen','Den oppdager kollisjonen selv','AP poller den'],a:0,e:'CTS sendes av mottakeren, og den hører den skjulte noden.'},
{t:'num',y:'2025',q:'SIFS 10 µs, DIFS 50 µs, data 1 ms, RTS/CTS/ACK 100 µs each, backoff 70 µs. Total channel time?',a:1450,tol:0,u:'µs',e:'<b>Formula:</b> DIFS + backoff + RTS + SIFS + CTS + SIFS + DATA + SIFS + ACK. <b>Calculation:</b> $50+70+100+10+100+10+1000+10+100=1450$ µs.'},
{t:'num',q:'Samme system, men uten RTS/CTS. Hva er total kanaltid?',a:1230,tol:0,u:'µs',e:'<b>Formel:</b> DIFS + backoff + DATA + SIFS + ACK. <b>Utregning:</b> $50+70+1000+10+100=1230$ µs.'},
{t:'num',q:'NAV satt av CTS: tid igjen etter CTS er SIFS + DATA + SIFS + ACK. Regn dette for tallene over.',a:1120,tol:0,u:'µs',e:'<b>Formel:</b> $NAV_{CTS}=$ SIFS + DATA + SIFS + ACK. <b>Utregning:</b> $10+1000+10+100=1120$ µs.'},
{t:'ref',y:'2022',q:'What is NAV (Network Allocation Vector) used for?',m:'NAV is a timing mechanism. Stations that did not get access set their NAV from the duration in RTS and CTS. They then know how long they must wait.',k:['Timing mechanism','Set from RTS/CTS','Tells the station how long to wait']},
{t:'ref',y:'2025',q:'Explain the role of RTS and CTS frames.',m:'RTS is a short control frame from the sender that reserves the channel and states the duration. CTS is sent by the receiver if the channel is free, confirms the reservation and repeats the duration.',k:['RTS: reserves and states the duration','CTS: from the receiver','CTS confirms and repeats the duration']},
{t:'ref',q:'Når vil du slå på RTS/CTS i et nett? Svar ut fra last og rammestørrelse.',m:'Ved høy last, mange skjulte terminaler og store rammer. Da er kollisjoner hyppige og dyre. Ved lav last og små rammer er ekstrarammene bare overhead. Dette styres av RTS-terskelen.',k:['Lønner seg ved høy last','Lønner seg med store rammer','Lav last gir bare overhead']}
]},
{id:'mgmt',title:'Management og MAC-rammen',html:String.raw`
<h3>Effektstyring</h3>
<p>Radioen bruker mye strøm, så stasjoner sover mest mulig. AP buffrer data og sender jevnlig <b>beacon</b>-rammer som lister opp hvem som har data som venter. Alle våkner for å lese beaconen, og sovner igjen hvis det ikke er noe til dem.</p>
<div class="ana"><b>Analogi: Postboksene i resepsjonen</b><p>Hotellgjestene sover mens resepsjonen tar imot posten. Til faste tider henger resepsjonen opp en liste over hvem som har post. Alle kikker på listen, og den som ikke står der, legger seg igjen.</p></div>
<h3>Skanning og assosiering</h3>
<div class="tw"><table><tr><th>Passiv</th><th>Aktiv</th></tr><tr><td>1. AP-er sender beacon<br>2. Stasjonen sender Association Request<br>3. AP sender Association Response</td><td>1. Stasjonen sender Probe Request<br>2. AP-er sender Probe Response<br>3. Stasjonen sender Association Request<br>4. AP sender Association Response</td></tr></table></div>
<div class="ana"><b>Analogi: Skilt eller telefon</b><p>Passiv skanning er å gå forbi hoteller og lese skiltene. Aktiv skanning er å ringe rundt og spørre «er det noen her?». Det siste går raskere, men koster en samtale.</p></div>
<h3>Roaming</h3>
<p>Dårlig forbindelse? Stasjonen sender Reassociation Request til et annet AP. Svaret forteller om det gikk, ellers skanner den videre.</p>
<h3>MAC-rammen</h3>
<p>Fire felt du bør kjenne:</p>
<ul><li><b>Duration:</b> brukes av andre til å sette NAV.</li><li><b>More Fragment:</b> flere fragmenter kommer.</li><li><b>More Data:</b> AP har flere rammer til en sovende stasjon.</li><li><b>Subtype:</b> hvilken ramme dette er (RTS, CTS, ACK, data).</li></ul>
<p>Rammen har fire adressefelt, nyttelast 0–2312 byte og 32-bits CRC.</p>
<h3>Standardene</h3>
<div class="tw"><table><tr><th>Standard</th><th>PHY</th><th>Bånd</th><th>Maks</th></tr><tr><td>802.11</td><td>DSSS, FHSS</td><td>2,4</td><td>2 Mbps</td></tr><tr><td>802.11b</td><td>DSSS</td><td>2,4</td><td>11 Mbps</td></tr><tr><td>802.11a</td><td>OFDM</td><td>5</td><td>54 Mbps</td></tr><tr><td>802.11g</td><td>DSSS, OFDM</td><td>2,4</td><td>54 Mbps</td></tr><tr><td>802.11n (Wi-Fi 4)</td><td>OFDM, MIMO</td><td>2,4 / 5</td><td>600 Mbps</td></tr><tr><td>802.11ac (Wi-Fi 5)</td><td>OFDM, MU-MIMO, 256-QAM</td><td>5</td><td>6,9 Gbps</td></tr><tr><td>802.11ax (Wi-Fi 6)</td><td>OFDMA, 1024-QAM</td><td>2,4 / 5</td><td>9,6 Gbps</td></tr><tr><td>802.11be (Wi-Fi 7)</td><td>OFDMA, MU-MIMO, 4096-QAM</td><td>2,4 / 5 / 6</td><td>≥ 30 Gbps</td></tr></table></div>`,
quiz:[
{t:'mc',q:'Hvilket felt bruker andre stasjoner til å sette NAV?',o:['Duration','Subtype','More Data','CRC'],a:0},
{t:'mc',q:'I aktiv skanning, hvem starter?',o:['Stasjonen med Probe Request','AP med beacon','Stasjonen med Reassociation Request','Distribusjonssystemet'],a:0},
{t:'num',q:'Hvor mange steg er det i aktiv skanning og assosiering?',a:4,tol:0,e:'Probe Request, Probe Response, Association Request, Association Response.'},
{t:'ref',q:'Hvorfor må AP buffre data til sovende stasjoner, og hva er ulempen?',m:'En sovende stasjon kan ikke ta imot, så AP lagrer rammene og varsler i beacon. Stasjonen våkner, ser navnet sitt og henter dataene. Dette sparer strøm, men øker forsinkelsen.',k:['Sovende stasjon kan ikke motta','Beacon varsler om buffrede data','Sparer strøm, men øker forsinkelse']}
]},
{id:'rate',title:'Datarate i 802.11',html:String.raw`
<p>Formelen er på formelarket, så du må bare vite hva som skal inn:</p>
$$R=\frac{\text{bit per symbol}\cdot\text{koderate}\cdot\text{underbærebølger}\cdot\text{romlige strømmer}}{T_{sym}+T_{GI}}$$
<p>Les den slik: hver OFDM-symboltid sender hver underbærebølge noen bit, og det gjentas for hver strøm. Nevneren er total symboltid med guard interval.</p>
<div class="ana"><b>Analogi: Lastebilkolonnen</b><p>Tenk deg at det går en avgang hvert symbol. Underbærebølger er antall lastebiler i bredden, bit per symbol er kasser per bil, koderaten er andelen kasser med ekte vare, og romlige strømmer er antall parallelle veier. Ganger du dette og deler på tiden mellom avgangene, får du varer per sekund.</p></div>
[[w:wifirate]]
<div class="ex"><b>Eksamen 2025, oppgave 2</b><p>48 underbærebølger, 64-QAM, 3/4, $T=3{,}2$ µs, guard 0,8 µs:</p><p>$R=\dfrac{6\cdot\frac34\cdot48\cdot1}{3{,}2+0{,}8}=\dfrac{216}{4}=54$ Mbps. Med 2 strømmer: 108 Mbps.</p></div>
<div class="ex"><b>Eksamen 2022</b><p>16-QAM, 2/3, 48 bærebølger, 250 000 symboler/s per kanal:</p><p>$48\cdot250\,000\cdot4\cdot\frac23=32$ Mbps.</p></div>
<div class="tw"><table><tr><th></th><th>802.11ac</th><th>802.11ax</th></tr><tr><td>Modulasjon</td><td>256-QAM (8 bit)</td><td>1024-QAM (10 bit)</td></tr><tr><td>Koderate</td><td>5/6</td><td>5/6</td></tr><tr><td>Underbærebølger</td><td>2 × 234</td><td>2 × 980</td></tr><tr><td>Romlige strømmer</td><td>8</td><td>8</td></tr><tr><td>Symboltid</td><td>3200 ns</td><td>12 800 ns</td></tr><tr><td>Guard</td><td>400 ns (forelesning 4) eller 800 ns (oppsummeringen)</td><td>800 ns</td></tr><tr><td><b>Rate</b></td><td>6933 Mbps eller 6240 Mbps</td><td>9608 Mbps</td></tr></table></div>
<div class="trap"><b>To tall for 802.11ac</b><p>Forelesning 4 regner 802.11ac med guard 400 ns og får 6933 Mbps. Oppsummeringsforelesningen bruker 800 ns og får 6240 Mbps. Formelen er den samme, og bare nevneren er ulik. På eksamen bruker du det guard-intervallet oppgaven oppgir.</p></div>
<div class="ex"><b>Oppsummeringsforelesningen: 802.11ac</b><p>256-QAM (8 bit), koderate 5/6, $2\cdot234=468$ underbærebølger, 8 strømmer, $T=3{,}2$ µs, guard 0,8 µs:</p><p>$R=\dfrac{8\cdot\frac56\cdot468\cdot8}{3{,}2+0{,}8}=\dfrac{24\,960}{4}=6240$ Mbps.</p><p>Med guard 0,4 µs blir nevneren 3,6, og raten blir $24\,960/3{,}6\approx6933$ Mbps.</p></div>
<div class="ex"><b>Oppsummeringsforelesningen: 802.11ax</b><p>1024-QAM (10 bit), koderate 5/6, $2\cdot980=1960$ underbærebølger, 8 strømmer, $T=12{,}8$ µs, guard 0,8 µs:</p><p>$R=\dfrac{10\cdot\frac56\cdot1960\cdot8}{12{,}8+0{,}8}=\dfrac{130\,667}{13{,}6}\approx9608$ Mbps.</p></div>
<p>Hvordan øke raten? Alle fem faktorene kan brukes: høyere modulasjon, høyere koderate, flere underbærebølger, flere strømmer, kortere guard. Eksamen 2025 ba om to andre enn MIMO.</p>`,
quiz:[
{t:'mc',q:'Hva skjer med raten hvis du går fra 2 til 4 romlige strømmer, med alt annet likt?',o:['Den dobles','Den halveres','Den øker med 2 Mbps','Den er uendret'],a:0,e:'Strømmer står i telleren.'},
{t:'num',y:'2025',q:'N = 48, 64-QAM, Rc = 3/4, Tsym = 3.2 µs, Tguard = 0.8 µs. Max data rate?',a:54,tol:0,u:'Mbps',e:'<b>Formula:</b> $R=\\dfrac{N\\cdot\\log_2M\\cdot R_c}{T_{sym}+T_{guard}}$. <b>Calculation:</b> $48\\cdot6\\cdot\\tfrac34=216$ bits per OFDM symbol. $\\dfrac{216}{4\\text{ µs}}=54$ Mbps.'},
{t:'num',y:'2022',q:'802.11a: 16-QAM, code rate 2/3, 48 subcarriers, 250 000 symbols/s/subchannel. Data rate?',a:32,tol:0,u:'Mbps',e:'<b>Formula:</b> $R=N\\cdot\\log_2M\\cdot R_c\\cdot R_s$. <b>Calculation:</b> $48\\cdot4\\cdot\\tfrac23=128$ bits per symbol. $128\\cdot250\\,000=32\\cdot10^6$ bps $=32$ Mbps.'},
{t:'num',q:'802.11ac: 256-QAM, 5/6, 468 underbærebølger, 8 strømmer, 3,2 + 0,4 µs. Finn raten.',a:6933,tol:.002,u:'Mbps',e:'<b>Formel:</b> $R=\\dfrac{N_{ss}\\cdot N\\cdot\\log_2M\\cdot R_c}{T_{sym}+T_{guard}}$. <b>Utregning:</b> $8\\cdot468\\cdot8\\cdot\\tfrac56=24\\,960$ bit per symbol. $\\dfrac{24\\,960}{3{,}6\\text{ µs}}=6933$ Mbps.'},
{t:'num',q:'Fra 54 Mbps-systemet: guard kortes ned til 0,4 µs. Hva blir ny rate?',a:60,tol:.002,u:'Mbps',e:'<b>Formel:</b> $R=\\dfrac{N\\cdot\\log_2M\\cdot R_c}{T_{sym}+T_{guard}}$. <b>Utregning:</b> Bit per symbol er fortsatt $48\\cdot6\\cdot\\tfrac34=216$. $\\dfrac{216}{3{,}2+0{,}4}=\\dfrac{216}{3{,}6}=60$ Mbps.'},
{t:'ref',y:'2025',q:'Besides MIMO, name two other ways to further increase data rate in the given system.',m:'Two of: higher-order modulation, higher code rate, shorter guard interval, more data subcarriers.',k:['Two valid measures named']},
{t:'ref',q:'802.11ax har mye lengre symboltid enn 802.11ac. Hvorfor kan det likevel gi høyere rate?',m:'Lengre symboler gir plass til mange flere underbærebølger i samme bånd. Det er tettere subcarrier-avstand. Antall bit per symbol vokser mer enn symboltiden, og i tillegg brukes 1024-QAM. Guard blir også relativt mindre overhead.',k:['Flere underbærebølger','Høyere modulasjon','Mindre relativ overhead']},
{t:'num',q:'802.11ac slik oppsummeringsforelesningen regner: 256-QAM, 5/6, 468 underbærebølger, 8 strømmer, 3,2 + 0,8 µs. Finn raten.',a:6240,tol:.002,u:'Mbps',e:'<b>Formel:</b> $R=\\dfrac{N_{ss}\\cdot N\\cdot\\log_2M\\cdot R_c}{T_{sym}+T_{guard}}$. <b>Utregning:</b> $8\\cdot468\\cdot8\\cdot\\tfrac56=24\\,960$ bit per symbol. $\\dfrac{24\\,960}{4\\text{ µs}}=6240$ Mbps. Forelesning 4 bruker guard 0,4 µs og får 6933.'}
]},
{id:'bt',title:'Bluetooth',html:String.raw`
<p>Bluetooth ble laget for å erstatte kabler: kort rekkevidde (10 m), lav effekt, lav pris og ingen infrastruktur.</p>
<h3>Klassisk Bluetooth</h3>
<ul><li>2,4 GHz ISM-bånd, 79 kanaler med 1 MHz avstand.</li><li><b>FHSS</b> med 1600 hopp/s. Hver tidsluke er derfor 625 µs.</li><li><b>TDD</b> skiller sending og mottak.</li></ul>
<p><b>BLE</b> er en senere variant for sjeldne, små datamengder: 40 kanaler med 2 MHz avstand. Forelesningen dekker ikke BLE i detalj.</p>
<h3>Piconet</h3>
<p>Et <b>piconet</b> har én <b>master</b> og opptil 7 aktive <b>slaver</b>.</p>
<div class="ana"><b>Analogi: Dirigenten</b><p>Masteren er dirigenten: den bestemmer tempo og noter, og hele orkesteret følger. Forsvinner dirigenten, stopper stykket.</p></div>
<ul><li>Masteren bestemmer hoppmønsteret, og slavene synkroniserer seg.</li><li>Hvert piconet har sitt unike mønster.</li><li>Hvis masteren forsvinner, opphører piconettet.</li></ul>
<div class="key"><b>Hva bestemmer hva?</b><p><b>Device ID</b> (48 bit, unik i verden) bestemmer <b>hoppmønsteret</b>. <b>Klokken</b> bestemmer <b>fasen</b> i mønsteret. Begge kommer fra masteren. Spurt om på eksamen 2023.</p></div>
<div class="ana"><b>Analogi: Sangboka og takten</b><p>Device ID velger hvilken sang alle synger, altså hoppmønsteret. Klokken forteller hvor i sangen dere er akkurat nå, altså fasen. Du må vite begge for å synge riktig tone.</p></div>
<p>All trafikk går mellom master og slave, aldri mellom to slaver. Hver slave har en 3-bits adresse. Masteren trenger ingen adresse, fordi en pakke fra en slave alltid går til masteren.</p>
<div class="ana"><b>Analogi: Beskjed til læreren</b><p>Når alle elever bare kan snakke med læreren, trenger ikke en lapp fra en elev adresse. Den skal alltid til læreren. Derfor trenger ikke masteren noen adresse.</p></div>
<p>Et <b>scatternet</b> kobler sammen flere piconet: en enhet kan være slave i ett og master i et annet. Sjelden brukt i praksis.</p>
<h3>Polling og tidsluker</h3>
<p>Slavene kan ikke selv be om å få sende. Masteren poller, og slaven svarer i neste luke. Pakker kan bruke 1, 3 eller 5 luker. Frekvensen holder seg fast under en flerlukepakke, og hoppingen fortsetter etterpå som om ingenting hadde skjedd.</p>
[[w:btpoll]]
<div class="ex"><b>Forelesning</b><p>Polling over 12 luker, slave 1 bruker 3 luker, 64 byte per luke, 1600 hopp/s.</p><p>Andel: $3/12=0{,}25$. Luker per sekund: $0{,}25\cdot1600=400$. Byte per sekund: $400\cdot64=25\,600$. Bit per sekund: $204{,}8$ kbps.</p></div>
<div class="ex"><b>Eksamen 2024</b><p>1600 hopp/s, 36 byte per luke, 12 luker med D1, D2, D3 på 1, 3 og 5 luker.</p><p>Luketid: 625 µs. Rate slave 1: $\dfrac{36\cdot8}{12\cdot625\text{ µs}}=38{,}4$ kbps. Slave 2: 115,2 kbps. Slave 3: 192 kbps.</p></div>
<h3>Enhetens tilstander</h3>
<div class="tw"><table><tr><th>Tilstand</th><th>Betydning</th></tr><tr><td>Standby</td><td>Gjør ingenting</td></tr><tr><td>Inquire</td><td>Leter etter enheter</td></tr><tr><td>Page</td><td>Kobler til en bestemt enhet</td></tr><tr><td>Connected</td><td>Del av et piconet</td></tr><tr><td>Sniff</td><td>Lytter sjeldnere (hver $N$-te luke)</td></tr><tr><td>Hold</td><td>Stopper sending midlertidig for å spare strøm eller delta i et annet piconet</td></tr></table></div>`,
quiz:[
{t:'mc',y:'2025',fix:1,q:'In Bluetooth,',o:['Each piconet has a unique hopping pattern, determined by the slaves.','Master device determines the hopping patterns within a piconet. In addition, slaves cannot communicate directly to each other.','Frequency Hopping Spread Spectrum (FHSS) is used together with FDD, resulting in two separate frequency bands for uplink and downlink.','When a piconet is formed, the master always needs a 3-bit long local address. 3 bits are needed to represent the addresses for up to 7 slaves + one master device.'],a:1},
{t:'num',q:'Hvor lang er en tidsluke i Bluetooth ved 1600 hopp/s?',a:625,tol:0,u:'µs',e:'<b>Formel:</b> $T_{luke}=1/\\text{hopprate}$. <b>Utregning:</b> $\\dfrac{1}{1600}=6{,}25\\cdot10^{-4}$ s $=625$ µs.'},
{t:'num',y:'2024',q:'1600 hops/s, 36 bytes per slot, 12 slots. Slave 3 uses 5 slots. Data rate?',a:192,tol:.002,u:'kbps',e:'<b>Formula:</b> $R=\\dfrac{\\text{slots}\\cdot\\text{bytes per slot}\\cdot8}{\\text{slots in the cycle}\\cdot T_{slot}}$, with $T_{slot}=1/1600=625$ µs. <b>Calculation:</b> $5\\cdot36\\cdot8=1440$ bits per cycle. The cycle lasts $12\\cdot625$ µs $=7.5$ ms. $\\dfrac{1440}{0.0075}=192\\,000$ bps $=192$ kbps.'},
{t:'num',q:'Forelesning: slave 1 bruker 3 av 12 luker, 64 byte per luke. Finn raten.',a:204.8,tol:.002,u:'kbps',e:'<b>Formel:</b> $R=\\dfrac{\\text{luker}\\cdot\\text{byte per luke}\\cdot8}{\\text{luker i syklusen}\\cdot T_{luke}}$, med $T_{luke}=625$ µs. <b>Utregning:</b> $3\\cdot64\\cdot8=1536$ bit per syklus. Syklusen varer $12\\cdot625$ µs $=7{,}5$ ms. $\\dfrac{1536}{0{,}0075}=204\\,800$ bps $=204{,}8$ kbps.'},
{t:'num',q:'Maks antall aktive enheter i et piconet, inkludert master?',a:8,tol:0,e:'7 slaver + 1 master.'},
{t:'ref',y:'2022',q:'Why does the master not need an address in Bluetooth?',m:'Communication only takes place between a slave and the master. A packet therefore only needs the destination address if it comes from the master, or the source address if it goes to the master.',k:['Only master–slave communication','Packets from slaves always go to the master']},
{t:'ref',y:'2024',q:'Describe how the slave devices get access to the Bluetooth network (polling).',m:'The master is in control and sends poll packets to each slave. The slaves do not start on their own; they only answer after a poll.',k:['The master sends a poll','Slaves only answer after a poll']}
]},
{id:'eks',title:'Eksamensoppgaver',quizTitle:'Som på eksamen',html:String.raw`<p>Disse to oppgavene utgjorde 18 av 100 poeng i 2025.</p>`,
quiz:[
{t:'ex',y:'2025',pts:8,q:'Wi-Fi AP with 802.11a OFDM: N = 48, 64-QAM, $R_c=3/4$, $T_{sym}=3.2$ µs, $T_{guard}=0.8$ µs.<br>a) Maximum data rate [2p]<br>b) With 2 spatial streams [1p]<br>c) Besides MIMO, name two other ways to increase data rate [2p]<br>d) SNR drops, AMC is used. i. How should modulation and coding rate be adjusted? [2p] ii. Explain the trade-off. [1p]',s:String.raw`<p>a) $R=\dfrac{N\log_2M\cdot R_c}{T_{sym}+T_{guard}}=\dfrac{48\cdot6\cdot0.75}{4\text{ µs}}=\dfrac{216}{4}=54$ Mbps.</p><p>b) Two streams double the rate: $2\cdot54=108$ Mbps.</p><p>c) Two of: higher-order modulation, higher code rate, shorter guard interval, more data subcarriers.</p><p>d) i. Lower-order modulation (QPSK, BPSK) and a lower code rate (1/2). ii. Better reliability at the cost of a lower data rate.</p>`},
{t:'ex',y:'2025',pts:8,q:'The figure shows RTS/CTS with a sender, a receiver, an exposed node and a hidden node.<br>b) Explain the role of RTS and CTS. [2p]<br>c) Explain how RTS/CTS mitigates hidden and exposed node problems. [3p]<br>d) SIFS 10 µs, DIFS 50 µs, data 1 ms, RTS/CTS/ACK 100 µs, backoff 70 µs: total channel time? [3p]',s:String.raw`<p>b) RTS reserves the channel and states the duration. CTS confirms the reservation and repeats the duration.</p><p>c) The hidden node hears CTS and sets its NAV. The exposed node hears RTS but not CTS, so it may transmit without disturbing the receiver.</p><p>d) DIFS + backoff + RTS + SIFS + CTS + SIFS + DATA + SIFS + ACK $=50+70+100+10+100+10+1000+10+100=1450$ µs.</p>`},
{t:'ex',y:'2022',pts:10,q:'MACA in 802.11. The figure shows that S1 drew $B_1=5$ and S2 drew $B_2=9$ after the first DIFS. In the second round, the remainder of S2 is $B_2=4$, and S1 draws $B_1=7$.<br>a) What is NAV used for? [2p]<br>b) Backoff values and why S1 got access first [3p]<br>c) How is ACK given higher priority? [2p]<br>d) Who gets access in round two? [3p]',s:String.raw`<p>a) A timing mechanism: stations without access set their NAV from RTS and CTS to know how long they must wait.</p><p>b) $B_1=5$, $B_2=9$. S1 had the shorter backoff. c) SIFS is shorter than DIFS. d) S2. Its backoff froze while S1 transmitted, so the remainder is $9-5=4$, which is shorter than 7.</p>`}
]}
]});

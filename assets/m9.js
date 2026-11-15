C.add({id:'m9',nr:9,part:'op',short:'Carrier Ethernet',src:'Forelesning 9 · Ramaswami 6.4 · Bjørnstad · Sanchez',
title:'Carrier Ethernet: LAN-teknologi i operatørnettet',
lead:String.raw`Ethernet er billig og overalt, men det ble laget for ett bygg. Kan vi bruke det over et helt land? Denne modulen viser hva som må endres, steg for steg: fra VLAN til Q-in-Q, MAC-in-MAC og PBB-TE.`,
goals:[String.raw`forklare Ethernet-rammen, VLAN-taggen og STP`,String.raw`nevne de fem attributtene som definerer Carrier Ethernet`,String.raw`forklare skaleringsproblemet i PB, og hvordan PBB løser det`,String.raw`forklare hvordan PBB-TE gir forbindelsesorientert Ethernet`,String.raw`sammenligne OTN og Carrier Ethernet`],
sections:[
{id:'eth',title:'Ethernet på ett minutt',html:String.raw`
<p><b>Ethernet</b> er et pakkesvitsjet datalink, opprinnelig for <b>LAN</b>, laget på 1970-tallet. Det er billig og enkelt. Rater går fra 10 Mbps til 1,6 Tbps.</p>
<p>Opprinnelig delte alle et medium og brukte <b>CSMA/CD</b>. Det krever at tiden til å oppdage en kollisjon er kortere enn tiden det tar å sende en pakke, og det avhenger av forsinkelsen. Moderne Ethernet er full dupleks: hver link er privat, og det finnes ingen kollisjoner. I tillegg kommer flytkontroll (802.3x) og QoS.</p>
<h3>Rammen</h3>
<div class="tw"><table><tr><th>Felt</th><th>Betydning</th></tr><tr><td>PRE, SFD</td><td>Synkronisering, start av ramme</td></tr><tr><td>DA, SA</td><td>Destinasjons- og kilde-MAC</td></tr><tr><td>Length/Type</td><td>≤ 1500: lengde. ≥ 1536: protokolltype</td></tr><tr><td><b>FCS</b></td><td>CRC-32</td></tr></table></div>
<p>Rammestørrelse opp til 1518 byte. Jumbo-rammer opp til 9000 byte finnes.</p>
<h3>VLAN</h3>
<p><b>VLAN</b> deler et fysisk nett i logiske kringkastingsdomener. Det gir bedre sikkerhet, ytelse og styring. En access-port hører til ett VLAN, og en trunk-port bærer mange.</p>
<div class="ana"><b>Analogi: Usynlige vegger</b><p>Et kontorlandskap med usynlige vegger: alle sitter i samme rom, men salg hører bare salg. Du flytter en person til en ny avdeling ved å endre en innstilling, ikke ved å bygge vegger.</p></div>
<p>VLAN-taggen er 4 byte mellom SA og Type: 2 byte <b>TPID</b> (0x8100), 3 bit prioritet, 1 bit CFI, 12 bit <b>VID</b>. Prioriteten brukes for QoS. 12 bit gir 4096 VLAN.</p>
<h3>Spanning Tree</h3>
<p>Ethernet har ikke TTL. En løkke i nettet ville fått rammer til å gå i ring for evig. <b>STP</b> bygger et tre uten løkker: velg en rotbro, finn korteste vei til roten, og blokker alle andre porter. Blokkerte linker gir reserve hvis noe feiler.</p>
<div class="ana"><b>Analogi: Stengte branndører</b><p>I en bygning med ringganger kan et rykte gå i sirkel for alltid. STP lukker dørene som skaper ringer, så det bare finnes én vei mellom to rom. Dørene er ikke fjernet: brenner det, kan de åpnes igjen.</p></div>
[[w:stp]]
<p>Prisen for dette: blokkerte linker er ubrukt kapasitet, og å bygge treet på nytt tar tid.</p>`,
quiz:[
{t:'num',q:'Hvor mange VLAN kan 12 bit identifisere?',a:4096,tol:0,e:'<b>Formel:</b> antall $=2^n$ for $n$ bit. <b>Utregning:</b> $2^{12}=4096$.'},
{t:'num',q:'Hvor mange byte er VLAN-taggen?',a:4,tol:0,u:'byte',e:'<b>Formel:</b> tag $=$ TPID + prioritet + CFI + VID. <b>Utregning:</b> $16+3+1+12=32$ bit $=4$ byte.'},
{t:'mc',q:'Et felt Length/Type har verdi 2048. Hva betyr det?',o:['Protokolltype','Lengde 2048 byte','Feil i rammen','VLAN-nummer'],a:0,e:'≥ 1536 betyr protokolltype.'},
{t:'mc',q:'Hvilken algoritme brukes i FCS?',o:['CRC-32','Reed-Solomon','Enerkomplement','Hamming'],a:0},
{t:'ref',q:'Hvorfor må Ethernet blokkere linker for å unngå løkker, mens IP klarer seg uten?',m:'Ethernet-rammer har ikke TTL. En løkke vil få kringkastingsrammer til å sirkulere for alltid og fylle nettet. IP har TTL, så pakker dør etter et antall hopp.',k:['Ingen TTL i Ethernet','Rammer ville sirkulert for alltid','IP har TTL']}
]},
{id:'hvorfor',title:'Hvorfor Carrier Ethernet?',html:String.raw`
<p>En «carrier» er en operatør som leverer transportinfrastruktur. Hvorfor vil operatører ha Ethernet?</p>
<ul><li>Mindre kostbart.</li><li>Enklere å drive med én protokoll.</li><li>Pakkesvitsjet, noe som passer trafikken.</li><li>Kundene bruker det allerede.</li></ul>
<p>Men vanlig Ethernet er best-effort. Operatører trenger mer. <b>MEF</b> definerer <b>Carrier Ethernet</b> med fem attributter:</p>
<div class="ana"><b>Analogi: Privatbil og rutebuss</b><p>Vanlig Ethernet er privatbilen: billig og enkel, men ingen lover at du kommer fram i tide. Carrier Ethernet er rutebussen på samme vei: faste ruter, rutetider, kontrollrom og reservebuss. Veien er den samme, men løftet er et annet.</p></div>
<div class="key"><b>Fem attributter</b><p>Standardiserte tjenester, QoS, tjenestestyring, skalerbarhet, pålitelighet.</p></div>
<h3>Tjenestene</h3>
<p>MEF definerer tjenestene som <b>EVC</b>:</p>
<div class="ana"><b>Analogi: Telefon, radio og gruppechat</b><p>E-Line er en telefonsamtale mellom to. E-Tree er en radiosender med mange lyttere, som ikke snakker med hverandre. E-LAN er en gruppechat der alle når alle.</p></div>
<div class="tw"><table><tr><th>Tjeneste</th><th>Form</th></tr><tr><td><b>E-Line</b></td><td>Punkt-til-punkt</td></tr><tr><td><b>E-Tree</b></td><td>Punkt-til-multipunkt</td></tr><tr><td><b>E-LAN</b></td><td>Multipunkt-til-multipunkt</td></tr></table></div>`,
quiz:[
{t:'mc',y:'2025',fix:1,q:'Which statement best describes Ethernet and/or Carrier Ethernet?',o:['Ethernet is designed for carrier networks, while Carrier Ethernet is for LAN environments.','Ethernet provides basic best-effort LAN connectivity, while Carrier Ethernet adds scalability, QoS, and OAM features for service provider networks.','Ethernet supports MPLS and traffic engineering, while Carrier Ethernet only supports simple frame forwarding.','Ethernet, Carrier Ethernet, as well as Provider Backbone Bridge – Traffic Engineering always use statistical multiplexing.'],a:1},
{t:'mc',y:'2024',fix:1,q:'What is the correct statement about Carrier Ethernet?',o:['Carrier Ethernet defines only point-to-point and point-to-multipoint transport.','Carrier Ethernet allows framing of data of variable bitrates into variable length','Carrier Ethernet is based on framing data into fixed-length frames in fixed data-rate channels.','Carrier Ethernet does not support end-to-end connectivity fault management techniques'],a:1},
{t:'num',q:'Hvor mange attributter definerer Carrier Ethernet?',a:5,tol:0,e:'Ingen formel her, dette må pugges: standardiserte tjenester, QoS, tjenestestyring, skalerbarhet og pålitelighet.'},
{t:'ref',q:'Nevn de fem attributtene, og forklar hvorfor vanlig LAN-Ethernet mangler minst to av dem.',m:'Standardiserte tjenester, QoS, tjenestestyring, skalerbarhet, pålitelighet. LAN-Ethernet er best-effort uten garantier, skalerer dårlig med flat adressering, og har ikke OAM for å oppdage og isolere feil.',k:['Nevner alle fem','Forklarer minst to mangler']}
]},
{id:'pb',title:'Provider Bridges og Q-in-Q',html:String.raw`
<p>Første steg: la operatøren bruke VLAN. Problemet er at kundene allerede bruker VLAN, og numrene kan kollidere. <b>Provider Bridges</b> (802.1ad) legger en ekstra tag utenpå: <b>Q-in-Q</b>.</p>
<div class="ana"><b>Analogi: Rom 12 i to bygg</b><p>To firmaer har begge «rom 12». Skal budet ikke blande dem, skriver vi byggnummeret utenpå: bygg A, rom 12. S-taggen er byggnummeret, og C-taggen er romnummeret som kunden har valgt selv.</p></div>
<ul><li><b>C-tag:</b> kundens VLAN.</li><li><b>S-tag:</b> operatørens tag, lagt til av kantsvitsjen. Identifiserer kunden eller tjenesten.</li></ul>
<p>Kundene kan dermed bruke overlappende VLAN-nummer uten konflikt.</p>
<h3>Problemet: skalering</h3>
<ul><li>S-tag er 12 bit: bare 4096 kunder eller tjenester.</li><li>Flat modell uten hierarki: operatørsvitsjer må lære MAC-adressene til <b>alle</b> kundeenheter.</li><li>Endring hos én kunde kan utløse ny læring og STP-beregning hos alle.</li><li>Kundeadresser er synlige i operatørnettet.</li></ul>
<div class="ana"><b>Analogi: Postbudet som må kjenne alle</b><p>Tenk om hvert postbud i hele landet måtte kjenne hver innbygger ved navn. Det går så lenge landet er lite. Slik er PB: hver svitsj i kjernen må lære hver kundeadresse.</p></div>
[[w:mactab]]`,
quiz:[
{t:'num',q:'Hvor mange bit er S-tagens ID?',a:12,tol:0,u:'bit',e:'S-taggen har samme oppbygning som C-taggen, så ID-en er 12 bit. Det gir $2^{12}=4096$ tjenester, og derfor trengs I-SID på 24 bit i PBB.'},
{t:'num',q:'En operatør har 2000 kunder med 500 MAC-adresser hver. Hvor mange må kjernesvitsjen lære i PB?',a:1000000,tol:0,e:'<b>Formel:</b> adresser $=$ kunder $\\cdot$ MAC-adresser per kunde. <b>Utregning:</b> $2000\\cdot500=1\\,000\\,000$. I PB ser kjernen alle kundenes MAC-adresser.'},
{t:'mc',q:'Hvilken funksjon har S-tag?',o:['Identifiserer kunde eller tjenesteinstans','Identifiserer VLAN inne hos kunden','Inneholder FCS','Inneholder kundens MAC'],a:0},
{t:'ref',q:'Forklar hvorfor PB ikke skalerer til en stor operatør. Nevn minst to grunner.',m:'S-tag gir maks 4096 tjenester. Svitsjene må lære alle kundeenheter, noe som gir store tabeller og CPU-last. Modellen er flat, så endringer hos kunder påvirker hele nettet. Kundeadresser eksponeres.',k:['12 bit er for lite','Alle kunde-MAC-er må læres','Flat modell uten separasjon']}
]},
{id:'pbb',title:'PBB og PBB-TE',html:String.raw`
<h3>PBB: MAC-in-MAC</h3>
<p><b>PBB</b> (802.1ah) pakker hele kunderammen inn i en ny ramme med operatørens egne MAC-adresser. Kjernen ser bare operatørens adresser. Bare kantsvitsjer må kjenne kundenes MAC-adresser.</p>
<div class="ana"><b>Analogi: Containeren</b><p>Havnekranene ser bare containernummeret og bryr seg ikke om hva som er inni. Bare havnene i hver ende vet innholdet. Kjernen i PBB ser bare operatørens adresser, og derfor spiller det ingen rolle hvor mange kunder som finnes.</p></div>
[[w:frame]]
<div class="tw"><table><tr><th>Felt</th><th>Betydning</th></tr><tr><td>B-DA, B-SA</td><td>Operatørens MAC-adresser ved kantene av stamnettet</td></tr><tr><td><b>B-tag</b></td><td>VLAN i stamnettet</td></tr><tr><td><b>I-tag</b></td><td>Tjeneste-ID på 24 bit</td></tr></table></div>
<p>PBB gir:</p>
<ol><li>Tunnelering.</li><li>Fullstendig skille mellom kunde- og operatørnett.</li><li>24-bits I-tag: rundt 16 millioner tjenester.</li></ol>
<h3>PBB-TE: Ethernet som forbindelser</h3>
<p>Selv PBB har vanlig Ethernet-oppførsel: flooding, MAC-læring, STP. Du vet ikke hvilken vei rammene tar, og det er vanskelig å gi garantier.</p>
<div class="ana"><b>Analogi: Skinner i stedet for vei</b><p>Vanlig Ethernet er bilister som spør seg fram, og alle kan ta ulik vei. PBB-TE er jernbane: kontrollrommet har lagt sporet på forhånd. Du vet nøyaktig hvor toget går, og derfor kan du love en rutetid.</p></div>
<p><b>PBB-TE</b> (802.1Qay) skrur dette av:</p>
<ul><li>Slår av STP, kringkasting og flooding.</li><li>Forwarding-tabellene settes direkte av styringsplanet, ikke av MAC-læring.</li><li>Banen er forhåndsbestemt, som gir forutsigbar oppførsel og SLA-garantier.</li><li>Kombinasjonen MAC + VID identifiserer hver bane.</li><li>Beskyttelse som i SONET/SDH.</li></ul>
<p>Eksempel: to enveisveier mellom PE1 og PE2 med VID 44 og 45.</p>
<div class="exam"><b>Eksamen 2023</b><p>Hvordan realiseres PBB-TE? a) Eksisterende Ethernet-maskinvare brukes, bare med noen funksjoner slått av. b) Videresending er ikke basert på MAC-læring, men styres av styringsplanet.</p></div>
<h3>OAM</h3>
<p><b>OAM</b> er nødvendig for operatørkvalitet:</p>
<div class="ana"><b>Analogi: Pulsklokke og legesjekk</b><p>CCM er pulsklokken som sender et lite signal jevnt og trutt: uteblir det, er noe galt. Loopback er «hører du meg?». Linktrace er å følge ledningen til du finner stedet der det stopper.</p></div>
<div class="tw"><table><tr><th>Område</th><th>Mekanisme</th></tr><tr><td>Oppdage feil</td><td>CCM (Continuity Check Message)</td></tr><tr><td>Verifisere feil</td><td>LBM/LBR (Loopback)</td></tr><tr><td>Isolere feil</td><td>LTM/LTR (Linktrace)</td></tr><tr><td>Varsling</td><td>AIS</td></tr><tr><td>Ytelse</td><td>Forsinkelse, jitter, tap</td></tr></table></div>`,
quiz:[
{t:'mc',y:'2023',fix:1,q:'What is Ethernet Provider Backbone Bridging (Ethernet PBB)?',o:['An encapsulation of the customer (subscriber) Ethernet frames into new service provider Ethernet frames, applied within the service providers\' network.','Using a hierarchical switching infrastructure.','It only adds traffic-engineering capability to Ethernet.','Using double VLAN tagging enabling service providers to add their own VLAN tag on the transported customer traffic.'],a:0},
{t:'num',q:'Hvor mange tjenester gir 24 bit? Svar i millioner (rundet).',a:16.8,tol:.01,u:'millioner',e:'<b>Formel:</b> antall $=2^n$ for $n$ bit. <b>Utregning:</b> $2^{24}=16\\,777\\,216\\approx16{,}8$ millioner.'},
{t:'mc',q:'Hvem bestemmer forwarding i PBB-TE?',o:['Styringsplanet','MAC-læring','STP','Kunden'],a:0},
{t:'ref',y:'2024',q:'In a carrier network, what is the purpose of MAC-in-MAC?',m:'One of: full isolation of customer traffic through a tunnel in the operator network; scalability; handling more customers.',k:['Isolation of customers or scalability']},
{t:'ref',y:'2023',q:'Explain how scalability in PBB is addressed.',m:'PBB adds a 24-bit I-SID (I-tag) that identifies the service. That gives up to 16 million services and removes the scaling problems of PB. The customer network is isolated, so many customer networks can be handled.',k:['24-bit I-tag','16 million services','Isolation of customer networks']},
{t:'ref',y:'2023',q:'How is PBB-TE traffic engineering which introduces connection-oriented forwarding mode realized?',m:'By switching off some Ethernet functions, existing hardware can get a new behaviour. Forwarding is not based on MAC learning but is provided by the management plane, for example a network management system.',k:['Functions are switched off','No MAC learning','The management plane sets the tables']}
]},
{id:'det',title:'Deterministisk Ethernet og OTN',html:String.raw`
<h3>Statisk og statistisk multipleksing</h3>
<p>Forskjellen forklarer nesten alt i sammenligningen av OTN og Ethernet.</p>
<div class="ana"><b>Analogi: Flyselskapet som overbooker</b><p>Statisk multipleksing er at hver billett har sitt sete. Ingen blir stående igjen, men tomme seter er tapt. Statistisk multipleksing er å selge flere billetter enn seter fordi ikke alle møter opp. Du fyller flyet bedre, men av og til blir noen stående.</p></div>
<ul><li><b>Statisk multipleksing:</b> fast plass. Sum av innganger må passe i utgangen. Ingen tap og kjent forsinkelse.</li><li><b>Statistisk multipleksing:</b> antar at ikke alle sender samtidig. Inngangene kan summere til mer enn utgangen. Krever buffer og gir risiko for kø og tap.</li></ul>
[[w:statmux]]
<div class="ex"><b>Eksamen 2022</b><p>100 abonnenter à 1 Gb/s inn i Ethernet-svitsj med 10 Gb/s ut: aggregeringsforhold $100/10=10$.</p><p>8 slike segmenter i en OTN-node på én bølgelengde: $8\cdot10=80$ Gb/s, eller en bølgelengde på 100 Gb/s. Multipleksingen i OTN-noden er statisk.</p></div>
<h3>Deterministisk Ethernet</h3>
<p>Kan Ethernet gi kjent forsinkelse? Ja, med <b>TSN</b>:</p>
<div class="ana"><b>Analogi: Ambulansen og jernbanebommen</b><p>Frame Preemption er ambulansen som får forbi en lang trailer. Time-Aware Shaper er jernbanebommen: den går ned til faste tider uansett, så toget alltid har fri vei.</p></div>
<div class="tw"><table><tr><th>Mekanisme</th><th>Idé</th></tr><tr><td><b>Frame Preemption</b> (802.1Qbu)</td><td>Kritisk trafikk avbryter en stor ramme. Lavere forsinkelse</td></tr><tr><td><b>Time-Aware Shaper</b> (802.1Qbv)</td><td>Faste tidsvinduer. Ligner statisk multipleksing</td></tr><tr><td><b>IHON</b></td><td>Holder igjen trafikk ved inngangen</td></tr></table></div>
<h3>OTN eller Carrier Ethernet?</h3>
<div class="tw"><table><tr><th></th><th>OTN</th><th>Carrier Ethernet</th></tr><tr><td>Lag</td><td>Lag 1+</td><td>Lag 2</td></tr><tr><td>Multipleksing</td><td>Statisk (TDM)</td><td>Statistisk, men kan være statisk (PBB-TE, TAS)</td></tr><tr><td>Forsinkelse og tap</td><td>Deterministisk, null pakketap</td><td>Avhenger av oppsett</td></tr><tr><td>Klienter</td><td>Mange protokoller</td><td>Ethernet</td></tr><tr><td>Passer til</td><td>Eldre tjenester, høy rate over lange avstander</td><td>Metro, aksess, mobil backhaul og fronthaul</td></tr></table></div>
<p>Begge støtter ende-til-ende-overvåking, overvåking over flere operatører og lignende OAM. Begge kan gi deterministisk oppførsel.</p>
<div class="ana"><b>Analogi: Toget og lastebilen</b><p>OTN er toget: faste tider, fast kapasitet, enormt mye last over lange strekninger. Carrier Ethernet er lastebilen: fleksibel, billig og god til å fylle opp, men mer avhengig av trafikken.</p></div>`,
quiz:[
{t:'mc',y:'2023',fix:1,q:'A switch has twenty 1 Gb/s input interfaces and one 10 Gb/s output interface. Which one is true?',o:['Using static multiplexing, it is possible to multiplex all the data from all the 20 input interfaces into the output interface.','Using statistical multiplexing, it is possible to multiplex data from all the 20 input interfaces into the output interface.','If statistical multiplexing is used, buffering is not required in the switch.','Statistical multiplexing can only be used if the data on the 1 Gb/s input interfaces have constant data rate.'],a:1,e:'<b>Formula:</b> Static multiplexing requires the sum of the inputs to be at most the output capacity. <b>Calculation:</b> In: $20\\cdot1=20$ Gb/s. Out: 10 Gb/s. $20>10$, so static multiplexing does not work. Statistical multiplexing works because not everyone sends at full rate at the same time, but it needs buffering.'},
{t:'mc',y:'2024',fix:1,q:'How can low latency be achieved in Ethernet (as standardized by IEEE)?',o:['Mechanisms defined for Time Sensitive Networks (TSN)-deterministic Ethernet can be applied.','The traffic volume can be increased, increasing the total throughput of the network.','Large packets carrying many bytes of information (jumbo-frames) can be applied.','It cannot be achieved.'],a:0},
{t:'num',y:'2022',q:'100 FTTH subscribers with 1 Gb/s each into an Ethernet switch with 10 Gb/s output. Aggregation ratio?',a:10,tol:0,e:'<b>Formula:</b> aggregation ratio $=$ total input / output capacity. <b>Calculation:</b> $\\dfrac{100\\cdot1}{10}=10$, i.e. 10:1.'},
{t:'num',y:'2022',q:'8 such segments into an OTN node on a single wavelength. Minimum capacity?',a:80,tol:0,u:'Gb/s',e:'<b>Formula:</b> capacity $=$ number of segments $\\cdot$ rate per segment. <b>Calculation:</b> $8\\cdot10=80$ Gb/s.'},
{t:'mc',y:'2022',q:'What is the type of multiplexing used in the OTN node?',o:['Static multiplexing','Statistical multiplexing','Random multiplexing','Code multiplexing'],a:0},
{t:'ref',q:'En operatør skal bygge mobil backhaul i en by og et transatlantisk stamnett. Hva vil du velge for hver, og hvorfor?',m:'Mobil backhaul: Carrier Ethernet, fordi trafikken er sprutende, kostnaden lav og Ethernet passer metro og aksess. Transatlantisk: OTN, fordi det passer høy rate, lang avstand og FEC gir rekkevidde.',k:['Carrier Ethernet for metro/backhaul','OTN for long haul','Begrunner med statistisk multipleksing eller FEC']}
]},
{id:'eks',title:'Eksamensoppgaver',quizTitle:'Som på eksamen',html:String.raw`<p>OTN og Carrier Ethernet kommer som kortsvar. Øv på å svare presist på få linjer.</p>`,
quiz:[
{t:'ex',y:'2023',pts:10,q:'a) In OTN, six levels of TCM are defined in G.709. What is the purpose of these levels? [2p]<br>b) How does FEC help reduce network cost in OTN? [2p]<br>c) Explain how scalability in PBB is addressed. [3p]<br>d) How is PBB-TE connection-oriented forwarding realized? [3p]',s:String.raw`<p>a) Operators can keep their own SLAs, so different service levels can apply across several operators.</p><p>b) Lower signal quality is tolerated, so fewer 3R regenerators are needed and amplifiers can stand further apart.</p><p>c) A 24-bit I-SID gives 16 million services and isolates customer networks.</p><p>d) Functions are switched off, so ordinary hardware can be used. Forwarding is set by the management plane, not by MAC learning.</p>`},
{t:'ex',y:'2022',pts:11,q:'a) 100 FTTH subscribers, 1 Gb/s each, Ethernet switch with 10 Gb/s output. Aggregation ratio? [3p]<br>b) 8 such segments into an OTN node, single wavelength. Minimum capacity? [3p]<br>c) Type of multiplexing in OTN node? [2p]<br>d) Mention a benefit of Provider Backbone Bridging. [3p]',s:String.raw`<p>a) Aggregation ratio $=$ total input / output $=100\cdot1/10=10$, i.e. 10:1.</p><p>b) $8\cdot10=80$ Gb/s, in practice a 100 Gb/s wavelength.</p><p> c) Static. d) Scalability; frame-in-frame; encapsulation of customer traffic; more VLANs.</p>`}
]}
]});

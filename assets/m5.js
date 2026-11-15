C.add({id:'m5',nr:5,part:'wl',short:'Cellulære nett',src:'Forelesning 5 · Stallings 13, 14.1–14.3',
title:'Cellulære nett: fra heksagon til 5G',
lead:String.raw`Mobilnett løser ett problem: hvordan betjene millioner av brukere med begrenset spektrum? Svaret er gjenbruk av frekvenser. Dette er den største enkeltoppgaven i trådløs-delen (12 poeng hvert år), og oppgavene er forutsigbare.`,
goals:[String.raw`regne $N$, $D$, $Q$, SIR og kapasitet på få minutter`,String.raw`forklare hvordan cluster-størrelse gir avveiningen kapasitet mot interferens`,String.raw`kjenne fem måter å øke kapasiteten på`,String.raw`tegne og forklare 3G-, LTE- og 5G-arkitektur`],
sections:[
{id:'celler',title:'Celler og frekvensgjenbruk',html:String.raw`
<div class="why"><b>Hvorfor celler?</b><p>Med én stor antenne for hele byen kunne hver frekvens bare brukes av én bruker. Deler vi byen i små <b>celler</b> med hver sin <b>basestasjon</b> og lav sendeeffekt, kan samme frekvens brukes igjen et stykke unna. Det er <b>frekvensgjenbruk</b>. Kapasiteten ganges med antall ganger spekteret gjenbrukes.</p></div>
<div class="ana"><b>Analogi: Megafon eller småprat</b><p>Med én megafon på rådhuset kan bare én snakke om gangen i hele byen. Snakker folk lavt i hver sin krok, kan hundrevis bruke de samme ordene samtidig. Lav sendeeffekt er altså en fordel: den gjør det mulig å bruke frekvensen på nytt rett bortenfor.</p></div>
<p>Hvorfor heksagoner? Tre former fyller planet uten hull: trekant, kvadrat og heksagon. Heksagonen er nærmest en sirkel. I tillegg ligger alle seks naboer like langt unna ($\sqrt3R$). Et kvadrat har fire naboer i avstand $d$ og fire i $\sqrt2d$.</p>
<div class="ana"><b>Analogi: Bikuben</b><p>Biene bygger sekskanter fordi formen fyller plassen uten hull og likevel er nær en sirkel. Vi vil ha det samme: en celle er egentlig en sirkel rundt masten, og heksagonen er den formen som dekker flaten best uten glipper.</p></div>
<p>Ekte dekning er aldri heksagonal, på grunn av terreng, skygge fra bygg og begrensninger i plassering av antenner. Modellen er et verktøy for planlegging.</p>
<h3>Cluster</h3>
<p>Et <b>cluster</b> er en gruppe på $N$ celler som til sammen bruker alle frekvensene én gang. Mønsteret gjentas over hele området. Geometrien gir</p>
<div class="ana"><b>Analogi: Flisene på badet</b><p>Tenk på et flisemønster med $N$ farger. Mønsteret gjentas over hele veggen, og flisene med samme farge kommer aldri ved siden av hverandre. Hver farge er et sett med frekvenser.</p></div>
$$N=i^2+ij+j^2,\quad i,j\in\{0,1,2,\dots\}$$
<p>Gyldige verdier: 1, 3, 4, 7, 9, 12, 13, 16, 19, ...</p>
<p>For å finne nærmeste <b>co-channel-celle</b>: gå $i$ celler rett fram, sving 60° mot klokken, gå $j$ celler.</p>
[[w:hex]]
<h3>Hovedavveiningen</h3>
<p>Dette må sitte:</p>
<div class="tw"><table><tr><th></th><th>Stor $N$</th><th>Liten $N$</th></tr><tr><td>Co-channel-celler</td><td>Langt unna</td><td>Nær</td></tr><tr><td>Co-channel-interferens</td><td>Lav</td><td>Høy</td></tr><tr><td>Kanaler per celle</td><td>Få</td><td>Mange</td></tr><tr><td>Kapasitet</td><td>Lav</td><td>Høy</td></tr></table></div>
<div class="ana"><b>Analogi: Kakestykkene</b><p>Stor $N$ er en kake delt i mange stykker: hver celle får lite, men den som har samme stykke, bor langt unna. Liten $N$ er store stykker, men da sitter de med samme stykke tett på deg. Mer kapasitet per celle betyr alltid kortere avstand til forstyrrerne.</p></div>
<h3>Formlene</h3>
$$D=R\sqrt{3N}\qquad Q=\frac{D}{R}=\sqrt{3N}$$
<p>$D$ er <b>gjenbruksavstanden</b>, og $Q$ er <b>gjenbruksforholdet</b>. Stor $Q$ gir bedre kvalitet, men lavere kapasitet.</p>
<div class="ex"><b>Eksamen 2025, 4a</b><p>$R=2$ km, $N=12$. $D=2\sqrt{36}=12$ km. $Q=\sqrt{36}=6$.</p></div>`,
quiz:[
{t:'num',q:'Med $i=3,\\ j=2$: hva er $N$?',a:19,tol:0,e:'<b>Formel:</b> $N=i^2+ij+j^2$. <b>Utregning:</b> $3^2+3\\cdot2+2^2=9+6+4=19$.'},
{t:'mc',q:'Hvilken verdi kan ikke være cluster-størrelse?',o:['5','4','7','12'],a:0,e:'Det finnes ingen heltall $i,j$ som gir 5.'},
{t:'num',y:'2025',q:'R = 2 km, N = 12. Reuse distance D?',a:12,tol:.001,u:'km',e:'<b>Formula:</b> $D=R\\sqrt{3N}$. <b>Calculation:</b> $2\\cdot\\sqrt{3\\cdot12}=2\\cdot\\sqrt{36}=2\\cdot6=12$ km.'},
{t:'num',q:'$R=1$ km, $N=7$. Finn $D$.',a:4.58,tol:.005,u:'km',e:'<b>Formel:</b> $D=R\\sqrt{3N}$. <b>Utregning:</b> $1\\cdot\\sqrt{3\\cdot7}=\\sqrt{21}=4{,}58$ km.'},
{t:'ref',y:'2023',q:'Why is hexagonal cell shape preferred over square and triangle? In practice it is not possible to apply perfect hexagons. Why?',m:'The hexagon covers the whole area without overlap and without gaps, and has the same distance to all neighbours. In practice the pattern is not perfect because of terrain such as hills and mountains, shadowing from buildings, weather, and limits on where antennas can be placed.',k:['Covers without gaps and overlap','Equal distance to neighbours','Terrain and buildings break the pattern']},
{t:'ref',y:'2024',q:'How does the choice of cluster size affect the system performance in terms of interference and system capacity?',m:'A smaller cluster gives higher capacity but increases co-channel interference. A larger cluster gives lower capacity but less interference.',k:['Small N: high capacity, more interference','Large N: low capacity, less interference']}
]},
{id:'sir',title:'Signal-til-interferens-forholdet',html:String.raw`
<p>I cellulære nett er ikke støy det største problemet, men andre brukere av samme frekvens. Derfor bruker vi <b>SIR</b>:</p>
<div class="ana"><b>Analogi: Alle skrur opp volumet</b><p>Spiller naboen samme låt som deg, hjelper det ikke å skru opp, for gjør alle det, er forholdet det samme. Slik er det med SIR: øker alle effekten, øker både signal og interferens. Bare avstand, altså større $Q$, gir bedring.</p></div>
$$SIR=\frac{P_{ønsket}}{\sum_{i=1}^{i_0}P_{interferens,i}}$$
<p>Tenk deg den verste plasseringen: terminalen står ved kanten, avstand $R$ fra sin basestasjon og omtrent $D$ fra hver av de $i_0=6$ nærmeste forstyrrerne. Mottatt effekt faller med $d^{-n}$:</p>
$$SIR=\frac{R^{-n}}{i_0D^{-n}}=\frac{(D/R)^n}{i_0}=\frac{(\sqrt{3N})^n}{i_0}$$
<div class="ex"><b>Forelesning og eksamen 2024</b><p>$N=7$, $n=4$, $i_0=6$. $Q=\sqrt{21}=4{,}583$.</p><p>$SIR=4{,}583^4/6=441/6=73{,}5$. I dB: $10\log_{10}73{,}5=18{,}66$ dB.</p><p>Krav 18 dB: ok. $N=4$ gir 13,8 dB, og det er for lavt. Derfor er $N=7$ den minste gyldige verdien her.</p></div>
<p>Praktisk trikset: med $n=4$ er $Q^4=(3N)^2=9N^2$. For $N=7$ er det 441, for $N=12$ er det 1296.</p>
<div class="trap"><b>Felle</b><p>Husk å gjøre om til dB for sammenligning mot krav i dB. $SIR=73{,}5$ er ikke 73,5 dB.</p></div>`,
quiz:[
{t:'num',y:'2024',q:'N = 7, n = 4, i0 = 6. SIR in dB?',a:18.66,tol:.005,u:'dB',e:'<b>Formula:</b> $Q=\\sqrt{3N}$, $SIR=Q^n/i_0$, and $SIR_{dB}=10\\log_{10}SIR$. <b>Calculation:</b> $Q=\\sqrt{21}=4.583$. $Q^4=441$. $441/6=73.5$. $10\\log_{10}73.5=18.66$ dB.'},
{t:'num',q:'$N=4$, $n=4$, $i_0=6$. Finn SIR i dB.',a:13.8,tol:.005,u:'dB',e:'<b>Formel:</b> $Q=\\sqrt{3N}$, $SIR=Q^n/i_0$, og $SIR_{dB}=10\\log_{10}SIR$. <b>Utregning:</b> $Q=\\sqrt{12}=3{,}464$. $Q^4=144$. $144/6=24$. $10\\log_{10}24=13{,}8$ dB.'},
{t:'num',q:'$N=12$, $n=4$, $i_0=6$. Finn SIR i dB.',a:23.3,tol:.005,u:'dB',e:'<b>Formel:</b> $Q=\\sqrt{3N}$, $SIR=Q^n/i_0$, og $SIR_{dB}=10\\log_{10}SIR$. <b>Utregning:</b> $Q=\\sqrt{36}=6$. $Q^4=1296$. $1296/6=216$. $10\\log_{10}216=23{,}3$ dB.'},
{t:'num',q:'$N=7$, $n=3$, $i_0=6$. Finn SIR i dB.',a:12.1,tol:.01,u:'dB',e:'<b>Formel:</b> $Q=\\sqrt{3N}$, $SIR=Q^n/i_0$, og $SIR_{dB}=10\\log_{10}SIR$. <b>Utregning:</b> $Q=\\sqrt{21}=4{,}583$. $Q^3=96{,}2$. $96{,}2/6=16{,}04$. $10\\log_{10}16{,}04=12{,}1$ dB. Lavere $n$ gir verre SIR, fordi interferensen dempes mindre.'},
{t:'mc',q:'Hvorfor gir høyere banetapseksponent bedre SIR?',o:['Forstyrrerne er lenger unna og dempes mer enn det ønskede signalet','Sendeeffekten øker','Antallet forstyrrere øker','Cellene blir større'],a:0},
{t:'ref',q:'Hvorfor regner vi SIR med terminalen ved cellekanten?',m:'Det er verste tilfelle: ønsket signal er svakest, og forstyrrerne er nærmest. Holder kravet der, holder det overalt i cellen.',k:['Ønsket signal er svakest','Forstyrrerne er nærmest','Verste tilfelle gir garanti for hele cellen']}
]},
{id:'kapasitet',title:'Kapasitet: oppskriften',html:String.raw`
<p>Nesten alle eksamensoppgaver følger samme oppskrift:</p>
<div class="ana"><b>Analogi: Hotellregnskapet</b><p>Tell rommene (kanaler), fordel dem på $N$ bygg, trekk fra rommene personalet bruker (kontrollkanaler), og gang med gjester per rom (brukere per kanal). En dupleks-kanal er et dobbeltrom: to simpleks-kanaler teller som ett rom.</p></div>
<ol><li><b>Kanalbredde.</b> Står det «simplex channel»? Da er en <b>dupleks-kanal</b> $2\times$ bredden.</li><li><b>Totalt antall kanaler</b> $=$ total båndbredde / kanalbredde.</li><li><b>Kanaler per celle</b> $k$ $=$ totalt / $N$.</li><li><b>Trafikkkanaler</b> $=k-$ kontrollkanaler.</li><li><b>Samtaler per celle</b> $=$ trafikkkanaler × brukere per kanal.</li><li><b>Hele systemet</b> $=$ samtaler per celle × antall celler.</li></ol>
[[w:cellcap]]
<div class="ex"><b>Eksamen 2025, 4b–d</b><p>30 MHz, simpleks 25 kHz, $N=12$, 10 kontrollkanaler, 8 brukere per kanal.</p><p>Dupleks: 50 kHz. Totalt: $30\,000/50=600$. Per celle: $600/12=50$. Trafikk: 40. Samtaler: $40\cdot8=320$.</p><p>Med $N=7$: $D=2\sqrt{21}\approx9{,}2$ km og $600/7\approx85$ kanaler per celle. Mer kapasitet, mer interferens.</p></div>
<div class="ex"><b>Forelesning</b><p>150 MHz, kanal 0,5 MHz, $N=7$, TDMA med 8 samtaler, 21 celler. $300/7=42{,}8$, altså 42 per celle. $42\cdot8=336$ per celle. $21\cdot336=7056$ i alt.</p></div>
<div class="ex"><b>Oppsummeringsforelesningen</b><p>32 celler, $R=1{,}6$ km, $N=7$, 336 kanaler totalt.</p><p>a) Areal per celle: $1{,}5\sqrt3\cdot1{,}6^2\approx6{,}65$ km². Dekket område: $6{,}65\cdot32\approx213$ km².</p><p>b) Kanaler per celle: $336/7=48$.</p><p>c) Samtidige samtaler: $48\cdot32=1536$.</p><p>Dette er formelen $C=M\cdot k\cdot N$ med $k=48$ og $M=32/7$ klynger: $\frac{32}{7}\cdot48\cdot7=1536$.</p></div>
<div class="trap"><b>Felle: dupleks eller ikke</b><p>2022, 2023 og 2025 sier «simplex channel», så dobbel bredde. 2024 sier «each channel requires 30 kHz», og fasiten brukte 30 kHz direkte (4000 kanaler). Les ordene.</p></div>
<div class="ex"><b>Baklengs</b><p>Eksamen 2023: $N=7$, 400 samtaler per celle, 10 brukere per kanal, simpleks 0,25 MHz. Kanaler per celle: 40. Totalt: 280. Båndbredde: $280\cdot2\cdot0{,}25=140$ MHz.</p></div>
<h3>Dekning</h3>
<p>Areal av heksagon: $A=1{,}5\sqrt3R^2$. Antall basestasjoner = område / $A$.</p>
<div class="ex"><b>Eksamen 2024</b><p>2800 km², $N=7$, $D=9$ km. $R=9/\sqrt{21}=1{,}96$ km. $A\approx10$ km². Antall: 280.</p></div>`,
quiz:[
{t:'mc',q:'Oppgaven sier «each simplex channel consists of 25 kHz». Hvilken bredde deler du total båndbredde på?',o:['50 kHz','25 kHz','12,5 kHz','100 kHz'],a:0,e:'<b>Formel:</b> dupleks kanal $=2\\cdot$ simpleks kanal. <b>Utregning:</b> $2\\cdot25=50$ kHz. En samtale trenger én kanal hver vei.'},
{t:'num',y:'2025',q:'30 MHz total, 25 kHz simplex channels, N = 12, 10 duplex control channels per cell. Traffic channels per cell?',a:40,tol:0,e:'<b>Formula:</b> duplex channels $=B/(2\\cdot B_{simplex})$, per cell $=$ channels$/N$, traffic $=$ per cell $-$ control. <b>Calculation:</b> $30\\,000/50=600$. $600/12=50$ per cell. $50-10=40$ traffic channels.'},
{t:'num',y:'2022',q:'30 MHz, simplex 25 kHz, N = 12, 8 users per channel (no control channels). Calls per cell?',a:400,tol:0,e:'<b>Formula:</b> duplex channels $=B/(2\\cdot B_{simplex})$, per cell $=$ channels$/N$, calls $=$ channels $\\cdot$ users per channel. <b>Calculation:</b> $30\\,000/50=600$. $600/12=50$ per cell. $50\\cdot8=400$ calls.'},
{t:'num',y:'2024',q:'120 MHz bandwidth, each channel 30 kHz, N = 7. Channels per cell?',a:571,tol:.002,e:'<b>Formula:</b> channels $=B/B_{channel}$, per cell $=$ channels$/N$. <b>Calculation:</b> $120\\,000/30=4000$ channels. $4000/7=571.4$, so 571 whole channels per cell.'},
{t:'num',y:'2023',q:'N = 7, 400 calls per cell, 10 users per channel, simplex channel 0.25 MHz. Total bandwidth?',a:140,tol:0,u:'MHz',e:'<b>Formula:</b> Work backwards: channels per cell $=$ calls/users per channel, total $=$ per cell $\\cdot N$, $B=$ channels $\\cdot2\\cdot B_{simplex}$. <b>Calculation:</b> $400/10=40$ channels per cell. $40\\cdot7=280$ duplex channels. $280\\cdot2\\cdot0.25=140$ MHz.'},
{t:'num',y:'2024',q:'Service area 2800 km², N = 7, D = 9 km. Number of base stations?',a:280,tol:.01,e:'<b>Formula:</b> $R=D/\\sqrt{3N}$, $A_{cell}=1.5\\sqrt3R^2$, number $=A_{total}/A_{cell}$. <b>Calculation:</b> $R=9/\\sqrt{21}=1.964$ km. $A=2.598\\cdot1.964^2=10.02$ km². $2800/10.02\\approx280$.'},
{t:'num',q:'150 MHz, kanal 0,5 MHz, $N=7$, 8 samtaler per kanal, 21 celler. Antall samtidige samtaler?',a:7056,tol:0,e:'<b>Formel:</b> kanaler $=B/B_{kanal}$, per celle $=\\lfloor$kanaler$/N\\rfloor$, samtaler $=$ per celle $\\cdot$ samtaler per kanal $\\cdot$ celler. <b>Utregning:</b> $150/0{,}5=300$ kanaler. $300/7=42{,}9$, altså 42 hele per celle. $42\\cdot8=336$ samtaler per celle. $336\\cdot21=7056$.'},
{t:'ref',q:'Forklar med egne ord hvorfor dobbelt så mange celler i samme område gir omtrent dobbelt kapasitet, selv om det totale spekteret er uendret.',m:'Hver celle får samme antall kanaler ($S/N$). Antall celler bestemmer hvor mange ganger spekteret gjenbrukes. Mindre celler betyr flere gjenbruk over samme areal.',k:['Kanaler per celle er uendret','Flere celler gir mer gjenbruk','Spekteret er uendret']},
{t:'num',q:'32 celler, $R=1{,}6$ km, $N=7$, 336 kanaler totalt. Hvor mange samtidige samtaler?',a:1536,tol:0,e:'<b>Formel:</b> kanaler per celle $=$ kanaler$/N$, samtaler $=$ per celle $\\cdot$ antall celler. <b>Utregning:</b> $336/7=48$ per celle. $48\\cdot32=1536$.'},
{t:'num',q:'Samme system: 32 celler med $R=1{,}6$ km. Hvor stort område dekkes?',a:213,tol:.01,u:'km²',e:'<b>Formel:</b> $A_{celle}=1{,}5\\sqrt3R^2$, og $A_{total}=A_{celle}\\cdot$ antall celler. <b>Utregning:</b> $2{,}598\\cdot1{,}6^2=6{,}65$ km² per celle. $6{,}65\\cdot32\\approx213$ km².'}
]},
{id:'mer',title:'Fem måter å øke kapasiteten',html:String.raw`
<p>Når trafikken vokser forbi det nettet tåler:</p>
<div class="tw"><table><tr><th>Metode</th><th>Hva</th><th>Pris</th></tr>
<tr><td><b>Nye kanaler</b></td><td>Ta i bruk ubrukte kanaler fra en reserve</td><td>Spekter koster</td></tr>
<tr><td><b>Frekvenslån</b></td><td>Låne kanaler fra naboceller med lite trafikk</td><td>Mer styring</td></tr>
<tr><td><b>Cellesplitting</b></td><td>Del en celle i mikroceller med egne basestasjoner, lavere antenner og effekt</td><td>Flere <b>handovers</b>, mer prosessering</td></tr>
<tr><td><b>Sektorisering</b></td><td>Bytt rundstrålende antenne med retningsantenner. Mindre co-channel-interferens</td><td>Færre kanaler per sektor gir dårligere <b>trunking-effektivitet</b></td></tr>
<tr><td><b>Små celler</b></td><td>Pikoceller i hotspots og femtoceller innendørs (fortetting)</td><td>Mange flere noder</td></tr></table></div>
[[w:cellsplit]]
<p>Halv radius gir fire ganger så mange celler og fire ganger kapasitet.</p>
<div class="ana"><b>Analogi: Fire køer eller én felles</b><p>Cellesplitting er som å dele en klasse i fire små med hver sin lærer: fire ganger så mange elever får hjelp, men de må oftere bytte rom (handover). Sektorisering er som å gjøre én felles butikkø om til tre køer: den forstyrrer mindre, men stopper én kø, kan ikke ledige kasser hjelpe. Derfor blir trunking-effektiviteten dårligere.</p></div>
<h3>Størrelser</h3>
<div class="tw"><table><tr><th>Type</th><th>Radius</th><th>Brukes</th></tr><tr><td><b>Makrocelle</b></td><td>Flere km</td><td>Lav brukertetthet, bred dekning</td></tr><tr><td><b>Mikrocelle</b></td><td>Noen hundre m</td><td>Moderat tetthet</td></tr><tr><td><b>Pikocelle</b></td><td>Noen titalls m</td><td>Høy trafikktetthet</td></tr><tr><td><b>Femtocelle</b></td><td>Innendørs</td><td>I bygg</td></tr></table></div>
<h3>Handover</h3>
<p>Beveger du deg, må samtalen flyttes til ny celle. Ved hard handover brytes forbindelsen før den nye settes opp (break before make), så data avbrytes kort. Ved myk handover er du koblet til begge en stund. Det er mer komplekst, men sømløst. Handover kan startes av både terminalen og nettet.</p>
<div class="ana"><b>Analogi: Trapesartisten</b><p>Ved hard handover slipper artisten den ene stanga før artisten griper den neste: et lite øyeblikk i fritt fall. Ved myk handover holder artisten i begge en stund. Det er tryggere, men krever at begge stengene er der samtidig.</p></div>
<h3>Kontroll- og trafikkanaler</h3>
<p>Kontrollkanaler setter opp og bryter samtaler og kan følge posisjonen til mobilen. Trafikkanaler bærer tale og data.</p>
<div class="ana"><b>Analogi: Drosjesentralen</b><p>Kontrollkanalen er sentralen som tar imot bestillingen og vet hvor bilene er. Trafikkanalen er selve turen. Sentralen frakter ingen passasjerer, men uten den kommer ingen av sted.</p></div>
<h3>Relénode</h3>
<p>Ved cellekanten er signalet svakt. En <b>relénode</b> tar imot, renser og sender signalet videre. Ved å halvere avstanden får du stor gevinst:</p>
<div class="ana"><b>Analogi: To korte rop over dalen</b><p>Du rekker ikke over dalen med ett rop. Står en venn midtveis og gjentar ropet, må hvert rop bare nå halvparten. Siden tapet vokser som $d^n$ og ikke $d$, gir halv avstand mye mer enn dobbelt så sterkt signal.</p></div>
$$\frac{P_{relé}}{P_{BS}}=\left(\frac{d}{2d}\right)^{-n}=2^n$$
[[w:relay]]`,
quiz:[
{t:'num',y:'2025',q:'User at cell edge, relay halfway, n = 4. Ratio between received power via relay and direct?',a:16,tol:0,e:'<b>Formula:</b> $P_r\\propto d^{-n}$, so the ratio is $\\dfrac{(d/2)^{-n}}{d^{-n}}=2^n$. <b>Calculation:</b> $2^4=16$. Half the distance gives a signal 16 times stronger when $n=4$.'},
{t:'mc',y:'2023',fix:1,q:'Which statement is NOT correct:',o:['Technical implementation of soft handover is more complex than the implementation of hard handover.','MTSO performs handoffs.','Handovers cannot be initiated by a mobile unit, only by the network/base station.','Hard handover leads to an interruption of data flow.'],a:2},
{t:'mc',y:'2023',fix:1,q:'In a cellular system, a control channel:',o:['does not establish the relationship between a Mobile Unit and a Base Station','carries voice or data.','has the same responsibility as the traffic channel.','is used to set up and break down calls and can monitor phone location.'],a:3},
{t:'num',q:'Celleradius halveres. Med hvilken faktor øker kapasiteten?',a:4,tol:0,e:'<b>Formel:</b> Arealet per celle er $\\propto R^2$, så antall celler og kapasitet er $\\propto1/R^2$. <b>Utregning:</b> $(1/0{,}5)^2=4$.'},
{t:'ref',y:'2022',q:'Name one advantage and one disadvantage of using micro cells in cellular networks.',m:'Advantage: higher capacity, because channels are reused more times. Disadvantage: more handovers per call, and therefore a higher processing load.',k:['Advantage: more reuse and capacity','Disadvantage: more handovers']},
{t:'ref',y:'2024',q:'Explain the difference between macro cells, micro cells and pico cells in terms of coverage and traffic density.',m:'Macro cells: several km radius, used where user density is low. Micro cells: a few hundred metres, moderate density. Pico cells: a few tens of metres, highest traffic density.',k:['Right order of magnitude for all three','Right link to traffic density']},
{t:'ref',y:'2025',q:'Considering Shannon, briefly explain why the stronger signal through a relay enables higher data rates.',m:'The signal becomes 16 times stronger, so the SNR increases. By $C=B\\log_2(1+SNR)$ a higher SNR gives a higher capacity.',k:['A stronger signal gives a higher SNR','Shannon gives a higher capacity']}
]},
{id:'generasjoner',title:'Fra 1G til LTE',html:String.raw`
<div class="tw"><table><tr><th>Generasjon</th><th>Kjennetegn</th></tr><tr><td>1G</td><td>Analog, bare tale</td></tr><tr><td>2G</td><td>Digital, tale, senere data (2,5G)</td></tr><tr><td>3G</td><td>Digital tale og data, opptil 2 Mbps</td></tr><tr><td>4G (LTE-A)</td><td>Helt IP-basert, opptil 1 Gbps ved lav mobilitet</td></tr><tr><td>5G</td><td>Ekstrem fart, lav forsinkelse</td></tr></table></div>
<h3>Linjesvitsjing og pakkesvitsjing</h3>
<p>Den store overgangen i mobilnettets historie er fra <b>linjesvitsjing</b> til <b>pakkesvitsjing</b>.</p>
<div class="ana"><b>Analogi: Reservert togvogn og pakkepost</b><p>Linjesvitsjing er en reservert togvogn: den er din hele veien, også når du ikke har noe å frakte. Pakkesvitsjing er pakkepost: alle pakker deler de samme bilene, plassen fylles godt, men det kan bli kø.</p></div>
<div class="tw"><table><tr><th></th><th>Linjesvitsjing</th><th>Pakkesvitsjing</th></tr><tr><td>Vei</td><td>Dedikert, satt opp først</td><td>Ingen, pakkene rutes hver for seg</td></tr><tr><td>Ressurser</td><td>Holdes også ved stillhet</td><td>Deles effektivt</td></tr><tr><td>Forsinkelse</td><td>Oppsett, deretter lav jitter</td><td>Varierer, mulig kø</td></tr><tr><td>Best for</td><td>Tale</td><td>Sprutende data</td></tr></table></div>
<h3>3G UMTS</h3>
<p>UMTS har radioaksessnettet <b>UTRAN</b> med <b>NodeB</b> og <b>RNC</b>, og et kjernenett med to domener: linjesvitsjet for tale og SMS, pakkesvitsjet for data.</p>
<h3>4G LTE</h3>
<p>ITU-kravene til 4G: helt IP, opptil 100 Mbps ved høy mobilitet og 1 Gbps ved lav. LTE oppfyller ikke alt og kalles noen ganger 3.9G. <b>LTE-Advanced</b> gjør det.</p>
<p>Hele arkitekturen heter <b>EPS</b>. Den har radiodelen E-UTRAN og kjernen <b>EPC</b>.</p>
<div class="ana"><b>Analogi: Flyplassen</b><p>MME er passkontrollen, og HSS er passregisteret den sjekker mot. SGW er bagasjebåndet i terminalen. PGW er utgangen mot resten av verden. eNodeB er innsjekkingen ved døra. Som på en flyplass er det egne folk for kontroll og egne folk for selve trafikken.</p></div>
[[w:arch]]
<div class="tw"><table><tr><th>Element</th><th>Oppgave</th></tr><tr><td><b>eNodeB</b></td><td>Radio. OFDMA, ikke CDMA. Har overtatt det RNC gjorde: radioressursstyring, opptakskontroll og mobilitetsstyring</td></tr><tr><td><b>MME</b></td><td>Identitet, autentisering, autorisasjon</td></tr><tr><td><b>HSS</b></td><td>Abonnentdatabase</td></tr><tr><td><b>SGW</b></td><td>Pakker mellom eNodeB og kjernenettet</td></tr><tr><td><b>PGW</b></td><td>Kobling til eksterne nett</td></tr></table></div>
<p>To grensesnitt: <b>S1</b> mellom eNodeB og EPC, og <b>X2</b> mellom eNodeB-er for handover, lastbalansering og interferensstyring. <b>Brukerplanet</b> bærer selve dataene, og <b>kontrollplanet</b> bærer signalering.</p>
<div class="ana"><b>Analogi: Flygeledere og fly</b><p>Kontrollplanet er flygelederne, og brukerplanet er flyene. Flygelederne frakter ingen passasjerer, men sier hvem som skal hvor. Skiller du dem, kan du bygge flere rullebaner uten å ansette flere flygeledere. Det er nettopp det 5G gjør med CUPS.</p></div>
<h3>Tale i LTE</h3>
<p>Det finnes ikke linjesvitsjet tale i EPC. Tale går som <b>VoLTE</b>, IP-pakker som alt annet. Signalering skjer i <b>IMS</b>, utenfor EPC.</p>
<h3>Ressursblokker</h3>
<p>En <b>ressursblokk</b> er 12 underbærebølger à 15 kHz = 180 kHz, i 0,5 ms. Tildeling skjer per 1 ms subframe, altså i par. Det er minste ressursenhet i tid-frekvens-gitteret.</p>
<div class="ana"><b>Analogi: Rutene i timeplanen</b><p>En ressursblokk er en rute i timeplanen: et rom (frekvens) i en bestemt time (tid). Basestasjonen deler ut ruter, ikke hele rom og ikke hele dager, og derfor kan den tilpasse seg raskt.</p></div>
[[w:rbgrid]]
<h3>LTE-Advanced</h3>
<ul><li><b>Carrier aggregation:</b> slår sammen bærere, opptil 100 MHz.</li><li>Høyere ordens MIMO.</li><li>Samarbeid med Wi-Fi.</li><li>Relénoder for dekning.</li><li>Koordinering av interferens mellom celler.</li></ul>
<div class="ana"><b>Analogi: To veier til én</b><p>Carrier aggregation er som å åpne en parallell vei til samme mål og la trafikken bruke begge. Hver vei er som før, men sammen slipper de gjennom mye mer.</p></div>
<div class="exam"><b>Eksamen 2023</b><p>Relénodens funksjon: håndtere interferens nær cellegrensen og fornye signalet. Fordel: utvidet dekning til lav pris og lav effekt.</p></div>`,
quiz:[
{t:'mc',y:'2024',q:'Which component in the LTE architecture is responsible for connecting the radio network to the core network?',o:['Serving Gateway (SGW)','Mobility Management Entity (MME)','Home Subscriber Server (HSS)','Packet Data Network Gateway (PGW)'],a:0},
{t:'mc',y:'2023',fix:1,q:'In LTE, a resource block:',o:['only has frequency dimension.','only has time dimension.','is the smallest unit of resources in a frequency-time grid.','is normally 120kHz wide in frequency.'],a:2},
{t:'num',q:'Hvor bred er en LTE-ressursblokk?',a:180,tol:0,u:'kHz',e:'<b>Formel:</b> bredde $=$ antall underbærebølger $\\cdot$ avstanden mellom dem. <b>Utregning:</b> $12\\cdot15$ kHz $=180$ kHz.'},
{t:'ref',y:'2022',q:'How does eNodeB in LTE differ from NodeB in 3G UMTS?',m:'NodeB has less functionality and is controlled by an RNC. eNodeB has its own control functionality: radio resource management, admission control and mobility management. There is no longer a separate control element. eNodeB uses OFDMA, not CDMA.',k:['NodeB is controlled by an RNC','eNodeB has its own control','eNodeB uses OFDMA']},
{t:'ref',y:'2023',q:'In LTE, what is the primary functionality of Relay Nodes? What are the two main advantages?',m:'The RN handles interference when the user is near the cell edge. It decodes the data, can remove noise, and forwards the signal with better quality. Advantages: extended coverage, low cost and low power.',k:['Improves the signal at the cell edge','Extended coverage','Low cost and low power']},
{t:'ref',q:'Hvorfor kan LTE fjerne RNC, og hvilken fordel gir det?',m:'Fordi eNodeB tar over RNC-funksjonene, kan beslutninger tas nær radioen. Det gir lavere forsinkelse og en flatere og enklere arkitektur.',k:['eNodeB tar over funksjonene','Beslutninger nær radioen','Flatere arkitektur, lavere forsinkelse']}
]},
{id:'g5',title:'5G og 6G',html:String.raw`
<p>5G skal gi ultrapålitelig kommunikasjon med lav forsinkelse og støtte enormt mange enheter. De tre tjenesteklassene:</p>
<div class="tw"><table><tr><th>Klasse</th><th>Krav</th><th>Eksempel</th></tr><tr><td><b>eMBB</b></td><td>Høy datarate</td><td>HD-video, AR</td></tr><tr><td><b>mMTC</b></td><td>Mange enheter på lite område</td><td>Sensorer, IoT</td></tr><tr><td><b>URLLC</b></td><td>Pålitelighet og lav forsinkelse</td><td>Fjernkirurgi, selvkjørende biler</td></tr></table></div>
<p>Ingen enkelt nettkonfigurasjon kan oppfylle alle tre samtidig. Løsningen er <b>network slicing</b>: ett fysisk nett deles i flere logiske nett, hver tilpasset sitt bruk.</p>
<div class="ana"><b>Analogi: Felt med egne regler</b><p>Samme vei kan ha kollektivfelt, sykkelfelt og et felt for utrykning. Asfalten er den samme, men reglene er ulike. Slicing gjør det samme med ett fysisk nett, så en sensor og en fjernoperert pasient får hvert sitt «felt».</p></div>
<h3>Spektrum</h3>
<div class="tw"><table><tr><th>Bånd</th><th>Område</th><th>Egenskap</th><th>Rate</th></tr><tr><td>Lavbånd</td><td>Under 1 GHz</td><td>Best dekning og innendørs</td><td>100–250 Mbps</td></tr><tr><td>Midtbånd</td><td>1–6 GHz</td><td>Beste balanse, hovedbånd</td><td>Opptil 1 Gbps</td></tr><tr><td>Høybånd</td><td>24–40+ GHz</td><td>Svært rask, svært kort rekkevidde</td><td>Opptil 20 Gbps</td></tr></table></div>
<h3>CUPS</h3>
<p><b>CUPS</b> skiller kontrollplan og brukerplan:</p>
<ul><li>De skaleres uavhengig av hverandre.</li><li>Brukerfunksjoner kan flyttes nær brukeren, som gir lavere forsinkelse.</li><li>Enklere drift, for eksempel oppdateringer.</li><li>Muliggjør slicing, fordi ulike tjenester kan gå ulike veier.</li></ul>
<h3>6G</h3>
<p>Ventes rundt 2030. Teknologier: sub-THz og THz (0,1–10 THz), <b>RIS</b>, AI-native nett, <b>ISAC</b>, massiv IoT. Tre forskningsutfordringer: THz gir båndbredde, men kort rekkevidde. Tette nett krever energi. AI gir autonomi, men må være til å stole på.</p>
<div class="ana"><b>Analogi: Styrbart speil og flaggermus</b><p>RIS er en vegg av speil som kan vris, slik at signalet sendes rundt hjørnet du trenger. ISAC er flaggermusen: samme lyd brukes både til å kommunisere og til å «se» omgivelsene.</p></div>
<div class="trap"><b>Gjesteforelesninger</b><p>2023-eksamen spurte hva gjesteforelesningen sa om de to viktigste teknologiene i 5G (svar: forbedret radio og skybasert tilnærming). Forelesningene 3. og 4. november 2026 har ingen slides i emnemappen. Skaff deg notater fra dem.</p></div>`,
quiz:[
{t:'mc',y:'2024',q:'One of the key features of 5G is network slicing. What does network slicing enable?',o:['Dedicated virtual networks optimized for specific use cases','Increased data compression','Simplified network infrastructure','Longer battery life for devices'],a:0},
{t:'mc',q:'Fjernkirurgi er et eksempel på:',o:['URLLC','eMBB','mMTC','VoLTE'],a:0},
{t:'mc',q:'Hvilket 5G-bånd gir størst fart og kortest rekkevidde?',o:['Høybånd (mmWave)','Lavbånd','Midtbånd'],a:0},
{t:'num',q:'THz-båndet i 6G begynner på 0,1 THz. Hva er bølgelengden der, i mm?',a:3,tol:.01,u:'mm',e:'<b>Formel:</b> $\\lambda=c/f$. <b>Utregning:</b> $\\dfrac{3\\cdot10^8}{10^{11}}=3\\cdot10^{-3}$ m $=3$ mm.'},
{t:'ref',q:'Hvorfor trenger network slicing CUPS?',m:'Slicing betyr at ulike tjenester skal ha ulike egenskaper. Når brukerplanet er skilt fra kontrollplanet, kan hver slice ha sin egen brukerplansti, for eksempel kort vei for lav forsinkelse, uten at kontrollen må dupliseres.',k:['Ulike tjenester trenger ulik behandling','Skille gjør at brukertrafikken kan gå ulike veier','Skreddersydd ytelse per slice']}
]},
{id:'eks',title:'Eksamensoppgaver',quizTitle:'Som på eksamen',html:String.raw`<p>Hele oppgaven fra 2025 under er 12 poeng. Du bør klare den på under 20 minutter.</p>`,
quiz:[
{t:'ex',y:'2025',pts:12,q:'Hexagonal cells, R = 2 km, N = 12. Total bandwidth 30 MHz, simplex channel 25 kHz. Each cell reserves 10 duplex channels for control.<br>a) Define reuse distance. Compute D and Q. [2p]<br>b) Total duplex channels, and usable traffic channels per cell. [2p]<br>c) Each traffic channel shared by 8 users (TDMA). Max simultaneous calls per cell? [1p]<br>d) N reduced from 12 to 7: how are interference and capacity affected? Support with numbers. [3p]<br>e) User at cell edge, relay halfway, n = 4. i. Ratio of received power via relay vs. direct. [2p] ii. Why does this enable higher data rates (Shannon)? [2p]',s:String.raw`<p>a) The minimum distance between two co-channel cells that keeps interference acceptable. $D=R\sqrt{3N}=2\sqrt{36}=12$ km. $Q=D/R=12/2=6$.</p><p>b) A duplex channel is $2\cdot25=50$ kHz. $30\,000/50=600$ duplex channels. $600/12=50$ per cell. $50-10=40$ for traffic.</p><p>c) $40\cdot8=320$ calls.</p><p>d) $D'=R\sqrt{3N}=2\sqrt{21}\approx9.2$ km instead of 12 km: co-channel cells are closer, so more interference. Channels per cell: $600/7\approx85$ instead of 50: more capacity.</p><p>e) i. $P_r\propto d^{-n}$. Ratio $=\dfrac{(d/2)^{-4}}{d^{-4}}=2^4=16$. ii. A signal 16 times stronger gives a higher SNR, and Shannon then gives a higher capacity.</p>`},
{t:'ex',y:'2024',pts:7,q:'2800 km² service area. N = 7, D = 9 km. Hexagonal cells.<br>c) Number of base stations. [3p]<br>d) Minimum SIR 15 dB, n = 4, $i_0=6$. Does N = 7 meet it? [2p]<br>e) 120 MHz total, each channel 30 kHz. (i) Total channels (ii) Channels per cell. [2p]',s:String.raw`<p>c) $R=D/\sqrt{3N}=9/\sqrt{21}=1.964$ km. Cell area $A=1.5\sqrt3R^2=2.598\cdot1.964^2\approx10$ km². $2800/10=280$ base stations.</p><p>d) $Q=\sqrt{3N}=\sqrt{21}=4.583$. $SIR=Q^n/i_0=4.583^4/6=441/6=73.5$. $10\log_{10}73.5=18.66$ dB > 15 dB. Yes.</p><p>e) (i) $120\,000/30=4000$ channels. (ii) $4000/7=571.4$, so 571 per cell.</p>`}
]}
]});

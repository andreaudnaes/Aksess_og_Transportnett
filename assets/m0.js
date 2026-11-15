C.add({id:'m0',nr:0,part:'base',short:'Grunnmuren',src:'Forelesning 0',
title:'Grunnmuren: signaler, desibel og kartet over nettet',
lead:String.raw`Før du kan forstå 5G eller fiber, trenger du et lite språk: hva et signal er, hvordan vi regner med desibel, og hva som skjer når noe analogt blir digitalt. Denne modulen antar at du ikke kan noe av dette fra før.`,
goals:[String.raw`plassere hver teknologi i emnet på et kart over nettet`,String.raw`regne fram og tilbake mellom watt, dB og dBm uten kalkulator for de vanlige verdiene`,String.raw`bruke Nyquist-kravet til å velge samplingsfrekvens`,String.raw`forklare hvorfor vi modulerer, multiplekser og filtrerer`],
sections:[
{id:'kart',title:'Kartet: hva handler emnet om?',html:String.raw`
<p>Når du åpner en nettside på mobilen, går dataene gjennom to helt forskjellige verdener. Først må de komme seg fra deg og inn i operatørens nett. Det er <b>aksessnettet</b>, ofte kalt «siste mil». Deretter må de fraktes langt og i store mengder sammen med alle andres trafikk. Det er <b>transportnettet</b>.</p>
[[f:map|Hele emnet på én tegning. Del I av kurset dekker radiodelen til venstre. Del II dekker fiberen til høyre.]]
<div class="why"><b>Hvorfor to deler?</b><p>Problemene er motsatte. I aksessnettet er utfordringen at mediet er <i>dårlig og delt</i>: radio er upålitelig, og alle deler samme luft. I transportnettet er mediet nesten perfekt, så utfordringen er <i>skala og pålitelighet</i>: hvordan fylle en fiber med terabit og overleve at noen graver den over.</p></div>
<div class="ana"><b>Analogi: Småveier og motorvei</b><p>Aksessnettet er alle småveiene fram til hvert enkelt hus: det er mange av dem, de er dyre å bygge, og hver bærer lite. Transportnettet er motorveien: få veier, enorm samlet trafikk, og stenger du én strekning, merker tusenvis det. Derfor må de to nettene løse helt ulike problemer.</p></div>
<p>Teknologiene i emnet ligger nederst i lagmodellen. <b>OSI-modellen</b> deler kommunikasjon i sju lag, slik at hvert lag bare trenger å tenke på sin oppgave. Vi lever på lag 1 og 2.</p>
<div class="ana"><b>Analogi: Brevet gjennom posten</b><p>Du skriver brevet, postkontoret sorterer det, og sjåføren kjører det. Sjåføren trenger ikke lese brevet, og du trenger ikke kjenne ruten. Lagdeling virker fordi hvert lag kan byttes ut uten at de andre merker det.</p></div>
[[f:layers|Emnet handler om de to nederste lagene: fysisk lag og datalinklaget.]]
<h3>Hvorfor er trådløst vanskelig?</h3>
<p>Fire utfordringer går igjen gjennom hele del I. Hver av dem får sin egen løsning senere:</p>
<ul><li><b>Attenuasjon:</b> jo lenger signalet går, desto svakere blir det.</li><li><b>Delt medium:</b> alle sender i samme luft, så vi trenger regler for hvem som får sende.</li><li><b>Sikkerhet:</b> radiobølger kringkastes, så alle i nærheten kan lytte.</li><li><b>Knapt spekter:</b> brukbare frekvenser er en begrenset ressurs.</li></ul>
<p>I tillegg kommer <b>flerveisutbredelse</b>: signalet spretter mot bygg og kommer fram i flere kopier. Kopiene kan forsterke eller slukke hverandre.</p>`,
quiz:[
{t:'mc',q:'Hvilken påstand beskriver forskjellen mellom aksess- og transportnett best?',o:['Aksessnettet kobler brukeren til operatøren, mens transportnettet frakter samlet trafikk langt','Aksessnettet er alltid trådløst, mens transportnettet alltid er kobber','Aksessnettet ligger på lag 7, mens transportnettet ligger på lag 3','Transportnettet er bare for mobiltrafikk'],a:0,e:'Aksess kan også være fiber (FTTH). Transport er stamnettet, og det frakter også mobiltrafikken.'},
{t:'num',q:'Hvor mange lag har OSI-modellen?',a:7,tol:0,e:'Applikasjon, presentasjon, sesjon, transport, nettverk, datalink, fysisk.'},
{t:'ref',q:'Forklar med egne ord hvorfor et trådløst nett trenger regler for hvem som får sende, mens et svitsjet kablet nett med full dupleks klarer seg uten.',m:'Trådløst er ett delt medium: alle sender i samme luft på samme frekvens, så to samtidige sendinger ødelegger hverandre. En full dupleks-kabel til en svitsj er en privat link, så ingen andre konkurrerer om den.',k:['Luft er et delt medium','Samtidige sendinger kolliderer','Full dupleks-kabel er ikke delt']}
]},
{id:'signal',title:'Signaler og sinusbølgen',html:String.raw`
<p>Et <b>signal</b> er en fysisk størrelse som varierer for å bære informasjon. I kabel er det spenning, i luft radiobølger, i fiber lys. Et <b>analogt signal</b> varierer jevnt, mens et <b>digitalt signal</b> hopper mellom faste nivåer.</p>
<p>Alt i kommunikasjon bygger på én form, sinusbølgen, fordi den er det enkleste periodiske signalet som finnes. Hvert annet signal kan bygges av mange sinusbølger.</p>
$$s(t)=A\sin(2\pi f t+\varphi)$$
<p>Tre knapper styrer den: <b>amplitude</b> $A$, <b>frekvens</b> $f$ og <b>fase</b> $\varphi$. Disse tre er alt vi kan endre på en bølge. Hele modulasjonsteorien senere går ut på å skru på disse knappene for å bære informasjon.</p>
<div class="ana"><b>Analogi: Hoppetauet</b><p>Du kan svinge tauet høyt eller lavt (amplitude), fort eller sakte (frekvens), og du kan starte svingen litt tidligere eller senere (fase). Mer er det ikke å variere på en jevn svingning. Derfor må all informasjon bæres av nettopp disse tre.</p></div>
[[w:sine]]
<p>Tiden én svingning tar, er <b>perioden</b> $T=1/f$. Regn gjerne ut noen: 1 kHz gir 1 ms, 1 MHz gir 1 µs.</p>
<p><b>Bølgelengden</b> er avstanden bølgen beveger seg på én periode. Hvis bølgen går med farten $v$, er $\lambda=v/f$. I vakuum er $v=c=3\cdot10^8$ m/s:</p>
$$\lambda=\frac{c}{f}$$
<div class="ana"><b>Analogi: Skritt i samme fart</b><p>To personer går like fort, men den ene tar dobbelt så mange skritt i minuttet. Da må skrittene være halvparten så lange. Radiobølger har alle samme fart, så høy frekvens betyr kort bølgelengde.</p></div>
<div class="ex"><b>Regneeksempel</b><p>Wi-Fi på 2,4 GHz: $\lambda=\dfrac{3\cdot10^8}{2{,}4\cdot10^9}=0{,}125$ m $=12{,}5$ cm. Dette spørsmålet kom på eksamen i 2024.</p></div>
<div class="trap"><b>Felle</b><p>Husk å gjøre om til Hz og meter før du regner. 2,4 GHz er $2{,}4\cdot10^9$ Hz. En feil her gir ofte svar som er feil med en faktor tusen.</p></div>
<h3>Båndbredde betyr to ting</h3>
<p>I signalbehandling er <b>båndbredde</b> bredden på et frekvensområde, i Hz. En kanal fra 3 til 4 MHz har båndbredde 1 MHz. I daglig tale brukes ordet om datarate i bps. Eksamen bruker oftest hertz-betydningen når det står $B$ i en formel.</p>
<div class="ana"><b>Analogi: Bredden på veien</b><p>Båndbredde i hertz er hvor bred veien er. Datarate er hvor mange biler som slipper gjennom per sekund. Veibredden setter grensen, men hvor mye som faktisk kommer gjennom, avhenger også av hvor tett og trygt bilene kan kjøre.</p></div>
<p>Nærliggende ord: <b>throughput</b> er hvor mye som faktisk overføres per tid, og <b>goodput</b> er den nyttige delen av det, altså uten overhead og retransmisjoner.</p>
<div class="ana"><b>Analogi: Flyttelasset</b><p>Throughput er alt flyttebilen frakter: esker, bobleplast og turene du måtte kjøre om igjen. Goodput er bare møblene du faktisk ville ha flyttet. Derfor er goodput alltid lavere.</p></div>`,
quiz:[
{t:'num',q:'Hva er bølgelengden til et signal på 5 GHz?',a:0.06,u:'m',e:'<b>Formel:</b> $\\lambda=c/f$, med $f$ i Hz. <b>Utregning:</b> $\\lambda=\\dfrac{3\\cdot10^8}{5\\cdot10^9}=0{,}06$ m, altså 6 cm.',h:'Bruk $\\lambda=c/f$ med $f$ i Hz.'},
{t:'num',q:'Hva er perioden til et signal på 2 MHz, oppgitt i mikrosekunder?',a:0.5,u:'µs',e:'<b>Formel:</b> $T=1/f$. <b>Utregning:</b> $T=\\dfrac{1}{2\\cdot10^6}=5\\cdot10^{-7}$ s $=0{,}5$ µs.'},
{t:'mc',q:'En kanal bruker frekvensene 3 MHz til 4 MHz. Hva er båndbredden?',o:['1 MHz','3,5 MHz','7 MHz','4 MHz'],a:0,e:'Båndbredde er øvre minus nedre grense. Dette er første steg i forelesningens Shannon-eksempel.'},
{t:'ref',q:'Hva er forskjellen på bandwidth, throughput og goodput? Bruk gjerne en filnedlasting som eksempel.',m:'Bandwidth er kapasiteten eller frekvensbredden kanalen har. Throughput er hvor mye som faktisk går gjennom, inkludert overhead. Goodput er bare nyttige bytes i filen du laster ned, altså throughput minus headere og det som måtte sendes på nytt.',k:['Bandwidth er kanalens kapasitet eller bredde','Throughput er målt faktisk overføring','Goodput er bare nyttig data']}
]},
{id:'db',title:'Desibel: det viktigste regneverktøyet',html:String.raw`
<div class="why"><b>Hvorfor trenger vi dette?</b><p>Effekt varierer enormt. En mobil sender rundt 0,2 W, mens den kan ta imot $10^{-13}$ W. Ganger du tap gjennom en link, får du lange tall med mange nuller. Logaritmer gjør ganging til pluss. Da blir hele linkregnskapet enkel addisjon, og det er akkurat slik du løser effektbudsjett-oppgavene på eksamen.</p></div>
<div class="ana"><b>Analogi: Papiret du bretter</b><p>Hver gang du bretter et ark, dobles tykkelsen. Etter ti bretter er arket 1024 ganger tykkere, men du trenger bare å si «ti bretter». Desibel teller bretter: 3 dB er én dobling. Å legge sammen bretter er det samme som å gange tykkelser, og derfor blir ganging til pluss.</p></div>
<p>En <b>desibel</b> sier hvor stort <i>forholdet</i> mellom to effekter er:</p>
$$\text{forhold i dB}=10\log_{10}\frac{P_2}{P_1}$$
<p>Lær disse utenat. De dekker nesten alt:</p>
<div class="tw"><table><tr><th>Forhold</th><th>1/1000</th><th>1/10</th><th>1/2</th><th>1</th><th>2</th><th>4</th><th>10</th><th>100</th><th>1000</th></tr><tr><td>dB</td><td>−30</td><td>−10</td><td>−3</td><td>0</td><td>+3</td><td>+6</td><td>+10</td><td>+20</td><td>+30</td></tr></table></div>
<p>Baklengs: $P_2/P_1=10^{\text{dB}/10}$. Så 24 dB er $10^{2{,}4}\approx251$.</p>
<p>Tips for hoderegning: del opp i tiere og treere. 13 dB = 10 + 3, altså ×20. 17 dB = 20 − 3, altså ×50. 23 dB = 20 + 3, altså ×200, så 24 dB ligger litt over det.</p>
<h3>dB og dBm er ikke det samme</h3>
<p><b>dB</b> er et forhold, for eksempel «tapet er 3 dB». <b>dBm</b> er et absolutt nivå: effekten sammenlignet med 1 mW.</p>
$$P_{\text{dBm}}=10\log_{10}\frac{P}{1\text{ mW}}$$
<p>Så 0 dBm = 1 mW, 3 dBm = 2 mW, 30 dBm = 1 W, −30 dBm = 1 µW. Tilsvarende er <b>dBW</b> målt mot 1 W, så 0 dBW = 30 dBm.</p>
<div class="ana"><b>Analogi: Temperatur og graders endring</b><p>dBm er som «20 °C»: et punkt på skalaen. dB er som «5 grader varmere»: en endring. «20 °C pluss 5 grader» gir mening, men «20 °C pluss 15 °C» gir ikke mening. Du kan flytte deg fra et punkt, men du kan ikke legge to punkter sammen.</p></div>
<div class="key"><b>Regelen du må kunne</b><p>$\text{dBm}\pm\text{dB}=\text{dBm}$ er lov. $\text{dB}\pm\text{dB}=\text{dB}$ er lov. $\text{dBm}-\text{dBm}=\text{dB}$ er lov. $\text{dBm}+\text{dBm}$ er <b>ikke</b> lov.</p></div>
[[w:db]]
<div class="exam"><b>Eksamen 2025, MC 14</b><p>Hvilken operasjon er gyldig? $-3\text{ dBm}+5\text{ dB}-11\text{ dB}$ er gyldig, fordi det er ett absolutt nivå pluss og minus forhold. Alternativene med to dBm-verdier faller bort.</p></div>
<h3>Baklengs med SNR</h3>
<p>Formler som Shannon krever lineære tall. Får du SNR i dB, må du alltid gjøre om først: $SNR=10^{\text{dB}/10}$. Dette er den vanligste enkeltfeilen i del I.</p>`,
quiz:[
{t:'num',q:'En forsterker gjør 1 W om til 2 W. Hvor mange dB forsterker den?',a:3,tol:.02,u:'dB',e:'<b>Formel:</b> $G_{dB}=10\\log_{10}(P_{ut}/P_{inn})$. <b>Utregning:</b> $10\\log_{10}(2/1)=10\\cdot0{,}301\\approx3$ dB. En dobling er alltid +3 dB.'},
{t:'num',q:'En sender har 2 mW ut. Hva er det i dBm?',a:3,tol:.02,u:'dBm',e:'<b>Formel:</b> $P_{dBm}=10\\log_{10}(P/1\\text{ mW})$. <b>Utregning:</b> $10\\log_{10}(2/1)=10\\cdot0{,}301\\approx3$ dBm.'},
{t:'num',q:'En demper på −10 dB. Hva er forholdet $P_{ut}/P_{inn}$?',a:.1,e:'<b>Formel:</b> $P_{ut}/P_{inn}=10^{dB/10}$. <b>Utregning:</b> $10^{-10/10}=10^{-1}=0{,}1$.'},
{t:'num',q:'SNR er 24 dB. Hva er SNR lineært? (Rund av til nærmeste heltall.)',a:251,tol:.01,e:'<b>Formel:</b> $SNR=10^{SNR_{dB}/10}$. <b>Utregning:</b> $10^{24/10}=10^{2{,}4}\\approx251$.'},
{t:'num',q:'Et signal på +3 dBm går gjennom 15 dB tap. Hva er effekten i dBm?',a:-12,tol:0,u:'dBm',e:'<b>Formel:</b> I dB trekkes tap fra: $P_{ut}=P_{inn}-\\text{tap}$. <b>Utregning:</b> $3-15=-12$ dBm.'},
{t:'mc',y:'2025',fix:1,q:'Decibels are used for calculating the power budget in optical networks. Which of the operations below is (or are) valid?',o:['-3dBm + 5dB – 11dB','5dB + 3dBm + 4dB','5dB – 3dBm – 5dBm','First two alternatives are valid.'],a:0,e:'The 2025 solution is a. Note that b looks like dBm + dB + dB, which can be computed, but a budget starts with the level. The main point is that c mixes two absolute levels and is invalid.'},
{t:'ref',q:'Hvorfor kan du ikke legge sammen to verdier i dBm? Forklar uten å bruke formler.',m:'dBm er et absolutt nivå, altså en mengde effekt målt på en logaritmisk skala. Addisjon på logskala betyr multiplikasjon av de lineære tallene. Å gange to milliwatt-verdier gir ingen fysisk mening. To effekter summeres ved å gjøre om til mW først. Du kan derimot legge et forhold (dB) på et nivå, fordi det betyr å gange effekten med en faktor.',k:['dBm er et absolutt nivå','Pluss i dB betyr ganging lineært','Å gange to effekter gir ikke mening']}
]},
{id:'digital',title:'Fra analogt til digitalt: sampling og kvantisering',html:String.raw`
<div class="why"><b>Hvorfor?</b><p>Datamaskiner kan bare lagre tall, men verden er kontinuerlig. For å digitalisere noe må vi gjøre to kutt: velge <i>når</i> vi måler (sampling) og <i>hvor nøyaktig</i> vi lagrer målingen (kvantisering). Hvert kutt kan ødelegge noe, og disse to spørsmålene forteller hvor mye vi kan kutte.</p></div>
<h3>Sampling og Nyquist-kravet</h3>
<p><b>Nyquist-kravet</b> sier at et signal uten frekvenser over $f_{max}$ er fullstendig bestemt av prøver tatt med</p>
$$f_s\ge 2f_{max}$$
<p>Tenk på det slik: én svingning har en topp og en bunn. Du må treffe begge for å se at svingningen finnes. Sampler du for sjelden, får du <b>aliasing</b>: signalet later som det har en helt annen, lavere frekvens.</p>
<div class="ana"><b>Analogi: Hjulet på film</b><p>Et filmkamera tar et fast antall bilder per sekund. Roterer hjulet nesten en hel runde mellom to bilder, ser det ut som det går sakte baklengs. Hvert bilde er riktig, men bildene kommer for sjelden til å avsløre hva som skjedde imellom. Den informasjonen er borte og kan ikke regnes tilbake.</p></div>
[[w:sampling]]
<div class="exam"><b>Eksamen 2023, MC 2</b><p>Signal med $f_{max}=20$ kHz, sampling hver 20 µs. Da er $f_s=1/20\text{ µs}=50$ kHz. Kravet er 40 kHz, så signalet kan gjengis nøyaktig. Oppgaven prøver å lokke deg til å sammenligne 20 og 20.</p></div>
<h3>Kvantisering</h3>
<p>Hver prøve er et reelt tall, men vi har bare $n$ bit og dermed $2^n$ nivåer. <b>Kvantisering</b> runder av til nærmeste nivå. Forskjellen kalles <b>kvantiseringsfeil</b> og oppleves som støy.</p>
<div class="ana"><b>Analogi: Linjalen uten millimeter</b><p>Måler du med en linjal som bare har centimetermerker, må du runde av. Feilen er alltid under et halvt merke, men den forsvinner aldri. Flere bit gir tettere merker og mindre feil, ikke null feil.</p></div>
<p>Ved lineær kvantisering er alle trinn like store. Problemet er at tale består mest av svake lyder, og for svake signaler blir trinnene da grove i forhold til signalet. <b>Ikke-lineær kvantisering</b> gir små trinn nær null og store trinn ved høye amplituder. Det kan gjøres ved <b>companding</b>: komprimer før kvantisering, utvid etterpå.</p>
<div class="ana"><b>Analogi: Runde av priser</b><p>Runder du av alle priser til nærmeste hundrelapp, er det greit for en bil, men ubrukelig for en kaffe. Like store trinn passer dårlig når størrelsene er så ulike. Companding gir småprisene fine trinn og de dyre varene grove trinn, slik at feilen blir liten i forhold til det du måler.</p></div>
[[w:quant]]
<p>Pris og gevinst: ikke-lineær kvantisering gir lavere kvantiseringsstøy, men krever mer minne og beregning. Eksamen 2024 spurte hva companding er, og 2023 spurte hva ikke-lineær kvantisering inneholder.</p>
<h3>Digital telefoni: 64 kbps</h3>
<p>Tale filtreres til 4 kHz. Nyquist krever 8000 prøver per sekund. Med 8 bit per prøve får du $8000\cdot8=64$ kbps. Dette tallet kommer tilbake i modul 8, der det er selve byggesteinen i PDH.</p>`,
quiz:[
{t:'num',q:'Et signal har høyeste frekvens 3 kHz. Hva er minste samplingsfrekvens?',a:6,tol:0,u:'kHz',e:'<b>Formel:</b> Nyquist: $f_s\\ge2f_{max}$. <b>Utregning:</b> $2\\cdot3=6$ kHz.'},
{t:'num',q:'Hvor mange kvantiseringsnivåer gir 8 bit?',a:256,tol:0,e:'<b>Formel:</b> $L=2^n$ nivåer for $n$ bit. <b>Utregning:</b> $2^8=256$.'},
{t:'num',q:'En talekanal har båndbredde 4 kHz og 8 bit per prøve. Hvilken bitrate trengs?',a:64,tol:0,u:'kbps',e:'<b>Formel:</b> $f_s=2B$ og $R=f_s\\cdot n$. <b>Utregning:</b> $f_s=2\\cdot4000=8000$ prøver/s. $R=8000\\cdot8=64\\,000$ bps $=64$ kbps.'},
{t:'mc',y:'2023',fix:1,q:'A signal with maximum frequency of 20kHz is being sampled with a 20 µs interval between two successive samples. The signal:',o:['Is over-sampled.','Is under "aliancing".','Can be accurately reproduced.','Cannot be accurately reproduced, since for that the intervals between sampling would need to be shorter than 20 µs.'],a:2,e:'<b>Formula:</b> $f_s=1/T_s$, and the requirement is $f_s\\ge2f_{max}$. <b>Calculation:</b> $f_s=\\dfrac{1}{20\\cdot10^{-6}}=50$ kHz. The requirement is $2\\cdot20=40$ kHz. $50\\ge40$, so the signal can be accurately reproduced.'},
{t:'mc',y:'2024',q:'In non-linear quantization, companding refers to:',o:['Compressing the signal amplitude before quantization and expanding it after quantization','Combining multiple signals into one channel','Modulating the frequency of a signal','Splitting a signal into multiple sub-bands'],a:0,e:'Compressing + expanding = companding.'},
{t:'ref',q:'Hva går galt ved undersampling, og hvorfor kan ikke mottakeren rette det etterpå?',m:'Høye frekvenser blir til falske lave frekvenser (aliasing). Prøvene passer like godt på to ulike bølger, så informasjonen om hvilken av dem som var den ekte, er borte for godt.',k:['Høye frekvenser fremstår som lave','Flere signaler gir samme prøver','Informasjonen er tapt, så det kan ikke rettes etterpå']}
]},
{id:'filter',title:'Filtre og modulasjon',html:String.raw`
<h3>Filtre</h3>
<p>Et <b>filter</b> endrer hvilke frekvenser som slipper gjennom. Vi bruker dem til å skille kanaler fra hverandre og fjerne støy. <b>Knekkfrekvensen</b> er der dempingen starter.</p>
<div class="ana"><b>Analogi: Dørvakten</b><p>En dørvakt slipper inn etter alder, ikke etter hva gjestene skal si. Lavpass slipper inn de unge, høypass de eldre, og båndpass bare dem mellom 20 og 30. Et filter ser på frekvensen, ikke på innholdet.</p></div>
<ul><li><b>Lavpass:</b> slipper gjennom under knekkfrekvensen.</li><li><b>Høypass:</b> slipper gjennom over knekkfrekvensen.</li><li><b>Båndpass:</b> slipper gjennom et område.</li></ul>
[[w:filter]]
<div class="exam"><b>Eksamen 2025, MC 2</b><p>Signal mellom 1 og 3 kHz. Båndpass 1–3 kHz fjerner alt annet. Sampling på 8 kHz oppfyller $f_s\ge6$ kHz med god margin. Lavpass på 3 kHz med 5 kHz sampling bryter Nyquist.</p></div>
<h3>Hvorfor modulerer vi?</h3>
<p>Tale ligger rundt 300 Hz. Kan vi ikke bare sende det rett ut av en antenne? Tre grunner til at det ikke går:</p>
<ol><li><b>Antennestørrelse:</b> en halvbølgeantenne for 300 Hz må være 500 km lang.</li><li><b>Deling:</b> hvis alle sendte på samme lave frekvens, ville alle forstyrre alle. Flytter vi hver sender til sin egen bærefrekvens, får alle plass.</li><li><b>Tilpasning til mediet:</b> ulike frekvenser går ulikt gjennom luft, og høyere frekvenser kan bære mer data.</li></ol>
<p><b>Modulasjon</b> betyr å legge informasjonen på en <b>bærebølge</b> ved å endre amplitude, frekvens eller fase. Det opprinnelige lavfrekvente signalet kalles <b>basisbånd</b>. Demodulasjon er å hente det ut igjen.</p>
<div class="ana"><b>Analogi: Godset og lastebilen</b><p>Basisbåndet er godset. Det kommer seg ikke langt alene. Bærebølgen er lastebilen som frakter det, og hver lastebil holder seg i sitt eget felt. Slik kan mange dele veien, og mottakeren henter bare lasten fra sitt felt.</p></div>
<h3>Hvorfor multiplekser vi?</h3>
<p>En fiber eller et frekvensbånd kan bære langt mer enn én brukers signal. <b>Multipleksing</b> lar mange signaler dele samme medium. <b>MAC</b> er reglene som bestemmer hvem som får bruke det og når. Kort sagt: MAC = multipleksing + algoritme. Begge får egne moduler.</p>
<div class="ana"><b>Analogi: Felt og vikeplikt</b><p>Multipleksing er å male feltene i veien. MAC er trafikkreglene som sier hvem som får kjøre, og når. Feltene alene hindrer ikke sammenstøt hvis alle vil inn samtidig.</p></div>
<h3>Ledede og uledede medier</h3>
<p>Kobberkabel og fiber er <b>ledede medier</b>: signalet følger kabelen. Radio er <b>uledet medium</b>: signalet sprer seg i alle retninger og må tas imot med antenne. Dette forklarer det meste av forskjellen mellom del I og del II.</p>
<div class="ana"><b>Analogi: Hageslange og vannspreder</b><p>En hageslange fører nesten alt vannet dit du peker. En vannspreder kaster det utover, så blomsten får bare noen dråper, og alle i hagen blir våte. Slik er forskjellen på fiber og radio: radio mister mesteparten underveis, og alle i nærheten deler den samme luften.</p></div>`,
quiz:[
{t:'mc',y:'2024',q:'For a high-pass filter with a cut-off frequency of 1 kHz, which of the following frequencies will be passed through with minimal attenuation?',o:['2 kHz','500 Hz','0.99 kHz','0.5 kHz'],a:0,e:'A high-pass filter passes the frequencies above the cut-off frequency.'},
{t:'num',q:'Hvor lang må en halvbølgeantenne være for 300 Hz, oppgitt i km?',a:500,tol:.01,u:'km',e:'<b>Formel:</b> $\\lambda=c/f$, og antennen er $\\lambda/2$. <b>Utregning:</b> $\\lambda=\\dfrac{3\\cdot10^8}{300}=10^6$ m $=1000$ km. $1000/2=500$ km.'},
{t:'num',q:'Du vil ha en halvbølgeantenne på 1 m. Hvilken bærefrekvens må du bruke?',a:150,tol:.01,u:'MHz',e:'<b>Formel:</b> $\\lambda=2\\cdot$ antennelengde, og $f=c/\\lambda$. <b>Utregning:</b> $\\lambda=2\\cdot1=2$ m. $f=\\dfrac{3\\cdot10^8}{2}=1{,}5\\cdot10^8$ Hz $=150$ MHz.'},
{t:'ref',q:'Forklar forskjellen på multipleksing og MAC, og si på hvilket lag hver opererer.',m:'Multipleksing lager kanaler, altså kombinerer flere signaler på et delt medium, og ligger på fysisk lag. MAC bestemmer hvem som får sende, når og hvordan, og ligger på datalinklaget. MAC bruker metoder basert på multipleksing.',k:['Multipleksing kombinerer signaler på et medium','Multipleksing er på fysisk lag','MAC avgjør hvem som sender, når og hvordan','MAC er på datalinklaget']}
]}
]});

# TTM4105 Aksess- og transportnett: eksamenskurs

Et interaktivt kurs som dekker pensum i TTM4105 Access and Transport Networks (NTNU) fra bunnen av. Kurset er laget som eksamensforberedelse: hvert tema forklares med hvorfor det virker, og du tester deg selv underveis.

Forklaringene er på norsk. Fagbegrepene står også på engelsk, og eksamensoppgavene er på engelsk slik de er på eksamen.

## Slik bruker du kurset

Last ned repoet og åpne `index.html` i en nettleser. Kurset trenger ingen installasjon, ingen server og ingen nettforbindelse.

Fremgangen din (svar, poeng og hvilke oppgaver du har gjort feil) lagres lokalt i nettleseren. Den følger ikke med hvis du bytter nettleser eller maskin.

## Moduler

Del I handler om trådløse nett, del II om optiske nett og transportnett.

| Nr. | Modul |
|---|---|
| 0 | Grunnmuren: signaler, desibel og kartet over nettet |
| 1 | Trådløs overføring I: hva skjer med et radiosignal? |
| 2 | Trådløs overføring II: hvordan vi slår tilbake |
| 3 | Multipleksing og MAC: hvordan mange deler én kanal |
| 4 | WLAN og Bluetooth: MAC i praksis |
| 5 | Cellulære nett: fra heksagon til 5G |
| 6 | Optiske nett: fiber, komponenter og svitsjing |
| 7 | Optiske aksessnett: fiber til folk flest |
| 8 | Transportnett: SONET/SDH, OTN og bølgelengdedimensjonering |
| 9 | Carrier Ethernet: LAN-teknologi i operatørnettet |

## Hva hver modul inneholder

- **Forklaringer** som starter med hvorfor et problem finnes, før løsningen presenteres.
- **Analogier** i egne bokser for de viktigste begrepene.
- **Interaktive figurer** der du kan endre verdier og se hva som skjer, for eksempel kanalkapasitet, effektbudsjett og bølgelengdedimensjonering.
- **Feller og regler** som peker på det som ofte går galt på eksamen.
- **Regneeksempler** fra forelesningene og tidligere eksamener.
- **Definisjoner i margen**, med engelsk begrep først. Det engelske ordet står også i parentes etter det norske i teksten og i tabellene.
- **Sjekkpunkt** etter hver seksjon med flervalg, tallsvar og refleksjonsoppgaver. Løsningene viser hvilken formel som brukes og hele utregningen.
- **Eksamensoppgaver** sist i hver modul, der du løser oppgaven selv og gir deg poeng etter løsningen.

## Eksamenstrening

- **Slik er eksamen:** oppbygging, oppgavetyper og hva som vektlegges.
- **Oppgavebank 2023–25:** flervalgsoppgaver fra tidligere eksamener.
- **RAT-quizer 1–7:** de 70 quizspørsmålene fra semesteret, med retting til slutt.
- **Tegneoppgaver:** figurene du må kunne tegne selv.
- **Prøveeksamen:** en hel eksamen å ta på tid.

## Flashcards

525 kort fordelt på fem bolker. Forsiden er det engelske begrepet eller et spørsmål, baksiden er forklaringen på norsk.

- **Flashcards:** snu kortet og vurder selv. Med vanlig sortering stokkes kort du ikke kan inn igjen i bunken. Med spaced repetition gir du kortet en av fire vurderinger (gjenta, vanskelig, greit, lett), og vurderingen bestemmer om kortet kommer tilbake om noen minutter eller om flere dager.
- **Lær:** runder på sju nye kort. Først får du flervalg på alle kortene. Så får du begrepet eller spørsmålet, skriver svaret selv, ser fasiten og vurderer om du klarte det. Neste runde åpner når du har klart alle, og en linje øverst viser hvor langt du har kommet.
- **Fullskjerm:** begge sidene kan vises i fullskjerm, der menyen og valgene skjules. Esc lukker.

## Oppslag

- **Repeter feil:** samler oppgavene du har svart feil på.
- **Formler:** alle formlene i emnet på ett sted.
- **Ordliste EN–NO:** fagbegrepene med engelsk og norsk definisjon.

## Filstruktur

| Fil | Innhold |
|---|---|
| `index.html` | Startsiden som laster alt annet |
| `assets/app.js`, `assets/app.css` | Selve kursmotoren og utseendet |
| `assets/m0.js` – `assets/m9.js` | Innholdet i modulene |
| `assets/glossary.js`, `assets/glossary-en.js` | Ordlisten på norsk og engelsk |
| `assets/w1.js` – `assets/w3.js`, `assets/figs.js` | Interaktive figurer og illustrasjoner |
| `assets/bank.js`, `assets/rat.js`, `assets/exam.js` | Oppgavebank, RAT-quizer og eksamenssidene |
| `assets/cards.js`, `assets/flash.js` | Flashcardene og sidene Flashcards og Lær |
| `assets/katex/` | KaTeX, som viser formlene |

## Kilder

Kurset bygger på forelesningene, RAT-quizene og eksamenene med løsningsforslag fra 2022–2025 i TTM4105. Slides fra gjesteforelesningene høsten 2026 er ikke dekket.

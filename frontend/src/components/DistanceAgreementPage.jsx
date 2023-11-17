import { useSelector } from 'react-redux'

const DistanceAgreementPage = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <h1 className="big-title m-d">{lang.distance_agreement}</h1>
      <div style={{ maxWidth: '800px' }}>
        <h3>Maiznīca Flora e-veikala preču pirkšanas-pārdošanas noteikumi</h3>
        <h4>1. Termini un vispārējie nosacījumi</h4>
        <p>
          1.1. Šie noteikumi ir interneta veikala Maiznīca Flora (turpmāk tekstā
          - E-veikals) lietošanas un preču pirkšanas-pārdošanas nosacījumi
          (turpmāk tekstā - Noteikumi). Noteikumi ir piemērojami visām fiziskām
          personām, kas izvēlas, noformē pasūtījumus un iegādājas E-veikala
          piedāvātās preces. Noteikumi ir neatņemama distances līguma
          sastāvdaļa, ko puses, pamatojoties uz pircēja pasūtījumu, noslēdz
          vietnē E-veikals. Distances līguma noteikumi ir saistoši neierobežotu
          laika periodu līdz pušu saistību pilnīgai izpildei.
        </p>

        <p>
          1.2. maiznica.lv domēna īpašnieks ir sabiedrība ar ierobežotu
          atbildību Maiznīca Flora, reģistrācijas numurs 50003251341,
          pievienotās vērtības nodokļa maksātāja numurs LV50003251341, juridiskā
          un faktiskā adrese - "Vecvaltes" Krimuldas pagasts, Siguldas novads,
          LV2144, Latvija.
        </p>

        <p>
          1.3. Pirms reģistrācijas un katras preču pasūtījuma noformēšanas,
          pircējam ir jāiepazīstas ar Noteikumiem un jāapstiprina sava
          piekrišana E-veikala distances līguma nosacījumiem.
        </p>
        <p>
           Veicot pasūtījumu, pircējs apliecina, ka ir izlasījis, sapratis un
          piekrīt Noteikumiem, kā arī, ka tam nav tiesisku vai faktisku šķēršļu
          iepirkties E-veikalā. Ja pircējs nepiekrīt Noteikumiem, tas nevar
          iepirkties E-veikalā.
        </p>
        <p>
          1.4. Ar brīdi, kad pircējs veicis pasūtījumu, tiek pieņemts, ka starp
          E-veikalu un pircēju ir noslēgts distances līgums saskaņā ar
          Noteikumiem. Noteikumu neievērošana var būt par pamatu noslēgtā
          distances līguma vienpusējai izbeigšanai, ka arī veiktā pasūtījuma
          atcelšanai no E-veikala puses.
        </p>

        <h4>2. Klientu serviss</h4>

        <p>E-veikala klientu servisa kontakti:</p>
        <p>&bull; mobilā tālruņa numurs: +371 28634840;</p>
        <p>&bull; elektroniskā pasta adrese:flora@maiznica.lv</p>
        <p>
          &bull; tiešsaistes forma mājaslapā E-veikala sadaļā "Sazināties ar
          mums".
        </p>

        <p>
           Klientu servisa darba laiks ir katru darba dienu no plkst. 9:00 līdz
          plkst. 17:00
        </p>

        <h4>3. Reģistrācija un personas datu apstrāde </h4>
        <p>
          3.1. Lai veiktu pasūtījumu E-veikalā, pircējam ir jāpiereģistrējas
          E-veikala sistēmā un jāaizveido pircēja profils.
        </p>
        <p>
          3.2. Pircējam ir jāaizpilda reģistrācijas laikā pieprasītie personīgie
          dati - elektroniskā pasta adrese. Noformējot pasūtījumu, ja izvēlēta
          piegāde ar kurjeru, jānorāda arī piegādei nepieciešamie dati - vārds,
          uzvārds, mobilā tālruņa numurs, preču piegādes adrese. Lai tiktu
          veikta pircēja profila reģistrācija, datu ievadei jāizmanto latīņu
          alfabēta burti. Pircējs ir atbildīgs par pareizas un patiesas
          informācijas sniegšanu, tai skaitā par reģistrācijas anketā norādīto
          datu precizitāti, pilnīgumu un ticamību.
        </p>

        <p>
          3.3. Lai izveidotu pircēja profilu, pircējam ir jāizveido droša
          parole. Pircējs ir atbildīgs par izveidotās paroles drošību un
          atjaunošanu.
        </p>

        <p>
          3.4. Pircējs ir atbildīgs par visām darbībām, kas tiek veiktas ar
          pircēja profilu. Pircējs apņemas sava profila paroli glabāt noslēpumā,
          un neatklāt to trešajām personām.
        </p>

        <p>
          3.5. Gadījumā, ja pircējs zaudē sava profila pieslēgšanās datus vai
          pircējam ir aizdomas, ka šie dati kļuvuši zināmi citai personai,
          pircējam ir jāvēršas Klientu servisā, lai atjaunotu pieslēgšanas
          datus, izmantojot platformu E-veikals un iespēju "Aizmirsu paroli".
        </p>

        <p>
          3.6. Pircējs, savā profilā ir tiesīgs izvēlēties, vai pircējs piekrīt
          saņemt mārketinga paziņojumus un noderīgus E-veikala piedāvājumus- uz
          pircēja norādīto mobilā tālruņa numuru un/vai elektroniskā pasta
          adresi. Gadījumā, ja pircējs vairs nevēlas saņemt mārketinga
          paziņojumus un piedāvājumus, pircējs var mainīt paziņojumu saņemšanas
          iestatījumus savā profilā.
        </p>

        <p>
          3.7. Ja pircēja profils nav ticis izmantots pēdējos 36 (trīsdesmit
          seši) mēnešus, tas tiek automātiski dzēsts.
        </p>

        <p>
          3.8. Pircēja personas dati tiks apstrādāti saskaņā ar E-veikala
          Privātuma politiku un Latvijas Republikā spēkā esošajiem normatīvajiem
          aktiem. Ja pircējs vēlas izmantot E-veikala pakalpojumus, viņam
          jāpiekrīt personas datu apstrādei un jāapstiprina, ka visa viņa
          sniegtā informācija, tai skaitā personas dati, ir pareiza un patiesa.
          Pircējs apstiprina iepazīšanos ar Privātuma politiku un piekrišanu tās
          noteikumiem pasūtījuma veikšanas brīdī. Pircēja personas dati tiek
          apstrādāti saskaņā ar Privātuma politikā noteikto. Pircējam ir
          jāiepazīstas ar Privātuma politiku pirms reģistrācijas veikšanas vai
          savu personas datu sniegšanas E-veikala vietnē.
        </p>

        <p>
          3.9. Pircējam ir tiesības jebkurā brīdī brīvi mainīt reģistrācijas
          datus pircēja profilā, labot vai papildināt tos vai anulēt savu
          reģistrāciju. Īstenojot pasūtījuma izpildi vai risinot jebkādus ar
          pasūtījumu saistītus jautājumus, E-veikals ir tiesīgs izmantot
          informāciju, kas bija reģistrēta pircēja profilā pasūtījuma veikšanas
          vai jautājuma rašanās brīdī, ja vien pircējs nav pienācīgi un
          savlaicīgi informējis E-veikalu par izmaiņām informācijā.
        </p>
        <h4>4. Pasūtījumu veikšanas un norēķinu kārtība</h4>
        <p>
          4.1. Lai iegādātos preci E-veikalā, pircējam, kas veicis reģistrāciju
          E-veikalā, ir nepieciešams izvēlēties vēlamo preci un jāpievieno tā
          pirkumu "grozam".
        </p>

        <p>
          4.2. Pēc visu izvēlēto preču pievienošanas pirkumu "grozam", pircējam
          jāaizpilda informācija, kas nepieciešama pasūtījuma noformēšanai un
          piegādes veikšanai.
        </p>

        <p>
          4.3. Preču cenas E-veikalā ir norādītas eiro (EUR) valūtā. Visas cenas
          ir norādītas, ieskaitot pievienotās vērtības nodokli (PVN).
        </p>

        <p>
          4.4. Preces pircējam tiek pārdotas par cenām, kas ir spēkā pasūtījuma
          izveidošanas brīdī.
        </p>

        <p>
          4.5. Veicot pasūtījumu, pircējs ir tiesīgs norādīt citas personas
          adresi un datus, kuru tas pilnvaro pircēja vārdā saņemt pasūtījumu.
          Pircējs norāda šīs personas vārdu, uzvārdu, telefona numuru un adresi.
          Pircējs nodrošina, ka viņa norādītā persona ir informēta par to, ka tā
          ir tiesīga saņemt preces pircēja vārdā.
        </p>

        <p>
          4.6. Pircējam nepieciešams izvēlēties piegādes veidu - saņemt uz
          vietas Maiznīca Flora SIA adresē "Vecvaltes"; Krimuldas pagasts,
          Siguldas novads, ar kurjeru vai DPD pakomātu.
        </p>
        <p>
          Piegāde tiks veikta 2-7 dienu laikā atkarībā no izvēlētā piegādes
          veida.
        </p>

        <p>
          4.7. Pircējs veic pirkuma apmaksu kādā no E-veikala piedāvātajiem
          priekšapmaksas bezskaidras naudas norēķinu veidiem. Pircējs var
          norēķināties tikai ar maksājuma metodēm, kas pieejamas E-veikala
          maksājumu metožu izvēlnē. Ja, veicot maksājumu, Pircēja banka pieprasa
          komisiju par maksājuma apstrādi, tā tiek segta no Pircēja puses.
          Maksājumu apstrādi nodrošina SEB banka, E-veikals maksāšanas datus
          neglabā.
        </p>

        <p>
          4.8. Pēc pasūtījuma apmaksas E-veikals nosūta Pircējam uz pircēja
          norādīto elektroniskā pasta adresi pasūtījuma apstiprinājumu un
          attaisnojuma dokumentu - elektroniski sagatavotu rēķinu. Elektroniski
          sagatavots attaisnojuma dokuments - rēķins - ir derīgs bez paraksta.
        </p>

        <p>
          4.9. Pasūtījums tiek uzskatīts par iesniegtu, kad ir veikts maksājums
          un pircējs ir saņēmis pasūtījuma apstiprinājumu.
        </p>

        <p>
          4.10. E-veikals apņemas izpildīt Pircēja pasūtījumu pilnā apjomā,
          tomēr Pircēja pasūtījums var pilnībā vai daļēji nebūt izpildīts, ja
          pēc pasūtījuma veikšanas un līdz pasūtījuma komplektēšanas brīdim
          Pircēja pasūtītie produkti pilnībā vai daļēji nav pieejami piegādei 7
          dienu laikā. Ja kāds no Pircēja pasūtītajiem produktiem nav pieejams
          pasūtījuma komplektēšanas brīdī, E-veikla klientu servisa darbinieki
          sazināsies ar Pircēju.
        </p>

        <p>
          4.11. Ja Pircējs ir pārdomājis veikt pasūtījumu pēc tā
          apstiprināšanas, pircējs ir tiesīgs atcelt pasūtījumu, nosūtot
          attiecīgu pieprasījumu Klientu servisam Klientu servisa darba laikā,
          obligāti norādot pasūtījuma numuru. Pircējam tiek atgriezta samaksātā
          nauda par pasūtījumu atbilstoši Noteikumu 7.8.punktā norādītajam.
        </p>

        <h4>5. Preču saņemšanas un piegādes noteikumi</h4>
        <p>
          5.1. Preču piegāde tiek nodrošināta visā Latvijas Republikas
          teritorijā.
        </p>

        <p>
          5.2 Pircējis var izvēlēties saņemt preces SIA Maiznīca Flora atrašanās
          vietā, adrese "Vecvaltes" Krimuldas pagasts, Siguldas novads, Latvija.
          Darba laiks no 9.00 līdz 17.00 darba dienās.
        </p>

        <p>
          5.3 Preču piegādes cena E-veikala pircējiem ir atkarīga no pasūtījuma
          summas: pasūtījumiem virs 50&euro; (summa apmaksai pēc atlaižu
          piemērošanas) - bezmaksas, pasūtījumiem līdz 50&euro; piegādes maksa
          uz DPD pakomātu ir 3.99&euro;, kurjera piegādes maksa ir 5.99&euro; .
        </p>

        <p>
          5.4. Preces tiek piegādātas ar DPD kurjeru vai uz DPD pakomātiem
          Latvijas Republikā.
        </p>
        <p>
          5.5. Pircēja pasūtītās preces tiek piegādātas ar kurjeru uz pasūtījuma
          noformēšanas laikā noradīto piegādes adresi.
        </p>

        <p>
          Pasūtījums tiks piegādāts uz norādīto adresi, un telefona numurs tiks
          izmantots kontakta uzturēšanai starp Pircēju un kurjeru. Pircējs ir
          atbildīgs par precīzu datu sniegšanu. Līdz ko pasūtījums ir
          apstiprināts, Pircējs vairs nevar mainīt piegādes adresi.
        </p>
        <p>
          Kurjers sazināsies ar Pircēju, lai precizētu preču piegādes adresi,
          precīzu atrašanās vietu, kā arī informēs par laiku vai laika
          intervālu, kurā kurjers izpildīs piegādi. Ir ļoti svarīgi norādīt
          precīzu telefona numura informāciju, lai kurjers var sazināties ar
          Pircēju.
        </p>
        <p>
          Pircējam jāapzinās, ka kurjers nevar atļauties ilgstoši gaidīt Pircēju
          norādītajā adresē. Pircējs uzņemas atrasties norādītajā adresē,
          norādītajā laikā, lai saņemtu pasūtījumu no kurjera. Ja kurjers cenšas
          sazināties ar Pircēju, taču nesaņem atbildi, preces var tikt
          nepiegādātas.
        </p>

        <p>
          5.6. Ja Pircējs ir izvēlējies pakomātu servisu, tam tiek nosūtīta
          īsziņa, kad prece ir ievietota pakomātā. Šajā īsziņā vai paziņojumā
          e-pastā ir izlasāma informācija par preču izņemšanas pakomātu, uz kuru
          jādodas Pircējam. Tāpat tiek pievienots kods, kas ievadāms paša
          pakomāta displejā.
        </p>
        <p>
          5.7. Ja nav iespējams nodrošināt preču piegādes laiku atbilstoši
          Noteikumu 4.6.punktā paredzētajam, par to pircējs tiks informēts pēc
          iespējas īsākā laikā pēc pasūtījuma apstiprināšanas. Gadījumā, ja
          neparedzētu apstākļu dēļ notiek piegādes kavējums, pircēju par to
          telefoniski informēs piegādes kurjers vai Klientu serviss.
        </p>

        <p>
          5.8. Preces atbilstību veiktajam pasūtījumam un preces pavaddokumentam
          pēc daudzuma, sortimenta un veida, kā arī vizuāli konstatējamu defektu
          esamību, Pircējs pārbauda piegādes brīdī un piesaka pretenzijas 24
          (divdesmit četru) stundu laikā no preces saņemšanas brīža.
        </p>

        <h4>6. Kvalitātes garantija</h4>
        <p>
          E-veikals garantē, ka E-veikala preces ir kvalitatīvas, cilvēka
          veselībai, dzīvībai un videi nekaitīgas, tās atbilst Latvijas
          Republikas normatīvajos aktos noteiktajām pārtikas nekaitīguma
          prasībām.
        </p>
        <p>
          E-veikals garantē preces atbilstību preces aprakstā noradītajām
          aprakstam.
        </p>
        <p>
          Preču attēliem ir informatīvs raksturs. E-veikala attēlos redzamās
          preces pēc to krāsas, lieluma, formas vai citiem parametriem dabā var
          atšķirties no attēlos redzamajam precēm.
        </p>

        <h4>7.Atteikuma tiesības un naudas atgriešana</h4>
        <p>
          7.1. Pircējs ir tiesīgs 14 (četrpadsmit) dienu laika no pasūtīto preču
          saņemšanas izmantot atteikuma tiesības uz visu preci vai daļu no
          precēm.
        </p>

        <p>
          7.2. Pircējs paziņo par vēlēšanos izmantot atteikuma tiesības uz
          preci, sazinoties ar Klientu servisu. Pircējs nevar izmantot atteikuma
          tiesības šādos gadījumos:
        </p>
        <p>&bull; prece (vai tās iepakojums) pēc piegādes tikusi sabojāta;</p>
        <p>&bull; pircējs ir atvēris iepakojumu precei;</p>
        <p>
          &bull; prece pēc piegādes tiek glabāta neatbilstoši ražotāja noteiktām
          prasībām, kā arī prasībām, kas parasti pielietojamas šāda veida
          precēm.
        </p>

        <p>
          7.3. Preci, no kuras pircējs ir atteicies, pircējam ir jānogādā
          "Vecvaltes" Krimuldas pagasts, Siguldas novads, LV2144, Latvijā.
          Pircējs sedz visas izmaksas, kas saistītas ar preces atgriešanu.
        </p>

        <p>
          7.4. Atgrieztajai precei ir jābūt orģinālajā iepakojumā, neatvērtai,
          derīguma termiņa ietvaros un bez pazīmēm, kas liecina, ka tā tika
          neatbilstoši glabāta. Atgriežot pārtikas preci, pircējam ir jārēķinās
          ar to, ka pārvadāšanas laikā tai ir jānodrošina speciālais
          temperatūras režīms, atbilstoši ražotāja prasībām. Ja pircējs nevar
          nodrošināt šīs prasības un preču pieņemšanas laikā E-veikala
          darbinieks konstatē, ka iepriekš minētas prasības netika ievērotas,
          E-veikals ir tiesīgs nepieņemt pircēja atgriezto preci un neizmaksāt
          pircējam naudu par atgriezto preci.
        </p>

        <p>
          7.5. E-veikals izskata pircēju iesniegumus attiecībā uz atteikuma
          tiesību izmantošanu 3 (trīs) darba dienu laikā, sniedzot atbildi uz
          iesniedzēja e-pasta adresi.
        </p>

        <p>
          7.6. Atteikuma tiesību izmantošanas gadījumā E-veikals atmaksā
          pircējam viņa samaksāto naudas summu, tajā skaitā pircēja samaksātos
          saprātīgus un pamatotus piegādes izdevumus, ja tādi bija piemēroti,
          balstoties uz Ministru kabineta Noteikumiem par distances līgumu.
        </p>

        <p>7.7. Naudas atmaksa pircējam notiek turpmāk norādītajā kārtībā:</p>
        <p>
          Atteikuma tiesību izmantošanas gadījumā - bez nepamatotas kavēšanās,
          bet ne vēlāk kā 14 (četrpadsmit) dienu laikā no dienas, kad E-veikals
          saņēmis informāciju par pircēja lēmumu atkāpties no pasūtījuma vai tā
          daļas (pamatojoties uz Ministru kabineta Noteikumiem par distances
          līgumu);
        </p>
        <p>
          Pārējos par pirkumu vai tā daļas samaksātās naudas atgriešanas
          gadījumos, izņemot atteikuma tiesību gadījumā, pircējam tiek veikta
          naudas atmaksa 7 (septiņu) darba dienu laikā no dienas, kad bija
          plānota pasūtījuma piegāde. Gadījumā, ja norādītajā termiņā ir svētku
          dienas, tad naudas atmaksas termiņš var tikt proporcionāli pagarināts.
        </p>
        <p>
          7.8. E-veikals veic naudas atmaksu, izmantojot tāda paša veida
          maksāšanas līdzekli, kādu izmantoja pircējs, apmaksājot konkrēto
          pasūtījumu, izņemot gadījumus, kad pircējs skaidri piekritis citam
          maksāšanas līdzeklim, un pircējam par šāda pārskaitījuma veikšanu nav
          jāmaksā.
        </p>

        <h4>8. Sūdzību un strīdu risināšana</h4>
        <p>
          E-veikals ir atvērts Pircēja sūdzību un priekšlikumu uzklausīšanai. Ja
          Pircēja un E-veikala starpā radies strīds saistībā ar pasūtījumu, abām
          pusēm jācenšas komunicēt, lai likvidētu strīda iemeslu un rastu
          risinājumu sarunas vai sarakstes formā. Komunikācijas mērķis ir
          vienoties par abpusēji izdevīgu un akceptējamu risinājumu.
          Komunikācijai jābūt racionālai un saprātīgai. Gadījumā, ja strīda
          komunikācijas mērķis netiek sasniegts ar iepriekš minētajām metodēm,
          to par pārvirzīt un nodot PTAC vai Latvijas Republikas tiesā.
        </p>

        <h4>9. Nobeiguma noteikumi</h4>
        <p>
          9.1. Noteikumi sagatavoti atbilstoši Latvijas Republikas normatīvajiem
          aktiem.
        </p>

        <p>
          9.2. E-veikals ir tiesības vienpusēji grozīt, labot vai papildināt
          Noteikumus. Pircējam ir saistoši Noteikumi, kas ir spēkā pasūtījuma
          iesniegšanas brīdī un ir publicēti E-veikalā.
        </p>

        <p>
          9.3. E-veikals ir tiesīgs ierobežot vai apturēt pasūtījumu izpildi
          un/vai izbeigt interneta veikala darbību objektīvi pamatotu iemeslu
          dēļ. Šādā gadījumā E-veikals atgriež pircējam samaksāto naudu par
          nepiegādātajiem pasūtījumiem atbilstoši šajos Noteikumos paredzētajai
          kārtībai.
        </p>
      </div>
    </div>
  )
}

export default DistanceAgreementPage

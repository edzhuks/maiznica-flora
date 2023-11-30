import { useSelector } from 'react-redux'

const PrivacyPolicyPage = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <div className="big-title m-d">{lang.privacy_policy}</div>
      <div
        style={{ maxWidth: '800px' }}
        className="legal-text card p-m">
        <h3>SIA Maiznīca Flora E-veikala PRIVĀTUMA POLITIKA</h3>
        <h4>1. Vispārīgā informācija</h4>
        <p>
          Lai saņemtu E-veikala piedāvātos pakalpojumus, Jums ir jāveic
          reģistrācija interneta vietnē www.maiznica.lv E-veikals(turpmāk -
          “Maiznīca Flora e-veikals”) un jāsniedz savi personas dati.
        </p>
        <p>
          Reģistrējoties Maiznīca Flora e-veikals, Jūs uzticat mums, Maiznīca
          Flora SIA (reģ. Nr. 50003251341, adrese: “Vecvaltes” Krimuldas
          pagasts, Siguldas novads, LV2144, Latvija), kā personas datu Pārzinim
          (turpmāk - “mēs” vai “Pārzinis”) savus personas datus un sniedzat mums
          tiesības tos apstrādāt atbilstoši šajā politikā (turpmāk - “Politika”)
          un distances līgumā (turpmāk - “Distances līgums”) noteiktajam.
        </p>
        <p>
          Reģistrējoties, Jūs apstiprināt, ka Jūsu norādītie personas dati ir
          precīzi un patiesi. Mēs neuzņemamies atbildību par neprecīziem,
          nepilnīgiem vai kļūdainiem Jūsu iesniegtajiem personas datiem. Ja tiks
          konstatēts, ka Jūsu norādītie personas dati ir neprecīzi, Jums tie
          nekavējoties ir jāizlabo. Gadījumā, ja Jūs būsiet norādījuši citas
          personas datus, tad pretenziju gadījumā mēs saglabājam tiesības
          vērsties pie Jums ar regresa prasību.
        </p>
        <p>
          Jūsu personas datu sniegšana mums ir brīvprātīga, tomēr darām Jums
          zināmu, ka gadījumā, ja Jūs neakceptējat visus vai daļu no Distances
          līguma noteikumiem vai šo Politiku, mēs diemžēl nevarēsim sniegt Jums
          iespēju izmantot visus vai kādus no E-veikala piedāvātajiem
          pakalpojumiem (turpmāk - Pakalpojumi).
        </p>
        <h4>2. Personas datu iegūšana</h4>
        <p>
          Gandrīz visus Jūsu personas datus mēs iegūstam tikai no Jums tiešā
          veidā. Jūs savus personas datus mums iesniedzat tiešā veidā,
          reģistrējoties E-veikalā, iesniedzot pieprasījumu, sūdzību vai
          atsauksmi jebkādā veidā (atsūtot mums elektronisku vēstuli, iesniedzot
          mums iesniegumu papīra formā vai mutiskā veidā, zvanot uz klientu
          servisu).
        </p>
        <p>
          Mēs iegūstam Jūsu personas datus, kurus Jūs norādāt, reģistrējoties un
          izveidojot savu pircēja profilu E- veikalā, sniedzot informāciju par
          pirkumiem brīdī, kad veicat pasūtījumus, vai, Jums veicot darbības
          savā E-veikala profilā, veicot darbības saistībā ar preču pasūtījumu
          un sazinoties ar mums jebkādu jautājumu risināšanā.
        </p>
        <h4>3. Personas datu apstrāde</h4>
        <p>
          Mēs apstrādājam Jūsu datus atbilstoši normatīviem aktiem, kas
          reglamentē personu datu apstrādi un aizsardzību. Apstrādājot un
          glabājot Pircēju personas datus, Pārzinis izmanto organizatoriskus un
          tehniskus līdzekļus, lai aizsargātu personas datus un novērstu to
          nelikumīgu apstrādi un nodošanu trešajām personām.
        </p>
        <p>
          Piekļuve datu apstrādes un izmainīšanas funkcijām ir tikai
          atbildīgajām personām, kuras ir nozīmējis Pārzinis.
        </p>
        <p>
          Iegādājoties preces E-veikalā, Pircēja dati, kas ir sniegti Pārzinim
          var tikt reģistrēti, glabāti, izmantoti un apstrādāti tikai tādos
          apjomos, kādi nepieciešami zemāk norādītiem mērķiem:
        </p>
        <ul>
          <li>E-veikala Pircēju pasūtījumu apstrādei;</li>
          <li>Pircēju identificēšanai un uzskaitei;</li>
          <li>
            Komerciālu paziņojumu sūtīšanai, ja Pircējs tam ir devis piekrišanu,
            kļūstot par reģistrētu E-veikala klientu;
          </li>
          <li>
            Citu saistību izpildes nodrošināšanai, kas izriet no līgumsaistībām,
            vai no noslēgtiem līgumiem.
          </li>
        </ul>
        <p>
          Pārzinis nodrošina Pircēju personas datu aizsardzību atbilstoši
          normatīvajiem aktiem, kas reglamentē personas datu apstrādi un
          aizsardzību.
        </p>
        <p>
          Pircējam, atbilstoši Fizisko personu datu aizsardzības likumam, ir
          tiesības piekļūt saviem personas datiem, kā arī, ja likums to neliedz,
          pieprasīt informāciju par personas datu apstrādes mērķiem, tiesisko
          pamatu un veidu, datumu, kad pēdējo reizi šie dati laboti, dzēsti vai
          bloķēti, un datu ieguves avotu, nosūtot Pārzinim pieprasījumu uz
          e-pasta adresi: flora@maiznica.lv
        </p>
        <p>
          Pircējam ir tiesības pieprasīt, lai viņa personas dati tiek laboti,
          papildināti, apturēta to apstrāde vai tie tiek iznīcināti (dzēsti), ja
          tie ir novecojuši un nepatiesi, vai arī, ja to turpmāka apstrāde nav
          nepieciešama. Šajā sakarā Pircējs informē Pārzini, paziņojot par to ar
          e-pasta starpniecību uz adresi: flora@maiznica.lv
        </p>
        <h4>4. Pircēju personas datu glabāšana</h4>
        <p>
          Pircēju personas dati tiek glabāti ne ilgāk, kā to nosaka normatīvo
          aktu prasības.
        </p>
        <h4>5. Papildus informācija</h4>
        <p>
          Pievēršam Jūsu uzmanību tam, ka gan Politika, gan arī Distances līgums
          var tikt grozīti, papildināti vai atjaunoti, tādēļ aicinām Jūs,
          izmantojot E-veikala veikala pakalpojumus atkārtoti, ikreiz iepazīties
          ar minētajiem noteikumiem.
        </p>
        <p>
          Šīs politikas noteikumi nav piemērojami citiem mūsu vai mūsu grupas
          uzņēmumu sniegtajiem pakalpojumiem.
        </p>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage

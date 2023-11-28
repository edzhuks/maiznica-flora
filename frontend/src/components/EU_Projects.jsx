import { useSelector } from 'react-redux'
import styled from 'styled-components'

const EuProjects = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const selectedLang = useSelector((state) => state.lang.selectedLang)

  return (
    <div>
      <h1 className="big-title m-d">{lang.eu_projects}</h1>
      <div className="column align-cross-center">
        {selectedLang === 'lv' && (
          <>
            <p>
              SIA Maiznīca Flora ir iegādājusies ražošanai nepieciešamos
              pamatlīdzekļus ar Eiropas lauksaimniecības fonda lauku attīstībai
              Latvijas Lauku attīstības programmas 2014.–2020. gada plānošanas
              perioda pārejas laika 2021. un 2022. gada atbalsta pasākumu
              «Investīcijas materiālajos aktīvos» apakšpasākuma 4.2 «Atbalsts
              ieguldījumiem pārstrādē»
            </p>

            <p>
              Vairāk informācijas par Eiropas Lauksaimniecības fondu lauku
              attīstībai pieejams Eiropas Komisijas tīmekļa vietnē&nbsp;
              <a
                href="http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm"
                target="_blank"
                rel="noreferrer noopener">
                http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm
              </a>
            </p>

            <img
              src="/images/Publicitates-3-1024x725.jpg"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />

            <p>
              2019.gadā no 21.-22.maijam SIA Maiznīca Flora &nbsp;piedalījās
              izstādē “PLMAs World of Private Label”, Amsterdamā, Nīderlandē.
            </p>

            <p>
              2016.gada 18.maijā noslēgts līgums Nr.SKV-L-2016/306 ar Latvijas
              Investīciju un attīstības aģentūru par atbalsta saņemšanu pasākuma
              “Starptautiskās konkurētspējas veicināšana” ietvaros, ko
              līdzfinansē Eiropas Reģionālās attīstības fonds.
            </p>

            <img
              src="/images/LV_ID_EU_logo_ansamblis_ERAF.jpg"
              data-id="4893"
              data-link="http://www.maiznica.lv/projekti/lv_id_eu_logo_ansamblis_eraf/"
            />

            <p>
              SIA Maiznīca Flora ar Eiropas lauksaimniecības fonda lauku
              attīstībai Latvijas Lauku attīstības programmas 2014. – 2020.gadam
              pasākuma «Investīcijas materiālajos aktīvos» apakšpasākuma 4.2
              «Atbalsts ieguldījumiem pārstrādē» ir iegādājusies ražošanai
              nepieciešamos pamatlīdzekļus.
            </p>

            <p>
              Vairāk informācijas par Eiropas Lauksaimniecības fondu lauku
              attīstībai pieejams Eiropas Komisijas tīmekļa vietnē&nbsp;
              <a href="http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm">
                http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm﻿
              </a>
            </p>

            <img
              src="/images/2019-1024x725.jpg"
              width="1024"
              height="725"
            />

            <p>
              SIA Maiznīca Flora ar Eiropas lauksaimniecības fonda lauku
              attīstībai Latvijas Lauku attīstības programmas 2014. – 2020.gadam
              pasākuma «Investīcijas materiālajos aktīvos» apakšpasākuma 4.2
              «Atbalsts ieguldījumiem pārstrādē» ir iegādājusies ražošanai
              nepieciešamos pamatlīdzekļus.
            </p>

            <p>
              Vairāk informācijas par Eiropas Lauksaimniecības fondu lauku
              attīstībai pieejams Eiropas Komisijas tīmekļa vietnē&nbsp;
              <a href="http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm">
                http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm﻿
              </a>
            </p>

            <img
              src="/images/2017_2-1024x725.jpg"
              width="1024"
              height="725"
            />

            <p>
              SIA Maiznīca Flora ar Eiropas lauksaimniecības fonda lauku
              attīstībai Latvijas Lauku attīstības programmas 2014. – 2020.gadam
              pasākuma «Investīcijas materiālajos aktīvos» apakšpasākuma 4.2
              «Atbalsts ieguldījumiem pārstrādē» ir iegādājusies ražošanai
              nepieciešamos pamatlīdzekļus.
            </p>

            <p>
              Vairāk informācijas par Eiropas Lauksaimniecības fondu lauku
              attīstībai pieejams Eiropas Komisijas tīmekļa vietnē&nbsp;
              <a href="http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm">
                http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm﻿
              </a>
            </p>

            <img
              src="/images/2017_1-1024x725.jpg"
              width="1024"
              height="725"
            />

            <p>
              SIA Maiznīca Flora ar Eiropas lauksaimniecības fonda lauku
              attīstībai Latvijas Lauku attīstības programmas 2014. – 2020.gadam
              pasākuma «Investīcijas materiālajos aktīvos» apakšpasākuma 4.2
              «Atbalsts ieguldījumiem pārstrādē» ir iegādājusies ražošanai
              nepieciešamos pamatlīdzekļus.
            </p>

            <p>
              Vairāk informācijas par Eiropas Lauksaimniecības fondu lauku
              attīstībai pieejams Eiropas Komisijas tīmekļa vietnē&nbsp;
              <a href="http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm">
                http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm
              </a>
            </p>

            <img
              src="/images/2016-1024x725.jpg"
              width="1024"
              height="725"
            />
          </>
        )}
        {selectedLang === 'en' && (
          <>
            <p>
              LTD “Bakery Flora” has purchased the fixed assets required for
              production with the support of the European Agricultural Fund for
              Rural Development’s Latvian Rural Development Programme for 2014 –
              2020 measure “Investments in physical assets” sub-measure 4.2
              “Supports for investments in recycling”.
            </p>
            <p>
              More information about the European Agricultural Fund for Rural
              Development is available on the European Commission’s website at:
              <a href="http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm">
                http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm
              </a>
            </p>

            <img src="/images/Publicitates-4-1024x725.jpg" />

            <p>
              LTD “Bakery Flora” has purchased the fixed assets required for
              production with the support of the European Agricultural Fund for
              Rural Development’s Latvian Rural Development Programme for 2014 –
              2020 measure “Investments in physical assets” sub-measure 4.2
              “Supports for investments in recycling”.
            </p>

            <p>
              More information about the European Agricultural Fund for Rural
              Development is available on the European Commission’s website at:
              <a
                rel="noreferrer noopener"
                href="http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm"
                target="_blank">
                http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm
              </a>
            </p>

            <img
              src="/images/2019-1024x725.jpg"
              width="1024"
              height="725"
            />

            <p>
              LTD “Bakery Flora” has purchased the fixed assets required for
              production with the support of the European Agricultural Fund for
              Rural Development’s Latvian Rural Development Programme for 2014 –
              2020 measure “Investments in physical assets” sub-measure 4.2
              “Supports for investments in recycling”.
            </p>

            <p>
              More information about the European Agricultural Fund for Rural
              Development is available on the European Commission’s website at:
              <a
                rel="noreferrer noopener"
                href="http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm"
                target="_blank">
                http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm
              </a>
              <a href="http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm">
                http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm
              </a>
            </p>

            <img
              src="/images/2017_2-1024x725.jpg"
              width="1024"
              height="725"
            />

            <p>
              LTD “Bakery Flora” has purchased the fixed assets required for
              production with the support of the European Agricultural Fund for
              Rural Development’s Latvian Rural Development Programme for 2014 –
              2020 measure “Investments in physical assets” sub-measure 4.2
              “Supports for investments in recycling”.
            </p>

            <p>
              More information about the European Agricultural Fund for Rural
              Development is available on the European Commission’s website at:
              <a
                rel="noreferrer noopener"
                href="http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm"
                target="_blank">
                http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm
              </a>
            </p>

            <img
              src="/images/2017_1-1024x725.jpg"
              width="1024"
              height="725"
            />

            <p>
              LTD “Bakery Flora” has purchased the fixed assets required for
              production with the support of the European Agricultural Fund for
              Rural Development’s Latvian Rural Development Programme for 2014 –
              2020 measure “Investments in physical assets” sub-measure 4.2
              “Supports for investments in recycling”.
            </p>

            <p>
              More information about the European Agricultural Fund for Rural
              Development is available on the European Commission’s website at:
              <a
                rel="noreferrer noopener"
                href="http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm"
                target="_blank">
                http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm
              </a>
            </p>

            <img
              src="/images/2016-1024x725.jpg"
              width="1024"
              height="725"
            />
          </>
        )}
        {selectedLang === 'de' && (
          <>
            <p>
              Die Bäckerei „Flora“ hat sich mit der Unterstützung der im Rahmen
              der Teilmaßnahme 4.2 „Beihilfen für Investitionen in die
              Verarbeitung“ der Maßnahme „Investitionen in materielle Anlagen“
              des Programms zur Entwicklung des ländlichen Raums in Lettland
              2014–2020 des Europäischen Landwirtschaftsfonds für die
              Entwicklung des ländlichen Raums erhaltenen Beihilfe die
              erforderlichen Produktionsanlagen angeschafft.
            </p>
            <p>
              Mehr Information zum Europäischen Landwirtschaftsfonds für die
              Entwicklung des ländlichen Raums finden Sie auf der Internetseite
              der Europäischen Kommission unter
              <a
                rel="noreferrer noopener"
                href="http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm"
                target="_blank">
                http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm
              </a>
            </p>

            <img src="/images/Publicitates-5-1024x725.jpg" />

            <p>
              Die Bäckerei „Flora“ hat sich mit der Unterstützung der im Rahmen
              der Teilmaßnahme 4.2 „Beihilfen für Investitionen in die
              Verarbeitung“ der Maßnahme „Investitionen in materielle Anlagen“
              des Programms zur Entwicklung des ländlichen Raums in Lettland
              2014–2020 des Europäischen Landwirtschaftsfonds für die
              Entwicklung des ländlichen Raums erhaltenen Beihilfe die
              erforderlichen Produktionsanlagen angeschafft.
            </p>

            <p>
              Mehr Information zum Europäischen Landwirtschaftsfonds für die
              Entwicklung des ländlichen Raums finden Sie auf der Internetseite
              der Europäischen Kommission unter
              <a
                rel="noreferrer noopener"
                href="http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm"
                target="_blank">
                http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm
              </a>
              <a href="http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm"></a>
            </p>

            <img
              src="/images/2019-1024x725.jpg"
              alt="This image has an empty alt attribute; its file name is 2019-1024x725.jpg"
              width="1024"
              height="725"
            />

            <p>
              Die Bäckerei „Flora“ hat sich mit der Unterstützung der im Rahmen
              der Teilmaßnahme 4.2 „Beihilfen für Investitionen in die
              Verarbeitung“ der Maßnahme „Investitionen in materielle Anlagen“
              des Programms zur Entwicklung des ländlichen Raums in Lettland
              2014–2020 des Europäischen Landwirtschaftsfonds für die
              Entwicklung des ländlichen Raums erhaltenen Beihilfe die
              erforderlichen Produktionsanlagen angeschafft.
            </p>

            <p>
              Mehr Information zum Europäischen Landwirtschaftsfonds für die
              Entwicklung des ländlichen Raums finden Sie auf der Internetseite
              der Europäischen Kommission unter
              <a
                rel="noreferrer noopener"
                href="http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm"
                target="_blank">
                http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm
              </a>
              <a href="http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm"></a>
            </p>

            <img
              src="/images/2017_2-1024x725.jpg"
              alt="This image has an empty alt attribute; its file name is 2017_2-1024x725.jpg"
              width="1024"
              height="725"
            />
            <p>
              Die Bäckerei „Flora“ hat sich mit der Unterstützung der im Rahmen
              der Teilmaßnahme 4.2 „Beihilfen für Investitionen in die
              Verarbeitung“ der Maßnahme „Investitionen in materielle Anlagen“
              des Programms zur Entwicklung des ländlichen Raums in Lettland
              2014–2020 des Europäischen Landwirtschaftsfonds für die
              Entwicklung des ländlichen Raums erhaltenen Beihilfe die
              erforderlichen Produktionsanlagen angeschafft. .
            </p>

            <p>
              Mehr Information zum Europäischen Landwirtschaftsfonds für die
              Entwicklung des ländlichen Raums finden Sie auf der Internetseite
              der Europäischen Kommission unter
              <a
                rel="noreferrer noopener"
                href="http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm"
                target="_blank">
                http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm
              </a>
              <a href="http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm"></a>
            </p>

            <img
              src="/images/2017_1-1024x725.jpg"
              alt="This image has an empty alt attribute; its file name is 2017_1-1024x725.jpg"
              width="1024"
              height="725"
            />

            <p>
              Die Bäckerei „Flora“ hat sich mit der Unterstützung der im Rahmen
              der Teilmaßnahme 4.2 „Beihilfen für Investitionen in die
              Verarbeitung“ der Maßnahme „Investitionen in materielle Anlagen“
              des Programms zur Entwicklung des ländlichen Raums in Lettland
              2014–2020 des Europäischen Landwirtschaftsfonds für die
              Entwicklung des ländlichen Raums erhaltenen Beihilfe die
              erforderlichen Produktionsanlagen angeschafft.
            </p>

            <p>
              Mehr Information zum Europäischen Landwirtschaftsfonds für die
              Entwicklung des ländlichen Raums finden Sie auf der Internetseite
              der Europäischen Kommission unter
              <a
                rel="noreferrer noopener"
                href="http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm"
                target="_blank">
                http://ec.europa.eu/agriculture/rural-development-2014-2020/index_lv.htm
              </a>
            </p>

            <img
              src="/images/2016-1024x725.jpg"
              alt="This image has an empty alt attribute; its file name is 2016-1024x725.jpg"
              width="1024"
              height="725"
            />
          </>
        )}
      </div>
    </div>
  )
}

export default EuProjects

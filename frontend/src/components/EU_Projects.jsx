import { useSelector } from 'react-redux'
import { BigTitle } from './styled/base'
import { useState } from 'react'
import styled from 'styled-components'

const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  img {
    align-self: center;
  }
`

const EuProjects = () => {
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])
  const selectedLang = useSelector((state) => state.lang.selectedLang)

  return (
    <div>
      <BigTitle>{lang.eu_projects}</BigTitle>
      {selectedLang === 'lv' && (
        <ProjectList>
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
            src="https://www.maiznica.lv/wp-content/uploads/2023/06/Publicitates-3-1024x725.jpg"
            srcset="https://www.maiznica.lv/wp-content/uploads/2023/06/Publicitates-3-1024x725.jpg 1024w, https://www.maiznica.lv/wp-content/uploads/2023/06/Publicitates-3-180x128.jpg 180w, https://www.maiznica.lv/wp-content/uploads/2023/06/Publicitates-3-350x248.jpg 350w, https://www.maiznica.lv/wp-content/uploads/2023/06/Publicitates-3-768x544.jpg 768w, https://www.maiznica.lv/wp-content/uploads/2023/06/Publicitates-3-600x425.jpg 600w, https://www.maiznica.lv/wp-content/uploads/2023/06/Publicitates-3.jpg 1595w"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />

          <p>
            2019.gadā no 21.-22.maijam SIA Maiznīca Flora &nbsp;piedalījās
            izstādē “PLMAs World of Private Label”, Amsterdamā, Nīderlandē.
          </p>

          <p>
            2016.gada 18.maijā noslēgts līgums Nr.SKV-L-2016/306 ar Latvijas
            Investīciju un attīstības aģentūru par atbalsta saņemšanu pasākuma
            “Starptautiskās konkurētspējas veicināšana” ietvaros, ko līdzfinansē
            Eiropas Reģionālās attīstības fonds.
          </p>

          <img
            src="http://www.maiznica.lv/wp-content/uploads/2019/06/LV_ID_EU_logo_ansamblis_ERAF.jpg"
            data-id="4893"
            data-link="http://www.maiznica.lv/projekti/lv_id_eu_logo_ansamblis_eraf/"
            srcset="https://www.maiznica.lv/wp-content/uploads/2019/06/LV_ID_EU_logo_ansamblis_ERAF.jpg 842w, https://www.maiznica.lv/wp-content/uploads/2019/06/LV_ID_EU_logo_ansamblis_ERAF-416x111.jpg 416w, https://www.maiznica.lv/wp-content/uploads/2019/06/LV_ID_EU_logo_ansamblis_ERAF-350x94.jpg 350w, https://www.maiznica.lv/wp-content/uploads/2019/06/LV_ID_EU_logo_ansamblis_ERAF-768x205.jpg 768w"
            sizes="(max-width: 842px) 100vw, 842px"
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
            src="http://www.maiznica.lv/wp-content/uploads/2019/05/2019-1024x725.jpg"
            width="1024"
            height="725"
            srcset="https://www.maiznica.lv/wp-content/uploads/2019/05/2019-1024x725.jpg 1024w, https://www.maiznica.lv/wp-content/uploads/2019/05/2019-416x295.jpg 416w, https://www.maiznica.lv/wp-content/uploads/2019/05/2019-300x213.jpg 300w, https://www.maiznica.lv/wp-content/uploads/2019/05/2019-768x544.jpg 768w, https://www.maiznica.lv/wp-content/uploads/2019/05/2019.jpg 1595w"
            sizes="(max-width: 1024px) 100vw, 1024px"
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
            src="http://www.maiznica.lv/wp-content/uploads/2019/04/2017_2-1024x725.jpg"
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
            src="http://www.maiznica.lv/wp-content/uploads/2019/04/2017_1-1024x725.jpg"
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
            src="http://www.maiznica.lv/wp-content/uploads/2019/04/2016-1024x725.jpg"
            width="1024"
            height="725"
          />
        </ProjectList>
      )}
      {selectedLang === 'en' && (
        <ProjectList>
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

          <img
            src="https://www.maiznica.lv/wp-content/uploads/2023/06/Publicitates-4-1024x725.jpg"
            srcset="https://www.maiznica.lv/wp-content/uploads/2023/06/Publicitates-4-1024x725.jpg 1024w, https://www.maiznica.lv/wp-content/uploads/2023/06/Publicitates-4-180x128.jpg 180w, https://www.maiznica.lv/wp-content/uploads/2023/06/Publicitates-4-350x248.jpg 350w, https://www.maiznica.lv/wp-content/uploads/2023/06/Publicitates-4-768x544.jpg 768w, https://www.maiznica.lv/wp-content/uploads/2023/06/Publicitates-4-600x425.jpg 600w, https://www.maiznica.lv/wp-content/uploads/2023/06/Publicitates-4.jpg 1595w"
            sizes="(max-width: 1024px) 100vw, 1024px"
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
            src="http://www.maiznica.lv/wp-content/uploads/2019/04/2019-1024x725.jpg"
            width="1024"
            height="725"
            srcset="https://www.maiznica.lv/wp-content/uploads/2019/04/2019-1024x725.jpg 1024w, https://www.maiznica.lv/wp-content/uploads/2019/04/2019-416x295.jpg 416w, https://www.maiznica.lv/wp-content/uploads/2019/04/2019-300x213.jpg 300w, https://www.maiznica.lv/wp-content/uploads/2019/04/2019-768x544.jpg 768w, https://www.maiznica.lv/wp-content/uploads/2019/04/2019.jpg 1595w"
            sizes="(max-width: 1024px) 100vw, 1024px"
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
            src="http://www.maiznica.lv/wp-content/uploads/2019/04/2017_2-1024x725.jpg"
            width="1024"
            height="725"
            srcset="https://www.maiznica.lv/wp-content/uploads/2019/04/2017_2-1024x725.jpg 1024w, https://www.maiznica.lv/wp-content/uploads/2019/04/2017_2-416x295.jpg 416w, https://www.maiznica.lv/wp-content/uploads/2019/04/2017_2-300x213.jpg 300w, https://www.maiznica.lv/wp-content/uploads/2019/04/2017_2-768x544.jpg 768w, https://www.maiznica.lv/wp-content/uploads/2019/04/2017_2.jpg 1595w"
            sizes="(max-width: 1024px) 100vw, 1024px"
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
            src="http://www.maiznica.lv/wp-content/uploads/2019/04/2017_1-1024x725.jpg"
            width="1024"
            height="725"
            srcset="https://www.maiznica.lv/wp-content/uploads/2019/04/2017_1-1024x725.jpg 1024w, https://www.maiznica.lv/wp-content/uploads/2019/04/2017_1-416x295.jpg 416w, https://www.maiznica.lv/wp-content/uploads/2019/04/2017_1-300x213.jpg 300w, https://www.maiznica.lv/wp-content/uploads/2019/04/2017_1-768x544.jpg 768w, https://www.maiznica.lv/wp-content/uploads/2019/04/2017_1.jpg 1595w"
            sizes="(max-width: 1024px) 100vw, 1024px"
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
            src="http://www.maiznica.lv/wp-content/uploads/2019/04/2016-1024x725.jpg"
            width="1024"
            height="725"
            srcset="https://www.maiznica.lv/wp-content/uploads/2019/04/2016-1024x725.jpg 1024w, https://www.maiznica.lv/wp-content/uploads/2019/04/2016-416x295.jpg 416w, https://www.maiznica.lv/wp-content/uploads/2019/04/2016-300x213.jpg 300w, https://www.maiznica.lv/wp-content/uploads/2019/04/2016-768x544.jpg 768w, https://www.maiznica.lv/wp-content/uploads/2019/04/2016.jpg 1595w"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </ProjectList>
      )}
      {selectedLang === 'de' && (
        <ProjectList>
          <p>
            Die Bäckerei „Flora“ hat sich mit der Unterstützung der im Rahmen
            der Teilmaßnahme 4.2 „Beihilfen für Investitionen in die
            Verarbeitung“ der Maßnahme „Investitionen in materielle Anlagen“ des
            Programms zur Entwicklung des ländlichen Raums in Lettland 2014–2020
            des Europäischen Landwirtschaftsfonds für die Entwicklung des
            ländlichen Raums erhaltenen Beihilfe die erforderlichen
            Produktionsanlagen angeschafft.
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
            src="https://www.maiznica.lv/wp-content/uploads/2023/06/Publicitates-5-1024x725.jpg"
            srcset="https://www.maiznica.lv/wp-content/uploads/2023/06/Publicitates-5-1024x725.jpg 1024w, https://www.maiznica.lv/wp-content/uploads/2023/06/Publicitates-5-180x128.jpg 180w, https://www.maiznica.lv/wp-content/uploads/2023/06/Publicitates-5-350x248.jpg 350w, https://www.maiznica.lv/wp-content/uploads/2023/06/Publicitates-5-768x544.jpg 768w, https://www.maiznica.lv/wp-content/uploads/2023/06/Publicitates-5-600x425.jpg 600w, https://www.maiznica.lv/wp-content/uploads/2023/06/Publicitates-5.jpg 1595w"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />

          <p>
            Die Bäckerei „Flora“ hat sich mit der Unterstützung der im Rahmen
            der Teilmaßnahme 4.2 „Beihilfen für Investitionen in die
            Verarbeitung“ der Maßnahme „Investitionen in materielle Anlagen“ des
            Programms zur Entwicklung des ländlichen Raums in Lettland 2014–2020
            des Europäischen Landwirtschaftsfonds für die Entwicklung des
            ländlichen Raums erhaltenen Beihilfe die erforderlichen
            Produktionsanlagen angeschafft.
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
            src="http://www.maiznica.lv/wp-content/uploads/2019/04/2019-1024x725.jpg"
            alt="This image has an empty alt attribute; its file name is 2019-1024x725.jpg"
            width="1024"
            height="725"
          />

          <p>
            Die Bäckerei „Flora“ hat sich mit der Unterstützung der im Rahmen
            der Teilmaßnahme 4.2 „Beihilfen für Investitionen in die
            Verarbeitung“ der Maßnahme „Investitionen in materielle Anlagen“ des
            Programms zur Entwicklung des ländlichen Raums in Lettland 2014–2020
            des Europäischen Landwirtschaftsfonds für die Entwicklung des
            ländlichen Raums erhaltenen Beihilfe die erforderlichen
            Produktionsanlagen angeschafft.
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
            src="http://www.maiznica.lv/wp-content/uploads/2019/04/2017_2-1024x725.jpg"
            alt="This image has an empty alt attribute; its file name is 2017_2-1024x725.jpg"
            width="1024"
            height="725"
          />
          <p>
            Die Bäckerei „Flora“ hat sich mit der Unterstützung der im Rahmen
            der Teilmaßnahme 4.2 „Beihilfen für Investitionen in die
            Verarbeitung“ der Maßnahme „Investitionen in materielle Anlagen“ des
            Programms zur Entwicklung des ländlichen Raums in Lettland 2014–2020
            des Europäischen Landwirtschaftsfonds für die Entwicklung des
            ländlichen Raums erhaltenen Beihilfe die erforderlichen
            Produktionsanlagen angeschafft. .
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
            src="http://www.maiznica.lv/wp-content/uploads/2019/04/2017_1-1024x725.jpg"
            alt="This image has an empty alt attribute; its file name is 2017_1-1024x725.jpg"
            width="1024"
            height="725"
          />

          <p>
            Die Bäckerei „Flora“ hat sich mit der Unterstützung der im Rahmen
            der Teilmaßnahme 4.2 „Beihilfen für Investitionen in die
            Verarbeitung“ der Maßnahme „Investitionen in materielle Anlagen“ des
            Programms zur Entwicklung des ländlichen Raums in Lettland 2014–2020
            des Europäischen Landwirtschaftsfonds für die Entwicklung des
            ländlichen Raums erhaltenen Beihilfe die erforderlichen
            Produktionsanlagen angeschafft.
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
            src="http://www.maiznica.lv/wp-content/uploads/2019/04/2016-1024x725.jpg"
            alt="This image has an empty alt attribute; its file name is 2016-1024x725.jpg"
            width="1024"
            height="725"
          />
        </ProjectList>
      )}
    </div>
  )
}

export default EuProjects

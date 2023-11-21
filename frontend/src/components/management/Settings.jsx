import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import useBannerService from '../../services/banners'
import { Cross } from '@styled-icons/entypo/Cross'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import useField from '../../hooks/useField'
import Input from '../basic/Input'
import { useSelector } from 'react-redux'
import { gramsToKilos, toEnglishAlphabet } from '../../util/convert'
import useUploadService from '../../services/uploads'
import useCategoryService from '../../services/category'
import useProductService from '../../services/product'
import { CSS } from '@dnd-kit/utilities'
import { toast } from 'react-toastify'
import useSettingsService from '../../services/settings'

const NewEmail = ({ addEmail }) => {
  const email = useField('email')
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])

  return (
    <div className="card row align-cross-end  p p-t-0 between">
      <Input
        {...email}
        label={lang.email}
      />

      <button
        onClick={() => {
          addEmail({ email: email.value })
          email.clear()
        }}
        className="btn">
        {lang.add}
      </button>
    </div>
  )
}

const SettingsPage = () => {
  const settingsService = useSettingsService()
  const [emails, setEmails] = useState([])
  const lang = useSelector((state) => state.lang[state.lang.selectedLang])

  useEffect(() => {
    settingsService
      .getContactFormEmails()
      .then((response) => setEmails(response.data.contactFormEmails))
  }, [])

  const addEmail = (email) => {
    setEmails([email, ...emails])
  }
  const update = () => {
    settingsService.updateContactFormEmails(emails).then((response) => {
      toast.success(lang.toast_changes_saved)
    })
  }
  const removeEmail = (email) => {
    setEmails(emails.filter((e) => e.email !== email.email))
  }
  return (
    <div className="m-t">
      <div className="row between  m-d">
        <div
          className=" column small-gap"
          style={{ flexGrow: 0 }}>
          <NewEmail addEmail={addEmail} />
          {emails.map((e) => (
            <div
              key={e.email}
              className="p row between align-cross-center card">
              <h3 className="card-heading">{e.email}</h3>
              <button
                onClick={() => {
                  removeEmail(e)
                }}
                className="btn icon-button inverted cancel">
                <Cross className="icon-b" />
              </button>
            </div>
          ))}
        </div>
        <button
          className="btn"
          onClick={update}>
          {lang.save_changes}
        </button>
      </div>

      <div className="column"></div>
    </div>
  )
}
export default SettingsPage

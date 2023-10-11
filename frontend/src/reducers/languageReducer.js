import { createSlice } from '@reduxjs/toolkit'
import lv from '../intl/lv'
import en from '../intl/en'
import de from '../intl/de'
const initialState = {
  selectedLang: 'en',
  en: en,
  lv: lv,
  de: de,
}

const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLanguage(state, action) {
      return { ...state, selectedLang: action.payload }
    },
  },
})

export const { setLanguage } = langSlice.actions

export const changeLanguage = (language) => {
  return async (dispatch) => {
    window.localStorage.setItem('language', language)
    dispatch(setLanguage(language))
  }
}

export default langSlice.reducer

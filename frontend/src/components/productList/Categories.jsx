import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CategoryItem from './CategoryItem'

const Categories = ({ categories, name, tight }) => {
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  return (
    <div style={{ width: '100%' }}>
      {categories && categories.length > 0 && (
        <div className="row no-row-gap between">
          {name && (
            <h1 className="big-title m-d">{name[selectedLang] || name.lv}</h1>
          )}
          {categories.map((category) => (
            <CategoryItem category={category} />
          ))}
          <div className="category-spacer" />
          <div className="category-spacer" />
          <div className="category-spacer" />
          <div className="category-spacer" />
          <div className="category-spacer" />
          <div className="category-spacer" />
          <div className="category-spacer" />
          <div className="category-spacer" />
          <div className="category-spacer" />
          <div className="category-spacer" />
          <div className="category-spacer" />
        </div>
      )}
    </div>
  )
}

export default Categories

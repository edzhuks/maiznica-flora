import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

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
            <Link
              className="card square category-spacer category-card m-d"
              style={{
                background: `url(/images/${category.image}) center center`,
              }}
              key={category.id}
              to={`/category/${category.id}`}>
              <div className="category-overlay">
                <p className="p-s column center align-cross-center full-height">
                  {category.displayName[selectedLang] ||
                    category.displayName.lv}
                </p>
              </div>
            </Link>
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

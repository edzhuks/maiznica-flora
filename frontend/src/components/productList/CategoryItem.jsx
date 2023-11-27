import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const CategoryItem = ({ category, name }) => {
  const selectedLang = useSelector((state) => state.lang.selectedLang)
  return (
    <Link
      className="card square category-spacer category-card m-d"
      style={{
        background: `url(/images/md_${category.image}) center center`,
      }}
      key={category.id}
      to={`/category/${category.id}`}>
      <div className="category-overlay">
        <p className="p-s column center align-cross-center full-height">
          {name ||
            category.displayName[selectedLang] ||
            category.displayName.lv}
        </p>
      </div>
    </Link>
  )
}
export default CategoryItem

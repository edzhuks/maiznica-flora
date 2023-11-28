import CategoryItem from './CategoryItem'

const Categories = ({ categories, name, tight }) => {
  return (
    <div style={{ width: '100%' }}>
      {categories && categories.length > 0 && (
        <div className="row no-row-gap between">
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

import './index.css'

const ItemsList = props => {
  const {eachImage, findIsCorrectMatch} = props
  const {id, thumbnailUrl} = eachImage
  const isCorrectMatch = () => {
    findIsCorrectMatch(id)
  }
  return (
    <li className="style-each-list-item">
      <button
        type="button"
        className="style-image-button"
        onClick={isCorrectMatch}
      >
        <img className="style-each-image" src={thumbnailUrl} alt="thumbnail" />
      </button>
    </li>
  )
}

export default ItemsList

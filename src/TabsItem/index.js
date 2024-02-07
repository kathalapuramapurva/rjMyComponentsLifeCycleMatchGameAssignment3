import './index.css'

const TabsItem = props => {
  const {eachTab, active, onClickTab} = props
  const {tabId, displayText} = eachTab
  const activeClassName = active === tabId ? 'active-button' : ''
  const onClickTabItem = () => {
    onClickTab(tabId)
  }
  return (
    <li className="each-tab">
      <button
        type="button"
        className={`style-button ${activeClassName}`}
        onClick={onClickTabItem}
      >
        {displayText}
      </button>
    </li>
  )
}
export default TabsItem

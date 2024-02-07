import {Component} from 'react'
import TabsItem from '../TabsItem'
import ItemsList from '../ItemsList'
import './index.css'

class MatchGame extends Component {
  state = {
    active: 'FRUIT',
    initialImageUrlId: 'b11ec8ce-35c9-4d67-a7f7-07516d0d8186',
    timeMoved: 60,
    score: 0,
    gameOn: true,
  }

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  tick = () => {
    const {timeMoved} = this.state
    if (timeMoved === 0) {
      this.setState({gameOn: false})
    } else {
      this.setState(prevState => ({timeMoved: prevState.timeMoved - 1}))
    }
  }

  getImage = () => {
    const {initialImageUrlId} = this.state
    const {imagesList} = this.props
    const imageItem = imagesList.find(
      eachImage => eachImage.id === initialImageUrlId,
    )
    return imageItem.imageUrl
  }

  onClickTab = givenId => {
    this.setState({active: givenId})
  }

  findIsCorrectMatch = givenId => {
    const {initialImageUrlId} = this.state
    const {imagesList} = this.props
    const randomNumber = Math.floor(Math.random() * imagesList.length)
    if (givenId === initialImageUrlId) {
      this.setState(prevState => ({
        score: prevState.score + 1,
        initialImageUrlId: imagesList[randomNumber].id,
      }))
    } else {
      this.setState({gameOn: false})
    }
  }

  onClickReset = () => {
    this.setState({
      active: 'FRUIT',
      initialImageUrlId: 'b11ec8ce-35c9-4d67-a7f7-07516d0d8186',
      timeMoved: 60,
      score: 0,
      gameOn: true,
    })
  }

  render() {
    const {tabsList, imagesList} = this.props
    const {score, gameOn} = this.state
    const {active, timeMoved} = this.state
    const displayImagesList = imagesList.filter(
      eachImage => eachImage.category === active,
    )
    return (
      <div className="main-container">
        <ul className="nav-container">
          <li className="style-list-item">
            <img
              className="style-logo"
              src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
              alt="website logo"
            />
          </li>
          <li className="score-timer-container">
            <div className="score-container">
              <p className="score-heading">
                Score:
                <span className="style-seconds">{score}</span>
              </p>
            </div>
            <div className="timer-container">
              <img
                className="style-timer"
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
              />
              <p className="style-seconds">{timeMoved} sec</p>
            </div>
          </li>
        </ul>

        <div className="bottom-container">
          {gameOn && (
            <div className="content-container">
              <img className="style-image" src={this.getImage()} alt="match" />

              <ul className="tabs-container">
                {tabsList.map(eachTab => (
                  <TabsItem
                    eachTab={eachTab}
                    key={eachTab.tabId}
                    active={active}
                    onClickTab={this.onClickTab}
                  />
                ))}
              </ul>

              <ul className="images-container">
                {displayImagesList.map(eachImage => (
                  <ItemsList
                    eachImage={eachImage}
                    key={eachImage.id}
                    findIsCorrectMatch={this.findIsCorrectMatch}
                  />
                ))}
              </ul>
            </div>
          )}

          {!gameOn && (
            <div className="score-card-container">
              <img
                className="trophy-image"
                src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
                alt="trophy"
              />
              <p className="style-your-score">YOUR SCORE</p>
              <p className="style-final-score">{score}</p>
              <button
                type="button"
                className="play-again-button"
                onClick={this.onClickReset}
              >
                <img
                  className="reset"
                  src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                  alt="reset"
                />
                <p className="play-again">PLAY AGAIN</p>
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default MatchGame

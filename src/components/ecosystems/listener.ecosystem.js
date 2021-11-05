import Redux from '../../redux'

import ComponentSuperclass from '../../superclass/component.superclass'
import CutsceneListener from '../../listeners/cutscene.listener'

class ListernerEcosystem extends ComponentSuperclass {
  constructor (props) { super(props, 'listernerEco') }

  componentDidMount () {
    this.listeners = {}
    this.listeners.cutscene = new CutsceneListener()
    this.setState({ isReady: true })
  }

  pingListener(nextProps, ping_key) {
    const newValue = nextProps[ping_key]
    if (this.props[ping_key] === newValue) { return true }

    const [, listenerName, listenerEvent ] = ping_key.split('_')
    this.listeners[listenerName].event(listenerEvent)
    return true
  }

  shouldComponentUpdate (nextProps) {

    this.pingListener(nextProps, 'listener_cutscene_cutscene')
    this.pingListener(nextProps, 'listener_cutscene_answer')
    this.pingListener(nextProps, 'listener_cutscene_exit')

    return false
  }

  render () { return null }
}

export default Redux.connect(state => ({
  listener_cutscene_cutscene: state.ressources.cutscene.listener_cutscene_cutscene,
  listener_cutscene_answer: state.ressources.cutscene.listener_cutscene_answer,
  listener_cutscene_exit: state.ressources.cutscene.listener_cutscene_exit,

}), null)(ListernerEcosystem)

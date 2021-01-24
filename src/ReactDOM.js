 import { changeStateCursor } from './state'

const ReactDOM = {
  oldDom: null,
  parentNode: null,
  render: (reactElement, domRoot) => {
    ReactDOM.renderElements(reactElement, domRoot)
    ReactDOM.oldDom = reactElement
    ReactDOM.parentNode = domRoot
  },
  reRender: (reactElement, domRoot) => {
    domRoot?.firstChild?.remove()
    ReactDOM.renderElements(reactElement, domRoot)
  },
  renderElements: (reactElement, domRoot) => {
    if(!reactElement) {
      return
    }

    if(typeof reactElement === 'string' || typeof reactElement === 'number') {
      domRoot.appendChild(document.createTextNode(String(reactElement)))
      
      return
    }

    const rootEl = document.createElement(reactElement.tag)
    const props = reactElement.props ?? {}

    reactElement?.render?.(props)
    changeStateCursor(0)
    const propsKeys = Object.keys(props).filter(p => p !== 'children')
    const children = props.children ?? []

    propsKeys.forEach(it => {
      rootEl[it] = props[it]
    })

    children.forEach(child => {
      ReactDOM.renderElements(child, rootEl)
    })
    domRoot.appendChild(rootEl)
  }
}

export default ReactDOM
import { state, stateCursor, changeStateCursor } from './state'
import ReactDOM from './ReactDOM'

const React = {
  createElement: (fnOrTag, props, ...children) => {
    if (typeof fnOrTag  === 'function'){
      return {...fnOrTag(props), render: () => fnOrTag(props)}
    }

    return { tag: fnOrTag, props: { ...props, children } }
  },
  useState: initialState => {
    const localCursor = stateCursor
    const localState = state[localCursor] || initialState
    const setState = newState => {
      state[localCursor] = newState
      ReactDOM.reRender(ReactDOM.oldDom?.render(), ReactDOM.parentNode)
    }

    changeStateCursor(stateCursor +1)

    return [localState, setState]
  }
}

export default React
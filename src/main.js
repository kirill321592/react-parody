import React from './React'
import ReactDOM from './ReactDOM'

const Header = () => {
  const [ name, setName ] = React.useState("user")
  const [ age, setAge ] = React.useState(10)

  return (
    <div>
        Hello {name} {age}
      <br/>
      <input 
        type="text"
        value={name} 
        onchange={e => setName(e.target.value)}
      />
      <br/>
      <button onclick={() => setAge(age +1)}>
        age increas
      </button>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <Header />
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
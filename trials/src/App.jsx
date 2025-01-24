const sum = (p1, p2) => {
  console.log(p1)
  console.log(p2)
  return p1 + p2
}

const square = p => p * p

function foo(){
  return 'bar'
}

const App = () => {
  const t = [1, 2, 3, 4, 5, 6]
  const t2 = t.map(square)
  return (
    <>
      <h1>{t}</h1>
      <h1>{foo()}</h1>
    </>
  )
}

export default App
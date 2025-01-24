const App = () => {
  const arr = [1, -3, 15]
  console.log(arr)
  arr.push(-12)
  
  
  arr.forEach((value) => {
    console.log(value)
  })

  
  return (
    <>
      <h1>Hello</h1>
    </>
  )
}

export default App
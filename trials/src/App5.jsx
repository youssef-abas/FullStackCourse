import axios from 'axios'

const App5 = () => {
    axios
        .get('http://localhost:3001/notes')
        .then(response => {
            const notes = response.data
            console.log(notes)
        })
    
    return(
        <h1>Hello</h1>
    )
}

export default App5
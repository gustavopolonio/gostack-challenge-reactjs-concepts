import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repository, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data) 
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `New repository ${Date.now()}`,
      url: "https://github.com/gustavopolonio/challenge-nodejs-concepts",
      techs: ["react", "css"]
    })
    const newRepository = response.data

    setRepositories([...repository, newRepository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    
    // for(var count = 0; count < repository.length; count++) {
    //   if(repository[count].id === id ) {
    //     repository.splice(count, 1)
    //   } 
    // }

    // setRepositories([...repository, ])
    
    setRepositories(repository.filter(repository => repository.id !== id))

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>)} 
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

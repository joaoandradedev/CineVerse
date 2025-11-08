import { useEffect, useState } from "react";
import api from '../../services/api';
import './home.css';
import { Link } from 'react-router-dom';

function Home(){
  
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params:{
          api_key: "53f507dac8417cdb1faed35053c0888b",
          language: "pt-BR",
          page: 1,
        }
      })

      setFilmes(response.data.results.filter(filme => filme.id !== 1519168))
      setLoading(false);

    }

    loadFilmes();

  }, [])

  if(loading){
    return(
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    )
  }

  return(
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return(
            <article key={filme.id}>
              <strong className="titleHome">{filme.title}</strong>
              <img src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`} alt={filme.title} className="imgHome"/>
              <Link to={`/filme/${filme.id}`} className="acessar">Acessar</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
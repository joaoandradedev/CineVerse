import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './favorito.css';

function Favorito() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem("@primeflix");
    setFilmes(JSON.parse(minhaLista) || []);
  }, []);

  function excluirFilme(id) {
    let filtroFilmes = filmes.filter((filme) => {
      return filme.id !== id;
    });

    setFilmes(filtroFilmes);
    localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
  }

  return (
    <div className="meus-filmes">
      <h1>Meus Filmes Favoritos</h1>

      {filmes.length === 0 && (
        <div className="vazio">
          <span>Você não possui nenhum filme salvo 😢</span>
          <Link to="/" className="btn-home">Descobrir Filmes</Link>
        </div>
      )}

      <div className="lista-filmes-favoritos">
        {filmes.map((filme) => {
          return (
            <article key={filme.id} className="card-favorito">
              <img src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`} alt={filme.title} />
              
              <div className="card-info">
                <strong>{filme.title}</strong>
                <span>Nota: {filme.vote_average.toFixed(2)}</span>
                
                <div className="acoes">
                  <Link to={`/filme/${filme.id}`} className="btn-detalhes">
                    Ver Detalhes
                  </Link>
                  <button onClick={() => excluirFilme(filme.id)} className="btn-excluir">
                    Excluir
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Favorito;
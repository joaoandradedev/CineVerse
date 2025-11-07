import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './filme.css'
import api from '../../services/api';
import { Link } from "react-router-dom";

function Filme(){

  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
        params:{
          api_key: "53f507dac8417cdb1faed35053c0888b",
          language: "pt-BR"
        }
      })
      .then((response) => {
        setFilme(response.data);
        setLoading(false);
        
        // Verifica se o filme já está nos favoritos
        const minhaLista = localStorage.getItem("@primeflix");
        let filmesSalvos = JSON.parse(minhaLista) || [];
        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === response.data.id);
        
        if(hasFilme){
          setFavorito(true);
        }
      })
      .catch(() => {
        console.log("Filme não encontrado");
        navigate("/", { replace: true });
        setLoading(false);
      })
    }

    loadFilme();

    return () => {
      console.log("Componente Desmontado")
    }
  }, [navigate, id])

  function salvarFilme(){
    const minhaLista = localStorage.getItem("@primeflix");
    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);
  
    if(hasFilme){
      // Remove o filme da lista
      let filtroFilmes = filmesSalvos.filter((filmeSalvo) => {
        return filmeSalvo.id !== filme.id;
      });
    
      localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
      setFavorito(false);
      return;
    }

    // Adiciona o filme na lista
    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    setFavorito(true);
  }

  if(loading){
    return(
      <div className="loading">
        <h1>Acessando filmes...</h1>
      </div>
    )
  }

  return(
    <div className="filme-container">
      <div className="filmeInfo">
        <div className="filme-poster">
          <img src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`} alt={filme.title} />
        </div>
        
        <div className="filme-detalhes">
          <strong className="title">{filme.title}</strong>
          <h1 className="nota">Nota: {filme.vote_average.toFixed(2)}</h1>
          <div>
            <p className="sinopseTitle">Sinopse:</p>
            <p className="sinopse">{filme.overview}</p>
          </div>
          <div className="botoes-container">
            <Link to="/" className="btn-voltar">← Voltar para Home</Link>
            <button 
              className={`btn-favorito ${favorito ? 'active' : ''}`}
              onClick={salvarFilme}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filme;
import './erro.css';
import { Link } from 'react-router-dom';

function Erro(){
  return(
      <div className="not-found">
        <div className="not-found-content">
          <div className="not-found-icon">🎬</div>
            <h1>404</h1>
            <h2>Ops! Filme não encontrado</h2>
            <p>
            Parece que este filme saiu de cartaz ou nunca existiu em nosso catálogo.
            Que tal voltar para a página inicial e descobrir novos títulos?
            </p>
            <Link to="/" className="not-found-btn"> Voltar para Home </Link>
          </div>
      </div>
  );
}

export default Erro;
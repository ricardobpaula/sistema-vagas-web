import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

 import './styles.css';

export default function Dashboard() {
  const [vagas, setVagas] = useState([]);

  useEffect(() => {
    async function loadVagas(){
      const usuario_id = localStorage.getItem('usuario');
      const response = await api.get('/dashboard', {
        headers: { usuario_id }
      });

      setVagas(response.data);
    }

    loadVagas();
  }, []);

  return (
    <>
      <ul className="vagas-list">
        {vagas.map(vaga =>(
          <li key={vaga._id}>
            <header style={{backgroundImage: `url(${vaga.imagem_url})` }} />
            <strong>{vaga.empresa}</strong>
            <span>{vaga.valor ? `R$${vaga.valor}/hora` : 'Valor não informado' }</span>
          </li>
        ))}
      </ul>

      <Link to="/vagas">
          <button className="btn">Cadastrar nova vaga</button>
      </Link>
    </>
  );
}

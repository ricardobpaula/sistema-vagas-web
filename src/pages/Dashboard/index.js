import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import api from '../../services/api';

 import './styles.css';

export default function Dashboard() {
  const [vagas, setVagas] = useState([]);
  const [requests, setRequests] = useState([]);

  const usuario_id = localStorage.getItem('usuario');

    const socket = useMemo(() => socketio('http://localhost:3333', {
      query: { usuario_id }, 
    }), [usuario_id]);

  useEffect(() => {
    socket.on( 'reserva_request', data => {
      setRequests([...requests, data]);

    })
  },[requests, socket]);

  useEffect(() => {
    async function loadVagas(){
      const usuario_id = localStorage.getItem('usuario');
      const response = await api.get('/dashboard', {
        headers: { usuario_id }
      });

      setVagas(response.data); 
     
    }

    loadVagas();
  }, [requests, socket]);

  async function handleAccept(id){
    await api.post(`reservas/${id}/aprovacoes`);

    setRequests(requests.filter(request => request._id !== id));
  }

  async function handleReject(id){
    await api.post(`reservas/${id}/rejeicoes`);

    setRequests(requests.filter(request => request._id !== id));
  }

  return (
    <>

      <ul className="notifications">
        {requests.map(request => (
          <li key={request._id}>
            <p>
              <strong>{request.usuario.email}</strong> está se candidatando para uma vaga em <strong>{request.vaga.empresa}</strong> para a data: <strong>{request.data}</strong>
            </p>
            <button className="accept" onClick={() => handleAccept(request._id)}>Aceitar</button>
            <button className="reject" onClick={() => handleReject(request._id)}>Recusar</button>
          </li>
        ))}
      </ul>
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

import React, { useState, useMemo } from 'react';

import api from '../../services/api';

import camera from '../../assets/camera.svg';
import './styles.css';

export default function Vaga({ history }) {
  const [imagem, setImagem] = useState(null);
  const [empresa, setEmpresa] = useState('');
  const [tecnologias, setTecnologias] = useState([]);
  const [valor, setValor] = useState('');

  const preview = useMemo(
    () => { return imagem ? URL.createObjectURL(imagem) : null },
    [imagem]
  )
  
  async function handleSubmit(event){
    event.preventDefault();
    
    const data = new FormData();
    const usuario_id = localStorage.getItem('usuario');
    data.append('imagem', imagem);
    data.append('empresa', empresa);
    data.append('tecnologias', tecnologias);
    data.append('valor', valor);

    await api.post('/vagas',data, {
      headers: { usuario_id }
    });

    history.push('/dashboard');
  };
  
  return (  
      <form onSubmit={handleSubmit}>
        <label  
        id="imagem"
        style={{backgroundImage: `url(${preview})`}}
        className={imagem ? 'has-imagem' : ''}
        >
          <input type="file" onChange={event => setImagem(event.target.files[0])}/>
          <img src={camera} alt="Selecione uma imagem"/>  
        </label>      

        <label htmlFor="empresa">Empresa *</label>
        <input 
        id="empresa"
        placeholder="Nome da sua empresa"
        value={empresa}
        onChange={event => setEmpresa(event.target.value)}
        />

        <label htmlFor="tecnologias">Tecnologias * <span>(separadas por vírgula)</span></label>
        <input 
        id="tecnologias"
        placeholder="Tecnologias usadas"
        value={tecnologias}
        onChange={event => setTecnologias(event.target.value)}
        />

      <label htmlFor="valor">Valor por hora </label>
        <input 
        id="valor"
        placeholder="valor em R$/Hora"
        value={valor}
        onChange={event => setValor(event.target.value)}
        />

        <button type="submit" className="btn">Cadastrar</button>
      </form>
  
  );
}

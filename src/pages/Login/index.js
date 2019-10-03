import React, {useState} from 'react';
import api from '../../services/api';

// import { Container } from './styles';

export default function Login({ history }) {

  const [email, setEmail] = useState('');
  
  async function handleSubmit(event){
    event.preventDefault();

    const response = await api.post('/usuarios', { email});  
    
    const { _id } = response.data;
    localStorage.setItem('usuario', _id);
    history.push('/dashboard');
  }

  return (
    <>      
      <p>
      Ofereça <strong>vagas</strong> para programadores e encontre <strong>talentos </strong> para sua empresa
    </p>
    <form onSubmit={handleSubmit}>

      <label htmlFor="email">E-mail *</label>
      <input 
        type="email" 
        name="email" 
        id="email" 
        placeholder="Digite seu email: "
        value={email}
        onChange={event => setEmail(event.target.value)}
        />
      
        <button className="btn" type="submit">Entrar</button>
    </form>
  </>
  );
}

import React,{useState} from 'react'
import './Style.css'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import {FiLogIn} from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'; // UseHistory para fazer a rota
import api from "../../services/api";

export default function Logon(){
    const [id, setId] = useState('');

    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault(); // evita que atualiza a pagina
        
        try{
            const response = await api.post('/session', {id});

            localStorage.setItem('ongId', id); // salvando o id no navegador para usar ele dps
            localStorage.setItem('ongNome', response.data.nome); // já que nao estamos informando assim eu pego do bando de dados o nome para salvar no navegador e usar dps
            
            history.push('/profile');
        }
        catch(Exception){
            alert("Erro no Login tente novamente");
        }
    }

    return(
        <div className="logon-container">

            <section className="form">
                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu Login</h1>

                    <input 
                        placeholder="Seu ID"
                        value = {id}
                        onChange={e => setId(e.target.value)}
                     />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/cadastro"> <FiLogIn size={16} color="#E02041" /> Não tenho cadastro</Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes"/>
            
        </div>
    );

}
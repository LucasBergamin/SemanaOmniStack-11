import React,{useState} from 'react'
import './style.css'
import logoImg from '../../assets/logo.svg'
import {Link, useHistory} from 'react-router-dom'
import { FiArrowLeft} from 'react-icons/fi'
import api from "../../services/api";

export default function Register(){
    const [nome, setName ]= useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e){
       e.preventDefault();

        const data = {
            nome,
            email,
            whatsapp,
            city,
            uf,
        }
        
        if(nome.length != 0 && email.length != 0 && whatsapp.length != 0 && city.length != 0 && uf.length != 0){
            const response = await api.post('ongs', data)
            
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');

             
        }
        else{
            alert("Erro no cadastro tente novamente");

        }
     }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Here"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                
                    <Link className="back-link" to="/"> <FiArrowLeft size={16} color="#E02041" /> Voltar</Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value={nome}
                        onChange={e => setName(e.target.value)}
                     />

                    <input type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                     />

                    <input 
                        placeholder = "Whataspp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-grup">
                        <input 
                            className="confCity" 
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                         />
                        <input 
                            className="confUF" 
                            placeholder="UF"
                            value={uf}
                            onChange={e => setUf(e.target.value)}    
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>

    )
}
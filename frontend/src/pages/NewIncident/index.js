import React, {useState} from 'react'
import './style.css'
import logoImg from '../../assets/logo.svg'
import {Link, useHistory} from 'react-router-dom'
import { FiArrowLeft} from 'react-icons/fi'

import api from '../../services/api'

export default function Register(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value
        };

        if(title.length != 0 && description.length != 0 && value.length != 0){
            await api.post('incidents', data, {
                headers:{
                    Authorization: ongId,
                },
                
            })
            alert('Caso cadastrado com sucesso :)');
            history.push('/profile');
        }
        else{
            alert('Erro ao cadastrar novo caso, tente novamente');
        }
    }

    return (
        <div className="new-incident-contener">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Here"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um héroi para resolver isso.</p>
                
                    <Link className="back-link" to="/profile"> <FiArrowLeft size={16} color="#E02041" /> Voltar</Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do caso" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder = "Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>

    )
}
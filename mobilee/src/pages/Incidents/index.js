import React, {useState, useEffect} from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'; //TouchableOpacity é um botao
import {useNavigation} from '@react-navigation/native'; // Para fazer navegação de páginas
import { Feather } from '@expo/vector-icons';

import api from '../services/api'

//FlatList --> para poder arrasta para baixo

import logo from '../../assets/logo.png'
import styles from './style';

export default function Incidents(){
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoagind] = useState(false);

    const navigation = useNavigation();

    function NavigateToDetail(incident){
        navigation.navigate('Detail', {incident});
    }

    async function loadIncidents(){
        if(loading){
            return;
        }
        if( total > 0 && incidents.length === total ){
            return;
        }

        setLoagind(true);

        const response = await api.get('incidents', {params: {page}});

        setIncidents([...incidents,...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoagind(false);
    }
    
    useEffect(() => {
        loadIncidents();
    },[]);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>
            <Text style={styles.title}>Bem-vindo !</Text>
            <Text style={styles.description }> Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList 
                data={incidents}
                style={styles.incidentsList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({item: incident}) =>(
                    <View style={styles.incidets}>
                    <Text style={styles.incidentPropery}>Ong: </Text>
                    <Text style={styles.incidentValue}>{incident.nome}</Text>

                    <Text style={styles.incidentPropery}>Descrição: </Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentPropery}>Valor </Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(incident.value)}</Text>

                    <TouchableOpacity 
                        style={styles.detailButton} 
                        onPress={() => NavigateToDetail(incident)}
                    >
                        <Text style={styles.detailButtonText}> Ver mais detalhes </Text>
                        <Feather name="arrow-right" size={16} color={'#E02041'} />

                    </TouchableOpacity>
                </View>

                )}
            />
        </View>

    );
}
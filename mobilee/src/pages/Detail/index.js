import React from 'react';
import {View, TouchableOpacity, Image, Text, Linking} from 'react-native'; // Linking para mandar mensagem pro whats
import {Feather} from "@expo/vector-icons";
import logo from '../../assets/logo.png';
import { useNavigation, useRoute } from "@react-navigation/native";
import * as MailComposer from "expo-mail-composer"; // import para mandar email

import styles from './style'

export default function Detail(){
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const message = `Olá ${incident.nome} estou entrando em contato, pois gostaria de ajudar no caso: "${incident.title}", com o valor de "${Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(incident.value)}"`;

    function navigationBack(){
        navigation.goBack()
    }

    function sandEmail(){
        MailComposer.composeAsync({
            subject: `Héroi do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message
        })
    }

    function sandWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=55${incident.whatsapp}&text=${message}`)
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} />
                <TouchableOpacity onPress={navigationBack}>
                    <Feather name="arrow-left" size={28} color='#E82041' />
                </TouchableOpacity>
            </View>

            <View style={styles.incidents}>
                <View style={styles.incidets}>
                <Text style={styles.incidentPropery,{marginTop: 0}}>Ong: </Text>
                    <Text style={styles.incidentValue}>{incident.nome} de {incident.city}/{incident.uf}</Text>

                    <Text style={styles.incidentPropery}>Descrição: </Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentPropery}>Valor </Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(incident.value)}</Text>


                </View>
            </View>

            <View style={styles.contactBox}>
                <Text Style={styles.heroTitle}>Salve o dia </Text>
                <Text Style={styles.heroTitle}>Seja o héroi desse caso!</Text>

                <Text style={styles.heroDescription}>Entre em contato</Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sandWhatsapp}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sandEmail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
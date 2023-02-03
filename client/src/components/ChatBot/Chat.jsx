import { useState } from 'react';
import ChatBot from 'react-simple-chatbot'
import Style from './ChatCss.module.css'


function Chat() {

    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            <div className={Style.container}>

                <button onClick={() => setIsVisible(!isVisible)}
                    className={Style.btn}>Chatbot</button>

                <div className={isVisible ? '' : Style.hide}>
                    <ChatBot className={Style.chatContainer}
                        steps={[
                            {
                                id: 'intro',
                                message: 'Hola, soy ChatBot. Cual es tu nombre?',
                                trigger: 'pregunta-nombre',
                            },
                            {
                                id: 'pregunta-nombre',
                                user: true,
                                trigger: 'respuesta-nombre',
                            },
                            {
                                id: 'respuesta-nombre',
                                message: 'Hola {previousValue}, un gusto conocerte, ¿en que puedo ayudarte?',
                                trigger: 'opciones',
                            },
                            {
                                id: 'opciones',
                                options: [
                                    { value: 'l', label: 'Libros', trigger: 'libro' },
                                    { value: 'c', label: 'Comprar', trigger: 'compra' },
                                ]
                            },
                            {
                                id: 'libro',
                                message: 'Seguro, en Henry Books tememos una gran cantidad de libros de calidad',
                                trigger: 'genero',
                            },
                            {
                                id: 'genero',
                                message: 'Te recomendamos nuestros libros de "Terror", ¿te interesa esta recomendación?',
                                trigger: 'opciones2',
                            },
                            {
                                id: 'opciones2',
                                options: [
                                    { value: 's', label: 'Si', trigger: 'si' },
                                    { value: 'n', label: 'NO', trigger: 'no' },
                                ]
                            },
                            {
                                id: 'si',
                                message: 'Perfecto, puedes filtrar por genero y seleccionar "Terror" y elegir el que mas te guste ',
                                trigger: 'gracias',
                            },
                            {
                                id: 'gracias',
                                message: '¿necesitás algo más?',
                                trigger: 'repetir',
                            },
                            {
                                id: 'repetir',
                                options: [
                                    { value: 's', label: 'Si', trigger: 'opciones' },
                                    { value: 'n', label: 'No', trigger: 'noA' },
                                ]
                            },
                            {
                                id: 'noA',
                                message: 'gracias por elegir Henry Books, que tengas bune día',
                                end: true,
                            }, {
                                id: 'no',
                                message: 'Entonces puedes ver nuestro catalogo de Libros Romanticos',
                                trigger: 'preguntaR'
                            },
                            {
                                id: 'preguntaR',
                                message: '¿te interesa esta recomendación?',
                                trigger: 'opciones3'
                            },
                            {
                                id: 'opciones3',
                                options: [
                                    { value: 's', label: 'Si', trigger: 'si2' },
                                    { value: 'n', label: 'NO', trigger: 'no2' },
                                ]
                            },
                            {
                                id: 'si2',
                                message: 'Perfecto, puedes filtrar por genero y seleccionar "Romanticos" y elegir el que mas te guste ',
                                trigger: 'gracias'
                            },
                            {
                                id: 'no2',
                                message: 'Entonces sientete libre de explorar nuestro gran catalogo de libros y elegir el que mas te guste',
                                trigger: 'gracias'
                            },
                            {
                                id: 'no',
                                message: 'Entonces puedes ver nuestro catalogo de Libros Romanticos',
                                trigger: 'opciones3'
                            },

                            {
                                id: 'compra',
                                message: 'Nuestros sistema de Compras es muy seguro y confiable',
                                trigger: 'compra2',
                            },
                            {
                                id: 'compra2',
                                message: 'Solamente elige el libro que más te guste, añadelo al carrito y dale a comprar',
                                trigger: 'compra3',
                            },
                            {
                                id: 'compra3',
                                message: 'Para mas informacion, visita preguntas frecuentes (FAQs) ',
                                trigger: 'gracias',
                            },
                        ]} />
                </div>

            </div>
        </>
    )
}

export default Chat
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
                    <ChatBot
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
                                message: 'Hola {previousValue}, un gusto conocerte',
                                trigger: 'opciones',
                            },
                            {
                                id: 'opciones',
                                message: '¿En qué puedo ayudarte hoy?',
                                trigger: 'opciones-ayuda',

                            },
                            {
                                id: 'opciones-ayuda',
                                options: [
                                    { value: 'libros', label: 'Libros', trigger: 'libros' },
                                    { value: 'compra', label: 'Compra', trigger: 'compra' },
                                ],
                            },
                            {
                                id: 'libros',
                                message: '¿Qué tipo de libros estás buscando?',
                                end: true,
                            },
                            {
                                id: 'compra',
                                message: '¿Qué deseas comprar hoy?',
                                end: true,
                            },
                        ]} />
                </div>

            </div>
        </>
    )
}

export default Chat
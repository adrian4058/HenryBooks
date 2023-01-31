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
                                message: 'Hola {previousValue}, un gusto conocerte',
                                end: true,
                            },
                        ]} />
                </div>

            </div>
        </>
    )
}

export default Chat
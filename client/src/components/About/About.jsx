import Style from './About.module.css'
import { members } from './members'


function About() {
    return (
        <>
            <div className={Style.container}>
                <div className={Style.titleContainer}>
                    <h1 className={Style.title}>About us</h1>
                </div>

                <div className={Style.info}>

                    <h2 className={Style.text}>At Henry Books we specialize in selling books online.<br />
                        Looking for a good experience for the user when buying.<br />
                        We have many books, both classic and modern and a wide variety of genres and authors.<br />
                    </h2>

                    <h3 className={Style.title2}>Now meet the people who made this possible. </h3>

                    <p>Hello, we are students of the Full Stack Developers career, and in this web page we seek to demonstrate all our knowledge </p>

                    <p> more information in our links to Linkedin and GitHub.</p>



                </div>

                <div className={Style.membersContainer}>
                    {members.map((data) => {
                        return (
                            <div className={Style.data}>
                                <div className={Style.nameContainer}>
                                    <h5 className={Style.name}>{data.name}</h5>
                                </div>

                                <div className={Style.linksContainer}>

                                    <a href={data.linkedin}
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        <ion-icon name='logo-linkedin' />
                                    </a>

                                    <a href={data.github}
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        <ion-icon name='logo-github' />
                                    </a>
                                </div>
                            </div>

                        )

                    })}

                </div>


            </div>

        </>
    )
}

export default About
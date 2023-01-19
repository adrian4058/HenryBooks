import Footer from '../Footer/Footer'
import Style from './About.module.css'

function About() {
    return (
        <>
            <div className={Style.container}>
                <div className={Style.titleContainer}>
                    <h1 className={Style.title}>¿About us?</h1>
                </div>

                <div className={Style.info}>

                    <h3 className={Style.text}>At Henry Books we specialize in selling books online.<br />
                        Looking for a good experience for the user when buying.<br />
                        We have many books, both classic and modern and a wide variety of genres and authors.<br />
                    </h3>


                </div>

            </div>

            <Footer />
        </>
    )
}

export default About
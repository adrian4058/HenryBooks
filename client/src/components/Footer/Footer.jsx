import Style from './Footer.module.css'
import { Link } from 'react-router-dom'


function Footer() {
    return (
        <>
            <div className={Style.mainContainer}>
                <div className={Style.footerContainer}>
                    <div className={Style.contactContainer}>
                        <h4>Contact</h4>

                        <p>+54 911 4946-8036 </p>
                        <p>henrybooks.info@gmail.com</p>
                    </div>

                    <div className={Style.socialLinks}>

                        <h4>Follow</h4>

                        <a href='https://www.facebook.com'
                            target='_blank'
                            rel='noreferrer'>

                            <ion-icon name='logo-facebook' /> Facebook
                        </a>
                        <br />

                        <a href='https://www.instagram.com/henrybooks_pf/'
                            target='_blank'
                            rel='noreferrer'>

                            <ion-icon name='logo-instagram' /> Instagram
                        </a>

                        <br />

                        <a href='https://twitter.com/HenryBooks_PF'
                            target='_blank'
                            rel='noreferrer'>

                            <ion-icon name='logo-twitter' /> Twitter
                        </a>
                    </div>

                    <div className={Style.navegation}  >
                        <h4>Navigation</h4>

                        <Link to='/home'>
                            <p className={Style.navegationText}>Home</p>
                        </Link>

                        <Link to='#'>
                            <p className={Style.navegationText}>Products</p>
                        </Link>

                        <Link to='/assistant'>
                            <p className={Style.navegationText}>FAQs</p>
                        </Link>

                        <Link to='/about-us'>
                            <p className={Style.navegationText}>About us</p>
                        </Link>


                    </div>
                </div>

                <p>Ⓒ Henry Books | All Rights Reserved 2023 </p>
            </div>
        </>
    )
}

export default Footer
import {APP_NAME} from "../contanst/app-constants.ts";
import {Link} from "react-router-dom";

function LandingPage() {
    return (
        <>
            <div className="navbar bg-app-200">
                <div className="navbar-start text-app-100">
                    <a className="ml-4 font-medium text-xl text-white">{APP_NAME}</a>
                </div>
                <div className="navbar-end mr-3">
                    <Link to={'/signIn'}><button className="btn bg-app-600 border-0 rounded-3xl hover:bg-app-300 text-white">Sign in</button></Link>
                </div>
            </div>
            <div className={'relative'}>
                <img src={"./images/wallpaperflare 1.png"} className={"w-full"}/>

                <img src={ (window.matchMedia('(prefers-color-scheme: dark)').matches)?"./images/svg/wave1.svg" :"./images/svg/wave.svg"  }

                     className={'w-full fill-current text-white absolute bottom-0 left-0'}/>
            </div>
            <div className={'grid grid-cols-1 md:grid-cols-10 gap-5 m-4 p-4'}>
                <div className={"md:col-span-6 flex flex-col items-center justify-center"}>
                    <h1 className={'font-bold my-2 text-app-200 text-4xl'}>Encuentra Tu Pasión, Equípate en Field
                        Sport</h1>
                    <p className={'text-justify max-w-prose my-5'}>
                        En Field Sport, creemos que cada paso, cada movimiento y cada logro en el deporte son una
                        celebración de la pasión y el esfuerzo que pones en ello. Tu rendimiento merece lo mejor, y
                        es por eso que te ofrecemos una selección cuidadosamente curada de los productos deportivos más
                        avanzados. Desde equipos de alta calidad hasta la última moda en ropa deportiva, estamos
                        aquí para apoyarte en tu búsqueda de la grandeza. No importa si eres un atleta profesional o un
                        entusiasta ocasional, cada día es una oportunidad para superarte a ti mismo. Así que
                        adelante, elige el equipo que te ayudará a llegar más lejos, romper tus propios récords y vivir
                        tu
                        pasión al máximo. ¿Estás listo para el próximo nivel? ¡Descúbrelo en FieldSport y comienza a
                        vivir
                        la experiencia deportiva definitiva!
                    </p>
                    <Link to={'/register'}>
                        <button
                            className="btn rounded-3xl mt-4 font-bold bg-app-200 border-0 text-white hover:bg-app-300">Registrarse
                        </button>
                    </Link>
                    <Link to={'/sport-commerce/home'}>
                        <button
                            className="btn rounded-3xl mt-4 font-bold bg-app-100 border-0 text-white hover:bg-app-300">Ver últimas ofertas
                        </button>
                    </Link>
                </div>
                <div className={"md:col-span-4 flex flex-col items-center justify-center"}>
                    <img src={'../images/svg/sport-commerce.svg'}/>
                </div>
            </div>
            <div className={'bg-app-100'}>
                <div className={'grid grid-cols-1 md:grid-cols-8 gap-5 text-white m-3 p-3'}>
                    <div className={'md:col-span-2'}>
                        <h1 className={'font-bold'}>Información General</h1>
                        <ul className={'list-disc'}>
                            <li className={'ml-5'}>Productos generales</li>
                            <li className={'ml-5'}>Ofertas</li>
                            <li className={'ml-5'}>Conviertete en socio</li>
                            <li className={'ml-5'}>¿Eres una marca?</li>
                            <li className={'ml-5'}>Nosotros</li>
                            <li className={'ml-5'}>Misión y Visión</li>
                            <li className={'ml-5'}>Huella ecológica</li>
                        </ul>
                    </div>
                    <div className={'md:col-span-2'}>
                        <h1 className={'font-bold'}>Redes sociales</h1>
                        <ul className={'list-disc'}>
                            <li className={'ml-5'}>Facebook</li>
                            <li className={'ml-5'}>Instagram</li>
                            <li className={'ml-5'}>TikTok</li>
                            <li className={'ml-5'}>Behance</li>
                        </ul>
                    </div>
                    <div className={'md:col-span-2'}>
                        <h1 className={'font-bold'}>Información legal</h1>
                        <ul className={'list-disc'}>
                            <li className={'ml-5'}>Protección de datos</li>
                            <li className={'ml-5'}>Cookies</li>
                            <li className={'ml-5'}>Autorización de datos</li>
                            <li className={'ml-5'}>Tratamiento de datos</li>
                        </ul>
                    </div>

                </div>
            </div>
        </>
    );
}

export default LandingPage;
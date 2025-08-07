import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColorSchemeContext } from '../../Context/ColorSchemeProvider';
import tec from '../../assets/wedding.jpg'
import ai from '../../assets/nature.jpg'
import ios from '../../assets/rome.jpg'
import robotic from '../../assets/egypt.jpg'
import mac from '../../assets/ema.jpg'
import web from '../../assets/0dubai1.jpg'
import phone from '../../assets/phone.png'
import phoneWhite from '../../assets/phone-white.png'
import tiktok from '../../assets/tiktok.png'
import tiktokWhite from '../../assets/tiktok-white.png'
import instagram from '../../assets/instagram.png'
import instagramWhite from '../../assets/instagram-white.png'
import whatsapp from '../../assets/whatsapp.png'
import whatsappWhite from '../../assets/whatsapp-white.png'
import london2 from '../../assets/london2.jpg'

import egypt1 from '../../assets/egypt1.jpg'
import egypt2 from '../../assets/egypt2.jpg'
import egypt3 from '../../assets/egypt3.jpg'
import icon1 from '../../assets/icon1.png'
import icon2 from '../../assets/icon2.png'
import icon3 from '../../assets/icon3.png'
import icon4 from '../../assets/icon4.png'
import icon1White from '../../assets/icon1-white.png'
import icon2White from '../../assets/icon2-white.png'
import icon3White from '../../assets/icon3-white.png'
import icon4White from '../../assets/icon4-white.png'

import './App.css'

const Body = () => {

    const colorScheme = useContext(ColorSchemeContext);
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [showPortfolioModal, setShowPortfolioModal] = useState(false);

    // Sample images for videography/photography - you can replace these with your actual images
    const carouselImages = [
        tec, // Keep the original image for now
        ai,  // Using existing images as placeholders
        ios,
        robotic,
        mac,
        web
    ];

    // Portfolio preview items (first 6 items)
    const portfolioPreview = [
        { id: 1, src: ai, alt: "Portfolio 1", type: "image" },
        { id: 2, src: ios, alt: "Portfolio 2", type: "image" },
        { id: 3, src: london2, alt: "Portfolio 3", type: "image" },
        { id: 4, src: mac, alt: "Portfolio 4", type: "image" },
        { id: 5, src: web, alt: "Portfolio 5", type: "image" },
        { id: 6, src: egypt1, alt: "Portfolio 6", type: "image" },
        { id: 7, src: egypt2, alt: "Portfolio 6", type: "image" },
        { id: 8, src: egypt3, alt: "Portfolio 6", type: "image" },

    ];

    // Auto-advance carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [carouselImages.length]);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
        );
    };

    const goToImage = (index) => {
        setCurrentImageIndex(index);
    };

    const openMediaModal = (media) => {
        setSelectedMedia(media);
        setShowPortfolioModal(true);
    };

    const closeMediaModal = () => {
        setShowPortfolioModal(false);
        setSelectedMedia(null);
    };

    const goToPortfolio = () => {
        console.log('Navigating to portfolio...');
        navigate('/portfolio');
    };

    const getIcon = (iconLight, iconDark) => {
        return colorScheme === 'dark' ? iconDark : iconLight;
    };
    
  

    return (
        <div className={`body ${colorScheme}`}>
            <div className='top'>
                <div className="carousel-container">
                    <div className="carousel">
                        <img 
                            className='cover-picture carousel-image' 
                            src={carouselImages[currentImageIndex]} 
                            alt={`Slide ${currentImageIndex + 1}`}
                        />
                        <button className="carousel-button carousel-button-prev" onClick={prevImage}>
                            &#8249;
                        </button>
                        <button className="carousel-button carousel-button-next" onClick={nextImage}>
                            &#8250;
                        </button>
                        <div className="carousel-indicators">
                            {carouselImages.map((_, index) => (
                                <button
                                    key={index}
                                    className={`carousel-indicator ${index === currentImageIndex ? 'active' : ''}`}
                                    onClick={() => goToImage(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={`title ${colorScheme}`}>
                    <h1>Unematic Visuals</h1>
                    <h2 className='title-h2'>Videography & Photography</h2>
                    <p>
                    Unematic Visuals es una empresa de videografía y fotografía que se dedica a crear contenido para empresas, negocios, instituciones, organizaciones y para todo el que quiera innovar su proyecto
                    </p>
                </div>
            </div>
            <div id="us" className='subtitle us-subtitle'>
                <h2 >Contáctanos</h2>
                {/* <p>
                    Somos una empresa joven con talento 100% mexicano dedicada a dar mantenimiento a
                    elevadores de personal y carga. Contamos con amplia experiencia en elevadores de todas las marcas. 
                </p> */}
                <div className='us-container'>
                    <a href="tel:7851070156">
                        <img src={getIcon(phone, phoneWhite)} alt="telefono" className='us-container_icon'></img>
                            7851070156
                    </a>
                    <a href="https://wa.me/7851070156?text=Deseo saber más información sobre video y fotografía.">
                        <img src={getIcon(whatsapp, whatsappWhite)} alt="whatsapp" className='us-container_icon'></img>
                        7851070156
                    </a>
                    <a href="https://www.tiktok.com/@david.jaub?_t=ZS-8yWguoo3NWk&_r=1">
                        <img src={getIcon(tiktok, tiktokWhite)} alt="tiktok" className='us-container_icon'></img>
                        @david.unematic
                    </a>
                    <a href="https://www.tiktok.com/@david.jaub?_t=ZS-8yWguoo3NWk&_r=1">
                        <img src={getIcon(instagram, instagramWhite)} alt="instagram" className='us-container_icon'></img>
                        @david.unematic
                    </a>
                </div>
            </div>

            {/* Portfolio Preview Section */}
            <div id='portfolio' className='subtitle portfolio-subtitle'>
                <div className={`portfolio ${colorScheme}`}>
                    <h2>Portfolio</h2>
                    <div className="portfolio-grid">
                        {portfolioPreview.map((item) => (
                            <div 
                                key={item.id} 
                                className="portfolio-item"
                                onClick={() => openMediaModal(item)}
                            >
                                <img src={item.src} alt={item.alt} />
                                <div className="portfolio-overlay">
                                    <span className="portfolio-icon">👁️</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="portfolio-load-more">
                        <button 
                            className="load-more-btn"
                            onClick={goToPortfolio}
                        >
                            Ver más trabajos<br />↓
                        </button>
                    </div>
                </div>
            </div>

            <div id='services' className='subtitle services-subtitle'>
                <div className={`services ${colorScheme}`}>
                    <h2>Servicios</h2>
                    <div className={`body-text ${colorScheme} imgs`}>
                        {/* <ol className='imgs'> */}
                            <div>
                                <li className='turismo'>Turismo & naturaleza</li>
                                <p>Para aquellos amantes de la naturaleza y el turismo, agentes de turismo, nos encargamos de capturar los momentos más especiales de cada aventura</p>
                                <img src={ai} alt="ia" />
                            </div>
                            <div> 
                                <li className='turismo'>Marketing</li>
                                <p>Haz que tu hotel, restaurante, tienda o cualquier emprendimiento se destaque en el mercado con nuestras fotografías y videos</p>
                                <img src={web} alt="web" />
                            </div>
                            <div>
                                <li className='turismo'>Bodas</li>
                                <p>Que no solo sea fotografía, sino también videos así como si fueras parte de una pelicula cinematografica en la que se recuerde cada detalle de tu boda</p>
                                <img src={ios} alt="ios y android" />
                            </div>
                            <div>
                                <li className='turismo'>Sesiones</li>
                                <p>Para aquellos que quieren tener una sesión de fotos o videos, destacamos la belleza de cada persona con fotografía y video en modo retrato</p>
                                <img src={mac} alt="Mac, Linux y Windows" />
                            </div>
                        {/* </ol> */}
                    </div>
                </div>
            </div>
            <div id='whyUs' className='subtitle why-us'>
                <div className="last-title">
                    <h2>Por qué elegirnos</h2>
                    <p>La creatividad y la calidad es la prioridad de Lightframe Films. Contamos con equipo de videocámara  cinematográfica con estabilización, cámara profesional, cámara para debajo de agua y drone para capturar desde todos los ángulos. Editamos para todas las redes sociales.</p>
                </div>
                <div className="why-us_icons">
                    <img src={getIcon(icon1, icon1White)} className="last-img" alt="servicio 1" />
                    <img src={getIcon(icon2, icon2White)} className="last-img" alt="servicio 2" />
                    <img src={getIcon(icon3, icon3White)} className="last-img" alt="servicio 3" />
                    <img src={getIcon(icon4, icon4White)} className="last-img" alt="servicio 4" />
                </div>


            </div>

            {/* Portfolio Modal */}
            {showPortfolioModal && selectedMedia && (
                <div className="portfolio-modal-overlay" onClick={closeMediaModal}>
                    <div className="portfolio-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="portfolio-modal-close" onClick={closeMediaModal}>
                            ✕
                        </button>
                        {selectedMedia.type === 'image' ? (
                            <img src={selectedMedia.src} alt={selectedMedia.alt} />
                        ) : (
                            <video controls>
                                <source src={selectedMedia.src} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
export default Body;
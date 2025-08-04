import { useContext, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { ColorSchemeContext } from '../../Context/ColorSchemeProvider';
import swiss from '../../assets/nature.jpg'
import zermatt from '../../assets/zermatt.jpg'
import forest from '../../assets/forest.jpg'
import dubai1 from '../../assets/dubai1.jpg'
import dubai22 from '../../assets/ema.jpg'
import egyptGirl from '../../assets/egypt-girl.jpg'
import egypt1 from '../../assets/egypt1.jpg'
import egypt2 from '../../assets/egypt2.jpg'
import egypt3 from '../../assets/egypt3.jpg'
import london1 from '../../assets/london1.jpg'
import france1 from '../../assets/france1.jpg'
import london2 from '../../assets/london2.jpg'
import './styles.css'

// TikTok embed help


const Portfolio = () => {
    const colorScheme = useContext(ColorSchemeContext);
    const navigate = useNavigate();
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [showModal, setShowModal] = useState(false);
    // const [displayedItems, setDisplayedItems] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    // Simulated portfolio data - replace with your actual images/videos
    const allPortfolioItems = [
        { id: 1, src: swiss, alt: "Portfolio 1", type: "image" },
        { id: 2, src: zermatt, alt: "Portfolio 2", type: "image" },
        { id: 3, src: forest, alt: "Portfolio 3", type: "image" },
        // { id: 4, src: italy, alt: "Portfolio 4", type: "video" },
        // { id: 5, src: rome, alt: "Portfolio 5", type: "video" },
        // { id: 6, src: maldives, alt: "Portfolio 6", type: "video" },
        { id: 7, src: dubai1, alt: "Portfolio 7", type: "image" },
        { id: 8, src: dubai22, alt: "Portfolio 8", type: "image" },
        { id: 9, src: egyptGirl, alt: "Portfolio 9", type: "image" },
        { id: 10, src: egypt1, alt: "Portfolio 10", type: "image" },
        { id: 11, src: egypt2, alt: "Portfolio 11", type: "image" },
        { id: 12, src: egypt3, alt: "Portfolio 12", type: "image" },
        { id: 13, src: london1, alt: "Portfolio 13", type: "image" },
        { id: 14, src: france1, alt: "Portfolio 14", type: "image" },
        { id: 15, src: london2, alt: "Portfolio 15", type: "image" },
        // Add more items as needed
    ];

    const [displayedItems] = useState(allPortfolioItems);

    // useEffect(() => {
    //     loadMoreItems();
    // }, []);

    // const loadMoreItems = () => {
    //     const startIndex = (currentPage - 1) * itemsPerPage;
    //     const endIndex = startIndex + itemsPerPage;
    //     const newItems = allPortfolioItems.slice(startIndex, endIndex);
        
    //     setDisplayedItems(prev => [...prev, ...newItems]);
    //     setCurrentPage(prev => prev + 1);
    // };

    const openMediaModal = (media) => {
        setSelectedMedia(media);
        setShowModal(true);
    };

    const closeMediaModal = () => {
        setShowModal(false);
        setSelectedMedia(null);
    };

    const goBackHome = () => {
        navigate('/');
    };

    // const handleScroll = () => {
    //     if (
    //         window.innerHeight + document.documentElement.scrollTop
    //         === document.documentElement.offsetHeight
    //     ) {
    //         loadMoreItems();
    //     }
    // };

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, [displayedItems]);


    

    return (
        <div className={`portfolio-page ${colorScheme}`}>
            <div className="portfolio-header">
                <button className="back-home-btn" onClick={goBackHome}>
                    ← Volver al inicio
                </button>
                <h1>Portfolio Completo</h1>
                <p>Explora nuestra colección completa de trabajos de fotografía y videografía</p>
            </div>

            {/* <div className="portfolio-grid-full">
                {displayedItems.map((item) => (
                    <div 
                        key={item.id} 
                        className="portfolio-item-full"
                        onClick={() => openMediaModal(item)}
                    >
                        <img src={item.src} alt={item.alt} />
                        <div className="portfolio-overlay-full">
                            <span className="portfolio-icon-full">👁️</span>
                        </div>
                    </div>
                ))}
            </div> */}

<div className="portfolio-grid-full">
  {displayedItems.map(item => (
    <div
      key={item.id}
      className="portfolio-item-full"
      onClick={() => openMediaModal(item)}
    >
      {item.type === 'image' ? (
        <img src={item.src} alt={item.alt} />
      ) : (
        // show a muted, auto-play looping thumbnail in the grid
        <video
          src={item.src}
          muted
          loop
          playsInline
          controlsList="nodownload"
          className="portfolio-video-thumb"
        />
      )}
      <div className="portfolio-overlay-full">
        <span className="portfolio-icon-full">👁️</span>
      </div>
    </div>
  ))}
</div>


            {displayedItems.length < allPortfolioItems.length && (
                <div className="loading-indicator">
                    <div className="spinner"></div>
                    <p>Cargando más trabajos...</p>
                </div>
            )}

            {/* Portfolio Modal */}
            {showModal && selectedMedia && (
                <div className="portfolio-modal-overlay-full" onClick={closeMediaModal}>
                    <div className="portfolio-modal-full" onClick={(e) => e.stopPropagation()}>
                        <button className="portfolio-modal-close-full" onClick={closeMediaModal}>
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
    );
};

export default Portfolio; 

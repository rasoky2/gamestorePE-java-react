import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Videojuego, getSpecialOffers, getBestSellers } from '../../services/videojuego.service';
import './Store.css';

const Store: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [bestSellers, setBestSellers] = useState<Videojuego[]>([]);
    const [specialOffers, setSpecialOffers] = useState<Videojuego[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [bestSellersData, offersData] = await Promise.all([
                    getBestSellers(),
                    getSpecialOffers()
                ]);

                setBestSellers(bestSellersData);
                setSpecialOffers(offersData);
            } catch (err) {
                setError('Error al cargar los juegos. Por favor, intenta de nuevo más tarde.');
                console.error('Error fetching games:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const calculateDiscountedPrice = (price: number, discount: number): number => {
        return price - (price * discount / 100);
    };

    if (loading) {
        return <div className="loading">Cargando juegos...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="store-container">
            <section>
                <h2>Más Comprados</h2>
                <div className="featured-section">
                    {bestSellers.map((game) => (
                        <Link to={`/game/${game.id}`} key={game.id} className="game-card">
                            <img src={game.imagenPrincipal} alt={game.titulo} />
                            <div className="game-info">
                                <h3>{game.titulo}</h3>
                                <div className="price-container">
                                    {game.descuento > 0 ? (
                                        <>
                                            <span className="original-price">${game.precio}</span>
                                            <span className="discount-badge">-{game.descuento}%</span>
                                            <span className="final-price">
                                                ${calculateDiscountedPrice(game.precio, game.descuento)}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="final-price">${game.precio}</span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section>
                <h2>Juegos en Descuento</h2>
                <div className="games-grid">
                    {specialOffers.map((game) => (
                        <Link to={`/game/${game.id}`} key={game.id} className="game-card">
                            <img src={game.imagenPrincipal} alt={game.titulo} />
                            <div className="game-info">
                                <h3>{game.titulo}</h3>
                                <div className="price-container">
                                    <span className="original-price">${game.precio}</span>
                                    <span className="discount-badge">-{game.descuento}%</span>
                                    <span className="final-price">
                                        ${calculateDiscountedPrice(game.precio, game.descuento)}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Store;

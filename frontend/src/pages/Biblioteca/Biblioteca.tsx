import { useState, useEffect } from 'react'
import { useUser } from '../../hooks/useUser'
import './Biblioteca.css'

interface GameLibrary {
  id: number
  title: string
  image: string
  lastPlayed: Date | null
  playTime: number
  isDownloaded: boolean
}

interface ApiGame {
  idVideojuego: number
  nombre: string
  imagen: string | null
  ultimaSesion: string | null
  tiempoJugado: number
  descargado: boolean
}

const Biblioteca = () => {
  const { user } = useUser()
  const [games, setGames] = useState<GameLibrary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all') // all, downloaded, not-downloaded

  useEffect(() => {
    const fetchUserLibrary = async () => {
      if (!user) return;
      
      try {
        const response = await fetch(`http://localhost:8081/api/biblioteca/${user.idUsuario}`)
        if (!response.ok) {
          throw new Error('Error al cargar la biblioteca')
        }
        const data = await response.json()
        setGames(data.map((game: ApiGame) => ({
          id: game.idVideojuego,
          title: game.nombre,
          image: game.imagen ?? '/placeholder-game.jpg',
          lastPlayed: game.ultimaSesion ? new Date(game.ultimaSesion) : null,
          playTime: game.tiempoJugado,
          isDownloaded: game.descargado
        })))
      } catch {
        setError('Error al cargar tu biblioteca de juegos')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserLibrary()
  }, [user])

  const formatPlayTime = (minutes: number): string => {
    if (minutes < 60) return `${minutes} minutos`
    const hours = Math.floor(minutes / 60)
    return `${hours} horas`
  }

  const formatLastPlayed = (date: Date | null): string => {
    if (!date) return 'Nunca jugado'
    return new Date(date).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleDownload = async (gameId: number) => {
    try {
      const response = await fetch(`http://localhost:8081/api/biblioteca/download/${gameId}`, {
        method: 'POST'
      })
      if (!response.ok) {
        throw new Error('Error al iniciar la descarga')
      }
      setGames(prevGames => 
        prevGames.map(game => 
          game.id === gameId ? { ...game, isDownloaded: true } : game
        )
      )
    } catch {
      setError('Error al iniciar la descarga')
    }
  }

  const handlePlay = async (gameId: number) => {
    try {
      const response = await fetch(`http://localhost:8081/api/biblioteca/play/${gameId}`, {
        method: 'POST'
      })
      if (!response.ok) {
        throw new Error('Error al iniciar el juego')
      }
      // Aquí podrías abrir el juego o mostrar instrucciones
    } catch {
      setError('Error al iniciar el juego')
    }
  }

  const filteredGames = games.filter(game => {
    if (filter === 'downloaded') return game.isDownloaded
    if (filter === 'not-downloaded') return !game.isDownloaded
    return true
  })

  if (isLoading) {
    return <div className="loading">Cargando tu biblioteca...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="biblioteca-container">
      <div className="biblioteca-header">
        <h1>BIBLIOTECA DE JUEGOS</h1>
        <div className="filter-buttons">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            Todos
          </button>
          <button
            className={filter === 'downloaded' ? 'active' : ''}
            onClick={() => setFilter('downloaded')}
          >
            Descargados
          </button>
          <button
            className={filter === 'not-downloaded' ? 'active' : ''}
            onClick={() => setFilter('not-downloaded')}
          >
            No descargados
          </button>
        </div>
      </div>

      <div className="games-list">
        {filteredGames.length === 0 ? (
          <div className="empty-library">
            <p>No hay juegos que mostrar</p>
          </div>
        ) : (
          filteredGames.map(game => (
            <div key={game.id} className="game-item">
              <img src={game.image} alt={game.title} className="game-image" />
              <div className="game-info">
                <h3>{game.title}</h3>
                <p className="last-played">
                  Último uso: {formatLastPlayed(game.lastPlayed)}
                </p>
                <p className="play-time">
                  Tiempo jugado: {formatPlayTime(game.playTime)}
                </p>
              </div>
              <div className="game-actions">
                {game.isDownloaded ? (
                  <button 
                    className="play-button"
                    onClick={() => handlePlay(game.id)}
                  >
                    Jugar
                  </button>
                ) : (
                  <button 
                    className="download-button"
                    onClick={() => handleDownload(game.id)}
                  >
                    Descargar
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Biblioteca

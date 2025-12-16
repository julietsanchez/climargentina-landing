import { useState, useEffect, useRef, useCallback } from 'react'

interface Slide {
  label: string
  title: string
  subtitle: string
  whatsappUrl: string
  imageUrl: string
}

const LandingClimargentina = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Estados del carrusel
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const prevSlideRef = useRef<number>(0)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Arrays de logos para carruseles
  const clientesLogos = [
    '/clientes/logo1.png',
    '/clientes/logo2.png',
    '/clientes/logo3.png',
    '/clientes/logo4.png',
    '/clientes/logo5.png',
    '/clientes/logo 5.png',
    '/clientes/logo6.png',
  ]

  const marcasLogos = [
    '/marcas/bgh.png',
    '/marcas/carrier.png',
    '/marcas/LG.png',
    '/marcas/midea.svg',
    '/marcas/phillips.png',
    '/marcas/samsung.png',
    '/marcas/surrey.png',
    '/marcas/trane.png',
    '/marcas/york.png',
  ]

  // Array de slides con URLs de imágenes de stock (libre uso)
  const slides: Slide[] = [
    {
      label: 'ESPECIALISTAS EN Climatización Industrial',
      title: 'Somos expertos en Climatización Industrial',
      subtitle: 'Soluciones industriales pensadas para eficiencia energética y continuidad operativa.',
      whatsappUrl: 'https://wa.me/541151160924?text=Hola!%20Quiero%20consultar%20por%20climatizaci%C3%B3n%20industrial.%20%C2%BFPodr%C3%ADan%20asesorarme%20con%20una%20soluci%C3%B3n%20HVAC%20para%20mi%20empresa%3F',
      imageUrl: '/images/hero.png'
    },
    {
      label: 'MANTENIMIENTO INDUSTRIAL PREVENTIVO Y CORRECTIVO',
      title: 'Mantenimiento industrial para empresas',
      subtitle: 'Planes preventivos y correctivos para evitar paradas y extender la vida útil del sistema.',
      whatsappUrl: 'https://wa.me/541151160924?text=Hola!%20Quiero%20consultar%20por%20mantenimiento%20preventivo%20y%20correctivo%20para%20empresa.%20%C2%BFTrabajan%20con%20contratos%20anuales%20o%20abonos%20mensuales%3F',
      imageUrl: '/images/slide2.png'
    },
    {
      label: 'VENTA DE EQUIPOS DE AIRE ACONDICIONADO',
      title: 'Venta de equipos de aire acondicionado',
      subtitle: 'Asesoramiento, provisión e instalación de equipos para industria y comercios, con selección según capacidad, consumo y necesidad del ambiente.',
      imageUrl: '/images/slide3.png',
      whatsappUrl: 'https://wa.me/541151160924?text=Hola!%20Quiero%20consultar%20por%20venta%20de%20equipos%20de%20aire%20acondicionado.%20%C2%BFMe%20pueden%20cotizar%20seg%C3%BAn%20la%20necesidad%20de%20mi%20espacio%3F'
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navegación del carrusel
  const nextSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setSlideDirection('next')
    setCurrentSlide((prev) => {
      prevSlideRef.current = prev
      const next = (prev + 1) % slides.length
      return next
    })
    setTimeout(() => setIsTransitioning(false), 600)
  }, [slides.length, isTransitioning])

  const prevSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setSlideDirection('prev')
    setCurrentSlide((prev) => {
      prevSlideRef.current = prev
      const prevIndex = (prev - 1 + slides.length) % slides.length
      return prevIndex
    })
    setTimeout(() => setIsTransitioning(false), 600)
  }, [slides.length, isTransitioning])

  const goToSlide = (index: number) => {
    if (index >= 0 && index < slides.length && !isTransitioning) {
      setIsTransitioning(true)
      prevSlideRef.current = currentSlide
      setSlideDirection(index > currentSlide ? 'next' : 'prev')
      setCurrentSlide(index)
      setTimeout(() => setIsTransitioning(false), 600)
    }
  }

  // Pausa y reanudación del autoplay al hover
  const pauseAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current)
      autoplayIntervalRef.current = null
    }
  }, [])

  const resumeAutoplay = useCallback(() => {
    if (!autoplayIntervalRef.current) {
      autoplayIntervalRef.current = setInterval(() => {
        nextSlide()
      }, 4000)
    }
  }, [nextSlide])

  // Lógica del carrusel - Autoplay infinito
  useEffect(() => {
    resumeAutoplay()
    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current)
      }
    }
  }, [resumeAutoplay])

  // Touch handlers para swipe en mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const distance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (distance > minSwipeDistance) {
      nextSlide()
    } else if (distance < -minSwipeDistance) {
      prevSlide()
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  // Manejo de CTAs
  const handleCTAClick = (whatsappUrl: string) => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  // Navegación por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide()
      } else if (e.key === 'ArrowRight') {
        nextSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prevSlide, nextSlide])

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-clima-white overflow-x-hidden">
      {/* Navbar Fija */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-clima-white transition-all duration-300 ${
        scrolled ? 'shadow-xl backdrop-blur-sm bg-clima-white/95' : 'shadow-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src="/logo-climargentina.svg"
                alt="Climargentina Logo"
                className="h-8 md:h-12 w-auto object-contain"
              />
            </div>

            {/* Menú Desktop */}
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => handleScrollTo('inicio')}
                className="text-clima-blue hover:text-clima-red transition-colors duration-200 font-medium uppercase"
              >
                Inicio
              </button>
              <button
                onClick={() => handleScrollTo('nosotros')}
                className="text-clima-blue hover:text-clima-red transition-colors duration-200 font-medium uppercase"
              >
                Nosotros
              </button>
              <button
                onClick={() => handleScrollTo('servicios')}
                className="text-clima-blue hover:text-clima-red transition-colors duration-200 font-medium uppercase"
              >
                Servicios
              </button>
              <button
                onClick={() => handleScrollTo('contacto')}
                className="text-clima-blue hover:text-clima-red transition-colors duration-200 font-medium uppercase"
              >
                Contacto
              </button>
            </div>

            {/* Botón Menú Móvil */}
            <button
              className="md:hidden text-clima-blue focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Menú Móvil Desplegable */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <button
                onClick={() => handleScrollTo('inicio')}
                className="block w-full text-left px-4 py-2 text-clima-blue hover:bg-gray-100 rounded transition-colors uppercase font-medium touch-manipulation"
              >
                Inicio
              </button>
              <button
                onClick={() => handleScrollTo('nosotros')}
                className="block w-full text-left px-4 py-2 text-clima-blue hover:bg-gray-100 rounded transition-colors uppercase font-medium touch-manipulation"
              >
                Nosotros
              </button>
              <button
                onClick={() => handleScrollTo('servicios')}
                className="block w-full text-left px-4 py-2 text-clima-blue hover:bg-gray-100 rounded transition-colors uppercase font-medium touch-manipulation"
              >
                Servicios
              </button>
              <button
                onClick={() => handleScrollTo('contacto')}
                className="block w-full text-left px-4 py-2 text-clima-blue hover:bg-gray-100 rounded transition-colors uppercase font-medium touch-manipulation"
              >
                Contacto
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Carrusel */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-clima-blue via-clima-blue/90 to-clima-blue/80 pt-20"
        role="region"
        aria-label="Carrusel de servicios de Climatización Industrial"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={pauseAutoplay}
        onMouseLeave={resumeAutoplay}
      >
        {/* Contenedor del carrusel */}
        <div className="relative w-full h-full">
          {/* Slides */}
          <div className="relative w-full h-screen overflow-hidden">
            {slides.map((slide, index) => {
              const isActive = index === currentSlide
              const isPreviousSlide = index === prevSlideRef.current && !isActive
              
              // Determinar la clase de animación según el estado y dirección
              let animationClass = 'slide-inactive'
              if (isActive) {
                animationClass = slideDirection === 'next' ? 'slide-enter-right' : 'slide-enter-left'
              } else if (isPreviousSlide && isTransitioning) {
                animationClass = slideDirection === 'next' ? 'slide-exit-left' : 'slide-exit-right'
              }
              
              return (
              <div
                key={index}
                className={`absolute inset-0 ${animationClass}`}
                style={{ 
                  zIndex: isActive ? 10 : isPreviousSlide && isTransitioning ? 5 : index,
                  pointerEvents: isActive ? 'auto' : 'none'
                }}
              >
                {/* Imagen de fondo */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"%3E%3Crect fill="%231c457f" width="1920" height="1080"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="24" fill="%23ffffff" text-anchor="middle" dominant-baseline="middle"%3E${encodeURIComponent(slide.title)}%3C/text%3E%3C/svg%3E`
                    }}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                  {/* Overlay oscuro/azulado para legibilidad */}
                  <div className="absolute inset-0 bg-gradient-to-r from-clima-blue/80 via-clima-blue/70 to-clima-blue/60"></div>
                </div>

                {/* Contenido del slide */}
                {index === currentSlide && (
                  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center text-center w-full">
                      <div className="space-y-3 md:space-y-6 max-w-4xl animate-fade-in-up px-2 md:px-0">
                        {/* Título */}
                        <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-clima-white leading-tight md:leading-normal drop-shadow-2xl">
                          {index === 0 ? (
                            <>
                              Somos expertos en{' '}
                              <span className="px-2 md:px-4 py-1 md:py-2 gradient-shimmer text-clima-white rounded-lg inline-block text-2xl sm:text-4xl md:text-6xl lg:text-7xl">
                                Climatización Industrial
                              </span>
                            </>
                          ) : index === 1 ? (
                            <>
                              Mantenimiento industrial para{' '}
                              <span className="px-2 md:px-4 py-1 md:py-2 gradient-shimmer text-clima-white rounded-lg inline-block text-2xl sm:text-4xl md:text-6xl lg:text-7xl">
                                Empresas
                              </span>
                            </>
                          ) : (
                            <>
                              Venta de equipos de{' '}
                              <span className="px-2 md:px-4 py-1 md:py-2 gradient-shimmer text-clima-white rounded-lg inline-block text-2xl sm:text-4xl md:text-6xl lg:text-7xl">
                                Aire Acondicionado
                              </span>
                            </>
                          )}
                        </h1>

                        {/* Subtítulo */}
                        <p className="text-sm md:text-xl lg:text-2xl text-clima-white/95 leading-relaxed max-w-3xl mx-auto drop-shadow-lg px-2 md:px-4">
                          {slide.subtitle}
                        </p>

                        {/* CTA */}
                        <div className="pt-2 md:pt-4 flex justify-center items-center px-2 md:px-4">
                          <button
                            onClick={() => handleCTAClick(slide.whatsappUrl)}
                            className="flex items-center justify-center gap-2 px-6 md:px-10 py-2.5 md:py-4 gradient-shimmer text-clima-white font-bold text-sm md:text-lg rounded-xl shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-clima-red focus:ring-offset-2 w-full max-w-xs md:max-w-none md:w-auto"
                            aria-label="Consultar por WhatsApp"
                          >
                            <svg
                              className="w-5 h-5 md:w-6 md:h-6"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                            Consultar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              )
            })}
          </div>

          {/* Flechas de navegación */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-clima-white/20 backdrop-blur-md hover:bg-clima-white/30 text-clima-white p-2.5 md:p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-clima-white focus:ring-offset-2 touch-manipulation"
            aria-label="Slide anterior"
          >
            <svg
              className="w-5 h-5 md:w-8 md:h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-clima-white/20 backdrop-blur-md hover:bg-clima-white/30 text-clima-white p-2.5 md:p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-clima-white focus:ring-offset-2 touch-manipulation"
            aria-label="Slide siguiente"
          >
            <svg
              className="w-5 h-5 md:w-8 md:h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots de navegación */}
          <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 md:gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-4 focus:ring-clima-white focus:ring-offset-2 touch-manipulation ${
                  index === currentSlide
                    ? 'w-6 md:w-10 h-2.5 md:h-4 bg-clima-white'
                    : 'w-2.5 md:w-4 h-2.5 md:h-4 bg-clima-white/50 hover:bg-clima-white/75'
                }`}
                aria-label={`Ir al slide ${index + 1}`}
                aria-current={index === currentSlide ? 'true' : 'false'}
              />
            ))}
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-12 md:bottom-24 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-clima-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Carruseles de Clientes y Marcas */}
      <section className="py-12 md:py-16 bg-clima-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Carrusel de Clientes */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-base md:text-xl font-medium uppercase tracking-wider text-clima-blue text-center mb-6 md:mb-8">
              Nuestros clientes
            </h2>
            <div className="relative w-full overflow-hidden">
              <div className="flex carousel-infinite-left">
                {/* Duplicar el contenido para efecto infinito */}
                {[...clientesLogos, ...clientesLogos].map((logo, index) => (
                  <div
                    key={`clientes-${index}`}
                    className="flex-shrink-0 px-4 md:px-8 flex items-center justify-center"
                    style={{ width: '150px', minWidth: '150px' }}
                  >
                    <img
                      src={logo}
                      alt={`Cliente ${index + 1}`}
                      className="h-10 md:h-16 w-auto object-contain max-w-full"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Carrusel de Marcas */}
          <div>
            <h2 className="text-base md:text-xl font-medium uppercase tracking-wider text-clima-blue text-center mb-6 md:mb-8">
              Marcas con las que trabajamos
            </h2>
            <div className="relative w-full overflow-hidden">
              <div className="flex carousel-infinite-right">
                {/* Duplicar el contenido para efecto infinito */}
                {[...marcasLogos, ...marcasLogos].map((logo, index) => (
                  <div
                    key={`marcas-${index}`}
                    className="flex-shrink-0 px-4 md:px-8 flex items-center justify-center"
                    style={{ width: '150px', minWidth: '150px' }}
                  >
                    <img
                      src={logo}
                      alt={`Marca ${index + 1}`}
                      className="h-10 md:h-16 w-auto object-contain max-w-full"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nosotros Section */}
      <section
        id="nosotros"
        className="py-12 md:py-20 bg-gradient-to-br from-clima-blue/5 via-clima-white to-clima-blue/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-clima-blue mb-3 md:mb-4">
              Nosotros
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2 md:px-0">
              Especialistas en climatización industrial.
            </p>
          </div>

          {/* Contenido principal */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Card de texto */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-12 hover-lift animate-fade-in-up">
              <div className="space-y-4 md:space-y-6">
                <p className="text-gray-700 leading-relaxed text-base md:text-xl text-center">
                  En <span className="font-bold text-clima-blue">Climargentina</span> nos especializamos en soluciones de climatización industrial para empresas y espacios productivos. Acompañamos a nuestros clientes con experiencia, asesoramiento técnico y respuestas eficientes.
                </p>
                <p className="text-gray-700 leading-relaxed text-base md:text-xl text-center">
                  Nuestro equipo de técnicos capacitados trabaja con equipamiento de última generación para garantizar diagnósticos precisos, instalaciones seguras y mantenimientos efectivos. Nos comprometemos con un servicio de calidad y resultados confiables.
                </p>
              </div>
            </div>

            {/* Imagen */}
            <div className="bg-white rounded-xl shadow-lg p-3 md:p-6 hover-lift animate-fade-in-up overflow-hidden">
              <div className="relative w-full h-full min-h-[250px] md:min-h-[400px] rounded-lg overflow-hidden">
                <img
                  src="/images/industrial.jpg"
                  alt="Climatización Industrial"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect fill="%23dbeafe" width="600" height="400"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="16" fill="%231c457f" text-anchor="middle" dominant-baseline="middle"%3EClimatizaci%C3%B3n Industrial%3C/text%3E%3C/svg%3E'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section
        id="servicios"
        className="py-12 md:py-20 bg-clima-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-clima-blue mb-3 md:mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2 md:px-0">
              Soluciones completas. 
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Servicio 1 */}
            <div className="bg-white rounded-xl shadow-lg hover-lift overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
              <div className="relative h-40 md:h-48 bg-gradient-to-br from-clima-blue/20 to-clima-blue/5 overflow-hidden">
                <img
                  src="/images/servicio1.avif"
                  alt="Climatización Industrial"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23dbeafe" width="400" height="200"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="16" fill="%231c457f" text-anchor="middle" dominant-baseline="middle"%3EClimatizaci%C3%B3n Industrial%3C/text%3E%3C/svg%3E'
                  }}
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-clima-blue mb-2 md:mb-3">
                  Climatización Industrial
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Soluciones industriales pensadas para eficiencia energética y continuidad operativa.
                  Especialistas en sistemas HVAC para empresas y espacios industriales.
                </p>
              </div>
            </div>

            {/* Servicio 2 */}
            <div className="bg-white rounded-xl shadow-lg hover-lift overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
              <div className="relative h-40 md:h-48 bg-gradient-to-br from-clima-blue/20 to-clima-blue/5 overflow-hidden">
                <img
                  src="/images/servicio2.jpg"
                  alt="Mantenimiento Industrial"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23dbeafe" width="400" height="200"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="16" fill="%231c457f" text-anchor="middle" dominant-baseline="middle"%3EMantenimiento Industrial%3C/text%3E%3C/svg%3E'
                  }}
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-clima-blue mb-2 md:mb-3">
                  Mantenimiento industrial preventivo y correctivo
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Planes preventivos y correctivos para evitar paradas y extender la vida útil del sistema.
                  Mantenimiento profesional para empresas con contratos anuales o abonos mensuales.
                </p>
              </div>
            </div>

            {/* Servicio 3 */}
            <div className="bg-white rounded-xl shadow-lg hover-lift overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <div className="relative h-40 md:h-48 bg-gradient-to-br from-clima-blue/20 to-clima-blue/5 overflow-hidden">
                <img
                  src="/images/servicio3.webp"
                  alt="Venta de Equipos"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23dbeafe" width="400" height="200"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="16" fill="%231c457f" text-anchor="middle" dominant-baseline="middle"%3EVenta de Equipos%3C/text%3E%3C/svg%3E'
                  }}
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-clima-blue mb-2 md:mb-3">
                  Venta de equipos industriales y comerciales
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Asesoramiento, provisión e instalación de equipos para industria y comercios,
                  con selección según capacidad, consumo y necesidad del ambiente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto Section */}
      <section
        id="contacto"
        className="py-12 md:py-20 bg-clima-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-clima-blue mb-3 md:mb-4">
              Contacto
            </h2>
            <p className="text-base md:text-lg text-gray-600 px-2 md:px-0">
              Elegí la forma que prefieras para comunicarte con nosotros
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Tarjetas de Contacto */}
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {/* Tarjeta WhatsApp */}
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                <div className="p-6 md:p-8 flex flex-col items-center text-center flex-grow">
                  <div className="bg-[#25D366] rounded-full p-4 md:p-5 mb-4 md:mb-6">
                    <svg
                      className="w-8 h-8 md:w-10 md:h-10 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-clima-blue mb-2 md:mb-3">WhatsApp</h3>
                  <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">+54 11 5116-0924</p>
                  <a
                    href="https://wa.me/541151160924?text=Hola!%20Quiero%20consultar%20por%20sus%20servicios."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold py-3 md:py-3.5 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 mt-auto"
                  >
                    Enviar WhatsApp
                  </a>
                </div>
              </div>

              {/* Tarjeta Email */}
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                <div className="p-6 md:p-8 flex flex-col items-center text-center flex-grow">
                  <div className="bg-clima-blue rounded-full p-4 md:p-5 mb-4 md:mb-6">
                    <svg
                      className="w-8 h-8 md:w-10 md:h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-clima-blue mb-2 md:mb-3">Email</h3>
                  <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6 break-all">contacto@climargentina.com.ar</p>
                  <a
                    href="mailto:contacto@climargentina.com.ar?subject=Consulta%20-%20Climargentina"
                    className="w-full bg-clima-blue hover:bg-clima-blue/90 text-white font-semibold py-3 md:py-3.5 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 mt-auto"
                  >
                    Enviar Email
                  </a>
                </div>
              </div>

              {/* Tarjeta Ubicación */}
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                <div className="p-6 md:p-8 flex flex-col items-center text-center flex-grow">
                  <div className="bg-gray-100 rounded-full p-3 md:p-4 mb-4 md:mb-6 flex items-center justify-center w-16 h-16 md:w-20 md:h-20">
                    <img
                      src="/images/argentina.svg.webp"
                      alt="Argentina"
                      className="w-full h-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-clima-blue mb-2 md:mb-3">Ubicación</h3>
                  <p className="text-gray-600 text-sm md:text-base">Buenos Aires, Argentina</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-clima-blue text-clima-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Climargentina</h3>
              <p className="text-sm md:text-base text-clima-white/80">
                Climatización industrial de confianza.
              </p>
            </div>
            <div>
              <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Enlaces rápidos</h4>
              <ul className="space-y-1.5 md:space-y-2">
                <li>
                  <button
                    onClick={() => handleScrollTo('inicio')}
                    className="text-clima-white/80 hover:text-clima-white transition-colors"
                  >
                    Inicio
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleScrollTo('servicios')}
                    className="text-clima-white/80 hover:text-clima-white transition-colors"
                  >
                    Servicios
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleScrollTo('nosotros')}
                    className="text-clima-white/80 hover:text-clima-white transition-colors"
                  >
                    Nosotros
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleScrollTo('contacto')}
                    className="text-clima-white/80 hover:text-clima-white transition-colors"
                  >
                    Contacto
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Seguinos</h4>
              <div className="flex space-x-3 md:space-x-4">
                <a
                  href="#"
                  className="text-clima-white/80 hover:text-clima-white transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-clima-white/80 hover:text-clima-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-clima-white/80 hover:text-clima-white transition-colors"
                  aria-label="WhatsApp"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-clima-white/20 pt-6 md:pt-8 text-center text-clima-white/80">
            <p className="text-xs md:text-sm px-2">
              &copy; {new Date().getFullYear()} Climargentina. Todos los derechos reservados. - Creado por:{' '}
              <a
                href="https://www.excalicode.com.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-clima-white hover:text-clima-red transition-colors underline"
              >
                Excalicode
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Botón flotante de WhatsApp */}
      <a
        href="https://wa.me/541151160924"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-3 md:p-4 shadow-2xl hover:shadow-[#25D366]/50 transition-all duration-300 transform hover:scale-110 touch-manipulation"
        aria-label="Contactar por WhatsApp"
        title="Contactar por WhatsApp"
      >
        <svg
          className="w-5 h-5 md:w-6 md:h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  )
}

export default LandingClimargentina


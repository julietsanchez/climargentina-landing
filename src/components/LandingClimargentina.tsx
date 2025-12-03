import { useState, useEffect } from 'react'

const LandingClimargentina = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    servicio: '',
    mensaje: '',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMenuOpen(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica de envío al backend
    console.log('Formulario enviado:', formData)
    setFormSubmitted(true)
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      servicio: '',
      mensaje: '',
    })
    setTimeout(() => setFormSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen bg-clima-white overflow-x-hidden">
      {/* Navbar Fija */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-clima-white transition-all duration-300 ${
        scrolled ? 'shadow-xl backdrop-blur-sm bg-clima-white/95' : 'shadow-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src="/logo-climargentina.svg"
                alt="Climargentina Logo"
                className="h-12 w-auto object-contain"
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
                className="block w-full text-left px-4 py-2 text-clima-blue hover:bg-gray-100 rounded transition-colors uppercase font-medium"
              >
                Inicio
              </button>
              <button
                onClick={() => handleScrollTo('nosotros')}
                className="block w-full text-left px-4 py-2 text-clima-blue hover:bg-gray-100 rounded transition-colors uppercase font-medium"
              >
                Nosotros
              </button>
              <button
                onClick={() => handleScrollTo('servicios')}
                className="block w-full text-left px-4 py-2 text-clima-blue hover:bg-gray-100 rounded transition-colors uppercase font-medium"
              >
                Servicios
              </button>
              <button
                onClick={() => handleScrollTo('contacto')}
                className="block w-full text-left px-4 py-2 text-clima-blue hover:bg-gray-100 rounded transition-colors uppercase font-medium"
              >
                Contacto
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-clima-blue via-clima-blue/90 to-clima-blue/80 pt-20"
      >
        {/* Imagen de fondo con overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero.png"
            alt="Aire acondicionado automotriz"
            className="w-full h-full object-cover animate-fade-in"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"%3E%3Crect fill="%231c457f" width="1920" height="1080"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="24" fill="%23ffffff" text-anchor="middle" dominant-baseline="middle"%3EAire Acondicionado Automotriz%3C/text%3E%3C/svg%3E'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-clima-blue/70 via-clima-blue/60 to-clima-blue/50"></div>
          {/* Efecto de ondas de refrigeración */}
          <div className="refrigeration-waves"></div>
        </div>

        {/* Partículas de frío decorativas */}
        <div className="cold-particles absolute inset-0 z-5 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="cold-particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${10 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        {/* Contenido del Hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="space-y-6 sm:space-y-8 max-w-4xl">
              <div className="space-y-6 animate-fade-in-up">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-clima-white leading-tight drop-shadow-2xl">
                  Climatización automotriz e industrial de confianza
                </h1>
                <p className="text-xl md:text-2xl text-clima-white/95 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
                  Especialistas en aire acondicionado automotriz, sistemas industriales y lubricentro.
                  Soluciones integrales con técnicos certificados y equipamiento de última generación.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
                <button
                  onClick={() => handleScrollTo('contacto')}
                  className="px-10 py-4 gradient-shimmer text-clima-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-clima-red focus:ring-offset-2"
                >
                  Solicitar turno
                </button>
                <button
                  onClick={() => handleScrollTo('servicios')}
                  className="px-10 py-4 bg-clima-white/10 backdrop-blur-md border-2 border-clima-white/80 text-clima-white font-bold text-lg rounded-xl hover:bg-clima-white hover:text-clima-blue transition-all duration-300 transform hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-clima-white focus:ring-offset-2"
                >
                  Ver servicios
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <svg
            className="w-6 h-6 text-clima-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
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

      {/* Nosotros Section */}
      <section
        id="nosotros"
        className="py-20 bg-gradient-to-br from-clima-blue/5 via-clima-white to-clima-blue/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-clima-blue mb-4">
              Nosotros
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Conoce más sobre nuestra empresa y nuestro compromiso con la excelencia
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Texto sobre la empresa */}
            <div className="space-y-6 animate-slide-in-left">
              <h3 className="text-2xl font-bold text-clima-blue">
                Especialistas en climatización desde hace años
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                En Climargentina nos especializamos en brindar soluciones integrales de climatización
                automotriz e industrial, así como servicios de lubricentro. Con años de experiencia
                en el mercado, nos hemos consolidado como referentes en el sector.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                Nuestro equipo de técnicos altamente capacitados y certificados trabaja con
                equipamiento de última generación para garantizar diagnósticos precisos y
                reparaciones eficientes. Nos comprometemos a brindar un servicio de calidad
                que supere las expectativas de nuestros clientes.
              </p>
            </div>

            {/* Imagen o valores */}
            <div className="relative animate-slide-in-right">
              <div className="bg-white rounded-xl shadow-lg p-8 hover-lift">
                <h4 className="text-xl font-bold text-clima-blue mb-6">Nuestros Valores</h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-clima-red/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-clima-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-clima-blue mb-1">Calidad</h5>
                      <p className="text-gray-600">Trabajamos con los más altos estándares de calidad en cada servicio.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-clima-red/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-clima-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-clima-blue mb-1">Puntualidad</h5>
                      <p className="text-gray-600">Respetamos los tiempos acordados y valoramos el tiempo de nuestros clientes.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-clima-red/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-clima-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-clima-blue mb-1">Compromiso</h5>
                      <p className="text-gray-600">Nos comprometemos con la satisfacción total de cada cliente.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Diferenciales */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md hover-lift text-center animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
              <div className="w-16 h-16 bg-clima-red/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-clima-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-clima-blue mb-2">Técnicos Especializados</h3>
              <p className="text-gray-600">
                Profesionales certificados con años de experiencia en climatización y mecánica automotriz.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover-lift text-center animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
              <div className="w-16 h-16 bg-clima-red/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-clima-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-clima-blue mb-2">Equipamiento Moderno</h3>
              <p className="text-gray-600">
                Tecnología de última generación para diagnósticos precisos y reparaciones eficientes.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover-lift text-center animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <div className="w-16 h-16 bg-clima-red/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-clima-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-clima-blue mb-2">Atención Rápida</h3>
              <p className="text-gray-600">
                Servicio ágil sin comprometer la calidad. Agendamos tu turno en el menor tiempo posible.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover-lift text-center animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
              <div className="w-16 h-16 bg-clima-red/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-clima-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-clima-blue mb-2">Servicio Integral</h3>
              <p className="text-gray-600">
                Climatización y lubricentro en un solo lugar. Soluciones completas para tu vehículo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section
        id="servicios"
        className="py-20 bg-clima-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-clima-blue mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Soluciones completas para climatización y mantenimiento automotriz e industrial
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Servicio 1 */}
            <div className="bg-white rounded-xl shadow-lg hover-lift overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
              <div className="relative h-48 bg-gradient-to-br from-clima-blue/20 to-clima-blue/5 overflow-hidden">
                <img
                  src="/images/servicio-automotriz.jpg"
                  alt="Aire acondicionado automotriz"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23dbeafe" width="400" height="200"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="16" fill="%231c457f" text-anchor="middle" dominant-baseline="middle"%3EAire Acondicionado Automotriz%3C/text%3E%3C/svg%3E'
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-clima-blue mb-3">
                  Aire Acondicionado Automotriz
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Diagnóstico, reparación y mantenimiento de sistemas de climatización para
                  vehículos. Recarga de gas, limpieza de conductos y reparación de compresores.
                </p>
              </div>
            </div>

            {/* Servicio 2 */}
            <div className="bg-white rounded-xl shadow-lg hover-lift overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
              <div className="relative h-48 bg-gradient-to-br from-clima-blue/20 to-clima-blue/5 overflow-hidden">
                <img
                  src="/images/servicio-industrial.jpg"
                  alt="Aire acondicionado industrial"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23dbeafe" width="400" height="200"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="16" fill="%231c457f" text-anchor="middle" dominant-baseline="middle"%3EAire Acondicionado Industrial%3C/text%3E%3C/svg%3E'
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-clima-blue mb-3">
                  Aire Acondicionado Industrial
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Instalación y mantenimiento de sistemas de climatización para empresas,
                  oficinas y espacios industriales. Soluciones eficientes y personalizadas.
                </p>
              </div>
            </div>

            {/* Servicio 3 */}
            <div className="bg-white rounded-xl shadow-lg hover-lift overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <div className="relative h-48 bg-gradient-to-br from-clima-blue/20 to-clima-blue/5 overflow-hidden">
                <img
                  src="/images/servicio-lubricentro.jpg"
                  alt="Lubricentro"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23dbeafe" width="400" height="200"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="16" fill="%231c457f" text-anchor="middle" dominant-baseline="middle"%3ELubricentro%3C/text%3E%3C/svg%3E'
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-clima-blue mb-3">
                  Lubricentro
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Cambio de aceite, filtros y fluidos. Servicio rápido y profesional para
                  mantener el motor de tu vehículo en perfecto estado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto Section */}
      <section
        id="contacto"
        className="py-20 bg-clima-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-clima-blue mb-4">
              Agendá tu turno o pedí tu presupuesto
            </h2>
            <p className="text-lg text-gray-600">
              Completá el formulario y nos pondremos en contacto contigo a la brevedad
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Formulario */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              {formSubmitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  ¡Gracias! Tu mensaje fue enviado correctamente. Nos pondremos en contacto pronto.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-clima-blue focus:border-transparent outline-none transition-all text-gray-700 placeholder-gray-400"
                    placeholder="Juan Pérez"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-clima-blue focus:border-transparent outline-none transition-all text-gray-700 placeholder-gray-400"
                    placeholder="juan@ejemplo.com"
                  />
                </div>

                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-clima-blue focus:border-transparent outline-none transition-all text-gray-700 placeholder-gray-400"
                    placeholder="11 1234-5678"
                  />
                </div>

                <div>
                  <label htmlFor="servicio" className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de servicio
                  </label>
                  <select
                    id="servicio"
                    name="servicio"
                    value={formData.servicio}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-clima-blue focus:border-transparent outline-none transition-all bg-white text-gray-700"
                  >
                    <option value="">Seleccionar servicio</option>
                    <option value="automotriz">Aire acondicionado automotriz</option>
                    <option value="industrial">Aire acondicionado industrial</option>
                    <option value="lubricentro">Lubricentro</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-clima-blue focus:border-transparent outline-none transition-all resize-none text-gray-700 placeholder-gray-400"
                    placeholder="Contanos en qué podemos ayudarte..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-3 bg-clima-red text-clima-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-clima-red focus:ring-offset-2"
                >
                  Enviar consulta
                </button>
              </form>
            </div>

            {/* Información de Contacto */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-clima-blue/10 to-clima-blue/5 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-clima-blue mb-6">
                  Información de contacto
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg
                      className="w-6 h-6 text-clima-red mr-3 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <p className="font-semibold text-clima-blue">Ubicación</p>
                      <p className="text-gray-700">Argentina</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg
                      className="w-6 h-6 text-clima-red mr-3 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <div>
                      <p className="font-semibold text-clima-blue">Teléfono</p>
                      <p className="text-gray-700">+54 11 XXX-XXXX</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg
                      className="w-6 h-6 text-clima-red mr-3 mt-1 flex-shrink-0"
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
                    <div>
                      <p className="font-semibold text-clima-blue">Email</p>
                      <p className="text-gray-700">contacto@climargentina.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg
                      className="w-6 h-6 text-clima-red mr-3 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <p className="font-semibold text-clima-blue">Horarios</p>
                      <p className="text-gray-700">Lunes a Viernes: 8:00 - 18:00</p>
                      <p className="text-gray-700">Sábados: 8:00 - 13:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-clima-blue text-clima-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Climargentina</h3>
              <p className="text-clima-white/80">
                Climatización automotriz e industrial de confianza.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces rápidos</h4>
              <ul className="space-y-2">
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
              <h4 className="text-lg font-semibold mb-4">Seguinos</h4>
              <div className="flex space-x-4">
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
          <div className="border-t border-clima-white/20 pt-8 text-center text-clima-white/80">
            <p>&copy; {new Date().getFullYear()} Climargentina. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingClimargentina


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Code, Zap, Smartphone, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Home = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language].home;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const carouselImages = [
    {
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmR8ZW58MHx8fHwxNzY2MDIwNTM3fDA&ixlib=rb-4.1.0&q=85',
      title: t.whyUs.card1.title,
      description: t.whyUs.card1.description
    },
    {
      url: 'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxkYXNoYm9hcmR8ZW58MHx8fHwxNzY2MDIwNTM3fDA&ixlib=rb-4.1.0&q=85',
      title: t.whyUs.card2.title,
      description: t.whyUs.card2.description
    },
    {
      url: 'https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg',
      title: t.whyUs.card3.title,
      description: t.whyUs.card3.description
    },
    {
      url: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHw0fHxpbnRlcmFjdGl2ZXxlbnwwfHx8fDE3NjYwMjA1NDJ8MA&ixlib=rb-4.1.0&q=85',
      title: t.whyUs.card4.title,
      description: t.whyUs.card4.description
    }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Content */}
        <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent animate-fade-in">
            {t.hero.title}
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-cyan-400 mb-6 font-semibold">
            {t.hero.subtitle}
          </p>
          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
            {t.hero.description}
          </p>
          <Button
            onClick={() => navigate('/contact')}
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-8 py-6 text-lg font-semibold shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all duration-300 transform hover:scale-105"
          >
            {t.hero.cta}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-cyan-400 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
              {t.whyUs.title}
            </h2>
            <p className="text-xl text-gray-400">{t.whyUs.subtitle}</p>
          </div>

          {/* Carousel */}
          <div className="relative mb-16">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              {carouselImages.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 transform ${
                    index === currentSlide
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-105'
                  }`}
                >
                  <img
                    src={slide.url}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end">
                    <div className="p-8 sm:p-12">
                      <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-white">{slide.title}</h3>
                      <p className="text-lg text-gray-200 max-w-2xl">{slide.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-3">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide
                      ? 'w-12 h-3 bg-cyan-400'
                      : 'w-3 h-3 bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Code, title: t.whyUs.card1.title, desc: t.whyUs.card1.description },
              { icon: Zap, title: t.whyUs.card2.title, desc: t.whyUs.card2.description },
              { icon: Smartphone, title: t.whyUs.card3.title, desc: t.whyUs.card3.description },
              { icon: Award, title: t.whyUs.card4.title, desc: t.whyUs.card4.description }
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-900 border-gray-800 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105 group"
              >
                <CardContent className="p-6">
                  <feature.icon className="w-12 h-12 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;


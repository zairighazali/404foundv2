import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { Card, CardContent } from '../components/ui/card';

const About = () => {
  const { language } = useLanguage();
  const t = translations[language].about;
  const [isVisible, setIsVisible] = useState(false);

  const teamMembers = [
    {
      name: t.team.members[0].name,
      role: t.team.members[0].role,
      image: '/team/zairi.JPG'
    },
    {
      name: t.team.members[1].name,
      role: t.team.members[1].role,
      image: '/team/ein.JPG'
    },
    {
      name: t.team.members[2].name,
      role: t.team.members[2].role,
      image: '/team/tommy.JPG'
    }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            {t.title}
          </h1>
        </div>

        {/* Description Section */}
        <div className={`mb-20 transition-all duration-1000 delay-200 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
            <CardContent className="p-8 sm:p-12">
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                {t.description}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <div className={`transition-all duration-1000 delay-300 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            {t.team.title}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="bg-gray-900 border-gray-800 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105 group overflow-hidden"
              >
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6 inline-block">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-40 h-40 rounded-full object-cover object-top border-4 border-gray-800 group-hover:border-cyan-400 transition-all duration-300 relative z-10 mx-auto"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-cyan-400 font-medium">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

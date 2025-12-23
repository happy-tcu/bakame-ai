// 3D Geometric shapes component for hero section
const HeroGeometry = () => {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
      {/* Large triangle - back */}
      <div 
        className="absolute right-20 top-1/4 w-[280px] h-[280px]"
        style={{
          background: 'linear-gradient(135deg, rgba(200, 180, 220, 0.6) 0%, rgba(180, 220, 240, 0.4) 100%)',
          clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
          transform: 'rotate(-15deg)',
          filter: 'blur(0.5px)',
        }}
      />
      
      {/* Medium triangle - middle */}
      <div 
        className="absolute right-32 top-[35%] w-[200px] h-[200px]"
        style={{
          background: 'linear-gradient(135deg, rgba(220, 200, 240, 0.7) 0%, rgba(200, 230, 250, 0.5) 100%)',
          clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
          transform: 'rotate(-15deg)',
          filter: 'blur(0.3px)',
        }}
      />
      
      {/* Small triangle - front */}
      <div 
        className="absolute right-44 top-[45%] w-[140px] h-[140px]"
        style={{
          background: 'linear-gradient(135deg, rgba(240, 220, 250, 0.8) 0%, rgba(220, 240, 255, 0.6) 100%)',
          clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
          transform: 'rotate(-15deg)',
        }}
      />
      
      {/* Subtle glow effect */}
      <div 
        className="absolute right-24 top-1/3 w-[300px] h-[300px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(200, 180, 240, 0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
    </div>
  );
};

export default HeroGeometry;

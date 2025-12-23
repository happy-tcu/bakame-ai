// 3D Geometric shapes component for hero section - Scale AI style
const HeroGeometry = () => {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none">
      {/* Large purple/magenta triangle - back left */}
      <div 
        className="absolute right-[180px] top-[15%] w-[320px] h-[320px]"
        style={{
          background: 'linear-gradient(180deg, #8B5CF6 0%, #A855F7 40%, #C084FC 100%)',
          clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
          transform: 'rotate(-5deg)',
          boxShadow: '0 20px 60px rgba(139, 92, 246, 0.4)',
        }}
      />
      
      {/* Blue/cyan triangle - middle */}
      <div 
        className="absolute right-[80px] top-[25%] w-[280px] h-[280px]"
        style={{
          background: 'linear-gradient(180deg, #06B6D4 0%, #22D3EE 40%, #67E8F9 100%)',
          clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
          transform: 'rotate(10deg)',
          boxShadow: '0 20px 60px rgba(6, 182, 212, 0.4)',
        }}
      />
      
      {/* Pink/rose triangle - front right */}
      <div 
        className="absolute right-[20px] top-[35%] w-[240px] h-[240px]"
        style={{
          background: 'linear-gradient(180deg, #EC4899 0%, #F472B6 40%, #FBCFE8 100%)',
          clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
          transform: 'rotate(-15deg)',
          boxShadow: '0 20px 60px rgba(236, 72, 153, 0.4)',
        }}
      />

      {/* Small accent triangle - top */}
      <div 
        className="absolute right-[250px] top-[5%] w-[100px] h-[100px]"
        style={{
          background: 'linear-gradient(180deg, #F59E0B 0%, #FBBF24 100%)',
          clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
          transform: 'rotate(20deg)',
          boxShadow: '0 10px 40px rgba(245, 158, 11, 0.3)',
        }}
      />
      
      {/* Ambient glow effects */}
      <div 
        className="absolute right-[100px] top-[20%] w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />
      <div 
        className="absolute right-[50px] top-[40%] w-[300px] h-[300px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
};

export default HeroGeometry;

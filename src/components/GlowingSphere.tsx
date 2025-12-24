// Animated glowing sphere with speaking/warping effect
const GlowingSphere = () => {
  return (
    <div className="relative w-[400px] h-[400px] flex items-center justify-center">
      {/* Main sphere with warping animation */}
      <div 
        className="absolute w-[280px] h-[280px] rounded-full animate-sphere-warp"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #60A5FA 0%, #3B82F6 30%, #1D4ED8 60%, #1E3A8A 100%)',
          boxShadow: `
            0 0 60px rgba(59, 130, 246, 0.6),
            0 0 120px rgba(59, 130, 246, 0.4),
            0 0 180px rgba(59, 130, 246, 0.2),
            inset 0 0 60px rgba(255, 255, 255, 0.1)
          `,
        }}
      />
      
      {/* Inner glow pulse */}
      <div 
        className="absolute w-[200px] h-[200px] rounded-full animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, rgba(147, 197, 253, 0.8) 0%, rgba(59, 130, 246, 0.4) 40%, transparent 70%)',
        }}
      />
      
      {/* Outer glow rings */}
      <div 
        className="absolute w-[350px] h-[350px] rounded-full animate-ring-pulse"
        style={{
          border: '2px solid rgba(59, 130, 246, 0.3)',
          boxShadow: '0 0 40px rgba(59, 130, 246, 0.2)',
        }}
      />
      <div 
        className="absolute w-[420px] h-[420px] rounded-full animate-ring-pulse-delayed"
        style={{
          border: '1px solid rgba(59, 130, 246, 0.2)',
          boxShadow: '0 0 30px rgba(59, 130, 246, 0.1)',
        }}
      />
      
      {/* Ambient background glow */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
      />
    </div>
  );
};

export default GlowingSphere;
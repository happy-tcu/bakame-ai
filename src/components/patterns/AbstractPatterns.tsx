import { useEffect, useRef } from "react";

// Hero Pattern 1 - Flowing Hexagons (replaces Gamepad2)
export const FlowingHexagons = ({ className = "", size = 40 }: { className?: string; size?: number }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <defs>
        <linearGradient id="hex-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <g className="animate-spin-slow">
        <polygon
          points="50,10 85,30 85,70 50,90 15,70 15,30"
          fill="url(#hex-gradient-1)"
          className="animate-pulse"
        />
        <polygon
          points="50,25 70,35 70,65 50,75 30,65 30,35"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="2"
          className="animate-morph"
        />
      </g>
    </svg>
  );
};

// Hero Pattern 2 - Rippling Circles (replaces Target)
export const RipplingCircles = ({ className = "", size = 40 }: { className?: string; size?: number }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <defs>
        <radialGradient id="circle-gradient-1">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.3" />
        </radialGradient>
      </defs>
      <g className="animate-ripple">
        <circle cx="50" cy="50" r="35" fill="none" stroke="url(#circle-gradient-1)" strokeWidth="2" />
        <circle cx="50" cy="50" r="25" fill="none" stroke="url(#circle-gradient-1)" strokeWidth="3" opacity="0.7" />
        <circle cx="50" cy="50" r="15" fill="url(#circle-gradient-1)" opacity="0.5" />
      </g>
    </svg>
  );
};

// Hero Pattern 3 - Ascending Triangles (replaces Trophy)
export const AscendingTriangles = ({ className = "", size = 40 }: { className?: string; size?: number }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <defs>
        <linearGradient id="tri-gradient-1" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <g className="animate-float">
        <polygon points="50,20 70,60 30,60" fill="url(#tri-gradient-1)" />
        <polygon points="50,40 65,70 35,70" fill="url(#tri-gradient-1)" opacity="0.7" />
        <polygon points="50,55 60,75 40,75" fill="url(#tri-gradient-1)" opacity="0.5" />
      </g>
    </svg>
  );
};

// Hero Pattern 4 - Starburst (replaces Star)
export const Starburst = ({ className = "", size = 40 }: { className?: string; size?: number }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <defs>
        <radialGradient id="star-gradient-1">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
        </radialGradient>
      </defs>
      <g className="animate-pulse-glow">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <rect
            key={angle}
            x="48"
            y="25"
            width="4"
            height="25"
            fill="url(#star-gradient-1)"
            transform={`rotate(${angle} 50 50)`}
            opacity={0.8 - (angle / 360) * 0.3}
          />
        ))}
        <circle cx="50" cy="50" r="10" fill="#fbbf24" />
      </g>
    </svg>
  );
};

// Hero Pattern 5 - Dynamic Wave (replaces Rocket)
export const DynamicWave = ({ className = "", size = 40 }: { className?: string; size?: number }) => {
  const pathRef = useRef<SVGPathElement>(null);
  
  useEffect(() => {
    let frame = 0;
    const animate = () => {
      if (pathRef.current) {
        const offset = Math.sin(frame * 0.05) * 10;
        const d = `M10,50 Q30,${40 + offset} 50,50 T90,50`;
        pathRef.current.setAttribute('d', d);
      }
      frame++;
      requestAnimationFrame(animate);
    };
    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <defs>
        <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        d="M10,50 Q30,40 50,50 T90,50"
        fill="none"
        stroke="url(#wave-gradient-1)"
        strokeWidth="3"
      />
      <circle cx="50" cy="50" r="5" fill="#6366f1" className="animate-pulse" />
    </svg>
  );
};

// Feature Pattern - Language Games
export const PlayfulPolygons = ({ className = "", size = 60 }: { className?: string; size?: number }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <defs>
        <linearGradient id="poly-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <g className="animate-rotate-slow">
        <polygon points="25,25 75,25 75,75 25,75" fill="url(#poly-gradient)" opacity="0.6" />
        <polygon points="35,20 80,35 65,80 20,65" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.8" />
        <polygon points="50,35 65,50 50,65 35,50" fill="#06b6d4" opacity="0.7" className="animate-pulse" />
      </g>
    </svg>
  );
};

// Feature Pattern - Peer Circles  
export const ConnectingOrbs = ({ className = "", size = 60 }: { className?: string; size?: number }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <defs>
        <radialGradient id="orb-gradient">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.3" />
        </radialGradient>
      </defs>
      <g>
        <line x1="30" y1="30" x2="70" y2="30" stroke="#8b5cf6" strokeWidth="1" opacity="0.4" className="animate-pulse" />
        <line x1="70" y1="30" x2="50" y2="70" stroke="#8b5cf6" strokeWidth="1" opacity="0.4" className="animate-pulse" />
        <line x1="50" y1="70" x2="30" y2="30" stroke="#8b5cf6" strokeWidth="1" opacity="0.4" className="animate-pulse" />
        
        <circle cx="30" cy="30" r="12" fill="url(#orb-gradient)" className="animate-float" />
        <circle cx="70" cy="30" r="10" fill="url(#orb-gradient)" className="animate-float-delayed" />
        <circle cx="50" cy="70" r="14" fill="url(#orb-gradient)" className="animate-float" />
      </g>
    </svg>
  );
};

// Feature Pattern - Achievements
export const BuildingBlocks = ({ className = "", size = 60 }: { className?: string; size?: number }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <defs>
        <linearGradient id="blocks-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <g className="animate-build">
        <rect x="30" y="70" width="40" height="10" fill="url(#blocks-gradient)" />
        <rect x="35" y="55" width="30" height="10" fill="url(#blocks-gradient)" opacity="0.85" />
        <rect x="40" y="40" width="20" height="10" fill="url(#blocks-gradient)" opacity="0.7" />
        <polygon points="50,25 60,35 40,35" fill="#fbbf24" className="animate-pulse" />
      </g>
    </svg>
  );
};

// Achievement Pattern Components
export const AchievementPattern = ({ 
  unlocked = false, 
  seed = 1,
  className = "",
  size = 40 
}: { 
  unlocked?: boolean;
  seed?: number;
  className?: string;
  size?: number;
}) => {
  const colors = unlocked 
    ? ['#10b981', '#34d399', '#6ee7b7'] 
    : ['#4b5563', '#6b7280', '#9ca3af'];
  
  const shapes = [
    // Pattern 1: Spiral
    <g key="spiral">
      <path
        d={`M50,50 Q${30 + seed * 5},30 ${20 + seed * 3},50 T50,50`}
        fill="none"
        stroke={colors[0]}
        strokeWidth="2"
        opacity={unlocked ? 0.9 : 0.3}
      />
      <circle cx="50" cy="50" r={8 + seed * 2} fill={colors[1]} opacity={unlocked ? 0.8 : 0.2} />
    </g>,
    // Pattern 2: Grid
    <g key="grid">
      {[20, 35, 50, 65].map((pos, i) => (
        <rect
          key={i}
          x={pos}
          y={pos}
          width="12"
          height="12"
          fill={colors[i % 3]}
          opacity={unlocked ? 0.7 - i * 0.1 : 0.2}
          transform={`rotate(${seed * 15} 50 50)`}
        />
      ))}
    </g>,
    // Pattern 3: Rays
    <g key="rays">
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <line
          key={i}
          x1="50"
          y1="50"
          x2={50 + Math.cos((angle + seed * 20) * Math.PI / 180) * 30}
          y2={50 + Math.sin((angle + seed * 20) * Math.PI / 180) * 30}
          stroke={colors[i % 3]}
          strokeWidth="2"
          opacity={unlocked ? 0.8 : 0.2}
        />
      ))}
    </g>
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      {shapes[seed % shapes.length]}
      {unlocked && (
        <g className="animate-pulse">
          <circle cx="50" cy="50" r="35" fill="none" stroke={colors[0]} strokeWidth="1" opacity="0.3" />
        </g>
      )}
    </svg>
  );
};

// Interactive Element Patterns
export const SoundWaves = ({ className = "", size = 40, active = false }: { className?: string; size?: number; active?: boolean }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <g className={active ? "animate-pulse" : ""}>
        {[20, 35, 50, 65, 80].map((x, i) => (
          <rect
            key={i}
            x={x - 2}
            y={50 - (i % 2 === 0 ? 15 : 25)}
            width="4"
            height={i % 2 === 0 ? 30 : 50}
            fill="#3b82f6"
            opacity={active ? 0.9 - i * 0.1 : 0.3}
            className={active ? "animate-wave" : ""}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </g>
    </svg>
  );
};

export const FlowingLine = ({ className = "", size = 40 }: { className?: string; size?: number }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <path
        d="M10,50 C25,30 40,70 50,50 S75,30 90,50"
        fill="none"
        stroke="#ef4444"
        strokeWidth="3"
        strokeLinecap="round"
        className="animate-dash"
      />
    </svg>
  );
};

export const RadialBurst = ({ className = "", size = 40 }: { className?: string; size?: number }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <g className="animate-explode">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="50"
            y1="50"
            x2={50 + Math.cos(angle * Math.PI / 180) * 25}
            y2={50 + Math.sin(angle * Math.PI / 180) * 25}
            stroke="#fbbf24"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />
        ))}
        <circle cx="50" cy="50" r="8" fill="#f59e0b" />
      </g>
    </svg>
  );
};

export const NodeNetwork = ({ className = "", size = 40 }: { className?: string; size?: number }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <g>
        {/* Connection lines */}
        <line x1="25" y1="25" x2="75" y2="25" stroke="#8b5cf6" strokeWidth="1" opacity="0.3" />
        <line x1="75" y1="25" x2="75" y2="75" stroke="#8b5cf6" strokeWidth="1" opacity="0.3" />
        <line x1="75" y1="75" x2="25" y2="75" stroke="#8b5cf6" strokeWidth="1" opacity="0.3" />
        <line x1="25" y1="75" x2="25" y2="25" stroke="#8b5cf6" strokeWidth="1" opacity="0.3" />
        <line x1="25" y1="25" x2="75" y2="75" stroke="#8b5cf6" strokeWidth="1" opacity="0.2" />
        
        {/* Nodes */}
        <circle cx="25" cy="25" r="6" fill="#8b5cf6" className="animate-pulse" />
        <circle cx="75" cy="25" r="6" fill="#8b5cf6" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
        <circle cx="75" cy="75" r="6" fill="#8b5cf6" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
        <circle cx="25" cy="75" r="6" fill="#8b5cf6" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
        <circle cx="50" cy="50" r="8" fill="#a855f7" className="animate-pulse" />
      </g>
    </svg>
  );
};
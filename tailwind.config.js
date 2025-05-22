module.exports = {
  theme: {
    extend: {
      colors: {
        galaxy: {
          900: '#0f2027',
          800: '#2c5364',
          700: '#1a2980',
          600: '#6a3093',
          500: '#a044ff',
          400: '#00c6ff',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      dropShadow: {
        neon: '0 0 10px #a044ff, 0 0 20px #00c6ff',
        'galaxy-glow': '0 0 8px rgba(160, 68, 255, 0.6)',
        'white-glow': '0 0 8px rgba(255, 255, 255, 0.7)',
      },
      keyframes: {
        galaxyMove: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        flowAnimation: {
          '0%': { 
            backgroundPosition: '0% 50%',
            boxShadow: '0 5px 15px rgba(160, 68, 255, 0.4), 0 0 5px rgba(255, 255, 255, 0.5)'
          },
          '25%': { 
            backgroundPosition: '25% 50%',
            boxShadow: '0 5px 12px rgba(0, 198, 255, 0.3), 0 0 8px rgba(255, 255, 255, 0.6)'
          },
          '50%': { 
            backgroundPosition: '100% 50%',
            boxShadow: '0 5px 18px rgba(160, 68, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.7)'
          },
          '75%': { 
            backgroundPosition: '75% 50%',
            boxShadow: '0 5px 12px rgba(0, 198, 255, 0.3), 0 0 8px rgba(255, 255, 255, 0.6)'
          },
          '100%': { 
            backgroundPosition: '0% 50%',
            boxShadow: '0 5px 15px rgba(160, 68, 255, 0.4), 0 0 5px rgba(255, 255, 255, 0.5)'
          }
        },
        navItemSlideIn: {
          '0%': { 
            transform: 'translateY(10px) scale(0.95)',
            opacity: '0' 
          },
          '100%': { 
            transform: 'translateY(0) scale(1)',
            opacity: '1' 
          }
        },
        navItemSlideOut: {
          '0%': { 
            transform: 'translateY(0) scale(1)',
            opacity: '1' 
          },
          '100%': { 
            transform: 'translateY(-10px) scale(0.95)',
            opacity: '0' 
          }
        },
        buttonActive: {
          '0%': {
            transform: 'translateY(10px) scale(0.95)',
            opacity: '0',
            boxShadow: '0 0 0 rgba(255, 255, 255, 0)'
          },
          '30%': {
            transform: 'translateY(0) scale(1.03)',
            opacity: '0.7',
            boxShadow: '0 5px 15px rgba(160, 68, 255, 0.3), 0 0 5px rgba(255, 255, 255, 0.3)'
          },
          '100%': {
            transform: 'translateY(0) scale(1)',
            opacity: '1',
            boxShadow: '0 5px 15px rgba(160, 68, 255, 0.4), 0 0 5px rgba(255, 255, 255, 0.5)'
          }
        }
      },
      animation: {
        galaxy: 'galaxyMove 20s ease-in-out infinite',
        flow: 'flowAnimation 8s ease-in-out infinite',
        'nav-in': 'navItemSlideIn 0.5s ease-out forwards',
        'nav-out': 'navItemSlideOut 0.4s ease-in forwards',
        'button-active': 'buttonActive 0.6s ease-out forwards',
      },
    },
  },
}; 
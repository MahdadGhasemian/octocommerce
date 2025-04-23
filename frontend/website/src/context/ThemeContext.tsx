import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type Theme = 'light' | 'dark';
export type Color = (typeof colorList)[number];

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  color: Color;
  selectColor: (color: Color) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [color, setColor] = useState<Color>('sky');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedColor = localStorage.getItem('color') as Color;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    if (savedColor) {
      setColor(savedColor);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const selectColor = (color: Color) => {
    setColor(color);
    localStorage.setItem('color', color);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, color, selectColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const colorList = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
] as const;

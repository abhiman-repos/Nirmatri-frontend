import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { Button } from '@/app/components/ui/button';
import { useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Monitor },
  ];

  const currentTheme = themes.find((t) => t.value === theme);
  const Icon = currentTheme?.icon || Sun;

  return (
    <div className="relative">
      {/* TOGGLE BUTTON */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme"
        className="
          transition-all duration-300 hover:scale-110
          hover:bg-gradient-to-br hover:from-[#CF9893]/40 hover:to-[#6968A6]/40
          dark:hover:bg-gray-800
        "
      >
        <Icon
          className="
            h-5 w-5
            text-[#085078]
            dark:text-gray-300
          "
        />
      </Button>

      {isOpen && (
        <>
          {/* BACKDROP */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* DROPDOWN */}
          <div
            className="
              absolute right-0 mt-2 w-44 z-50 overflow-hidden
              rounded-xl border
              bg-white/80 backdrop-blur-xl
              border-[#6968A6]/20
              shadow-[0_20px_50px_-15px_rgba(105,104,166,0.35)]
              dark:bg-gray-900 dark:border-gray-700
              animate-in fade-in slide-in-from-top-2 duration-200
            "
          >
            {themes.map((themeOption) => {
              const ThemeIcon = themeOption.icon;
              const isSelected = theme === themeOption.value;

              return (
                <button
                  key={themeOption.value}
                  onClick={() => {
                    setTheme(themeOption.value);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 text-left
                    transition-all duration-200
                    ${
                      isSelected
                        ? `
                          bg-gradient-to-r from-[#CF9893]/30 to-[#6968A6]/30
                          text-[#085078]
                          dark:bg-gray-800 dark:text-gray-200
                        `
                        : `
                          hover:bg-gradient-to-r hover:from-[#CF9893]/20 hover:to-[#6968A6]/20
                          text-gray-700 dark:text-gray-300
                        `
                    }
                  `}
                >
                  <ThemeIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {themeOption.label}
                  </span>
                  {isSelected && (
                    <span className="ml-auto text-[#6968A6] dark:text-gray-300">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

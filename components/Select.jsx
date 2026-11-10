import { useState, useRef, useEffect, useId } from "react";

/**
 * Robust, minimal, bare-bones Select component.
 *
 * @param {Array<{ label: string, value: any, disabled?: boolean } | string>} options - List of options.
 * @param {any} value - Selected value.
 * @param {function} onChange - Callback triggered with selected value.
 * @param {string} placeholder - Placeholder text when no option is selected.
 * @param {boolean} disabled - Whether the select is disabled.
 * @param {string} className - Optional container styling classes.
 * @param {string} name - Form field name (for hidden input).
 * @param {boolean} required - Form field required attribute.
 * @param {string} id - HTML id for accessibility.
 */
export default function Select({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  className = "",
  name,
  required = false,
  id,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef(null);
  const listboxRef = useRef(null);
  const autoId = useId();
  const selectId = id || autoId;

  // Normalize options to object shape: { label, value, disabled }
  const normalizedOptions = options.map((opt) =>
    typeof opt === "object" && opt !== null
      ? opt
      : { label: String(opt), value: opt, disabled: false }
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Keep focused option scrolled into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listboxRef.current) {
      const activeEl = listboxRef.current.children[focusedIndex];
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [focusedIndex, isOpen]);

  // Reset or initialize focus when opening
  const handleOpen = () => {
    if (disabled) return;
    const initialIndex = normalizedOptions.findIndex((opt) => opt.value === value);
    setFocusedIndex(initialIndex >= 0 ? initialIndex : 0);
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option) => {
    if (option.disabled) return;
    if (onChange) onChange(option.value);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (disabled) return;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (isOpen) {
          if (focusedIndex >= 0 && normalizedOptions[focusedIndex]) {
            handleSelect(normalizedOptions[focusedIndex]);
          }
        } else {
          handleOpen();
        }
        break;

      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          handleOpen();
        } else {
          setFocusedIndex((prev) => {
            const next = prev + 1;
            return next < normalizedOptions.length ? next : 0;
          });
        }
        break;

      case "ArrowUp":
        e.preventDefault();
        if (!isOpen) {
          handleOpen();
        } else {
          setFocusedIndex((prev) => {
            const next = prev - 1;
            return next >= 0 ? next : normalizedOptions.length - 1;
          });
        }
        break;

      case "Escape":
        if (isOpen) {
          e.preventDefault();
          setIsOpen(false);
        }
        break;

      case "Tab":
        if (isOpen) {
          setIsOpen(false);
        }
        break;

      default:
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
    >
      {/* Hidden native input for standard HTML form support */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={value ?? ""}
          required={required}
        />
      )}

      {/* Select trigger button */}
      <button
        id={selectId}
        type="button"
        disabled={disabled}
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`flex h-full cursor-pointer items-center justify-between px-3 py-2 text-black transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400 disabled:border-neutral-300`}
      >
        <span className={`truncate uppercase ${!selectedOption ? "text-neutral-500" : ""}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`ml-2 h-4 w-4 shrink-0 transition-transform duration-150 ${isOpen ? "rotate-180" : ""
            }`}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M6 8l4 4 4-4"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      <ul
        ref={listboxRef}
        role="listbox"
        tabIndex={-1}
        aria-labelledby={selectId}
        aria-hidden={!isOpen}
        className={`absolute z-2 mt-1 max-h-60 shadow-[2px_2px_6px_rgba(0,0,0,0.15)] py-1 focus:outline-none transition-all duration-150 ease-out ${isOpen
          ? "opacity-100 translate-y-0 pointer-events-auto visible"
          : "opacity-0 -translate-y-1 pointer-events-none invisible"
          }`}
      >
        {normalizedOptions.length === 0 ? (
          <li className="px-3 py-2 text-xs text-neutral-400">No options</li>
        ) : (
          normalizedOptions.map((option, idx) => {
            const isSelected = option.value === value;
            const isFocused = idx === focusedIndex;

            return (
              <li
                key={option.value ?? idx}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setFocusedIndex(idx)}
                className={`cursor-pointer uppercase px-3 py-2 select-none transition-colors ${option.disabled
                  ? "cursor-not-allowed"
                  : isSelected
                    ? "bg-black text-white"
                    : isFocused
                      ? "text-black bg-white"
                      : ""
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span className="whitespace-nowrap">{option.label}</span>
                  {isSelected && (
                    <svg
                      className="ml-2 h-4 w-4 shrink-0 stroke-current"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M5 10l3 3 7-7"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

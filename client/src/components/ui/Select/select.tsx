import { useState, useRef, useEffect } from "react"
import "./select.css"

type Option = {
    value: string
    label: string
}

interface LaborMultiSelectProps {
    label?: string
    options: Option[]
    value: string[]
    onChange: (value: string[]) => void
    placeholder?: string
    error?: string
    disabled?: boolean
    id?: string
}

export default function LaborMultiSelect({
    label,
    options,
    value = [],
    onChange,
    placeholder = "Sélectionner...",
    error,
    disabled = false,
    id = "labor-multiselect",
}: LaborMultiSelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Ferme la dropdown si on clique en dehors
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    function toggleOption(optionValue: string) {
        if (value.includes(optionValue)) {
            onChange(value.filter(v => v !== optionValue))
        } else {
            onChange([...value, optionValue])
        }
    }

    function removeTag(optionValue: string, e: React.MouseEvent) {
        e.stopPropagation() 
        onChange(value.filter(v => v !== optionValue))
    }

    const triggerClasses = [
        "labor-multiselect-trigger",
        isOpen ? "open" : "",
        error ? "error" : "",
        disabled ? "disabled" : "",
    ].filter(Boolean).join(" ")

    return (
        <div className="labor-multiselect-container" ref={containerRef}>
            {label && (
                <label className="labor-label" htmlFor={id}>
                    {label}
                </label>
            )}

            {/* Trigger */}
            <div
                className={triggerClasses}
                onClick={() => !disabled && setIsOpen(prev => !prev)}
                id={id}
            >
                {value.length === 0 && (
                    <span className="labor-multiselect-placeholder">{placeholder}</span>
                )}

                {value.map(v => {
                    const option = options.find(o => o.value === v)
                    return (
                        <span key={v} className="labor-multiselect-tag">
                            {option?.label}
                            <button
                                className="labor-multiselect-tag-remove"
                                onClick={(e) => removeTag(v, e)}
                                type="button"
                            >
                                ✕
                            </button>
                        </span>
                    )
                })}

                <span className={`labor-multiselect-arrow ${isOpen ? "open" : ""}`}>▼</span>
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="labor-multiselect-dropdown">
                    {options.map(option => {
                        const isSelected = value.includes(option.value)
                        return (
                            <div
                                key={option.value}
                                className={`labor-multiselect-option ${isSelected ? "selected" : ""}`}
                                onClick={() => toggleOption(option.value)}
                            >
                                <span className="labor-multiselect-checkbox">
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#fff" strokeWidth="2">
                                        <path d="M2 5l2 2 4-4" />
                                    </svg>
                                </span>
                                {option.label}
                            </div>
                        )
                    })}
                </div>
            )}

            {error && <span className="labor-error-text">{error}</span>}
        </div>
    )
}
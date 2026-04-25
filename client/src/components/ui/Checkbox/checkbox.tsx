import "./checkbox.css"

type Option = {
    value: string
    label: string
}

interface LaborCheckboxProps {
    label?: string
    options: Option[]
    value: string[]
    onChange: (value: string[]) => void
    variant?: "classic" | "labor"
    disabled?: boolean
    error?: string
}

export default function LaborCheckbox({
    label,
    options,
    value = [],
    onChange,
    variant = "classic",
    disabled = false,
    error,
}: LaborCheckboxProps) {

    function toggleOption(optionValue: string) {
        if (disabled) return
        if (value.includes(optionValue)) {
            onChange(value.filter(v => v !== optionValue))
        } else {
            onChange([...value, optionValue])
        }
    }

    return (
        <div>
            {label && <p className="labor-checkbox-label">{label}</p>}

            <div className="labor-checkbox-group">
                {options.map(option => {
                    const isChecked = value.includes(option.value)
                    const optionClass = `labor-checkbox-option${disabled ? " disabled" : ""}`

                    return (
                        <div
                            key={option.value}
                            className={optionClass}
                            onClick={() => toggleOption(option.value)}
                        >
                            {variant === "classic" ? (
                                <span className={`labor-checkbox-box${isChecked ? " checked" : ""}`}>
                                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="#fff" strokeWidth="2">
                                        <path d="M2 5.5l2.5 2.5 4.5-4.5" />
                                    </svg>
                                </span>
                            ) : (
                                <span className={`labor-checkbox-circle${isChecked ? " checked" : ""}`}>
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#fff" strokeWidth="2">
                                        <path d="M2 5l2 2 4-4" />
                                    </svg>
                                </span>
                            )}

                            <span className="labor-checkbox-option-label">
                                {option.label}
                            </span>
                        </div>
                    )
                })}
            </div>

            {error && <span className="labor-error-text">{error}</span>}
        </div>
    )
}
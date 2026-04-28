import { useRef, useEffect, useCallback } from "react";
import "./textarea.css";

interface LaborTextareaProps {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    error?: string;
    disabled?: boolean;
    id?: string;
    minLength?: number;
    maxLength?: number;
}

export default function LaborTextarea({
    label,
    placeholder,
    value = "",
    onChange,
    error,
    disabled = false,
    id = "labor-textarea",
    minLength,
    maxLength,
}: LaborTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const currentLength = value.length;

    const autoResize = useCallback(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    }, []);

    useEffect(() => {
        autoResize();
    }, [value, autoResize]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        autoResize();
        onChange?.(e.target.value);
    };

    // Couleur du compteur selon la proximité de la limite
    const getCounterClass = () => {
        if (!maxLength) return "";
        const ratio = currentLength / maxLength;
        if (ratio >= 1) return "limit";
        if (ratio >= 0.8) return "warning";
        return "";
    };

    // Message d'erreur minLength si besoin
    const minLengthError =
        minLength && currentLength > 0 && currentLength < minLength
            ? `Minimum ${minLength} caractères (encore ${minLength - currentLength})`
            : null;

    const displayedError = error ?? minLengthError;

    return (
        <div className="labor-textarea-container">
            {label && (
                <label className="labor-label" htmlFor={id}>
                    {label}
                </label>
            )}
            <div className="labor-textarea-wrapper">
                <textarea
                    ref={textareaRef}
                    id={id}
                    className={`labor-textarea${displayedError ? " error" : ""}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    rows={1}
                    maxLength={maxLength}
                />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                {displayedError
                    ? <span className="labor-error-text">{displayedError}</span>
                    : <span />
                }
                {maxLength && (
                    <span className={`labor-char-counter ${getCounterClass()}`}>
                        {currentLength} / {maxLength}
                    </span>
                )}
            </div>
        </div>
    );
}
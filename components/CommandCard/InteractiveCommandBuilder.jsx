"use client";

import { useState, useMemo } from "react";
import { ClipboardIcon } from "@heroicons/react/24/outline";

// Компонент для интерактивного конструктора
export const InteractiveCommandBuilder = ({ parts, onCopy }) => {
    const [inputValues, setInputValues] = useState({});

    const handleInputChange = (id, value) => {
        setInputValues((prev) => ({ ...prev, [id]: value }));
    };

    const finalCommand = useMemo(() => {
        return parts
            .map((part) => {
                if (part.type === "static") return part.value;
                if (part.type === "input")
                    return inputValues[part.id] || part.placeholder;
                return "";
            })
            .join("");
    }, [parts, inputValues]);

    return (
        <div>
            <div className="flex flex-wrap items-center gap-x-2 p-2 rounded-md bg-slate-100 dark:bg-black/30">
                {parts.map((part, index) => {
                    if (part.type === "static") {
                        return (
                            <span
                                key={index}
                                className="font-mono text-sky-600 dark:text-sky-400"
                            >
                                {part.value}
                            </span>
                        );
                    }
                    if (part.type === "input") {
                        return (
                            <input
                                key={index}
                                type="text"
                                placeholder={part.placeholder}
                                className="bg-transparent border-b border-sky-500/50 focus:border-sky-500 focus:outline-none font-mono text-sky-700 placeholder-sky-400 px-1 flex-grow min-w-0 dark:text-sky-300 dark:placeholder-sky-600"
                                style={{
                                    width: `${
                                        (part.placeholder.length || 10) * 8
                                    }px`,
                                }}
                                onChange={(e) =>
                                    handleInputChange(part.id, e.target.value)
                                }
                            />
                        );
                    }
                    return null;
                })}
            </div>
            <div className="mt-2 flex justify-end">
                <button
                    onClick={() => onCopy(finalCommand)}
                    className="text-xs text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white flex items-center gap-1"
                >
                    <ClipboardIcon className="h-4 w-4" />
                    Копировать собранную команду
                </button>
            </div>
        </div>
    );
};

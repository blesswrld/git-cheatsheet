"use client";

import { useState, useEffect, useMemo } from "react";
import { Combobox, RadioGroup } from "@headlessui/react";
import {
    MagnifyingGlassIcon,
    StarIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from "@heroicons/react/24/solid";
import commandsData from "../data/git-commands.json";
import CommandCard from "../components/CommandCard";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
    "Все",
    "Избранное",
    "Настройка",
    "Основы",
    "Ветки",
    "История и сравнение",
    "Отмена изменений",
    "Удаленные",
    "Продвинутые",
];

const INITIAL_LIMIT = 10; // <-- Устанавливаем лимит

export default function HomePage() {
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [favorites, setFavorites] = useState([]);
    const [limit, setLimit] = useState(INITIAL_LIMIT); // <-- состояние для лимита

    useEffect(() => {
        const storedFavorites = localStorage.getItem("git_favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    // Сбрасываем лимит при смене фильтров
    useEffect(() => {
        setLimit(INITIAL_LIMIT);
    }, [query, activeCategory]);

    useEffect(() => {
        localStorage.setItem("git_favorites", JSON.stringify(favorites));
    }, [favorites]);

    const handleToggleFavorite = (commandId) => {
        setFavorites((prev) =>
            prev.includes(commandId)
                ? prev.filter((id) => id !== commandId)
                : [...prev, commandId]
        );
    };

    const filteredCommands = useMemo(() => {
        let items = commandsData;

        // Фильтруем по категории
        if (activeCategory === "Избранное") {
            // <-- Проверяем 'Избранное'
            items = items.filter((item) => favorites.includes(item.id));
        } else if (activeCategory !== "Все") {
            // <-- Проверяем не 'Все'
            items = items.filter((item) => item.category === activeCategory);
        }

        const searchQuery = (query || "").toLowerCase();
        if (searchQuery) {
            items = items.filter((item) =>
                `${item.description} ${item.command} ${item.keywords.join(" ")}`
                    .toLowerCase()
                    .includes(searchQuery)
            );
        }
        return items;
    }, [query, activeCategory, favorites]);

    // Переменная для отображаемого списка с учетом лимита
    const commandsToShow = filteredCommands.slice(0, limit);
    const hasMore = filteredCommands.length > limit;

    return (
        <main className="min-h-screen text-slate-800 dark:text-slate-200">
            <div className="container mx-auto max-w-3xl p-4 sm:p-8">
                <div className="flex justify-end mb-4">
                    <ThemeSwitcher />
                </div>

                <header className="text-center my-8">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-black dark:text-white">
                        Интерактивная <span className="text-sky-500">Git</span>{" "}
                        Шпаргалка
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                        Найди нужную команду, не покидая терминал.
                    </p>
                </header>

                <RadioGroup
                    value={activeCategory}
                    onChange={setActiveCategory}
                    className="mb-8"
                >
                    <RadioGroup.Label className="sr-only">
                        Категория
                    </RadioGroup.Label>
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((category) => (
                            <RadioGroup.Option
                                key={category}
                                value={category}
                                className={({ active, checked }) =>
                                    `cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-colors
                                    ${
                                        checked
                                            ? "bg-sky-500 text-white shadow"
                                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                                    }
                                    ${
                                        active
                                            ? "ring-2 ring-offset-2 ring-offset-black ring-white"
                                            : ""
                                    }
                                    focus:outline-none`
                                }
                            >
                                {category === "Избранное" ? (
                                    <StarIcon className="h-4 w-4 inline -mt-0.5" />
                                ) : (
                                    category
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>

                <Combobox value={query} onChange={setQuery}>
                    <div className="relative">
                        <MagnifyingGlassIcon className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-slate-400 dark:text-slate-500" />
                        <Combobox.Input
                            as="input"
                            onChange={(event) => setQuery(event.target.value)}
                            className="w-full rounded-lg border py-3 pl-11 pr-4 focus:ring-2 focus:outline-none 
                                       bg-slate-100 border-slate-300 text-black placeholder-slate-500 focus:ring-sky-500 focus:border-sky-500
                                       dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-slate-400 dark:focus:ring-sky-500 dark:focus:border-sky-500
                                       backdrop-blur-md"
                            placeholder="Что вы хотите сделать?"
                        />
                    </div>
                </Combobox>

                <section className="space-y-4 mt-8">
                    <AnimatePresence>
                        {commandsToShow.map(
                            (
                                item,
                                index // <-- Рендерим commandsToShow вместо filteredCommands
                            ) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.02,
                                    }}
                                >
                                    {/* Передаем весь объект 'item' целиком,
                                        а также isFavorite и onToggleFavorite */}
                                    <CommandCard
                                        item={item}
                                        isFavorite={favorites.includes(item.id)}
                                        onToggleFavorite={handleToggleFavorite}
                                    />
                                </motion.div>
                            )
                        )}
                    </AnimatePresence>

                    {/* Если не нашли команд, показываем сообщение */}
                    {filteredCommands.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-10"
                        >
                            <p className="text-slate-500 dark:text-slate-400">
                                Команды не найдены.
                            </p>
                            <p className="text-slate-400 dark:text-slate-600 text-sm">
                                Попробуйте другой запрос или проверьте опечатки.
                            </p>
                        </motion.div>
                    )}
                </section>

                {/* --- КНОПКИ "ПОКАЗАТЬ ЕЩЕ" / "СКРЫТЬ" --- */}
                <AnimatePresence>
                    {(hasMore || limit > INITIAL_LIMIT) && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="mt-8 flex justify-center gap-4"
                        >
                            {hasMore && (
                                <button
                                    onClick={() =>
                                        setLimit((prev) => prev + INITIAL_LIMIT)
                                    }
                                    className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                                >
                                    <ChevronDownIcon className="h-4 w-4" />
                                    Показать еще{" "}
                                    {Math.min(
                                        INITIAL_LIMIT,
                                        filteredCommands.length - limit
                                    )}
                                </button>
                            )}
                            {limit > INITIAL_LIMIT && (
                                <button
                                    onClick={() => setLimit(INITIAL_LIMIT)}
                                    className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                                >
                                    <ChevronUpIcon className="h-4 w-4" />
                                    Свернуть
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}

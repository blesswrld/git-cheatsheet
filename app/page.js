"use client";

import CommandCard from "../components/CommandCard/index";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { motion, AnimatePresence } from "framer-motion";
import { useGitCommands } from "../components/HomePage/useGitCommands";
import { RadioGroup, Combobox } from "@headlessui/react";
import {
    MagnifyingGlassIcon,
    StarIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    LightBulbIcon,
    EyeIcon,
    EyeSlashIcon,
} from "@heroicons/react/24/solid";

export default function HomePage() {
    const {
        query,
        setQuery,
        activeCategory,
        setActiveCategory,
        favorites,
        handleToggleFavorite,
        limit,
        setLimit,
        commandOfTheDay,
        isCotdVisible,
        handleToggleCotdVisibility,
        filteredCommands,
        commandsToShow,
        hasMore,
        categories,
        INITIAL_LIMIT,
    } = useGitCommands();

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

                {/* --- БЛОК: КОМАНДА ДНЯ --- */}
                <AnimatePresence>
                    {commandOfTheDay && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mb-12"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-medium text-slate-400 dark:text-slate-500 flex items-center gap-2">
                                    <LightBulbIcon className="h-5 w-5 text-yellow-400" />
                                    Команда дня
                                </h2>
                                <button
                                    onClick={handleToggleCotdVisibility}
                                    className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 dark:text-slate-500 dark:hover:text-white dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                                >
                                    {isCotdVisible ? (
                                        <EyeSlashIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            <AnimatePresence>
                                {isCotdVisible && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            ease: "easeInOut",
                                        }}
                                        style={{ overflow: "hidden" }}
                                    >
                                        <CommandCard
                                            item={commandOfTheDay}
                                            isFavorite={favorites.includes(
                                                commandOfTheDay.id
                                            )}
                                            onToggleFavorite={
                                                handleToggleFavorite
                                            }
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>

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
                                    `cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                                        checked
                                            ? "bg-sky-500 text-white shadow"
                                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                                    } ${
                                        active
                                            ? "ring-2 ring-offset-2 ring-offset-black ring-white"
                                            : ""
                                    } focus:outline-none`
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
                            className="w-full rounded-lg border py-3 pl-11 pr-4 focus:ring-2 focus:outline-none bg-slate-100 border-slate-300 text-black placeholder-slate-500 focus:ring-sky-500 focus:border-sky-500 dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-slate-400 dark:focus:ring-sky-500 dark:focus:border-sky-500 backdrop-blur-md"
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
                                    id={`command-${item.id}`}
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
                                    {/* Передаем весь объект 'item' целиком, а также isFavorite и onToggleFavorite */}
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
                                    className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
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
                                    className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
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

import { useState, useEffect, useMemo, useRef } from "react";
import commandsData from "../../data/git-commands.json";

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

const INITIAL_LIMIT = 10;

export function useGitCommands() {
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [favorites, setFavorites] = useState([]);
    const isInitialMountFavorites = useRef(true);
    const [limit, setLimit] = useState(INITIAL_LIMIT);
    const [commandOfTheDay, setCommandOfTheDay] = useState(null);
    const [isCotdVisible, setIsCotdVisible] = useState(true);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("git_favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }

        const isCotdHidden = localStorage.getItem("cotd_hidden") === "true";
        setIsCotdVisible(!isCotdHidden);

        const today = new Date().toDateString();
        const storedDate = localStorage.getItem("cotd_date");
        const storedCommandId = localStorage.getItem("cotd_id");

        if (storedDate === today && storedCommandId) {
            const savedCommand = commandsData.find(
                (c) => c.id === parseInt(storedCommandId)
            );
            setCommandOfTheDay(savedCommand);
        } else {
            const randomIndex = Math.floor(Math.random() * commandsData.length);
            const newCommand = commandsData[randomIndex];
            setCommandOfTheDay(newCommand);
            localStorage.setItem("cotd_id", newCommand.id.toString());
            localStorage.setItem("cotd_date", today);
        }

        const params = new URLSearchParams(window.location.search);
        const initialQuery = params.get("q");
        if (initialQuery) {
            const decodedQuery = decodeURIComponent(initialQuery);
            setQuery(decodedQuery);
            const targetItem = commandsData.find(
                (c) => c.command === decodedQuery
            );
            if (targetItem) {
                setTimeout(() => {
                    document
                        .getElementById(`command-${targetItem.id}`)
                        ?.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                        });
                }, 300);
            }
        }
    }, []);

    useEffect(() => {
        if (isInitialMountFavorites.current) {
            isInitialMountFavorites.current = false;
        } else {
            localStorage.setItem("git_favorites", JSON.stringify(favorites));
        }
    }, [favorites]);

    useEffect(() => {
        setLimit(INITIAL_LIMIT);
    }, [query, activeCategory]);

    const handleToggleCotdVisibility = () => {
        const newVisibility = !isCotdVisible;
        setIsCotdVisible(newVisibility);
        localStorage.setItem("cotd_hidden", !newVisibility ? "true" : "false");
    };

    const handleToggleFavorite = (commandId) => {
        setFavorites((prev) =>
            prev.includes(commandId)
                ? prev.filter((id) => id !== commandId)
                : [...prev, commandId]
        );
    };

    const filteredCommands = useMemo(() => {
        let items = commandsData;
        if (activeCategory === "Избранное") {
            items = items.filter((item) => favorites.includes(item.id));
        } else if (activeCategory !== "Все") {
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

    const commandsToShow = filteredCommands.slice(0, limit);
    const hasMore = filteredCommands.length > limit;

    return {
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
    };
}

"use client";

import { useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import {
    ChevronUpIcon,
    ClipboardIcon,
    CheckIcon,
    StarIcon as StarIconOutline, // Пустая звезда
} from "@heroicons/react/24/outline";
import { LinkIcon, StarIcon as StarIconSolid } from "@heroicons/react/24/solid"; // Заполненная звезда
import { MergeViz } from "../visualizers/MergeViz";
import { RebaseViz } from "../visualizers/RebaseViz";
import { CommitViz } from "../visualizers/CommitViz";
import { InteractiveCommandBuilder } from "./InteractiveCommandBuilder";

// Карта визуализаций
const visualizationMap = {
    merge: <MergeViz />,
    rebase: <RebaseViz />,
    commit: <CommitViz />,
};

// Основной компонент карточки
export default function CommandCard({ item, isFavorite, onToggleFavorite }) {
    // Добавляем пропсы
    const {
        id,
        command,
        description,
        example,
        interactiveParts,
        visualization,
    } = item;
    const [isCopied, setIsCopied] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false);

    const handleCopy = (textToCopy = command) => {
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    const handleShare = () => {
        if (!navigator.clipboard) return;
        const shareUrl = `${window.location.origin}?q=${encodeURIComponent(
            command
        )}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
            setLinkCopied(true);
            setTimeout(() => setLinkCopied(false), 2000);
        });
    };

    return (
        <div
            className="w-full rounded-xl border p-4 transition-colors 
                   bg-white border-slate-200 hover:bg-slate-50
                   dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 
                   backdrop-blur-lg"
        >
            <div className="flex w-full items-start justify-between">
                <div className="flex-1 pr-4">
                    {interactiveParts ? (
                        <InteractiveCommandBuilder
                            parts={interactiveParts}
                            onCopy={handleCopy}
                        />
                    ) : (
                        <p className="break-all font-mono text-sky-600 dark:text-sky-400">
                            {command}
                        </p>
                    )}
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                        {description}
                    </p>
                </div>
                <div className="flex items-center space-x-1">
                    <button
                        onClick={handleShare}
                        className="flex-shrink-0 rounded-md p-2 hover:bg-slate-100 dark:hover:bg-white/10 focus:outline-none ring-sky-500 focus-visible:ring-2"
                    >
                        {linkCopied ? (
                            <CheckIcon className="h-5 w-5 text-green-500" />
                        ) : (
                            <LinkIcon className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                        )}
                    </button>
                    <button
                        onClick={() => onToggleFavorite(id)}
                        className="flex-shrink-0 rounded-md p-2 hover:bg-slate-100 dark:hover:bg-white/10 focus:outline-none ring-sky-500 focus-visible:ring-2"
                    >
                        {isFavorite ? (
                            // Кнопка "Избранное"
                            <StarIconSolid className="h-5 w-5 text-yellow-400" />
                        ) : (
                            <StarIconOutline className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                        )}
                    </button>
                    {!interactiveParts && (
                        <button
                            onClick={() => handleCopy()}
                            className="flex-shrink-0 rounded-md p-2 hover:bg-slate-100 dark:hover:bg-white/10 focus:outline-none ring-sky-500 focus-visible:ring-2"
                        >
                            {isCopied ? (
                                <CheckIcon className="h-5 w-5 text-green-500" />
                            ) : (
                                <ClipboardIcon className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                            )}
                        </button>
                    )}
                </div>
            </div>

            {visualization && (
                <div className="mt-4 p-2 bg-slate-100 dark:bg-black/20 rounded-lg">
                    {visualizationMap[visualization]}
                </div>
            )}

            {example && (
                <div className="mt-4 w-full">
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full items-center justify-between rounded py-1 text-sm text-slate-500 hover:text-black dark:hover:text-white focus:outline-none ring-sky-500 focus-visible:ring-2">
                                    <span>Показать пример</span>
                                    <ChevronUpIcon
                                        className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${
                                            open ? "rotate-180" : ""
                                        }`}
                                    />
                                </Disclosure.Button>

                                <Transition
                                    as="div"
                                    enter="transition ease-out duration-100"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Disclosure.Panel
                                        className="mt-2 rounded-lg p-3 text-sm 
                                             bg-slate-100 text-slate-600
                                             dark:bg-black/20 dark:text-slate-300 backdrop-blur-sm"
                                    >
                                        <pre className="whitespace-pre-wrap font-mono">
                                            {example}
                                        </pre>
                                    </Disclosure.Panel>
                                </Transition>
                            </>
                        )}
                    </Disclosure>
                </div>
            )}
        </div>
    );
}

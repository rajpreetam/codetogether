"use client";
import React, { useState } from "react";
import {
    ChevronDownIcon,
    ChevronUpIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/outline";
import supportedLanguage from "@/utils/supportedLanguage";
import Spinner from "../ui/Spinner";
import CodeEditor from "./editors/CodeEditor";
import ConsoleEditor from "./editors/ConsoleEditor";
import InputEditor from "./editors/InputEditor";
import OutputEditor from "./editors/OutputEditor";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
    updateIsConsoleIconClicked,
    updateIsIoIconClicked,
    updateLanguageId,
} from "@/store/features/webSockets/codeWsSlice";

type Props = {
    handleCodeSubmit: () => void;
};

const CodeComponent = ({ handleCodeSubmit }: Props) => {
    const dispatch: AppDispatch = useDispatch();
    const socketData = useSelector(
        (state: RootState) => state.codeWs.socketData
    );
    const isConsoleIconClicked = useSelector(
        (state: RootState) => state.codeWs.isConsoleIconClicked
    );
    const isIoIconClicked = useSelector(
        (state: RootState) => state.codeWs.isIoIconClicked
    );
    const isCodeSubmitting = useSelector(
        (state: RootState) => state.codeWs.isCodeSubmitting
    );
    const [languageDropDownClicked, setLanguageDropDownClicked] =
        useState(false);

    const handleConsoleClick = () => {
        dispatch(updateIsConsoleIconClicked(!isConsoleIconClicked));
        dispatch(updateIsIoIconClicked(false));
    };

    const handleIoClick = () => {
        dispatch(updateIsIoIconClicked(!isIoIconClicked));
        dispatch(updateIsConsoleIconClicked(false));
    };

    return (
        <div className="w-[50%] h-[calc(100vh-72px)] fc relative">
            <div className="card px-2 py-3 relative fr-ic-jb">
                <div>
                    <div
                        className="fr-ic-sx2 cursor-pointer"
                        onClick={() =>
                            setLanguageDropDownClicked(!languageDropDownClicked)
                        }
                    >
                        <p>
                            {
                                supportedLanguage.find(
                                    (language) =>
                                        language.languageId ===
                                        socketData.language_id
                                )?.readableName
                            }
                        </p>
                        {languageDropDownClicked ? (
                            <ChevronUpIcon className="icon-sm" />
                        ) : (
                            <ChevronDownIcon className="icon-sm" />
                        )}
                    </div>
                    <div
                        className={`card absolute top-12 left-0 p-2 z-40 items-start ${
                            languageDropDownClicked ? "fc-sy2" : "hidden"
                        }`}
                    >
                        {supportedLanguage.map((item) => (
                            <button
                                key={item.languageId}
                                className=""
                                onClick={() => {
                                    dispatch(updateLanguageId(item.languageId));
                                    setLanguageDropDownClicked(false);
                                }}
                            >
                                {item.readableName}
                            </button>
                        ))}
                    </div>
                </div>
                {isCodeSubmitting ? (
                    <Spinner />
                ) : (
                    <button
                        className="font-semibold"
                        onClick={handleCodeSubmit}
                    >
                        Submit
                    </button>
                )}
            </div>
            <div className="card-light flex-1 my-2">
                <CodeEditor />
            </div>
            <div
                className={`card-light p-2 absolute w-full bottom-10 z-30 ${
                    isConsoleIconClicked ? "fc-sy2" : "hidden"
                }`}
            >
                <p>Console</p>
                <ConsoleEditor />
            </div>
            <div
                className={`card-light p-2 absolute w-full bottom-10 z-30 ${
                    isIoIconClicked ? "fr-ic-sx2" : "hidden"
                }`}
            >
                <div className="fc-sy2 w-[50%]">
                    <p>Input</p>
                    <InputEditor />
                </div>
                <div className="fc-sy2 w-[50%]">
                    <p>Output</p>
                    <OutputEditor />
                </div>
            </div>
            <div className="card p-2 fr-ic-jb">
                <div
                    className="fr-ic-sx2 cursor-pointer"
                    onClick={handleConsoleClick}
                >
                    <InformationCircleIcon
                        className={`icon-sm ${
                            socketData.console_text !== ""
                                ? "text-red-500"
                                : "text-green-500"
                        }`}
                    />
                    <p>console</p>
                    {isConsoleIconClicked ? (
                        <ChevronDownIcon className="icon-sm" />
                    ) : (
                        <ChevronUpIcon className="icon-sm" />
                    )}
                </div>
                <div
                    className="fr-ic-sx2 cursor-pointer"
                    onClick={handleIoClick}
                >
                    <p>input/output</p>
                    {isIoIconClicked ? (
                        <ChevronDownIcon className="icon-sm" />
                    ) : (
                        <ChevronUpIcon className="icon-sm" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CodeComponent;

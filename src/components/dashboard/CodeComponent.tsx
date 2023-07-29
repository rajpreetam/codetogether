"use client";
import React, { useState } from "react";
import { Editor, OnChange } from "@monaco-editor/react";
import { ChevronDownIcon, ChevronUpIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { SocketData } from "@/types";
import supportedLanguage from "@/utils/supportedLanguage";
import Spinner from "../ui/Spinner";

type Props = {
    socketData: SocketData;
    setSocketData: (value: SocketData) => void;
    handleEditorChange: OnChange;
    handleConsoleEditorChange: OnChange;
    handleInputEditorChange: OnChange;
    handleOutputEditorChange: OnChange;
    handleCodeSubmit: () => void;
    codeSubmitLoading: boolean;
    consoleIconClicked: boolean;
    setConsoleIconClicked: (value: boolean) => void;
    ioIconClicked: boolean;
    setIoIconClicked: (value: boolean) => void;
};

const CodeComponent = ({
    socketData,
    setSocketData,
    handleEditorChange,
    handleConsoleEditorChange,
    handleInputEditorChange,
    handleOutputEditorChange,
    handleCodeSubmit,
    codeSubmitLoading,
    consoleIconClicked,
    setConsoleIconClicked,
    ioIconClicked,
    setIoIconClicked
}: Props) => {
    const [languageDropDownClicked, setLanguageDropDownClicked] = useState(false);

    const handleConsoleClick = () => {
        setConsoleIconClicked(!consoleIconClicked);
        setIoIconClicked(false);
    };

    const handleIoClick = () => {
        setIoIconClicked(!ioIconClicked);
        setConsoleIconClicked(false);
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
                                    setSocketData({
                                        ...socketData,
                                        language_id: item.languageId,
                                    });
                                    setLanguageDropDownClicked(false);
                                }}
                            >
                                {item.readableName}
                            </button>
                        ))}
                    </div>
                </div>
                {codeSubmitLoading ? (
                    <Spinner/>
                ): (
                    <button className="font-semibold" onClick={handleCodeSubmit}>Submit</button>
                )}
            </div>
            <div className="card-light flex-1 my-2">
                <Editor
                    key={socketData.language_id}
                    height="100%"
                    width="100%"
                    theme="vs-dark"
                    defaultLanguage={
                        supportedLanguage.find(
                            (language) =>
                                language.languageId === socketData.language_id
                        )?.name
                    }
                    onChange={handleEditorChange}
                    value={socketData.source_code}
                />
            </div>
            <div
                className={`card-light p-2 absolute w-full bottom-10 z-30 ${
                    consoleIconClicked ? "fc-sy2" : "hidden"
                }`}
            >
                <p>Console</p>
                <Editor
                    height="300px"
                    width="100%"
                    theme="vs-dark"
                    defaultLanguage="bash"
                    onChange={handleConsoleEditorChange}
                    value={socketData.console_text}
                />
            </div>
            <div
                className={`card-light p-2 absolute w-full bottom-10 z-30 ${
                    ioIconClicked ? "fr-ic-sx2" : "hidden"
                }`}
            >
                <div className="fc-sy2 w-[50%]">
                    <p>Input</p>
                    <Editor
                        height="300px"
                        width="100%"
                        theme="vs-dark"
                        defaultLanguage="bash"
                        onChange={handleInputEditorChange}
                        value={socketData.input_text}
                    />
                </div>
                <div className="fc-sy2 w-[50%]">
                    <p>Output</p>
                    <Editor
                        height="300px"
                        width="100%"
                        theme="vs-dark"
                        defaultLanguage="bash"
                        onChange={handleOutputEditorChange}
                        value={socketData.output_text}
                    />
                </div>
            </div>
            <div className="card p-2 fr-ic-jb">
                <div
                    className="fr-ic-sx2 cursor-pointer"
                    onClick={handleConsoleClick}
                >
                    <InformationCircleIcon className={`icon-sm ${socketData.console_text !== '' ? 'text-red-500' : 'text-green-500'}`} />
                    <p>console</p>
                    {consoleIconClicked ? (
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
                    {ioIconClicked ? (
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

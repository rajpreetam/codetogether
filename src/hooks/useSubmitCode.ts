import { ceJudgeBaseQuery } from "@/services";
import { AppDispatch, RootState } from "@/store";
import {
    updateConsoleText,
    updateIsCodeSubmitting,
    updateIsConsoleIconClicked,
    updateIsIoIconClicked,
    updateOutputText,
} from "@/store/features/webSockets/codeWsSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export const useSubmitCode = (submitted: boolean) => {
    const dispatch: AppDispatch = useDispatch();
    const socketData = useSelector(
        (state: RootState) => state.codeWs.socketData
    );

    return () => {
        if (submitted) {
            dispatch(updateIsCodeSubmitting(true));
            const body = {
                source_code: btoa(socketData.source_code),
                language_id: socketData.language_id,
                stdin: btoa(socketData.input_text),
            };

            try {
                ceJudgeBaseQuery
                    .post("/submissions/?base64_encoded=true&wait=true", body)
                    .then((res) => {
                        const token = res.data.token;
                        const url = `/submissions/${token}?base64_encoded=true`;

                        ceJudgeBaseQuery
                            .get(url)
                            .then((res) => {
                                const data = res.data;

                                if (data.status.id !== 3) {
                                    dispatch(updateIsConsoleIconClicked(true));
                                    dispatch(updateIsIoIconClicked(false));
                                } else {
                                    dispatch(updateIsIoIconClicked(true));
                                    dispatch(updateIsConsoleIconClicked(false));
                                }

                                const output_text = atob(data.stdout);
                                const console_text = `Status: ${
                                    data.status.description
                                }\n\n${atob(
                                    data.compile_output
                                )}\n\nNote: Check your selected language.`;

                                dispatch(updateOutputText(output_text));
                                if (data.status.id !== 3) {
                                    dispatch(updateConsoleText(console_text));
                                } else {
                                    dispatch(updateConsoleText(""));
                                }

                                dispatch(updateIsCodeSubmitting(false));
                            })
                            .catch((err) => {
                                if (err.response.status === 429) {
                                    toast.error(
                                        "Your room ran out of submissions for the day. Please subscribe to our pro plan or visit tomorrow again."
                                    );
                                } else {
                                    toast.error("Something went wrong");
                                }
                                dispatch(updateIsCodeSubmitting(false));
                            });
                    })
                    .catch((err) => {
                        if (err.response.status === 429) {
                            toast.error(
                                "Your room ran out of submissions for the day. Please subscribe to our pro plan or visit tomorrow again."
                            );
                        } else {
                            toast.error("Something went wrong");
                        }
                        dispatch(updateIsCodeSubmitting(false));
                    });
            } catch (err) {
                console.log(err);
                dispatch(updateIsCodeSubmitting(false));
            }
        }
    };
};

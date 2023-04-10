import Box from "@mui/material/Box";
import React, {FC, useEffect, useState} from "react";
import {DeductionsInfo} from "../lib/types/firebase/DeductionsInfo";
import {Deduction} from "../lib/types/firebase/Deduction";
import deductionsInfoData from "../lib/source/deductionsInfoData.json"

type PropsType = { deductionsInfo: DeductionsInfo };
type ResultType = "減点" | "注意" | "審査中" | "取消" | "間違";


function DeductionPane({deductionsInfo}: PropsType): JSX.Element {
    const [result, setResult] = useState<ResultType>("間違");
    const [targetDeduction, setTargetDeduction] = useState<Deduction | null | undefined>()
    const [formattedDate, setFormattedDate] = useState<string>("");

    useEffect(() => {
            const deduction = deductionsInfoData[deductionsInfo.deductionIndex - 1];
            setTargetDeduction(deduction);

            switch (deductionsInfo.process) {
                case 1:
                    setResult("減点");
                    break;
                case 2:
                    setResult("注意");
                    break;
                case 3:
                    setResult("審査中");
                    break;
                case 4:
                    setResult("取消");
                    break;
                case 5:
                    setResult("間違");
                    break;
            }

            console.log(deductionsInfo.registeredTime);
            const date = deductionsInfo.registeredTime.toDate();
            const month = date.getMonth() + 1; // 0から始まるため+1
            const day = date.getDate();
            const hour = date.getHours();
            const minute = date.getMinutes();

            const formattedDate = `${month.toString().padStart(2, '0')}/${day
                .toString()
                .padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute
                .toString()
                .padStart(2, '0')}`;

            setFormattedDate(formattedDate);
        }
        , [deductionsInfo])

    return (
        <Box sx={{borderBottom: "1px dashed #7E8080", textAlign : "center"}}>
            <p>{`${result}, ${formattedDate}, ${deductionsInfo.who}`}</p>
            <p>{`${targetDeduction?.points}点 ${targetDeduction?.content}`}</p>
        </Box>
    );
}

export default DeductionPane;
import {
    FC,
    FormEvent,
    useRef,
    KeyboardEvent,
    MouseEvent,
    Dispatch,
    SetStateAction,
    ReactElement,
    useState
} from "react";
import deductionsInitInfoData from "../source/deductionsInfoData.json"
import SearchBox from "./SearchBox";
import {Deduction} from "../types/firebase/Deduction";


type PropsType = { dataSetter: Dispatch<SetStateAction<any>> };

interface InputItem {
    index: number;
    points: number;
    content: string;
    objectID: string;
    _highlightResult: {
        groupName: {
            value: string;
            matchLevel: string;
            fullyHighlighted: boolean;
            matchedWords: string[];
        };
    };
}


function reformat(arg: InputItem[]): Deduction[] {
    return arg.map(({index, points, content}) => ({index, points, content}));
}

function DeductionsSearchBox({dataSetter}: PropsType): JSX.Element {

    return (
        <SearchBox targetSetter={dataSetter} reformatFunc={reformat} initData={deductionsInitInfoData} searchIndex={process.env.NEXT_PUBLIC_ALGOLIA_DEDUCTIONS_INDEX_NAME}/>
    );

}

export default DeductionsSearchBox;
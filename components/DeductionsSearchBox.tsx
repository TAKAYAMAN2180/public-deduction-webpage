import {Dispatch, SetStateAction} from "react";
import deductionsInitInfoData from "../lib/source/deductionsInfoData.json"
import SearchBox from "./SearchBox";
import {Deduction} from "../lib/types/firebase/Deduction";


type PropsType = { dataSetter: Dispatch<SetStateAction<Deduction[]>> };

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
        <SearchBox targetSetter={dataSetter} reformatFunc={reformat} initData={deductionsInitInfoData}
                   searchIndex={process.env.NEXT_PUBLIC_ALGOLIA_DEDUCTIONS_INDEX_NAME}/>
    );

}

export default DeductionsSearchBox;
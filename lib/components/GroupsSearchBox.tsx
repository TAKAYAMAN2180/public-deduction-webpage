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
import groupsInitData from "../source/groupsInfoData.json"
import {GroupsData} from "../types/GroupsData";
import SearchBox from "./SearchBox";


type PropsType = { dataSetter: Dispatch<SetStateAction<GroupsData>> };

interface InputItem {
    applyNum: number;
    areaNum: number;
    groupName: string;
    identifier: string;
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


function reformat(arg: InputItem[]): GroupsData {
    return arg.map(({applyNum, areaNum, groupName, identifier}) => ({applyNum, areaNum, groupName, identifier}));
}

function GroupsSearchBox({dataSetter}: PropsType): JSX.Element {

    return (
        <SearchBox targetSetter={dataSetter} reformatFunc={reformat} initData={groupsInitData} searchIndex={"test_index"}/>
    );

}

export default GroupsSearchBox;
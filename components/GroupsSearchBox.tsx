import {
    Dispatch,
    SetStateAction,
} from "react";
import groupsInitData from "../lib/source/groupsInfoData.json"
import {GroupsData} from "../lib/types/GroupsData";
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
        <SearchBox targetSetter={dataSetter} reformatFunc={reformat} initData={groupsInitData}
                   searchIndex={process.env.NEXT_PUBLIC_ALGOLIA_GROUPS_INDEX_NAME}/>
    );

}

export default GroupsSearchBox;
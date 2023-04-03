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
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import {Button, InputAdornment, Box} from "@mui/material";
import groupsInitData from "../source/groupsInfoData.json";
import search from "../search";

type PropsType = {
    targetSetter: Dispatch<SetStateAction<any>>;
    reformatFunc: (arg: any) => any;
    initData: Object[];
    searchIndex: any;
}

function SearchBox({targetSetter, reformatFunc, initData, searchIndex}: PropsType): JSX.Element {
    const [field, setField] = useState<string>("");
    const [prefield, setPreField] = useState<string>("");
    const [composition, setComposition] = useState<boolean>(false);


    const keyDown = (e: KeyboardEvent<HTMLElement>) => {
        if (!composition && e.code === "Enter") {
            handleClick(null);
        }
    }

    async function handleClick(event: MouseEvent<HTMLButtonElement | MouseEvent> | null) {
        if (event != null) {
            event.preventDefault();
        }
        if (prefield != field) {
            if (field == "") {
                targetSetter(initData);
            } else {
                const getData = await search(field, searchIndex);
                const formatData = reformatFunc(getData);
                targetSetter(formatData);
            }
        }
        setPreField(field);
    }

    return (
        <div style={{display: "flex", flexWrap: "wrap", padding: 0, margin: 1}}>
            <Box display="flex" flexWrap="wrap" border={2}
                 sx={{margin: 0, boxShadow: 2, padding: 0, backgroundColor: "white"}}>
                <TextField onChange={(event) => {
                    setField(event.target.value)
                }}
                           sx={{color: "white"}}
                           id="filled-basic"
                           label="Search..."
                           onKeyDown={(e) => {
                               keyDown(e)
                           }}
                           onCompositionStart={() => {
                               setComposition(true)
                           }}
                           onCompositionEnd={() => {
                               setComposition(false)
                           }}
                           variant="filled"/>
                <Button variant={"contained"}
                        sx={{margin: 0, boxShadow: 1, borderRadius: 0}}
                        endIcon={<SearchIcon/>}
                        onClick={handleClick}
                >
                    Search
                </Button>
            </Box>
        </div>
    );
}

export default SearchBox;
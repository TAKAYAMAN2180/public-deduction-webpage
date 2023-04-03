import groupsInitData from "../lib/source/groupsInfoData.json"
import React, {FC, useEffect, useRef} from "react";
import {useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import {useRouter} from "next/router";
import {number} from "prop-types";
import {AppBar, Toolbar, Typography} from '@mui/material';
import SearchBoxForGroups from "../lib/components/GroupsSearchBox";
import {GroupData} from "../lib/types/GroupData";
import {GroupsData} from "../lib/types/GroupsData";
import {fontSize} from "@mui/system";

/*このとき、Tは暗黙的に推論される*/
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
) => number {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


export const SimpleTable: FC = () => {
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState<keyof GroupData>("areaNum");
    const [groupsData, setGroupData] = useState<GroupsData>(groupsInitData);

    const createSortHandler = (property: keyof GroupData) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const router = useRouter();

    return (
        <div>
            <AppBar position="sticky" sx={{padding: 1}}>
                <Toolbar>
                    <Typography variant="h6" sx={{
                        fontSize: "25px",
                        "@media screen and (max-width:450px)": {
                            display: "none",
                        },
                    }}>団体一覧</Typography>
                    <div style={{flexGrow: 1}}/>
                    <SearchBoxForGroups dataSetter={setGroupData}/>
                </Toolbar>
            </AppBar>
            <TableContainer>
                <Table>
                    <TableHead sx={{borderBottom: "solid 2px black"}}>
                        <TableRow>
                            <TableCell sx={{padding: "5px"}}>
                                <TableSortLabel
                                    sx={{padding: 0,fontSize: "12px",width: "6rem",textAlign: "center"}}
                                    hideSortIcon
                                    active={orderBy === "areaNum"}
                                    direction={orderBy === "areaNum" ? order : "asc"}
                                    onClick={() => {
                                        setOrderBy("areaNum");
                                        createSortHandler("areaNum")
                                    }}
                                >
                                    区画番号
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{padding: "5px"}}>
                                <TableSortLabel
                                    sx={{padding: 0,fontSize: "12px",width: "6rem",textAlign: "center"}}
                                    hideSortIcon
                                    active={orderBy === "applyNum"}
                                    direction={orderBy === "applyNum" ? order : "asc"}
                                    onClick={() => {
                                        setOrderBy("applyNum");
                                        createSortHandler("applyNum")
                                    }}
                                >
                                    申込番号
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{padding: "5px"}}>
                                <TableSortLabel
                                    sx={{padding: "8px",fontSize: "12px"}}
                                    hideSortIcon
                                    active={orderBy === "groupName"}
                                    direction={orderBy === "groupName" ? order : "asc"}
                                    onClick={() => {
                                        setOrderBy("groupName");
                                        createSortHandler("groupName");
                                    }}
                                >
                                    団体名
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {groupsData.sort(getComparator(order, orderBy)).map((group, index) => {
                            return (
                                <TableRow key={index}
                                          onClick={() => router.push("/group/" + group.identifier)}>
                                    <TableCell sx={{width: "6rem",textAlign: "center"}}>{group.areaNum}</TableCell>
                                    <TableCell sx={{width: "6rem",textAlign: "center"}}>{group.applyNum}</TableCell>
                                    <TableCell>{group.groupName}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};


export default SimpleTable;

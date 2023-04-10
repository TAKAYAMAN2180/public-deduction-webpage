import {
    AppBar,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography
} from '@mui/material';
import groupsInitData from "../lib/source/groupsInfoData.json"
import React, {FC, useState,} from "react";
import {useRouter} from "next/router";
import SearchBoxForGroups from "../components/GroupsSearchBox";
import {GroupData} from "../lib/types/GroupData";
import {GroupsData} from "../lib/types/GroupsData";
import {ThemeProvider} from '@mui/material/styles';
import theme from '../lib/theme';
import TopicPathBox, {TopicPathHome} from "../components/TopicPath";
import {getComparator, Order} from '../lib/sortUtil';


export const SimpleTable: FC = () => {
    const [order, setOrder] = useState<Order>(Order.ASC);
    const [orderBy, setOrderBy] = useState<keyof GroupData>("areaNum");
    const [groupsData, setGroupData] = useState<GroupsData>(groupsInitData);

    const createSortHandler = (property: keyof GroupData) => {
        const isAsc = orderBy === property && order === Order.ASC;
        setOrder(isAsc ? Order.DESC : Order.ASC);
        setOrderBy(property);
    };

    const router = useRouter();

    return (
        <div>
            <ThemeProvider theme={theme}>
                <AppBar position="sticky" sx={{padding: 1}}>
                    <Toolbar>
                        <Typography variant="h6" sx={{
                            fontSize: "25px",
                            "@media screen and (max-width:450px)": {
                                display: "none",
                            },
                        }}>団体一覧</Typography>
                        <Box sx={{
                            flexGrow: 1,
                            "@media screen and (max-width:450px)": {
                                display: "none",
                            },
                        }}/>
                        <SearchBoxForGroups dataSetter={setGroupData}/>

                    </Toolbar>
                </AppBar>
                <TopicPathBox>
                    <TopicPathHome>団体情報</TopicPathHome>
                </TopicPathBox>
                <TableContainer>
                    <Table>
                        <TableHead sx={{borderBottom: "double 4px black", borderTop: "solid 1px black"}}>
                            <TableRow>
                                <TableCell sx={{padding: "5px"}}>
                                    <TableSortLabel
                                        sx={{padding: 0, fontSize: "12px", width: "6rem", textAlign: "center"}}
                                        hideSortIcon
                                        active={orderBy === "areaNum"}
                                        direction={orderBy === "areaNum" ? order : Order.ASC}
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
                                        sx={{padding: 0, fontSize: "12px", width: "6rem", textAlign: "center"}}
                                        hideSortIcon
                                        active={orderBy === "applyNum"}
                                        direction={orderBy === "applyNum" ? order : Order.ASC}
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
                                        sx={{padding: "8px", fontSize: "12px"}}
                                        hideSortIcon
                                        active={orderBy === "groupName"}
                                        direction={orderBy === "groupName" ? order :Order.ASC}
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
                                        <TableCell sx={{width: "6rem", textAlign: "center"}}>{group.areaNum}</TableCell>
                                        <TableCell
                                            sx={{width: "6rem", textAlign: "center"}}>{group.applyNum}</TableCell>
                                        <TableCell>{group.groupName}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </ThemeProvider>
        </div>
    );
};


export default SimpleTable;

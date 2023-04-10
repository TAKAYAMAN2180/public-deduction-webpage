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
    Typography,
    IconButton
} from '@mui/material';
import deductionsInitData from "../../lib/source/deductionsInfoData.json"
import React, {FC, MouseEvent, useEffect, useState} from "react";
import {useRouter} from "next/router";
import SearchBoxForDeductions from "../../components/DeductionsSearchBox";
import {Deduction} from "../../lib/types/firebase/Deduction";
import {ArrowBack} from "@mui/icons-material";
import TopicPathBox, {TopicPathHome, TopicPathSub} from "../../components/TopicPath";
import {getComparator, Order} from "../../lib/sortUtil";


const SimpleTable: FC = () => {
    const [order, setOrder] = useState<Order>(Order.ASC);
    const [deductionsData, setDeductionsData] = useState<Deduction[]>(deductionsInitData);
    const router = useRouter();

    useEffect(() => {
        if (router.query.identifier == "") {
            router.push("/");
        }
    }, [router])


    const createSortHandler = () => {
        setOrder(order == Order.ASC ? Order.DESC : Order.ASC);
    };

    const handleRowClick = (deductionIndex: number) => {
        router.push({
            pathname: "./send",
            query: {identifier: router.query.identifier, deductionIndex: deductionIndex}
        })
    }

    const handleIconClick = (event: MouseEvent<HTMLButtonElement | MouseEvent>) => {
        event.preventDefault();
        router.push("/group/" + router.query.identifier);

    }

    return (
        <div>
            <AppBar position="sticky" sx={{padding: 1}}>
                <Toolbar>
                    <IconButton onClick={handleIconClick}>
                        <ArrowBack sx={{color: "white"}}/>
                    </IconButton>
                    <Typography variant="h6" sx={{
                        fontSize: "25px",
                        "@media screen and (max-width:450px)": {
                            display: "none",
                        },
                    }}>項目一覧</Typography>
                    <div style={{flexGrow: 1}}/>
                    <SearchBoxForDeductions dataSetter={setDeductionsData}/>
                </Toolbar>
            </AppBar>
            <TopicPathBox>
                <TopicPathSub href={"/"}>団体一覧</TopicPathSub>
                <TopicPathSub href={"/group/" + router.query.identifier}>団体情報</TopicPathSub>
                <TopicPathHome>項目一覧</TopicPathHome>
            </TopicPathBox>
            <Box m={2}>①該当する減点項目を選択してください</Box>
            <TableContainer>
                <Table>
                    <TableHead sx={{borderBottom: "double 4px black", borderTop: "solid 1px black"}}>
                        <TableRow>
                            <TableCell sx={{padding: "5px"}}>
                                <TableSortLabel
                                    sx={{padding: 0, fontSize: "12px", width: "6rem", textAlign: "center"}}
                                    active
                                    direction={order}
                                    onClick={createSortHandler}
                                >
                                    減点数
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sx={{padding: "5px", fontSize: "12px", width: "6rem", textAlign: "center"}}>
                                項目番号
                            </TableCell>
                            <TableCell sx={{padding: "5px", fontSize: "12px"}}>
                                団体名
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {deductionsData.sort(getComparator(order, "points")).map((deduction, index) => {
                            return (
                                <TableRow key={index} onClick={() => {
                                    handleRowClick(deduction.index)
                                }}>
                                    <TableCell sx={{textAlign: "center"}}>{deduction.points}</TableCell>
                                    <TableCell
                                        sx={{textAlign: "center"}}>{deduction.index}</TableCell>
                                    <TableCell>{deduction.content}</TableCell>
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

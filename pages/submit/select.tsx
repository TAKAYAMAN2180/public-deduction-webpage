import deductionsInitData from "../../lib/source/deductionsInfoData.json"
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
import SearchBoxForDeductions from "../../lib/components/DeductionsSearchBox";
import {fontSize} from "@mui/system";
import {Deduction} from "../../lib/types/firebase/Deduction";
import Box from "@mui/material/Box";
import Link from "next/link";

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


const SimpleTable: FC = () => {
    const [order, setOrder] = useState<Order>("asc");
    const [deductionsData, setDeductionsData] = useState<Deduction[]>(deductionsInitData);
    const router = useRouter();

    useEffect(() => {
        if (router.query.identifier == "") {
            router.push("/");
        }
    }, [router])


    const createSortHandler = (property: keyof Deduction) => (
        event: React.MouseEvent<unknown>
    ) => {
        setOrder(order === "asc" ? "desc" : "asc");
    };

    const handleRowClick = (deductionIndex: number) => {
        router.push({
            pathname: "./send",
            query: {identifier: router.query.identifier, deductionIndex: deductionIndex}
        })
    }

    return (
        <div>
            <AppBar position="sticky" sx={{padding: 1}}>
                <Toolbar>
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
            <Link href={"/"}>← 団体一覧へ戻る</Link>
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
                                    onClick={createSortHandler("points")}
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
                                <TableRow key={index} onClick={()=>{handleRowClick(deduction.index)}}>
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

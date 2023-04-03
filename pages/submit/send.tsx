import React, {FC, MouseEvent, ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {router} from "next/client";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import SearchBoxForGroups from "../../lib/components/GroupsSearchBox";
import {ArrowBack} from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import groupsInfoData from "../../lib/source/groupsInfoData.json";
import deductionsInfoData from "../../lib/source/deductionsInfoData.json";
import axios from 'axios';
import  {createHash} from 'crypto';
import {setDeductionInfo} from "../../lib/firebase/setterFirestore";


import {GroupData} from "../../lib/types/GroupData";
import {Deduction} from "../../lib/types/firebase/Deduction";
import TextField from "@mui/material/TextField";
import {useRouter} from "next/router";
import Box from "@mui/material/Box";

const SendInfo: FC = () => {
    const [targetGroup, setTargetGroup] = useState<GroupData | null>(null);
    const [targetDeduction, setTargetDeduction] = useState<Deduction | null>(null);
    const router = useRouter();

    const [myValue, setMyValue] = useState<string>('');

    useEffect(() => {
        if (router.query.identifier && router.query.deductionIndex) {
            const group = groupsInfoData.find((groupInfo) => groupInfo.identifier === router.query.identifier);
            const deduction = deductionsInfoData.find((deductionsInfo) => deductionsInfo.index.toString() === router.query.deductionIndex);
            if (group == null || deduction == null) {
                window.alert("管理者に連絡してください");
                router.push("/");
            } else {
                setTargetGroup(group);
                setTargetDeduction(deduction);
            }
        } else {
            router.push("/");
        }
    }, [router]);

    const handleIconClick = (event: MouseEvent<HTMLButtonElement | MouseEvent>) => {
        event.preventDefault();
        router.push({
            pathname: "/submit/select",
            query: {identifier: router.query.identifier}
        });
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMyValue(event.currentTarget.value);
    };

    const handleBtnClick = async (event: MouseEvent<HTMLButtonElement | MouseEvent>) => {
        event.preventDefault();

        const currentTime = new Date().getTime();
        const dataToHash = `${myValue}${currentTime}`;

        const hash = createHash("sha256").update(dataToHash).digest("hex");

        console.log(hash);

        try {
            const response = await axios.post("https://script.google.com/macros/s/AKfycbxdHHM0HIv3j_F6bu4zQVhAOXbVz63S9748YXf2Ym4wARELe6Rcl6Doc52h9_H5SoRM/exec?groupname=" + targetGroup?.groupName + "&areanum=" + targetGroup?.areaNum + "&deductionindex=" + targetDeduction?.index + "&content=" + targetDeduction?.content + "&name=" + myValue + "&point=" + targetDeduction?.points + "&deductionidentifier=" + hash + "&groupidentifer=" + targetGroup?.identifier);
            console.log(response.data);

            //Firestoreのデータを追加
            setDeductionInfo(targetGroup?.identifier,myValue,targetDeduction?.index,hash)

            window.alert("登録が成功しました。\n団体リストへ戻ります。");
            router.push("/")

        } catch (error) {
            window.alert("実行中に予期せぬエラーが発生しました。管理者へ連絡してください。")
        }

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
                    }}>情報の入力</Typography>
                </Toolbar>
            </AppBar>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mt={2}
            >
                <Grid container alignItems={"left"} justifyContent={"flex-start"} direction={"column"}
                      sx={{width: "300px"}}>
                    <Grid item xs={12} ml={1} sx={{fontSize: "0.8rem"}}>②内容を確認し、名前を入力してください。</Grid>
                    <Grid item xs={12} mt={"1rem"}>【グループ名】</Grid>
                    <Grid item xs={12} ml={1}>{targetGroup?.groupName}</Grid>
                    <Grid item xs={12} mt={"1rem"}>【減点項目】</Grid>
                    <Grid item
                          xs={12} ml={1}>{`${targetDeduction?.points}点減点 ${targetDeduction?.content}`}</Grid>
                    <Grid item xs={12} mt={"1rem"}>【氏名】</Grid>
                    <Grid item xs={12} ml={1}><TextField id="standard-basic" label="氏名を入力してください"
                                                         onChange={handleInputChange}
                                                         variant="standard" fullWidth/></Grid>
                    <Grid item container xs={12}>
                        <Grid item xs/>
                        <Grid item xs={4}>
                            <Button variant={"contained"}
                                    onClick={handleBtnClick}
                                    sx={{
                                        marginTop: "1rem",
                                        width: "100px",
                                        marginLeft: "auto",
                                        marginRight: "auto"
                                    }}>報告する</Button>
                        </Grid>
                        <Grid item xs/>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default SendInfo;
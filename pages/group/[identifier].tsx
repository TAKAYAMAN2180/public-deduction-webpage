import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import HEAD from "next/head";
import {useRouter} from 'next/router';
import groupsInfoData from "../../lib/source/groupsInfoData.json";
import {ParsedUrlQuery} from "querystring";
import React, {MouseEvent, useEffect, useState} from "react";
import {getDeductionPoint, getDeductionInfo} from "../../lib/firebase/getterFirestore"

import {DeductionsInfo} from "../../lib/types/firebase/DeductionsInfo";
import deductionsInfoData from "../../lib/source/deductionsInfoData.json"
import Grid from "@mui/material/Grid";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import styled from "styled-components"
import DeductionPane from "../../components/DeductionPane";
import Box from "@mui/material/Box";
import Link from "next/link";
import TopicPathBox, {TopicPathSub, TopicPathHome} from "../../components/TopicPath";

const StyledSample = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
`;

const StyledLine = styled.div`
  flex-grow: 1;
  border-bottom: 3px double #333;

  &:first-child {
    margin-right: 10px;
    padding-left: 70px;
  }

  &:last-child {
    margin-left: 10px;
    padding-right: 70px;
  }
`;


type PostProps = {
    identifier: string;
}

const Post: NextPage<PostProps> = (props) => {
    const {identifier} = props;
    const [deductionPoint, setDeductionPoint] = useState<number | "">("");
    const [deductionsInfo, setDeductionsInfo] = useState<DeductionsInfo[] | null>(null);
    const [details, setDetails] = useState<string | null>(null);

    const group = groupsInfoData.find((groupInfo) => groupInfo.identifier === identifier);
    useEffect(() => {
        getDeductionPoint(identifier).then((getPoint: any) => {
            if (getPoint !== undefined) {
                setDeductionPoint(getPoint.points);
                if (getPoint.details != null || getPoint.details != undefined || getPoint.details != "") {
                    setDetails(getPoint.details);
                }
            }
        });
        getDeductionInfo(identifier).then((subCollections: DeductionsInfo[] | undefined) => {
            if (subCollections !== undefined) {
                console.log(subCollections);
                setDeductionsInfo(subCollections);
            }
        });
    }, [identifier])

    const getContent = (index: number): string | null => {
        const deductionContent = deductionsInfoData.find((deductionsInfo) => deductionsInfo.index === index)?.content;
        return deductionContent ?? null;
    }

    const router = useRouter();

    const handleIconClick = (event: MouseEvent<HTMLButtonElement | MouseEvent>) => {
        event.preventDefault();
        router.push("/");
    }

    const handleBtnClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        router.push({
            pathname: "/submit/select",
            query: {identifier: identifier}
        })
    }


    //ビルド時にそのページが存在していなかった場合には、ページが作成され、ユーザにページを表示する
    // なお、ページが作成されているとき、「router.isFallback」が「true」になる
    if (router.isFallback) {
        return <div>Loading...</div>
    }


    return (
        <>
            <HEAD>
                <title>{`${group?.groupName}の情報`}</title>
            </HEAD>
            <main>
                <AppBar position="sticky" sx={{padding: 1}}>
                    <Toolbar>
                        <IconButton onClick={handleIconClick}>
                            <ArrowBack sx={{color: "white"}}/>
                        </IconButton>
                        <Typography variant="h6" sx={{
                            fontSize: "25px",
                        }}>各団体の情報</Typography>
                    </Toolbar>
                </AppBar>
                <TopicPathBox>
                    <TopicPathSub href={"/"}>{"団体一覧"}</TopicPathSub>
                    <TopicPathHome>{"団体の情報"}</TopicPathHome>
                </TopicPathBox>
                <Grid container alignItems={'center'} justifyContent={'center'} direction={"column"} mt={2}>
                    <Grid item xs={12}>{`区画：${group?.areaNum}番, 受付：${group?.applyNum}番`}</Grid>
                    <Grid item xs={12}>{group?.groupName}</Grid>
                    <Grid item xs={12} sx={{fontSize: "112px"}}>{deductionPoint}</Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" justifyContent="center">
                            <StyledSample>
                                <StyledLine/>
                                <div>特記事項</div>
                                <StyledLine/>
                            </StyledSample>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>{(details == null || details == "") ? <Box mt={2}>特記事項なし</Box> :
                        <Box mt={2}>{details}</Box>}</Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" justifyContent="center" mt={2}>
                            <StyledSample>
                                <StyledLine/>
                                <div>減点情報</div>
                                <StyledLine/>
                            </StyledSample>
                        </Grid>
                    </Grid>
                    {deductionsInfo && deductionsInfo.length > 0 ? deductionsInfo.sort((a, b) => a.registeredTime - b.registeredTime).map(deductionInfo => {
                        return (
                            <DeductionPane key={`${deductionInfo.registeredTime}${deductionInfo.deductionIndex}`}
                                           deductionsInfo={deductionInfo}/>
                        );
                    }) : (
                        <p>違反なし</p>
                    )}
                    <Grid item xs={12}>
                        <Button variant={"contained"} size="large"
                                sx={{marginTop: "1rem", boxShadow: 3}}
                                onClick={handleBtnClick}
                        >違反報告</Button>
                    </Grid>

                </Grid>
            </main>

        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = groupsInfoData.map((groupInfo) => ({
            params: {identifier: groupInfo.identifier},
        }
    ));

    return {paths, fallback: false}

}

// パラメータの型を定義
interface PostParams extends ParsedUrlQuery {
    identifier: string;
}

export const getStaticProps: GetStaticProps<PostProps, PostParams> = async (content) => {
    return {
        props: {
            //     pramsにgetStaticPathsで指定した値がそれぞれ入っている
            identifier: content.params!['identifier'],
        },
    }
}

export default Post


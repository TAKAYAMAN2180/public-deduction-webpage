import React, {FC} from 'react';
import styled from 'styled-components';
import {Typography} from "@mui/material";
import Link from "next/link";
import Box from "@mui/material/Box";
import {UrlObject} from "url";

//団体一覧→団体情報→項目一覧→情報の入力

type PropsType = {
    href: string | UrlObject;
    children: string;
}

const TopicPathSub: FC<PropsType> = ({href, children}: PropsType) => {
    return (
        <Link href={href}>
            <Typography sx={{
                color: 'blue',
                textDecoration: 'underline',
                display: "inline",
                fontSize: "14px"
            }}>{children}</Typography>
        </Link>
    );
}


const TopicPathHome = styled(Typography)`
  color: black;
  display: inline;
  font-size: 14px;
`

const TopicPathBox = styled(Box)`
  padding-left: 2px;
  margin-top: 2px;

  > *:before {
    content: ">";
    font-size: 14px;
    margin: 0 4px;
    font-weight: normal;
  }
`

export {TopicPathSub, TopicPathHome};
export default TopicPathBox;
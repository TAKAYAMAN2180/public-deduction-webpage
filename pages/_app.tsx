import '../styles/globals.css'
import Head from 'next/head';

import type {AppProps} from 'next/app'
import {ThemeProvider} from '@mui/material/styles';
import {CacheProvider, EmotionCache} from '@emotion/react';
import createEmotionCache from "../lib/createEmotionCache";
import theme from "../lib/theme";
import {CssBaseline} from "@mui/material";
import {DevSupport} from "@react-buddy/ide-toolbox-next";
import {ComponentPreviews, useInitial} from "../components/dev";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                    <DevSupport ComponentPreviews={ComponentPreviews}
                                useInitialHook={useInitial}
                    >
                        <Component {...pageProps} />
                    </DevSupport>
            </ThemeProvider>
        </CacheProvider>
    )
}

export default MyApp

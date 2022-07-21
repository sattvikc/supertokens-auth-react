import Head from "next/head";
import React, { useEffect } from "react";
import styles from "../../styles/Home.module.css";
import dynamic from "next/dynamic";
import SuperTokens from "supertokens-auth-react";

const SuperTokensComponentNoSSR = dynamic(new Promise((res) => res(SuperTokens.getRoutingComponent)), { ssr: false });

export default function Auth() {
    useEffect(() => {
        if (SuperTokens.canHandleRoute() === false) {
            SuperTokens.redirectToAuthWithoutRedirectToPath();
        }
    }, []);

    return <SuperTokensComponentNoSSR />;
}

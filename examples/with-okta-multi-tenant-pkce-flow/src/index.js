import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as reactRouterDom from "react-router-dom";

import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import ThirdParty from "supertokens-auth-react/recipe/thirdparty";

import Session from "supertokens-auth-react/recipe/session";

import Index from "./routes/index"
import Dashboard from "./routes/dashboard"

SuperTokens.init({
    appInfo: {
        appName: "Multitenant Example",
        apiDomain: "http://multitenant.com:8000",
        websiteDomain: window.location.origin,
    },
    recipeList: [
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [
                  {
                    id: "okta",
                    name: "Okta",
                    buttonComponent: <div style={{
                        cursor: "pointer",
                        border: "1",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                        borderRadius: "5px",
                        borderStyle: "solid"
                    }}>Login with Okta</div>
                  }
                ]
            },
            getRedirectionURL: async (context) => {
              if (context.action === "SUCCESS") {
                  if (context.redirectToPath !== undefined) {
                      // we are navigating back to where the user was before they authenticated
                      return context.redirectToPath;
                  }
                  return "/dashboard";
              }
              return undefined;
          },
          preAPIHook: async (context) => {
            let url = context.url;

            // is the fetch config object that contains the header, body etc..
            let requestInit = context.requestInit;

            let action = context.action;
            const tenant = window.localStorage.getItem('tenant');
            if (action === "THIRD_PARTY_SIGN_IN_UP") {
              const params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
              });
              url += `?state=${params.state}&tenant=${tenant}`
            } else if (action === 'GET_AUTHORISATION_URL') {
              url += `&state=${context.userContext.stateToProvider}&tenant=${tenant}`
            }

            return {
                requestInit, url
            };
          },
          override: {
            functions: (originalImplementation) => {
              return {
                ...originalImplementation,
                generateStateToSendToOAuthProvider: (input) => {
                  const resp = originalImplementation.generateStateToSendToOAuthProvider(input);
                  input.userContext.stateToProvider = resp
                  return resp
                }
              }
            }
          }
        }),
        Session.init()
    ]
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SuperTokensWrapper>
    <BrowserRouter>
      <App />
      <Routes>
        {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
        <Route path="/" element={<Index />} />
        <Route path="dashboard" element={<ThirdParty.ThirdPartyAuth><Dashboard /></ThirdParty.ThirdPartyAuth>} />
      </Routes>
    </BrowserRouter>
  </SuperTokensWrapper>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

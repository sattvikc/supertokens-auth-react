/// <reference types="react" />
/// <reference types="@emotion/react/types/css-prop" />
import EmailVerificationTheme from "../emailverification/components/themes/emailVerification";
import { UserInput, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import ThirdPartyPasswordlessAuth from "./thirdpartyPasswordlessAuth";
import SignInUpTheme from "./components/themes/signInUp";
import { Apple, Google, Facebook, Github } from "../thirdparty/";
import {
    PasswordlessFlowType,
    PasswordlessUser,
    RecipeFunctionOptions,
    RecipeInterface,
} from "supertokens-web-js/recipe/thirdpartypasswordless";
import { UserType } from "supertokens-web-js/recipe/thirdparty";
export default class Wrapper {
    static init(
        config: UserInput
    ): import("../../types").CreateRecipeFunction<
        import("../authRecipeWithEmailVerification/types").GetRedirectionURLContext,
        import("./types").PreAndPostAPIHookAction,
        OnHandleEventContext,
        import("./types").NormalisedConfig
    >;
    static signOut(): Promise<void>;
    static isEmailVerified(input?: { userContext?: any }): Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }>;
    static verifyEmail(input?: { userContext?: any }): Promise<{
        status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | "OK";
        fetchResponse: Response;
    }>;
    static sendVerificationEmail(input?: { userContext?: any }): Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
        fetchResponse: Response;
    }>;
    static redirectToThirdPartyLogin(input: { thirdPartyId: string; userContext?: any }): Promise<{
        status: "OK" | "ERROR";
    }>;
    static thirdPartySignInAndUp(input?: { userContext?: any }): Promise<
        | {
              status: "OK";
              user: UserType;
              createdNewUser: boolean;
              fetchResponse: Response;
          }
        | {
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
              fetchResponse: Response;
          }
    >;
    static createCode(
        input:
            | {
                  email: string;
                  userContext?: any;
                  options?: RecipeFunctionOptions;
              }
            | {
                  phoneNumber: string;
                  userContext?: any;
                  options?: RecipeFunctionOptions;
              }
    ): Promise<{
        status: "OK";
        deviceId: string;
        preAuthSessionId: string;
        flowType: PasswordlessFlowType;
        fetchResponse: Response;
    }>;
    static resendCode(input: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "RESTART_FLOW_ERROR";
        fetchResponse: Response;
    }>;
    static consumeCode(
        input:
            | {
                  userInputCode: string;
                  userContext?: any;
                  options?: RecipeFunctionOptions;
              }
            | {
                  userContext?: any;
                  options?: RecipeFunctionOptions;
              }
    ): Promise<
        | {
              status: "OK";
              createdUser: boolean;
              user: PasswordlessUser;
              fetchResponse: Response;
          }
        | {
              status: "INCORRECT_USER_INPUT_CODE_ERROR" | "EXPIRED_USER_INPUT_CODE_ERROR";
              failedCodeInputAttemptCount: number;
              maximumCodeInputAttempts: number;
              fetchResponse: Response;
          }
        | {
              status: "RESTART_FLOW_ERROR";
              fetchResponse: Response;
          }
    >;
    static doesPasswordlessUserEmailExist(input: {
        email: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;
    static doesPasswordlessUserPhoneNumberExist(input: {
        phoneNumber: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;
    static redirectToAuth(
        input?:
            | ("signin" | "signup")
            | {
                  show?: "signin" | "signup";
                  redirectBack?: boolean;
              }
    ): Promise<void>;
    static Google: typeof Google;
    static Apple: typeof Apple;
    static Facebook: typeof Facebook;
    static Github: typeof Github;
    static ThirdPartyPasswordlessAuth: typeof ThirdPartyPasswordlessAuth;
    static SignInAndUp: (prop?: any) => JSX.Element;
    static SignInAndUpTheme: typeof SignInUpTheme;
    static ThirdPartySignInAndUpCallback: (prop?: any) => JSX.Element;
    static EmailVerification: (prop?: any) => JSX.Element;
    static EmailVerificationTheme: typeof EmailVerificationTheme;
    static PasswordlessLinkClickedTheme: import("react").ComponentType<
        import("../passwordless/types").LinkClickedScreenProps
    >;
    static PasswordlessLinkClicked: (prop?: any) => JSX.Element;
}
declare const init: typeof Wrapper.init;
declare const signOut: typeof Wrapper.signOut;
declare const isEmailVerified: typeof Wrapper.isEmailVerified;
declare const sendVerificationEmail: typeof Wrapper.sendVerificationEmail;
declare const verifyEmail: typeof Wrapper.verifyEmail;
declare const redirectToThirdPartyLogin: typeof Wrapper.redirectToThirdPartyLogin;
declare const thirdPartySignInAndUp: typeof Wrapper.thirdPartySignInAndUp;
declare const createCode: typeof Wrapper.createCode;
declare const resendCode: typeof Wrapper.resendCode;
declare const consumeCode: typeof Wrapper.consumeCode;
declare const doesPasswordlessUserEmailExist: typeof Wrapper.doesPasswordlessUserEmailExist;
declare const doesPasswordlessUserPhoneNumberExist: typeof Wrapper.doesPasswordlessUserPhoneNumberExist;
declare const redirectToAuth: typeof Wrapper.redirectToAuth;
declare const SignInAndUp: (prop?: any) => JSX.Element;
declare const ThirdPartySignInAndUpCallback: (prop?: any) => JSX.Element;
declare const EmailVerification: (prop?: any) => JSX.Element;
declare const PasswordlessLinkClicked: (prop?: any) => JSX.Element;
export {
    ThirdPartyPasswordlessAuth,
    init,
    Apple,
    Google,
    Facebook,
    Github,
    isEmailVerified,
    sendVerificationEmail,
    verifyEmail,
    redirectToThirdPartyLogin,
    thirdPartySignInAndUp,
    createCode,
    resendCode,
    consumeCode,
    doesPasswordlessUserEmailExist,
    doesPasswordlessUserPhoneNumberExist,
    SignInAndUp,
    SignInUpTheme,
    ThirdPartySignInAndUpCallback,
    signOut,
    redirectToAuth,
    EmailVerification,
    EmailVerificationTheme,
    PasswordlessLinkClicked,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};

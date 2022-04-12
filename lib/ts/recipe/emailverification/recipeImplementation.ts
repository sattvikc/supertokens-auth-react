import { RecipeInterface } from "supertokens-web-js/recipe/emailverification";
import { OnHandleEventContext, PreAndPostAPIHookAction } from "./types";
import WebJSRecipeImplementation from "supertokens-web-js/lib/build/recipe/emailverification/recipeImplementation";
import { NormalisedAppInfo } from "../../types";
import {
    RecipeOnHandleEventFunction,
    RecipePostAPIHookFunction,
    RecipePreAPIHookFunction,
} from "../recipeModule/types";
import { NormalisedStorageHandlers } from "supertokens-web-js/utils/storage";

export default function getRecipeImplementation(recipeInput: {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    preAPIHook: RecipePreAPIHookFunction<PreAndPostAPIHookAction>;
    postAPIHook: RecipePostAPIHookFunction<PreAndPostAPIHookAction>;
    onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>;
    storageHandlers: NormalisedStorageHandlers;
}): RecipeInterface {
    const webJsImplementation = WebJSRecipeImplementation(recipeInput);

    return {
        verifyEmail: async function (input): Promise<{
            status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | "OK";
            fetchResponse: Response;
        }> {
            const response = await webJsImplementation.verifyEmail.bind(this)({
                userContext: input.userContext,
            });

            if (response.status === "OK") {
                recipeInput.onHandleEvent({
                    action: "EMAIL_VERIFIED_SUCCESSFUL",
                    userContext: input.userContext,
                });
            }

            return response;
        },

        sendVerificationEmail: async function (input): Promise<{
            status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
            fetchResponse: Response;
        }> {
            const response = await webJsImplementation.sendVerificationEmail.bind(this)({
                userContext: input.userContext,
            });

            if (response.status === "OK") {
                recipeInput.onHandleEvent({
                    action: "VERIFY_EMAIL_SENT",
                    userContext: input.userContext,
                });
            }

            return response;
        },

        isEmailVerified: async function (input): Promise<{
            status: "OK";
            isVerified: boolean;
            fetchResponse: Response;
        }> {
            const response = await webJsImplementation.isEmailVerified.bind(this)({
                userContext: input.userContext,
            });

            return response;
        },

        getEmailVerificationTokenFromURL: function (input) {
            return webJsImplementation.getEmailVerificationTokenFromURL.bind(this)({
                userContext: input.userContext,
            });
        },
    };
}

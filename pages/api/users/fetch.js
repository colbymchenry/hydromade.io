import admin from 'firebase-admin'
import {createUserWithUID, getUserByUID, runAdminQuery} from "../../../lib/firebase-admin";
import {CreateStripeAccount, CreateStripeConnectLink, GetStripeAccount} from "../../../lib/stripe-admin";
import axios from "axios";

export default async function handler(req, res) {

    if (!req.query?.uid) return res.status(400).json({});

    try {
        let user = await getUserByUID(req.query.uid);
        if (!user) user = await createUserWithUID(req.query.uid);

        let stripeAccount = undefined;

        let objToReturn = { user }

        if (!user) return res.status(400).json({});

        // if there is a user check if they have a stripe account, if not include connect URL in the payload
        if (!user.stripe_account) {
            stripeAccount = await CreateStripeAccount((await admin.auth().getUser(user.uid)).email);
            await admin.firestore().collection("users").doc(user.id).update({ stripe_account: stripeAccount.id });
            user.stripe_account = stripeAccount.id;
        } else {
            stripeAccount = await GetStripeAccount(user.stripe_account);
        }

        if (stripeAccount.requirements.disabled_reason) {
            const stripe_url = await CreateStripeConnectLink(user.stripe_account);
            let requirements = [];
            if (stripeAccount.requirements && stripeAccount.requirements.disabled_reason.includes(".")) {
                requirements = stripeAccount.requirements[stripeAccount.requirements.disabled_reason.split(".")[1]];
            }

            objToReturn = {...objToReturn, stripe_url, requirements }
        }

        const store = await runAdminQuery(await admin.firestore().collection("stores").where("owner", "==", req.query.uid).get());
        if (store.length) objToReturn = {...objToReturn, store: store[0] }

        return res.json(objToReturn);
    } catch (err) {
        console.error(err);
        return res.status(500).json({});
    }

}

import admin from 'firebase-admin'
import {runAdminQuery} from "../../../lib/firebase-admin";
import {CreateStripeAccount, CreateStripeConnectLink, GetStripeAccount} from "../../../lib/stripe-admin";

export default async function handler(req, res) {

    if (!req.query?.uid) return res.status(400).json({});

    try {
        let user = await runAdminQuery(await admin.firestore().collection("users").where("uid", "==", req.query.uid).get());

        if (!user.length) {
            await admin.firestore().collection("users").add({ uid: req.query.uid });
            user = await runAdminQuery(await admin.firestore().collection("users").where("uid", "==", req.query.uid).get());
        }

        user = user.length ? user[0] : undefined;
        let stripeAccount = undefined;

        if (!user) {
            return res.status(400).json({});
        } else {
            // if there is a user check if they have a stripe account, if not include connect URL in the payload
            if (!user.stripe_account) {
                stripeAccount = await CreateStripeAccount((await admin.auth().getUser(user.uid)).email);
                await admin.firestore().collection("users").doc(user.id).update({ stripe_account: stripeAccount.id });
                user.stripe_account = stripeAccount.id;
            } else {
                stripeAccount = await GetStripeAccount(user.stripe_account);
            }
        }

        if (stripeAccount.requirements.disabled_reason) {
            const stripe_url = await CreateStripeConnectLink(user.stripe_account);
            return res.json({ user, stripe_url });
        }

        return res.json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({});
    }

}

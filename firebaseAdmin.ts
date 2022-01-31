import admin from "firebase-admin"

/**
 * @description Firebaseの管理画面から取得した管理者アカウント情報
 * @note 環境変数は`.env.NEXT_PUBLIClocal`ファイルに定義しています
 */

const serviceAccount: admin.ServiceAccount = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: (process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY || "").replace(
        /\\n/g,
        "\n"
    ),
};

/**
 * @description
 irebase Admin SDKを扱うためのオブジェクト
 * @note バックエンドのみで使用可能
 */

export const firebaseAdmin =
    admin.apps[0] ||
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
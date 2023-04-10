import {doc, setDoc, Timestamp} from "firebase/firestore";
import {db} from "./firebaseConfig";

import deductionsInfo from '../source/deductionsInfoData.json';


async function makeDocuments() {
    const userRef = db.collection('deductions');
    const promises = await Promise.all(
        deductionsInfo.map(async (deduction) => {
            return await userRef.doc(''+deduction.index).set({
                index: deduction.index,
                points: deduction.points,
                content: deduction.content
            });
        })
    )
}

export default makeDocuments;
import {db} from "./firebaseConfig";
import 'firebase/firestore';
import {Timestamp} from "firebase/firestore";

const setDeductionInfo = async (identifier, name, deductionIndex,deductionIdentifier) => {
    const userRef = db.collection("groups").doc(identifier).collection("deductionsInfo").doc(deductionIdentifier);
    const timestamp = Timestamp.fromDate(new Date());

    await userRef.set({
        deductionIdentifier: deductionIdentifier,
        deductionIndex: deductionIndex,
        process: 3,
        registeredTime: timestamp,
        who: name,
    })


}

export {setDeductionInfo};
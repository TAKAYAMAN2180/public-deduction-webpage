import {db} from "./firebaseConfig";
import identifier from "../../pages/group/[identifier]";
import * as querystring from "querystring";

const getDeductionPoint = async (identifier) => {
    const postRef = db.collection('groups').doc(identifier);
    const getDoc = await postRef.get();
    if (getDoc.exists) {
        return getDoc.data();
    }
}

const getDeductionInfo = async (identifier) => {
    const subCollections = [];

    const postRef = db.collection("groups").doc(identifier).collection("deductionsInfo");
    const querySnapshot = await postRef.get()

    querySnapshot.forEach((doc) => {
        subCollections.push(doc.data());
    });

    return subCollections;
}

export {getDeductionPoint, getDeductionInfo};

import {doc, setDoc, Timestamp} from "firebase/firestore";
import {db} from "./firebase/firebaseConfig";

import groupsData from './source/groupsInfoData.json';


async function makeDocuments() {
    const userRef = db.collection('groups');
    const promises = await Promise.all(
        groupsData.map(async (group) => {
            return await userRef.doc(group.identifier).set({
                applyNum: group.applyNum,
                areaNum: group.areaNum,
                groupName: group.groupName,
                identifier: group.identifier,
                points: 0
            });
        })
    )
}

export default makeDocuments;
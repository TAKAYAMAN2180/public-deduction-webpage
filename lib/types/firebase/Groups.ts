import {DeductionsInfo} from "./DeductionsInfo";
import {GroupData} from "../GroupData";

export interface Groups extends GroupData {
    points: number;
    details: string;
    deductionsInfo: DeductionsInfo[] | null | undefined;
}
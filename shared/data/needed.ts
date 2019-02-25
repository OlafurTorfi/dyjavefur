import { BaseType } from "./materials";

export interface Needed extends BaseType {
  amount: number;
  stkMultiplyer: number;
  unit: string;
  ref: string;
  link: string;
  stage: string;
  description: string;
  multiplyer: number;
}

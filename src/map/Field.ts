import { Building } from "../buildings/Building";
import { Block } from "./Block";
import { Resource } from "./Resource";

export type Field = {
    block: Block;
    resource: Resource;
    building: Building | undefined;
};

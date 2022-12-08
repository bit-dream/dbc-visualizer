import type { Attributes, Message, Signal } from "dbc-can/lib/dbc/types";

export type Graph = {
    nodes: GraphNodeProps[];
    links: GraphLinkProps[];
}
  
export type GraphNodeProps = {
    id: number;
    name: string;
    type: string;
    radius: number;
    messageIdx: number | null;
    nodeIdx: number | null;
    signalIdx: number | null;
    obj: Message | Signal | Attributes | null;
}

export type GraphLinkProps = {
    source: number;
    target: number;
}
export type Graph = {
    nodes: {}[];
    links: GraphNodeProps[];
}
  
export type GraphNodeProps = {
    id: number;
    name: string;
    type: string;
    radius: number;
}
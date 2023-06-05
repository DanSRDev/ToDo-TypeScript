export interface TodoText {
    id: number;
    todoText:string;
    isDone: boolean;
}
export type Actions = 
    | { type:'set'; payload: TodoText[]}
    | { type:'add'; payload: string; done: boolean}
    | { type:'edit'; id: number ; payload: string}
    | { type:'remove'; payload: number}
    | { type:'done'; payload: number; setOthers: React.Dispatch<Actions>};
    
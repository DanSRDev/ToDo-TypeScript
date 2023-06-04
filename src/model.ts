export interface TodoText {
    id: number;
    todoText:string;
    isDone: boolean;
}

// export type Actions = 
//     | { type:'add'; payload: string}
//     | { type:'remove'; payload: number}
//     | { type:'done'; payload: number};

export type Actions = 
    | { type:'add'; payload: string}
    | { type:'edit'; id: number ; payload: string}
    | { type:'remove'; payload: number}
    | { type:'done'; payload: number};
     

// const TodoReducer = (state: TodoText[], action: Actions) => {
//     switch (action.type) {
//         case "add":
//             return [
//                 ...state,
//                 { id: Date.now(), todo: action.payload, isDone: false}
//             ]
//         case "remove":
//             return state.filter((todo) => todo.id != action.payload)
//         case "done":
//             return state.map((todo) => 
//                 todo.id !== action.payload ? { ...todo, isDone: !todo.isDone} : {}
//             );
//         default:
//             break;
//     }
// }

// const [state, dispatch] = useReducer(TodoReducer, []);

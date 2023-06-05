import { useState } from "react";
import { TodoText } from "../model";

function useLocalStorage(itemName: string, value: TodoText[]) {

    const localStorageItem: string | null = localStorage.getItem(itemName);
    let parsedItem: TodoText[];

    if(localStorageItem === null) {
        localStorage.setItem(itemName, JSON.stringify(value));
        parsedItem = value;
    } else {
        parsedItem = JSON.parse(localStorageItem);
    }

    const [item, setItem] = useState<TodoText[]>(parsedItem);

    const saveItem = (item: TodoText[]) => {
        const stringifiedItem = JSON.stringify(item);
        localStorage.setItem(itemName, stringifiedItem);
        setItem(item);
    }

    return [ item , saveItem ] as const;
}


export default useLocalStorage
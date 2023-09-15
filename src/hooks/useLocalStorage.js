import { useEffect, useState } from "react";

const useLocalStorage =(key,
    defaultValue,
    serialize=JSON.stringify,
    deserialize=JSON.parse)=>{
    const [state, setState] = useState(()=>{
        return deserialize(window.localStorage.getItem(key)) ?? defaultValue;
      });

      useEffect (()=>{
        window.localStorage.setItem(key,serialize(state))
    },[key,state,serialize]);

    return [state,setState]
}
export default useLocalStorage;
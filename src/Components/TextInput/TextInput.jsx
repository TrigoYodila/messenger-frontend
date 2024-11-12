/* eslint-disable react/prop-types */
import { forwardRef, useEffect, useRef} from 'react'


export default forwardRef(function TextInput({type='text', isFocused = false, ...props}, ref){
    const localRef = useRef()
    const input = ref ? ref : localRef

    useEffect(()=>{
        if(isFocused){
            input.current.focus()
        }
    },[])

    return (
        <input
            {...props}
            type={type}
            className='px-4 py-3 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm w-full'
            ref={input}
        />
    )
})
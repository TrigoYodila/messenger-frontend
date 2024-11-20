/* eslint-disable react/prop-types */
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import  { Fragment } from 'react'
import { axios } from '../../config/axios'

const  UserOptionsDropdown = ({conversation}) => {

    const changeUserRole = () => {
        if(!conversation.is_user){
            return
        }

        axios.post('changeRole', conversation.id)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const onBlockUser = () => {
        if(!conversation.is_user){
            return
        }

        axios.post('blockUnblock', conversation.id)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

  return (
    <div>
        <Menu as={'div'} className='relative inline-block text-left'>
            <div>
                <MenuButton className='flex justify-center items-center w-8 h-8 rounded-full hover:bg-black/40'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                </MenuButton>
            </div>
            <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
            >
                <MenuItems className='absolute right-0 mt-2 w-48 rounded-md bg-gray-800 shadow-lg z-50'>
                    <div className='px-1 py-1'>
                        <MenuItem>
                            {({isActive}) => (
                                <button
                                    onClick={onBlockUser}
                                    className={`${
                                        isActive ? 'bg-black/30 text-white' : 'text-gray-100'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    {conversation.blocked_at && (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 mr-2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                            </svg>
                                            Unblock User
                                        </>
                                    )}
                                    {!conversation.blocked_at && (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 mr-2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                            </svg>

                                            Block User
                                        </>
                                    )}
                                </button>
                            )}
                        </MenuItem>
                    </div>
                    <div className='px-1 py-1'>
                        <MenuItem>
                        {({isActive}) => (
                                <button
                                    onClick={changeUserRole}
                                    className={`${
                                        isActive ? 'bg-black/30 text-white' : 'text-gray-100'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    {conversation.is_admin && (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 mr-2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                            </svg>
                                            Make Regular User
                                        </>
                                    )}
                                    {!conversation.is_admin && (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 mr-2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                                            </svg>
                                            Make Admin
                                        </>
                                    )}
                                </button>
                            )}
                        </MenuItem>
                    </div>
                </MenuItems>
            </Transition>
        </Menu>
    </div>
  )
}

export default UserOptionsDropdown
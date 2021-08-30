import React, { useState, useContext } from 'react'


const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openSidebar = () => {
        setIsSidebarOpen(true);
    }
    const closeSidebar = () => {
        setIsSidebarOpen(false);
    }
    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }
    return <AppContext.Provider value={{
        isModalOpen,
        isSidebarOpen,
        openModal,
        openSidebar,
        closeModal,
        closeSidebar
    }}>{children}</AppContext.Provider>
}

//第一种方法，在组件中使用AppContext函数获取数据

//custom hook
//第二种方法，使用useGlobalContext导出
export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider }
import React, { useState, useContext } from 'react'
import sublinks from './data'

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    //侧边栏开关状态
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    //下拉菜单开关状态
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(true);
    //下拉菜单位置
    const [location, setLocation] = useState({});
    //当前需要显示的下拉菜单的page值
    const [page, setPage] = useState({ page: '', links: [] });

    const openSidebar = () => {
        setIsSidebarOpen(true);
    }

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    }

    const openSubmenu = (text, coordinates) => {
        //仅展示该按钮对应得菜单：对于data中的sublinks列表，找出其page值和传入的text值相同的link
        const page = sublinks.find((link) => link.page === text);
        //改变page值
        setPage(page);
        //改变坐标
        setLocation(coordinates);
        //打开下拉菜单
        setIsSubmenuOpen(true);
    }

    const closeSubmenu = () => {
        setIsSubmenuOpen(false);
    }

    return <AppContext.Provider
        value={{
            isSubmenuOpen,
            isSidebarOpen,
            openSubmenu,
            openSidebar,
            closeSubmenu,
            closeSidebar,
            location,
            page
        }}>
        {children}
    </AppContext.Provider>
}

//6 使用useGlobalContext 导出AppContext
export const useGlobalContext = () => {
    return useContext(AppContext);
}
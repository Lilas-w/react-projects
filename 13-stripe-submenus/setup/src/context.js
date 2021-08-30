import React, { useState, useContext } from 'react'
import sublinks from './data'

//2 在context中构建AppContext，AppProvider，后者记得使用children获得内容
const AppContext = React.createContext();

// 7导出AppProvider
export const AppProvider = ({ children }) => {
    // 3 定义状态
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(true);
    //  15 location：定义location状态，传入AppContext.Provider中value里，在Submenu组件中传入location状态
    const [location, setLocation] = useState({});
    //  links: 让可移动的下拉菜单模块中显示对应导航栏的下拉菜单
    // 23 定义page状态，传入AppContext.Provider中value里，在Submenu组件中传入page对象
    const [page, setPage] = useState({ page: '', links: [] });

    //4 定义四个函数改变状态
    const openSidebar = () => {
        setIsSidebarOpen(true);
    }
    const closeSidebar = () => {
        setIsSidebarOpen(false);
    }
    // 14 给openSubmenu函数传入文字、坐标参数
    const openSubmenu = (text, coordinates) => {
        //24 如果该page是对应导航栏按钮的下拉菜单，则将page状态值设为该page
        const page = sublinks.find((link) => link.page === text);
        setPage(page);
        //接着在submenu返回的UI中使用map生成page对应的links 

        //16 更改location状态
        setLocation(coordinates);
        setIsSubmenuOpen(true);
        //继续在submenu组件中操作
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
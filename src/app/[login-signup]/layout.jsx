import React from 'react';

const Layout = ({ children }) => {
    return (
        <div>
            {/* Add your header component here */}
            
            <main>
                {children}
            </main>
            
            {/* Add your footer component here */}
        </div>
    );
};

export default Layout;
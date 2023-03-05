import React from 'react';

const HeaderMain = () => {
    return (
        <div className="header">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb" style={{ backgroundColor: 'white' }}>
                    <li className="breadcrumb-item">Project</li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Project Detail
                    </li>
                </ol>
            </nav>
        </div>

    );
}

export default HeaderMain;

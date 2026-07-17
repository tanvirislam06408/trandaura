import React from 'react';

const loading = () => {
    return (
        <div className="w-full min-h-[80vh] flex flex-col items-center justify-center p-8 space-y-4">
            <div className="h-12 w-12 rounded-full border-4 border-[#14B8A6]/20 border-t-[#14B8A6] animate-spin" />
            <p className="text-gray-500 font-medium animate-pulse">Loading admin workspace...</p>
        </div>
    );
};

export default loading;
import React from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import UploadFile from './UploadFile';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/"  element={<UploadFile />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default App;
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchForm from 'components/SearchForm/SearchForm';
import ResumeForm from 'components/ResumeForm/ResumeForm';
import Error from 'components/Error/Error';

function App() {
  return (
    <Routes>
       <Route
          path={`/`}
          element={<SearchForm />}
        />
         <Route
          path={`/resume/*`}
          element={<ResumeForm />}
        />
        <Route
          path='/error'
          element={<Error />}
        />  
    </Routes>
  )
}

export default App

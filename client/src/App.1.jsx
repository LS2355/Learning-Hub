import { Learning, Practice, Navbar, Sidebar, QuestionsPage } from "./modules";
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { FetchLeetCodeData } from "./modules/fetchGraphQl";

// hover effect i liked https://uiverse.io/WhiteNervosa/popular-ladybug-27
export function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [isDemoAccount, setIsDemoAccount] = useState(true);

  const [questionIconClicked] = useState(false);
  return (
    <div className='m-0 p-0 w-screen h-screen bg-background sm:flex overflow-x-hidden'>
      <FetchLeetCodeData />
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Learning />} />
        <Route path="/practice" element={<Practice
          isDemoAccount={isDemoAccount} />} />

        {questionIconClicked ? <QuestionsPage /> : " "}
      </Routes>
    </div>
  );
}

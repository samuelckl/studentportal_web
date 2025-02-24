function Sidebar({ activeTab, setActiveTab }) { // Work as the side tab panel
    return (
      <div className="w-1/4 bg-gray-800 text-white p-8">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          {["home", "profile", "enrollment"].map((tab) => ( // Map all tabs with setTab function
            <li key={tab}>
              <button
                className={`w-full text-left p-2 rounded-lg ${
                  activeTab === tab ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default Sidebar;
import React from "react";
import App from './App';
const ProfileDashboard = () => {
  return (
    <div>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Profile Dashboard</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style dangerouslySetInnerHTML={{__html: "\n        :root {\n            --background: #ffffff;\n            --foreground: #000000;\n            --card: #ffffff;\n            --card-foreground: #000000;\n            --popover: #ffffff;\n            --popover-foreground: #000000;\n            --primary: #000000;\n            --primary-foreground: #ffffff;\n            --secondary: #f1f5f9;\n            --secondary-foreground: #0f172a;\n            --muted: #f1f5f9;\n            --muted-foreground: #64748b;\n            --accent: #f1f5f9;\n            --accent-foreground: #0f172a;\n            --destructive: #ff0000;\n            --destructive-foreground: #ffffff;\n            --border: #e2e8f0;\n            --input: #e2e8f0;\n            --ring: #94a3b8;\n            --radius: 0.5rem;\n        }\n\n        .dark {\n            --background: #0f172a;\n            --foreground: #ffffff;\n            --card: #1e293b;\n            --card-foreground: #ffffff;\n            --popover: #1e293b;\n            --popover-foreground: #ffffff;\n            --primary: #ffffff;\n            --primary-foreground: #0f172a;\n            --secondary: #1e293b;\n            --secondary-foreground: #ffffff;\n            --muted: #1e293b;\n            --muted-foreground: #94a3b8;\n            --accent: #1e293b;\n            --accent-foreground: #ffffff;\n            --destructive: #ff0000;\n            --destructive-foreground: #ffffff;\n            --border: #1e293b;\n            --input: #1e293b;\n            --ring: #94a3b8;\n        }\n\n        body {\n            font-family: 'Inter', sans-serif;\n            background-color: var(--background);\n            color: var(--foreground);\n        }\n\n        .btn {\n            display: inline-flex;\n            align-items: center;\n            justify-content: center;\n            border-radius: var(--radius);\n            font-weight: 500;\n            padding: 0.5rem 1rem;\n            transition: background-color 0.2s, color 0.2s;\n        }\n\n        .btn-primary {\n            background-color: var(--primary);\n            color: var(--primary-foreground);\n        }\n\n        .btn-outline {\n            border: 1px solid var(--border);\n            background-color: transparent;\n            color: var(--foreground);\n        }\n\n        .card {\n            background-color: var(--card);\n            border-radius: var(--radius);\n            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);\n            transition: all 0.2s;\n        }\n\n        .card:hover {\n            transform: translateY(-4px);\n            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\n        }\n\n        .avatar {\n            width: 2.5rem;\n            height: 2.5rem;\n            border-radius: 50%;\n            background-color: var(--muted);\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            font-weight: 600;\n            color: var(--muted-foreground);\n        }\n\n        .badge {\n            display: inline-block;\n            padding: 0.25rem 0.5rem;\n            border-radius: 9999px;\n            font-size: 0.75rem;\n            font-weight: 500;\n            background-color: var(--secondary);\n            color: var(--secondary-foreground);\n        }\n    " }} />
  {/* Sidebar */}
  <div className="flex">

    <aside className="w-64 bg-black text-white border-r border-border inline-block" style={{ verticalAlign: "top" }}>
      <div className="main" style={{ height: "100vh"}}>
        <div className="p-4 flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
            T
          </div>
          <span className="font-semibold">Ram Ram</span>
        </div>
        <div className="p-4">
          <button className="btn w-full flex items-center gap-2 bg-gray-800 text-white hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
            Add New
          </button>
        </div>
        <nav className="px-4 space-y-6">
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">PAGES</p>
            <div className="space-y-1">
              <button className="btn w-full justify-start gap-2 hover:bg-blue-900 hover:text-white transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Home
              </button>
              <button className="btn w-full justify-start gap-2 hover:bg-blue-800 hover:text-white transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M16 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
                  <line x1={9} y1={8} x2={15} y2={8} />
                  <line x1={9} y1={12} x2={15} y2={12} />
                  <line x1={9} y1={16} x2={13} y2={16} />
                </svg>
                Contract
              </button>
              <button className="btn w-full justify-start gap-2 hover:bg-blue-700 hover:text-white transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx={9} cy={7} r={4} />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Connect
              </button>
              <button className="btn w-full justify-start gap-2 hover:bg-blue-600 hover:text-white transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx={12} cy={12} r={3} />
                </svg>
                Public Profile
              </button>
              <button className="btn w-full justify-start gap-2 hover:bg-blue-500 hover:text-white transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <rect width={18} height={11} x={3} y={11} rx={2} ry={2} />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Authentication
              </button>
            </div>
          </div>
        </nav>
      </div>
    </aside>
    {/* Job Listings Section */}
    <main className="flex-1">
      <div className="border-b border-border">
        <div className="flex justify-between items-center px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold">Job Listings</h1>
          </div>
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Job Listing Card 1 */}
          <div className="card p-6 bg-white border rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full" /> {/* Placeholder for profile picture */}
              <div className="ml-4">
                <h2 className="text-lg font-semibold">Software Engineer</h2>
                <p className="text-sm text-gray-500">XYZ Tech Company</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500"><strong>Domain:</strong> Software Development</p>
              <p className="text-sm text-gray-500"><strong>Experience:</strong> 2+ Years</p>
              <p className="text-sm text-gray-500"><strong>Salary Range:</strong> $70,000 - $90,000</p>
            </div>
            <button className="btn btn-primary w-full mt-4">Apply Now</button>
          </div>
          {/* Job Listing Card 2 */}
          <div className="card p-6 bg-white border rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full" /> {/* Placeholder for profile picture */}
              <div className="ml-4">
                <h2 className="text-lg font-semibold">Product Manager</h2>
                <p className="text-sm text-gray-500">ABC Corporation</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500"><strong>Domain:</strong> Product Management</p>
              <p className="text-sm text-gray-500"><strong>Experience:</strong> 3+ Years</p>
              <p className="text-sm text-gray-500"><strong>Salary Range:</strong> $90,000 - $110,000</p>
            </div>
            <button className="btn btn-primary w-full mt-4">Apply Now</button>
          </div>
          {/* Job Listing Card 3 */}
          <div className="card p-6 bg-white border rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full" /> {/* Placeholder for profile picture */}
              <div className="ml-4">
                <h2 className="text-lg font-semibold">Data Scientist</h2>
                <p className="text-sm text-gray-500">DataWorks Solutions</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500"><strong>Domain:</strong> Data Science</p>
              <p className="text-sm text-gray-500"><strong>Experience:</strong> 2+ Years</p>
              <p className="text-sm text-gray-500"><strong>Salary Range:</strong> $80,000 - $100,000</p>
            </div>
            <button className="btn btn-primary w-full mt-4">Apply Now</button>
          </div>
          {/* Add more job cards here as needed */}
        </div>
      </div>
    </main>
  </div>
</div>

    
  
  );
};

export default ProfileDashboard;


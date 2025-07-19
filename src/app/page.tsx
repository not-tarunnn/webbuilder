import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import LivePreview from "@/components/LivePreview";
import PropertiesPanel from "@/components/PropertiesPanel";
import "@/app/globals.css";

export default function HomePage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-4 grid grid-cols-2 gap-4 overflow-auto">
          <LivePreview />
          <div className="border p-4 bg-white shadow overflow-auto">
            <h2 className="text-black font-semibold text-lg mb-2">Code Preview (Coming Soon)</h2>
            <pre className="bg-gray-100 p-2 text-sm text-gray-700 overflow-auto h-full">HTML / CSS / JS here</pre>
          </div>
        </main>
        <PropertiesPanel />
      </div>
    </div>
  );
}

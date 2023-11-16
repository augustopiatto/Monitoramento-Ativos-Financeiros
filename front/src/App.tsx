import AssetsInputs from "./components/AssetsInputs";
import AssetsView from "./components/AssetsView";

function App() {
  return (
    <div className="px-5 bg-slate-200 flex flex-col h-screen">
      <h1 className="text-3xl font-bold my-3">Inoa Sistemas</h1>
      <div className="flex h-full">
        <AssetsInputs />
        <AssetsView />
      </div>
    </div>
  );
}

export default App;

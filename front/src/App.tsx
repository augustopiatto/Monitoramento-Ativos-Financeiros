import AssetsInputs from "./components/AssetsInputs";
import AssetsView from "./components/AssetsView";

function App() {
  return (
    <div className="bg-lb1 flex flex h-screen">
      <div className="flex flex-1 flex-col h-full px-5">
        <h1 className="text-3xl font-bold my-3">Inoa Sistemas</h1>
        <AssetsInputs />
      </div>
      <AssetsView />
    </div>
  );
}

export default App;

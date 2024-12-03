import React from "react";

const AILabModal = () => {
  return (
    <div className="bg-slate-800/50 rounded-2xl p-4 space-y-3 absolute top-20 right-24 z-50">
      {/* Generate 3D Model */}
      <button className="w-full bg-slate-800 hover:bg-slate-700 transition-colors rounded-xl p-4 flex items-center gap-4 group">
        <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center">
          {/* <Cube className="w-5 h-5 text-indigo-500" /> */}
        </div>
        <div className="text-left">
          <h3 className="text-white font-medium">Generate 3D Model</h3>
          <p className="text-sm text-slate-400">
            Generate 3D Model from top AI generators.
          </p>
        </div>
      </button>

      {/* Generate Texture */}
      <button className="w-full bg-slate-800 hover:bg-slate-700 transition-colors rounded-xl p-4 flex items-center gap-4 group">
        <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center">
          {/* <Grid className="w-5 h-5 text-indigo-500" /> */}
        </div>
        <div className="text-left flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-medium">Generate Texture</h3>
            <span className="px-2 py-0.5 text-xs bg-indigo-500/10 text-indigo-500 rounded-full">
              Coming soon
            </span>
          </div>
          <p className="text-sm text-slate-400">
            Generate texture from top AI generators.
          </p>
        </div>
      </button>

      {/* Generate Music */}
      <button className="w-full bg-slate-800 hover:bg-slate-700 transition-colors rounded-xl p-4 flex items-center gap-4 group">
        <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center">
          {/* <Music className="w-5 h-5 text-indigo-500" /> */}
        </div>
        <div className="text-left flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-medium">Generate Music</h3>
            <span className="px-2 py-0.5 text-xs bg-indigo-500/10 text-indigo-500 rounded-full">
              Coming soon
            </span>
          </div>
          <p className="text-sm text-slate-400">
            Generate music from top AI generators.
          </p>
        </div>
      </button>
    </div>
  );
};

export default AILabModal;

import React, { useState, useRef } from 'react';

// Body regions ordered from most specific (smallest) to least specific (largest)
// This ensures more specific body parts are matched before general areas
const BODY_REGIONS = [
  // Head and neck (most specific)
  { name: 'Head', area: { x: [35, 65], y: [5, 20] } },
  { name: 'Neck', area: { x: [42, 58], y: [20, 25] } },
  
  // Shoulders (specific)
  { name: 'Left Shoulder', area: { x: [15, 30], y: [25, 35] } },
  { name: 'Right Shoulder', area: { x: [70, 85], y: [25, 35] } },
  
  // Arms (specific)
  { name: 'Left Arm', area: { x: [10, 25], y: [35, 55] } },
  { name: 'Right Arm', area: { x: [75, 90], y: [35, 55] } },
  { name: 'Left Forearm', area: { x: [8, 23], y: [55, 70] } },
  { name: 'Right Forearm', area: { x: [77, 92], y: [55, 70] } },
  
  // Knees (specific)
  { name: 'Left Knee', area: { x: [36, 47], y: [82, 88] } },
  { name: 'Right Knee', area: { x: [53, 64], y: [82, 88] } },
  
  // Pelvis (specific)
  { name: 'Pelvis', area: { x: [35, 65], y: [60, 68] } },
  
  // Thighs (specific)
  { name: 'Left Thigh', area: { x: [35, 48], y: [68, 85] } },
  { name: 'Right Thigh', area: { x: [52, 65], y: [68, 85] } },
  
  // Lower legs (specific)
  { name: 'Left Lower Leg', area: { x: [37, 48], y: [88, 100] } },
  { name: 'Right Lower Leg', area: { x: [52, 63], y: [88, 100] } },
  
  // Abdomen (more specific than chest)
  { name: 'Abdomen', area: { x: [32, 68], y: [45, 60] } },
  
  // Chest (least specific - largest area, checked last)
  { name: 'Chest', area: { x: [30, 70], y: [25, 45] } }
];

export default function BodyMapper3D({ spots, onAddSpot }) {
  const [markingMode, setMarkingMode] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const overlayRef = useRef(null);

  const handleOverlayClick = (e) => {
    if (!markingMode) return;
    
    const rect = overlayRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Find the most specific region (smallest area) that contains the click point
    // This ensures we match specific body parts before general areas like "Chest"
    let bestMatch = null;
    let smallestArea = Infinity;
    
    for (const region of BODY_REGIONS) {
      const inRegion = 
        x >= region.area.x[0] && x <= region.area.x[1] && 
        y >= region.area.y[0] && y <= region.area.y[1];
      
      if (inRegion) {
        // Calculate area size (width * height)
        const areaSize = (region.area.x[1] - region.area.x[0]) * (region.area.y[1] - region.area.y[0]);
        
        // Prefer smaller, more specific regions
        if (areaSize < smallestArea) {
          smallestArea = areaSize;
          bestMatch = region;
        }
      }
    }
    
    // Only register if we found a valid match
    if (bestMatch) {
      onAddSpot(bestMatch.name, x, y);
      setSelectedRegion(bestMatch.name);
      setTimeout(() => setSelectedRegion(null), 2000);
    } else {
      // Show feedback that click was outside body regions
      setSelectedRegion('No body part detected');
      setTimeout(() => setSelectedRegion(null), 1500);
    }
  };

  const removeSpot = (bodyRegion) => {
    onAddSpot(bodyRegion);
  };

  const clearAll = () => {
    spots.forEach(spot => {
      onAddSpot(spot.bodyRegion);
    });
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex flex-col sm:flex-row gap-2 mb-2">
        <button
          onClick={() => setMarkingMode(!markingMode)}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
            markingMode 
              ? 'bg-green-600 text-white shadow-lg' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <span className="hidden sm:inline">{markingMode ? '✓ Marking Mode Active' : 'Enable Marking Mode'}</span>
          <span className="sm:hidden">{markingMode ? '✓ Marking' : 'Mark'}</span>
        </button>
        <button
          onClick={() => setMarkingMode(false)}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
            !markingMode 
              ? 'bg-purple-600 text-white shadow-lg' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <span className="hidden sm:inline">{!markingMode ? '✓ Interaction Mode' : 'Enable Zoom/Rotate'}</span>
          <span className="sm:hidden">{!markingMode ? '✓ Interact' : 'Zoom'}</span>
        </button>
      </div>

      <div className="relative w-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden h-[300px] sm:h-[400px] md:h-[500px]">
        <div className="relative w-full h-full">
          <iframe 
            src="https://clara.io/embed/d49ee603-8e6c-4720-bd20-9e3d7b13978a?renderer=webgl" 
            className="w-full h-full border-0"
            allowFullScreen
          />
          <div 
            ref={overlayRef}
            onClick={handleOverlayClick}
            className={`absolute inset-0 ${markingMode ? 'cursor-crosshair' : 'pointer-events-none'}`}
            style={{ background: markingMode ? 'rgba(0,0,0,0.05)' : 'transparent' }}
          >
            {spots.map((spot, idx) => {
              const region = BODY_REGIONS.find(r => r.name === spot.bodyRegion);
              if (!region) return null;
              const displayX = spot.clickX !== undefined ? spot.clickX : (region.area.x[0] + region.area.x[1]) / 2;
              const displayY = spot.clickY !== undefined ? spot.clickY : (region.area.y[0] + region.area.y[1]) / 2;
              return (
                <div
                  key={`${spot.bodyRegion}-${idx}`}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${displayX}%`,
                    top: `${displayY}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="w-5 h-5 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                  <div className="mt-1 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                    {spot.bodyRegion}
                  </div>
                </div>
              );
            })}
            {selectedRegion && (
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg font-semibold text-sm animate-bounce">
                ✓ Marked: {selectedRegion}
              </div>
            )}
          </div>
          <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs pointer-events-none shadow-lg">
            <div className="font-semibold">
              {markingMode ? '🎯 Click on body parts to mark pain points' : '🖱️ Drag to rotate • 🔍 Scroll to zoom'}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Marked Pain Points: {spots.length}
          </h4>
          {spots.length > 0 && (
            <button
              onClick={clearAll}
              className="text-xs text-red-600 hover:text-red-700 font-medium"
            >
              Clear All
            </button>
          )}
        </div>
        
        {spots.length > 0 ? (
          <div className="space-y-2">
            {spots.map((spot, idx) => (
              <div 
                key={`${spot.bodyRegion}-${idx}`}
                className="flex items-center justify-between bg-gray-50 dark:bg-slate-700 rounded-lg px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {spot.bodyRegion}
                  </span>
                </div>
                <button
                  onClick={() => removeSpot(spot.bodyRegion)}
                  className="text-xs text-gray-500 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center py-2">
            No pain points marked yet. {markingMode ? 'Click on body parts to mark them.' : 'Enable marking mode to click.'}
          </p>
        )}
      </div>
    </div>
  );
}

import React from 'react';

const BODY_REGIONS = [
  { id: 'head', name: 'Head', top: '5%', left: '50%' },
  { id: 'neck', name: 'Neck', top: '15%', left: '50%' },
  { id: 'chest', name: 'Chest', top: '25%', left: '50%' },
  { id: 'abdomen', name: 'Abdomen', top: '35%', left: '50%' },
  { id: 'left-shoulder', name: 'Left Shoulder', top: '20%', left: '35%' },
  { id: 'right-shoulder', name: 'Right Shoulder', top: '20%', left: '65%' },
  { id: 'left-arm', name: 'Left Arm', top: '30%', left: '25%' },
  { id: 'right-arm', name: 'Right Arm', top: '30%', left: '75%' },
  { id: 'left-leg', name: 'Left Leg', top: '55%', left: '40%' },
  { id: 'right-leg', name: 'Right Leg', top: '55%', left: '60%' },
];

export default function BodyMapper2D({ selectedRegions = [], onRegionSelect }) {
  return (
    <div className="relative w-full max-w-md mx-auto bg-gradient-to-b from-blue-50 to-blue-100 rounded-2xl shadow-lg p-8" style={{ height: '600px' }}>
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 400" className="w-full h-full">
          <ellipse cx="100" cy="40" rx="30" ry="35" fill="#94a3b8" />
          <rect x="85" y="70" width="30" height="15" rx="5" fill="#94a3b8" />
          <rect x="75" y="85" width="50" height="60" rx="10" fill="#94a3b8" />
          <rect x="70" y="145" width="60" height="50" rx="10" fill="#94a3b8" />
          <rect x="60" y="75" width="15" height="70" rx="7" fill="#94a3b8" />
          <rect x="125" y="75" width="15" height="70" rx="7" fill="#94a3b8" />
          <rect x="80" y="195" width="15" height="120" rx="7" fill="#94a3b8" />
          <rect x="105" y="195" width="15" height="120" rx="7" fill="#94a3b8" />
        </svg>
      </div>
      
      {BODY_REGIONS.map((region) => {
        const isSelected = selectedRegions.includes(region.name);
        return (
          <button
            key={region.id}
            onClick={() => onRegionSelect(region.name)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 shadow-md hover:scale-110 ${
              isSelected
                ? 'bg-red-500 text-white ring-4 ring-red-300'
                : 'bg-white text-gray-700 hover:bg-blue-100'
            }`}
            style={{ top: region.top, left: region.left }}
          >
            {region.name}
            {isSelected && ' ✓'}
          </button>
        );
      })}
      
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-xs text-gray-600 font-medium">Click on body parts to mark affected areas</p>
      </div>
    </div>
  );
}

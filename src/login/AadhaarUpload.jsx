import React from 'react';

export default function AadhaarUpload({ onBack, onDone }) {
  const [file, setFile] = React.useState(null);
  const [preview, setPreview] = React.useState('');

  const onSelect = (e) => {
    const f = e.target.files && e.target.files[0];
    setFile(f || null);
    if (!f) return setPreview('');
    const url = URL.createObjectURL(f);
    setPreview(url);
  };

  const proceed = (e) => {
    e.preventDefault();
    onDone && onDone('Aadhaar User');
  };

  return (
    <div className="grid gap-4">
      <div className="rounded-2xl p-5 border border-white/40 dark:border-white/10 bg-white/60 dark:bg-slate-900/40">
        <div className="text-sm opacity-80">Upload Aadhaar (image or PDF)</div>
        <input type="file" accept="image/*,application/pdf" onChange={onSelect} className="mt-3 block" />
        {preview && (
          <div className="mt-4">
            <div className="text-sm opacity-70 mb-2">Preview</div>
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
              {/* Show image preview if image, otherwise simple file name */}
              {file && file.type.startsWith('image/') ? (
                <img src={preview} alt="Preview" className="max-h-64 w-full object-contain" />
              ) : (
                <div className="p-4 text-sm">{file && file.name}</div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="btn-secondary">Back</button>
        <button onClick={proceed} className="btn-primary">Continue</button>
      </div>
    </div>
  );
}



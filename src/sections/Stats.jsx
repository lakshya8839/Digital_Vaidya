import React from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

function AnimatedNumber({ to }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const startTs = performance.now();
    const step = (ts) => {
      const p = Math.min(1, (ts - startTs) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);

  return <span ref={ref}>{value.toLocaleString()}</span>;
}

export default function Stats() {
  const stats = [
    { label: 'Symptom Analyses', value: 10000, prefix: '+', suffix: '' },
    { label: 'Estimated Accuracy', value: 98, prefix: '', suffix: '%' },
    { label: 'Supported Languages', value: 12, prefix: '', suffix: '+' },
  ];

  return (
    <div className="glass rounded-2xl p-6 sm:p-8">
      <div className="grid sm:grid-cols-3 gap-6 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-3xl font-bold">
              {s.prefix}<AnimatedNumber to={s.value} />{s.suffix}
            </div>
            <div className="mt-1 text-sm opacity-70">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}



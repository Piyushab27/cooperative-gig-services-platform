const fs = require('fs');

let content = fs.readFileSync('src/components/common/Navbar.tsx', 'utf8');

// 1. Optimize Header Flexbox Layout
content = content.replace(
  '<div className="flex flex-wrap lg:flex-nowrap items-center justify-between py-2 lg:h-16 gap-2 lg:gap-4">',
  '<div className="flex justify-between items-center w-full whitespace-nowrap py-2 h-16 gap-1 md:gap-2 lg:gap-3">'
);

// Optimize Logo gap
content = content.replace(
  '<div className="flex items-center gap-3">',
  '<div className="flex items-center gap-1.5 lg:gap-2">'
);
content = content.replace(
  '<span className="font-extrabold text-xl tracking-tight text-slate-900">',
  '<span className="font-extrabold text-lg lg:text-xl tracking-tight text-slate-900">'
);

// 2. Location Selector
content = content.replace(
  'className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-xs font-semibold text-slate-700 transition border border-slate-200/60"',
  'className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-[11px] lg:text-xs font-semibold text-slate-700 transition border border-slate-200/60"'
);

// 3. Right Actions gap
content = content.replace(
  '<div className="flex items-center gap-2">',
  '<div className="flex items-center gap-1 lg:gap-2">'
);

// 4. 1-Tap Emergency Button
content = content.replace(
  'className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-extrabold transition-all shadow-sm mr-2"',
  'className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-[11px] lg:text-xs font-extrabold transition-all shadow-sm mr-1 lg:mr-2"'
);

// 5. 5 Roles Selector
content = content.replace(
  '<div className="flex flex-wrap items-center gap-1 sm:gap-2 mr-2">',
  '<div className="flex items-center gap-1 mx-1 lg:mx-2">'
);

// 6. Role Buttons
content = content.replace(
  'className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all border ${',
  'className={`px-2 py-1 lg:py-1.5 rounded-lg text-[10px] lg:text-xs font-bold transition-all border ${'
);

// 7. Profile container
content = content.replace(
  '<div className="pl-2 border-l border-slate-200 flex items-center gap-2 relative">',
  '<div className="pl-1 lg:pl-2 border-l border-slate-200 flex items-center gap-1 lg:gap-2 relative shrink-0">'
);
content = content.replace(
  '<div className="hidden lg:block mr-2">',
  '<div className="hidden xl:block mr-1">'
);


fs.writeFileSync('src/components/common/Navbar.tsx', content);
console.log('Navbar patched');

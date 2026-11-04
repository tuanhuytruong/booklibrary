import React, { useEffect, useRef } from 'react';

const SHEET: Record<string, [string, number, number]> = {
  covers: [
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261029_010644_837e04ca-2418-45c1-b8e0-0233265c4cd5.png&w=1744&q=85',
    1744,
    2336,
  ],
  spines: [
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261029_010738_a3e47ead-18f2-4974-9468-06d16a25edc5.png&w=2688&q=85',
    2688,
    1152,
  ],
  fix: [
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261029_010831_3ebb874b-93dc-433e-87ed-6299aba720f0.png&w=1520&q=85',
    1520,
    2688,
  ],
  fix2: [
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261029_092020_f96bc094-db7b-46de-9298-074a24e0a3b8.png&w=1520&q=85',
    1520,
    2688,
  ],
};

const CROP: Record<string, [string, number, number, number, number]> = {
  'spine-valley': ['spines', 266, 31, 189, 1089],
  'cover-valley': ['covers', 497, 72, 344, 659],
  'spine-bluehour': ['spines', 492, 31, 189, 1089],
  'cover-bluehour': ['covers', 914, 72, 342, 659],
  'spine-river': ['fix', 197, 54, 324, 2566],
  'cover-river': ['covers', 1332, 72, 344, 659],
  'spine-summer': ['spines', 937, 31, 188, 1089],
  'cover-summer': ['covers', 74, 813, 344, 676],
  'spine-green': ['spines', 1157, 31, 185, 1090],
  'cover-green': ['covers', 497, 815, 344, 674],
  'spine-noon': ['spines', 44, 32, 184, 1088],
  'cover-noon': ['covers', 74, 72, 347, 659],
  'spine-observer': ['fix2', 371, 15, 349, 2655],
  'cover-observer': ['covers', 915, 815, 342, 675],
  'spine-birds': ['spines', 1573, 31, 183, 1089],
  'cover-birds': ['covers', 1331, 815, 345, 675],
  'spine-storm': ['fix2', 808, 15, 347, 2656],
  'cover-storm': ['covers', 74, 1571, 345, 681],
  'spine-tide': ['spines', 2012, 31, 188, 1089],
  'cover-tide': ['covers', 496, 1577, 343, 678],
  'spine-war': ['spines', 2236, 31, 189, 1089],
  'cover-war': ['covers', 913, 1579, 343, 676],
  'spine-door': ['spines', 2462, 31, 188, 1089],
  'cover-door': ['covers', 1331, 1579, 344, 677],
};

interface Film {
  id: string;
  title: string;
  romaji: string;
  kanji: string;
  year: number;
  genre: string;
  minutes: number;
  synopsis: string;
}

const FILMS: Film[] = [
  {
    id: 'valley',
    title: 'The Silent Valley',
    romaji: 'SHIZUKANA TANI',
    kanji: '静かな谷',
    year: 1958,
    genre: 'Drama',
    minutes: 104,
    synopsis:
      'A schoolteacher returns to the mountain village that exiled her father, and finds the valley has kept every one of its secrets.',
  },
  {
    id: 'bluehour',
    title: 'The Blue Hour',
    romaji: 'AO NO TOKI',
    kanji: '青の刻',
    year: 1962,
    genre: 'Romance',
    minutes: 97,
    synopsis:
      'Over one long evening in a harbour town, a widow and a stranger trade small lies until the light runs out.',
  },
  {
    id: 'river',
    title: 'River of Salt',
    romaji: 'SHIO NO KAWA',
    kanji: '塩の川',
    year: 1964,
    genre: 'Drama',
    minutes: 121,
    synopsis:
      'Two brothers drag a salt barge downriver to a city that no longer wants anything they carry.',
  },
  {
    id: 'summer',
    title: 'The Last Summer',
    romaji: 'SAIGO NO NATSU',
    kanji: '最後の夏',
    year: 1966,
    genre: 'Drama',
    minutes: 109,
    synopsis:
      'The summer before the dam floods their village, three friends set fire to everything they cannot take with them.',
  },
  {
    id: 'green',
    title: 'The Green Road',
    romaji: 'MIDORI NO MICHI',
    kanji: '緑の道',
    year: 1969,
    genre: 'Mystery',
    minutes: 101,
    synopsis:
      'A surveyor mapping a forest road keeps finding the same footprints, always one day ahead of him.',
  },
  {
    id: 'noon',
    title: 'Noon in Ashes',
    romaji: 'HAI NO SHOGO',
    kanji: '灰の正午',
    year: 1971,
    genre: 'Western',
    minutes: 112,
    synopsis:
      'A rider crosses a white desert to settle an old debt, and learns too late who sent him.',
  },
  {
    id: 'observer',
    title: 'The Observer',
    romaji: 'KANSATSUSHA',
    kanji: '観察者',
    year: 1973,
    genre: 'Thriller',
    minutes: 96,
    synopsis:
      'A night watchman begins to suspect that the building he guards has started watching him back.',
  },
  {
    id: 'birds',
    title: 'The Fallen Birds',
    romaji: 'OCHITA TORI',
    kanji: '落ちた鳥',
    year: 1975,
    genre: 'Drama',
    minutes: 118,
    synopsis:
      "When the birds stop singing over a frontier town, the mayor's daughter is the only one who goes looking for the reason.",
  },
  {
    id: 'storm',
    title: 'Light in the Storm',
    romaji: 'ARASHI NO HI',
    kanji: '嵐の灯',
    year: 1978,
    genre: 'Drama',
    minutes: 127,
    synopsis:
      'A lighthouse keeper and his son wait out a three-day storm with a shipwrecked sailor who will not give his name.',
  },
  {
    id: 'tide',
    title: 'The Long Tide',
    romaji: 'NAGAI SHIO',
    kanji: '長い潮',
    year: 1981,
    genre: 'Drama',
    minutes: 99,
    synopsis:
      "A fisherman's wife counts the tides on the harbour wall while her husband's boat fails to come home.",
  },
  {
    id: 'war',
    title: 'A Quiet War',
    romaji: 'SHIZUKANA SENSO',
    kanji: '静かな戦争',
    year: 1985,
    genre: 'Comedy',
    minutes: 103,
    synopsis:
      'Two neighbours fight a silent war over a garden wall for thirty years, and neither will say how it began.',
  },
  {
    id: 'door',
    title: 'Red Door',
    romaji: 'AKAI TOBIRA',
    kanji: '赤い扉',
    year: 1989,
    genre: 'Thriller',
    minutes: 114,
    synopsis:
      'A projectionist follows a reel of unknown film through the corridors of a cinema on its final night.',
  },
];

const BLOBS = [
  { cx: 150, cy: 330, delay: 0 },
  { cx: 340, cy: 600, delay: 120 },
  { cx: 250, cy: 120, delay: 220 },
  { cx: 90, cy: 760, delay: 300 },
  { cx: 400, cy: 250, delay: 360 },
  { cx: 260, cy: 860, delay: 420 },
  { cx: 230, cy: 470, delay: 180 },
];

const DECADES = [
  { key: 'all', label: 'All / すべて', firstIndex: 0 },
  { key: '1950s', label: '1950s', firstIndex: 0 },
  { key: '1960s', label: '1960s', firstIndex: 1 },
  { key: '1970s', label: '1970s', firstIndex: 5 },
  { key: '1980s', label: '1980s', firstIndex: 9 },
];

function getCropStyle(cropKey: string): React.CSSProperties {
  const [sheetId, x, y, w, h] = CROP[cropKey];
  const [url, W, H] = SHEET[sheetId];
  return {
    backgroundImage: `url("${url}")`,
    backgroundSize: `${(W / w) * 100}% ${(H / h) * 100}%`,
    backgroundPosition: `${(x / (W - w)) * 100}% ${(y / (H - h)) * 100}%`,
  };
}

function smoothstep(x: number): number {
  const c = Math.max(0, Math.min(1, x));
  return c * c * (3 - 2 * c);
}

function B(r: number): number {
  if (r <= -1) return -0.5;
  if (r >= 1) return 0.5;
  return (r + Math.sin(Math.PI * r) / Math.PI) / 2;
}

function relIndex(v: number, s: number): number {
  return ((((v - s) % 36) + 54) % 36) - 18;
}

export default function App() {
  const probeRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const shelfRef = useRef<HTMLElement>(null);
  const playRef = useRef<HTMLButtonElement>(null);
  const tabIndRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tapeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const spRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cvRefs = useRef<(HTMLDivElement | null)[]>([]);

  const capTitleRef = useRef<HTMLDivElement>(null);
  const capSubRef = useRef<HTMLDivElement>(null);
  const capYearRef = useRef<HTMLDivElement>(null);

  const detailRef = useRef<HTMLDivElement>(null);
  const detailLinesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const dSubRef = useRef<HTMLSpanElement>(null);
  const dTitleRef = useRef<HTMLSpanElement>(null);
  const dMetaRef = useRef<HTMLSpanElement>(null);
  const dSynRef = useRef<HTMLSpanElement>(null);
  const dWatchBtnRef = useRef<HTMLButtonElement>(null);
  const posterImgRef = useRef<SVGImageElement>(null);
  const blobRefs = useRef<(SVGCircleElement | null)[]>([]);

  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Preload the 4 Higgsfield generation sheets
    Object.values(SHEET).forEach(([url]) => {
      const img = new Image();
      img.src = url;
    });

    const mqlReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReduced = mqlReduced.matches;
    const onReducedChange = (e: MediaQueryListEvent) => {
      prefersReduced = e.matches;
    };
    mqlReduced.addEventListener('change', onReducedChange);

    // Geometry measurements from --H
    let W = window.innerWidth;
    let H_vp = window.innerHeight;
    let H = 360;
    let ws = (H * 142) / 840;
    let d = (H * 474) / 900;
    let gap = H * 0.03;

    // Motion engine state
    let s = 17; // Noon in Ashes (index 5 in middle copy: 5 + 12 = 17)
    let T = 17;
    let hover = -1;
    let active = 5;
    let mx = W / 2;
    let my = H_vp / 2;
    let cx = W / 2;
    let cy = H_vp / 2;
    let tiltX = 0;
    let tiltY = 0;
    let onCover = false;
    let isOpen = false;
    let isClosing = false;
    let overBtn = false;
    let isWatching = false;

    const lifts = new Float32Array(36);
    let dragging = false;
    let didDrag = false;
    let dragStartX = 0;
    let dragStartT = 17;
    let wheelTimer: number | null = null;

    let inkStart = 0;
    let inkActive = false;
    let sheetAnim: Animation | null = null;
    let lineAnims: Animation[] = [];

    function updateDecadeIndicator(year: number) {
      const decKey = `${Math.floor(year / 10) * 10}s`;
      let activeTabEl: HTMLButtonElement | null = null;

      DECADES.forEach((dec, idx) => {
        const el = tabRefs.current[idx];
        if (!el) return;
        if (dec.key === decKey) {
          el.classList.add('active');
          activeTabEl = el;
        } else {
          el.classList.remove('active');
        }
      });

      if (activeTabEl && tabIndRef.current) {
        const tab = activeTabEl as HTMLButtonElement;
        tabIndRef.current.style.width = `${tab.offsetWidth}px`;
        tabIndRef.current.style.transform = `translateX(${tab.offsetLeft}px)`;
      }
    }

    function measure() {
      W = window.innerWidth;
      H_vp = window.innerHeight;
      if (probeRef.current) {
        H = probeRef.current.getBoundingClientRect().height || 360;
      }
      ws = (H * 142) / 840;
      d = (H * 474) / 900;
      gap = H * 0.03;

      if (stageRef.current) {
        stageRef.current.style.setProperty('--ws', `${ws}px`);
        stageRef.current.style.setProperty('--d', `${d}px`);
      }

      if (playRef.current) {
        playRef.current.style.left = `${W / 2 - 0.5 * d - 6}px`;
        playRef.current.style.top = `${H_vp / 2 + 0.36 * H}px`;
      }

      updateDecadeIndicator(FILMS[active].year);
    }

    function slideMask(maskEl: HTMLDivElement | null, text: string, dir: number) {
      if (!maskEl) return;
      if (prefersReduced) {
        maskEl.innerHTML = '';
        const span = document.createElement('span');
        span.textContent = text;
        maskEl.appendChild(span);
        return;
      }

      const oldSpans = Array.from(maskEl.querySelectorAll('span'));
      oldSpans.forEach((oldSpan) => {
        if (oldSpan.dataset.leaving === '1') return;
        oldSpan.dataset.leaving = '1';
        const computedTransform = getComputedStyle(oldSpan).transform;
        const startTransform =
          computedTransform && computedTransform !== 'none'
            ? computedTransform
            : 'translateY(0%)';
        const anim = oldSpan.animate(
          [
            { transform: startTransform },
            { transform: `translateY(${-dir * 105}%)` },
          ],
          {
            duration: 650,
            easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
            fill: 'both',
          }
        );
        anim.onfinish = () => {
          oldSpan.remove();
        };
      });

      const newSpan = document.createElement('span');
      newSpan.textContent = text;
      maskEl.appendChild(newSpan);
      newSpan.animate(
        [
          { transform: `translateY(${dir * 105}%)` },
          { transform: 'translateY(0%)' },
        ],
        {
          duration: 650,
          easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
          fill: 'both',
        }
      );
    }

    function setActive(newIdx: number, dir: number) {
      active = newIdx;
      const film = FILMS[active];
      const safeDir = dir === 0 ? 1 : dir;
      slideMask(capTitleRef.current, film.title, safeDir);
      slideMask(capSubRef.current, `${film.romaji} / ${film.kanji}`, safeDir);
      slideMask(capYearRef.current, String(film.year), safeDir);
      updateDecadeIndicator(film.year);
    }

    function getActiveCoverRect(): DOMRect {
      let bestV = 17;
      let bestDist = Infinity;
      for (let v = 0; v < 36; v++) {
        const dist = Math.abs(relIndex(v, s));
        if (dist < bestDist) {
          bestDist = dist;
          bestV = v;
        }
      }
      const cvEl = cvRefs.current[bestV];
      if (cvEl) {
        return cvEl.getBoundingClientRect();
      }
      return new DOMRect(W / 2 - d / 2, H_vp / 2 - H / 2, d, H);
    }

    function openDetail() {
      if (isOpen || isClosing) return;
      T = Math.round(s);
      const idx = ((T % 12) + 12) % 12;
      if (idx !== active) {
        setActive(idx, 1);
      }
      const film = FILMS[active];

      if (dSubRef.current) {
        dSubRef.current.textContent = `${film.romaji} / ${film.kanji}`;
      }
      if (dTitleRef.current) {
        dTitleRef.current.textContent = film.title;
      }
      if (dMetaRef.current) {
        dMetaRef.current.textContent = `${film.year} / ${film.genre.toUpperCase()} / ${film.minutes} MIN`;
      }
      if (dSynRef.current) {
        dSynRef.current.textContent = film.synopsis;
      }
      isWatching = false;
      if (dWatchBtnRef.current) {
        dWatchBtnRef.current.textContent = 'WATCH THE FILM / 映画を見る';
        dWatchBtnRef.current.style.backgroundColor = 'transparent';
        dWatchBtnRef.current.style.color = 'var(--cobalt)';
      }

      // Point poster SVG <image> at the film's cover crop
      const [sheetId, x, y, w, h] = CROP[`cover-${film.id}`];
      const [url, SW, SH] = SHEET[sheetId];
      if (posterImgRef.current) {
        posterImgRef.current.setAttribute('href', url);
        posterImgRef.current.setAttribute('x', String((-x * 474) / w));
        posterImgRef.current.setAttribute('y', String((-y * 900) / h));
        posterImgRef.current.setAttribute('width', String((SW * 474) / w));
        posterImgRef.current.setAttribute('height', String((SH * 900) / h));
      }

      // Reset all blob radii to 0
      blobRefs.current.forEach((circle) => {
        if (circle) circle.setAttribute('r', '0');
      });

      const rect = getActiveCoverRect();
      const detailEl = detailRef.current;
      if (!detailEl) return;

      isOpen = true;
      onCover = false;

      const cxRect = rect.left + rect.width / 2;
      const cyRect = rect.top + rect.height / 2;
      detailEl.style.visibility = 'visible';
      detailEl.style.transformOrigin = `${cxRect}px ${cyRect}px`;

      const top = Math.max(0, rect.top);
      const right = Math.max(0, W - rect.right);
      const bottom = Math.max(0, H_vp - rect.bottom);
      const left = Math.max(0, rect.left);

      if (sheetAnim) sheetAnim.cancel();
      sheetAnim = detailEl.animate(
        [
          {
            clipPath: `inset(${top.toFixed(1)}px ${right.toFixed(1)}px ${bottom.toFixed(1)}px ${left.toFixed(1)}px round 3px)`,
            transform: 'rotate(-4.5deg)',
          },
          {
            clipPath: 'inset(0px 0px 0px 0px round 0px)',
            transform: 'rotate(0deg)',
          },
        ],
        {
          duration: prefersReduced ? 1 : 1050,
          easing: 'cubic-bezier(0.76, 0, 0.18, 1)',
          fill: 'both',
        }
      );

      // Text rises
      lineAnims.forEach((a) => a.cancel());
      lineAnims = [];
      detailLinesRef.current.forEach((lineEl, index) => {
        if (!lineEl) return;
        const anim = lineEl.animate(
          [{ transform: 'translateY(110%)' }, { transform: 'translateY(0%)' }],
          {
            duration: prefersReduced ? 1 : 900,
            delay: prefersReduced ? 0 : 620 + index * 75,
            easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
            fill: 'both',
          }
        );
        lineAnims.push(anim);
      });

      // Ink bleed start time
      inkStart = prefersReduced
        ? performance.now() - 5000
        : performance.now() + 520;
      inkActive = true;
    }

    function closeDetail() {
      if (!isOpen || isClosing) return;
      const detailEl = detailRef.current;
      if (!detailEl) return;

      isClosing = true;
      inkActive = false;

      const rect = getActiveCoverRect();
      const cxRect = rect.left + rect.width / 2;
      const cyRect = rect.top + rect.height / 2;
      detailEl.style.transformOrigin = `${cxRect}px ${cyRect}px`;

      const top = Math.max(0, rect.top);
      const right = Math.max(0, W - rect.right);
      const bottom = Math.max(0, H_vp - rect.bottom);
      const left = Math.max(0, rect.left);

      if (sheetAnim) sheetAnim.cancel();
      sheetAnim = detailEl.animate(
        [
          {
            clipPath: 'inset(0px 0px 0px 0px round 0px)',
            transform: 'rotate(0deg)',
          },
          {
            clipPath: `inset(${top.toFixed(1)}px ${right.toFixed(1)}px ${bottom.toFixed(1)}px ${left.toFixed(1)}px round 3px)`,
            transform: 'rotate(-4.5deg)',
          },
        ],
        {
          duration: prefersReduced ? 1 : 850,
          easing: 'cubic-bezier(0.76, 0, 0.18, 1)',
          fill: 'both',
        }
      );

      sheetAnim.onfinish = () => {
        detailEl.style.visibility = 'hidden';
        if (sheetAnim) {
          sheetAnim.cancel();
          sheetAnim = null;
        }
        lineAnims.forEach((a) => a.cancel());
        lineAnims = [];
        isOpen = false;
        isClosing = false;
      };
    }

    // Expose actions to handlers via window/closure
    const onResize = () => measure();
    window.addEventListener('resize', onResize);
    measure();
    // Re-measure once fonts settle so tab indicator width is exact
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => measure());
    }

    // Pointer tracking for cursor & tilt
    const onPointerMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;

      const target = e.target as HTMLElement | null;
      if (target) {
        overBtn = Boolean(
          target.closest('button:not(.play), a') ||
            (isOpen && target.closest('.detail-close, .d-watch'))
        );
      } else {
        overBtn = false;
      }

      if (dragging && !isOpen) {
        const dx = mx - dragStartX;
        if (Math.abs(dx) > 5) {
          didDrag = true;
        }
        if (didDrag) {
          T = dragStartT - dx / (ws + gap);
        }
      }
    };

    const shelfEl = shelfRef.current;
    const onShelfPointerDown = (e: PointerEvent) => {
      if (isOpen || e.button !== 0) return;
      dragging = true;
      didDrag = false;
      dragStartX = e.clientX;
      dragStartT = T;
    };

    const onWindowPointerUp = () => {
      if (!dragging) return;
      dragging = false;
      if (didDrag) {
        T = Math.round(T);
      }
    };

    // Wheel handler
    const onWheel = (e: WheelEvent) => {
      if (isOpen) return;
      e.preventDefault();
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      T += (delta / (ws + gap)) * 0.5;
      if (wheelTimer !== null) {
        window.clearTimeout(wheelTimer);
      }
      wheelTimer = window.setTimeout(() => {
        T = Math.round(T);
      }, 160);
    };

    // Keyboard handler
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isOpen) {
          e.preventDefault();
          closeDetail();
        }
        return;
      }
      if (isOpen) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        T = Math.round(T) + 1;
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        T = Math.round(T) - 1;
      } else if (
        e.key === 'Enter' &&
        (document.activeElement === document.body ||
          document.activeElement === document.documentElement)
      ) {
        e.preventDefault();
        openDetail();
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onWindowPointerUp);
    window.addEventListener('pointercancel', onWindowPointerUp);
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    if (shelfEl) {
      shelfEl.addEventListener('pointerdown', onShelfPointerDown);
    }

    // Bind interactive DOM elements
    const prevBtn = document.querySelector('.arrow.prev') as HTMLButtonElement | null;
    const nextBtn = document.querySelector('.arrow.next') as HTMLButtonElement | null;
    const closeBtn = document.querySelector('.detail-close') as HTMLButtonElement | null;
    const backLink = document.querySelector('.topbar-back') as HTMLAnchorElement | null;
    const watchBtn = dWatchBtnRef.current;

    const onPrev = () => {
      if (!isOpen) T = Math.round(T) - 1;
    };
    const onNext = () => {
      if (!isOpen) T = Math.round(T) + 1;
    };
    const onPlayClick = () => {
      openDetail();
    };
    const onCloseClick = () => {
      closeDetail();
    };
    const onBackClick = (e: MouseEvent) => {
      e.preventDefault();
      if (isOpen) {
        closeDetail();
      } else {
        const cur = ((Math.round(T) % 12) + 12) % 12;
        const diff = (((5 - cur) % 12) + 18) % 12 - 6;
        T = Math.round(T) + diff;
      }
    };
    const onWatchClick = () => {
      if (!watchBtn) return;
      isWatching = !isWatching;
      if (isWatching) {
        const film = FILMS[active];
        watchBtn.textContent = `REEL ARCHIVE #${film.year} — PLAYING (${film.minutes} MIN)`;
        watchBtn.style.backgroundColor = 'var(--cobalt)';
        watchBtn.style.color = '#ffffff';
      } else {
        watchBtn.textContent = 'WATCH THE FILM / 映画を見る';
        watchBtn.style.backgroundColor = 'transparent';
        watchBtn.style.color = 'var(--cobalt)';
      }
    };

    prevBtn?.addEventListener('click', onPrev);
    nextBtn?.addEventListener('click', onNext);
    playRef.current?.addEventListener('click', onPlayClick);
    closeBtn?.addEventListener('click', onCloseClick);
    backLink?.addEventListener('click', onBackClick);
    watchBtn?.addEventListener('click', onWatchClick);

    // Decade tab clicks
    const tabHandlers: (() => void)[] = [];
    DECADES.forEach((dec, idx) => {
      const btn = tabRefs.current[idx];
      if (!btn) return;
      const handler = () => {
        if (isOpen) return;
        const cur = ((Math.round(T) % 12) + 12) % 12;
        const diff = (((dec.firstIndex - cur) % 12) + 18) % 12 - 6;
        T = Math.round(T) + diff;
      };
      tabHandlers[idx] = handler;
      btn.addEventListener('click', handler);
    });

    // Tape hover & click listeners
    const tapeEnters: (() => void)[] = [];
    const tapeLeaves: (() => void)[] = [];
    const tapeClicks: (() => void)[] = [];

    for (let v = 0; v < 36; v++) {
      const el = tapeRefs.current[v];
      if (!el) continue;
      const onEnter = () => {
        hover = v;
      };
      const onLeave = () => {
        if (hover === v) hover = -1;
      };
      const onClick = () => {
        if (didDrag || isOpen) return;
        const r = relIndex(v, s);
        if (Math.abs(r) < 0.5 || onCover) {
          openDetail();
        } else {
          T = Math.round(T + r);
        }
      };
      tapeEnters[v] = onEnter;
      tapeLeaves[v] = onLeave;
      tapeClicks[v] = onClick;
      el.addEventListener('pointerenter', onEnter);
      el.addEventListener('pointerleave', onLeave);
      el.addEventListener('click', onClick);
    }

    // Main single requestAnimationFrame loop
    let lastTime = performance.now();
    let rafId = 0;

    function tick(now: number) {
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;

      // 1. Scroll spring
      if (prefersReduced) {
        s = T;
      } else {
        const k = dragging ? 18 : 5.2;
        s += (T - s) * (1 - Math.exp(-k * dt));
        if (Math.abs(T - s) < 1e-4) {
          s = T;
        }
      }

      // Normalise if s drifts beyond ±4 full loops (4 * 12 = 48)
      if (Math.abs(s) > 48) {
        const loops = Math.trunc(s / 12);
        s -= loops * 12;
        T -= loops * 12;
      }

      // 2. Caption swap when active film changes
      const curActive = ((Math.round(s) % 12) + 12) % 12;
      if (curActive !== active) {
        const dir = T - s >= 0 ? 1 : -1;
        setActive(curActive, dir);
      }

      // 3. Tilt towards the cursor
      const shelfCentreY = H_vp / 2;
      onCover =
        !isOpen &&
        Math.abs(T - s) < 0.3 &&
        Math.abs(mx - W / 2) < 0.55 * d &&
        Math.abs(my - shelfCentreY) < 0.55 * H;

      let targetTiltY = 0;
      let targetTiltX = 0;
      if (onCover) {
        targetTiltY = ((mx - W / 2) / (0.55 * d)) * 9;
        targetTiltX = -((my - shelfCentreY) / (H / 2)) * 6;
      } else {
        targetTiltY = ((mx - W / 2) / W) * 5;
        targetTiltX = 0;
      }

      if (prefersReduced) {
        tiltY = targetTiltY;
        tiltX = targetTiltX;
      } else {
        const tiltEase = 1 - Math.exp(-7 * dt);
        tiltY += (targetTiltY - tiltY) * tiltEase;
        tiltX += (targetTiltX - tiltX) * tiltEase;
      }

      // 4. Update all 36 tapes
      const liftEase = prefersReduced ? 1 : 1 - Math.exp(-12 * dt);
      const cullLimit = W / 2 + 1.5 * d;

      for (let v = 0; v < 36; v++) {
        const tapeEl = tapeRefs.current[v];
        if (!tapeEl) continue;

        const r = relIndex(v, s);
        const x = r * (ws + gap) + (d - ws + 1.6 * gap) * B(r);

        if (Math.abs(x) > cullLimit) {
          tapeEl.style.visibility = 'hidden';
          continue;
        }
        tapeEl.style.visibility = 'visible';

        const liftTarget =
          !isOpen && hover === v && Math.abs(r) > 0.5 ? 1 : 0;
        lifts[v] += (liftTarget - lifts[v]) * liftEase;

        const o = smoothstep(Math.max(0, 1 - Math.abs(r)));
        const rotY = -90 * o + tiltY * o;
        const rotX = tiltX * o;
        const rotZ = -4.5 * o;
        const tz = o * 0.2 * H;
        const ty = -o * 0.025 * H - lifts[v] * 0.045 * H;

        tapeEl.style.transform = `translate3d(${x.toFixed(2)}px, ${ty.toFixed(2)}px, ${tz.toFixed(2)}px) rotateZ(${rotZ.toFixed(3)}deg) rotateX(${rotX.toFixed(3)}deg) rotateY(${rotY.toFixed(3)}deg)`;
        tapeEl.style.zIndex = String(Math.round(100 - Math.abs(r) * 4));

        const spEl = spRefs.current[v];
        const cvEl = cvRefs.current[v];
        if (spEl) {
          spEl.style.setProperty('--shade', (o * 0.55).toFixed(3));
        }
        if (cvEl) {
          cvEl.style.setProperty('--shade', ((1 - o) * 0.5).toFixed(3));
        }
      }

      // 5. Play ring scale
      if (playRef.current) {
        const pScale = isOpen
          ? 0
          : smoothstep(Math.max(0, 1 - Math.abs(T - s) * 3));
        playRef.current.style.transform = `scale(${pScale.toFixed(4)})`;
        playRef.current.style.pointerEvents = pScale > 0.05 ? 'auto' : 'none';
      }

      // 6. Custom cursor smoothing & states
      const curEase = prefersReduced ? 1 : 1 - Math.exp(-16 * dt);
      cx += (mx - cx) * curEase;
      cy += (my - cy) * curEase;

      const curEl = cursorRef.current;
      if (curEl) {
        curEl.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;

        let stateClass = 'cursor';
        if (!isOpen && onCover) {
          stateClass = 'cursor open';
        } else if (overBtn) {
          stateClass = 'cursor btn';
        } else if (
          !isOpen &&
          hover !== -1 &&
          Math.abs(relIndex(hover, s)) > 0.5
        ) {
          stateClass = 'cursor spine';
        }
        if (curEl.className !== stateClass) {
          curEl.className = stateClass;
        }
      }

      // 7. Poster ink bleed loop
      if (inkActive) {
        const elapsedSinceStart = now - inkStart;
        if (elapsedSinceStart >= 0) {
          for (let i = 0; i < BLOBS.length; i++) {
            const circle = blobRefs.current[i];
            if (!circle) continue;
            const blobElapsed = elapsedSinceStart - BLOBS[i].delay;
            const p = Math.max(0, Math.min(1, blobElapsed / 1250));
            const eased = 1 - Math.pow(1 - p, 3);
            circle.setAttribute('r', (eased * 720).toFixed(1));
          }
          if (elapsedSinceStart > 2400) {
            inkActive = false;
          }
        }
      }

      rafId = window.requestAnimationFrame(tick);
    }

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      mqlReduced.removeEventListener('change', onReducedChange);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onWindowPointerUp);
      window.removeEventListener('pointercancel', onWindowPointerUp);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      if (shelfEl) {
        shelfEl.removeEventListener('pointerdown', onShelfPointerDown);
      }
      prevBtn?.removeEventListener('click', onPrev);
      nextBtn?.removeEventListener('click', onNext);
      playRef.current?.removeEventListener('click', onPlayClick);
      closeBtn?.removeEventListener('click', onCloseClick);
      backLink?.removeEventListener('click', onBackClick);
      watchBtn?.removeEventListener('click', onWatchClick);

      DECADES.forEach((_, idx) => {
        const btn = tabRefs.current[idx];
        if (btn && tabHandlers[idx]) {
          btn.removeEventListener('click', tabHandlers[idx]);
        }
      });

      for (let v = 0; v < 36; v++) {
        const el = tapeRefs.current[v];
        if (!el) continue;
        if (tapeEnters[v]) el.removeEventListener('pointerenter', tapeEnters[v]);
        if (tapeLeaves[v]) el.removeEventListener('pointerleave', tapeLeaves[v]);
        if (tapeClicks[v]) el.removeEventListener('click', tapeClicks[v]);
      }
    };
  }, []);

  const initialFilm = FILMS[5]; // Noon in Ashes (1971)

  return (
    <>
      {/* Off-screen probe for measuring --H */}
      <div ref={probeRef} className="probe" aria-hidden="true" />

      {/* Paper grain overlay */}
      <div className="grain" aria-hidden="true" />

      {/* 1. Top bar */}
      <header className="topbar">
        <a href="#back" className="lbl box topbar-back">
          BACK / 戻る
        </a>
        <div className="logo" aria-label="Leon Vasari">
          <span className="logo-cn">莱昂·瓦萨里</span>
          <span className="logo-en">LEON VASARI</span>
        </div>
        <span className="lbl topbar-career">CAREER 1958年〜1989年</span>
      </header>

      {/* 2. Decade tabs */}
      <nav className="tabs" aria-label="Decades">
        <span ref={tabIndRef} className="tab-ind" aria-hidden="true" />
        {DECADES.map((dec, idx) => (
          <button
            key={dec.key}
            ref={(el) => {
              tabRefs.current[idx] = el;
            }}
            type="button"
            className={`lbl tab${dec.key === '1970s' ? ' active' : ''}`}
          >
            {dec.label}
          </button>
        ))}
      </nav>

      {/* 3. The shelf (3D stage) */}
      <section ref={shelfRef} className="shelf" aria-label="Filmography shelf">
        <div ref={stageRef} className="stage">
          {Array.from({ length: 36 }, (_, v) => {
            const film = FILMS[v % 12];
            const spineStyle = getCropStyle(`spine-${film.id}`);
            const coverStyle = getCropStyle(`cover-${film.id}`);
            return (
              <div
                key={v}
                ref={(el) => {
                  tapeRefs.current[v] = el;
                }}
                className="tape"
              >
                <div
                  ref={(el) => {
                    spRefs.current[v] = el;
                  }}
                  className="face sp"
                  style={spineStyle}
                />
                <div
                  ref={(el) => {
                    cvRefs.current[v] = el;
                  }}
                  className="face cv"
                  style={coverStyle}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Play ring */}
      <button
        ref={playRef}
        type="button"
        className="play"
        aria-label="Open film"
      >
        <svg viewBox="0 0 12 12" aria-hidden="true">
          <polygon points="1,0 12,6 1,12" />
        </svg>
      </button>

      {/* 5. Caption */}
      <div className="caption" aria-live="polite">
        <div ref={capTitleRef} className="mask cap-title">
          <span>{initialFilm.title}</span>
        </div>
        <div ref={capSubRef} className="mask lbl cap-sub">
          <span>
            {initialFilm.romaji} / {initialFilm.kanji}
          </span>
        </div>
        <div ref={capYearRef} className="mask cap-year">
          <span>{initialFilm.year}</span>
        </div>
      </div>

      {/* 6. Arrows */}
      <button type="button" className="arrow prev" aria-label="Previous film">
        <svg
          width="18"
          height="10"
          viewBox="0 0 18 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          aria-hidden="true"
        >
          <path d="M5 1 L1 5 L5 9 M1 5 L17 5" />
        </svg>
      </button>
      <button type="button" className="arrow next" aria-label="Next film">
        <svg
          width="18"
          height="10"
          viewBox="0 0 18 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          aria-hidden="true"
        >
          <path d="M13 1 L17 5 L13 9 M17 5 L1 5" />
        </svg>
      </button>

      {/* 7. Footer */}
      <footer className="footer">
        <span className="lbl">© LEON VASARI. ALL RIGHTS RESERVED.</span>
        <span className="lbl">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.preventDefault()}
          >
            FB
          </a>{' '}
          /{' '}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.preventDefault()}
          >
            TW
          </a>
        </span>
      </footer>

      {/* Detail dialog: paper sheet & ink reveal */}
      <div
        ref={detailRef}
        className="detail"
        role="dialog"
        aria-modal="true"
        aria-label="Film details"
      >
        <div className="detail-top">
          <button type="button" className="lbl box detail-close">
            CLOSE / 閉じる
          </button>
          <div className="logo" aria-hidden="true">
            <span className="logo-cn">莱昂·瓦萨里</span>
            <span className="logo-en">LEON VASARI</span>
          </div>
        </div>

        <div className="detail-left">
          <div className="d-mask">
            <span
              ref={(el) => {
                detailLinesRef.current[0] = el;
                dSubRef.current = el;
              }}
              className="d-line lbl d-sub"
            >
              {initialFilm.romaji} / {initialFilm.kanji}
            </span>
          </div>

          <div className="d-mask">
            <span
              ref={(el) => {
                detailLinesRef.current[1] = el;
                dTitleRef.current = el;
              }}
              className="d-line d-title"
            >
              {initialFilm.title}
            </span>
          </div>

          <div className="d-mask">
            <span
              ref={(el) => {
                detailLinesRef.current[2] = el;
                dMetaRef.current = el;
              }}
              className="d-line lbl d-meta"
            >
              {initialFilm.year} / {initialFilm.genre.toUpperCase()} /{' '}
              {initialFilm.minutes} MIN
            </span>
          </div>

          <div className="d-mask">
            <span
              ref={(el) => {
                detailLinesRef.current[3] = el;
                dSynRef.current = el;
              }}
              className="d-line d-syn"
            >
              {initialFilm.synopsis}
            </span>
          </div>

          <div className="d-mask">
            <span
              ref={(el) => {
                detailLinesRef.current[4] = el;
              }}
              className="d-line d-cred"
            >
              Written and directed by Leon Vasari. 監督作品
            </span>
          </div>

          <div className="d-mask">
            <span
              ref={(el) => {
                detailLinesRef.current[5] = el;
              }}
              className="d-line"
            >
              <button
                ref={dWatchBtnRef}
                type="button"
                className="lbl d-watch"
              >
                WATCH THE FILM / 映画を見る
              </button>
            </span>
          </div>
        </div>

        <div className="detail-right">
          <svg
            className="poster-svg"
            viewBox="0 0 474 900"
            aria-hidden="true"
          >
            <defs>
              <clipPath id="poster-clip">
                <rect x="0" y="0" width="474" height="900" rx="2" ry="2" />
              </clipPath>
              <filter
                id="ink-flt"
                filterUnits="userSpaceOnUse"
                x="-200"
                y="-200"
                width="874"
                height="1300"
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.011"
                  numOctaves="3"
                  seed="7"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="120"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
              <mask
                id="ink-mask"
                maskUnits="userSpaceOnUse"
                x="-200"
                y="-200"
                width="874"
                height="1300"
              >
                <g filter="url(#ink-flt)" fill="#ffffff">
                  {BLOBS.map((b, idx) => (
                    <circle
                      key={idx}
                      ref={(el) => {
                        blobRefs.current[idx] = el;
                      }}
                      cx={b.cx}
                      cy={b.cy}
                      r="0"
                    />
                  ))}
                </g>
              </mask>
            </defs>
            <g clipPath="url(#poster-clip)" mask="url(#ink-mask)">
              <image
                ref={posterImgRef}
                href={SHEET.covers[0]}
                x={(-74 * 474) / 347}
                y={(-72 * 900) / 659}
                width={(1744 * 474) / 347}
                height={(2336 * 900) / 659}
                preserveAspectRatio="none"
              />
            </g>
          </svg>
        </div>
      </div>

      {/* 8. Custom cursor */}
      <div ref={cursorRef} className="cursor" aria-hidden="true">
        <div className="cur-ring" />
        <div className="cur-dot" />
        <div className="cur-lbl">
          OPEN
          <br />
          開く
        </div>
      </div>
    </>
  );
}

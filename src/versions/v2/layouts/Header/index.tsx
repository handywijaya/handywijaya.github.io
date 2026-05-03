import React from 'react'
import { Link } from 'react-router-dom'

import { V2_HOME, v2FoodAlbumPath } from '../../utils/paths'

const LOGO_SRC = `${process.env.PUBLIC_URL}/logo-128.png`

const scrollToFooter = () => {
  document.getElementById('site-footer')?.scrollIntoView({ behavior: 'smooth' })
}

const Header: React.FC = () => (
  <header className="sticky top-0 z-[1000] w-full border-b border-neutral-100 bg-white shadow-sm">
    <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 md:px-8">
      <Link
        to={V2_HOME}
        className="flex items-center gap-3 no-underline"
        aria-label="Home"
      >
        <img
          src={LOGO_SRC}
          alt=""
          className="h-10 w-10 shrink-0 object-contain md:h-12 md:w-12"
          width={48}
          height={48}
        />
        <span className="text-xl font-bold tracking-tight text-neutral-900 md:text-2xl">
          Journey to Explore the World
        </span>
      </Link>

      <nav className="flex items-center gap-4 md:gap-8">
        <Link
          to={V2_HOME}
          className="text-sm font-medium text-neutral-800 no-underline transition-colors hover:text-black md:text-base"
        >
          Albums
        </Link>
        <Link
          to={v2FoodAlbumPath}
          className="text-sm font-medium text-neutral-800 no-underline transition-colors hover:text-black md:text-base"
        >
          Food Album
        </Link>
        <button
          type="button"
          onClick={scrollToFooter}
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800 md:px-5"
        >
          Get in Touch
        </button>
      </nav>
    </div>
  </header>
)

export default Header

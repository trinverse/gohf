import Link from 'next/link'

const navigation = {
  main: [
    { name: 'About', href: '/about' },
    { name: 'Founders', href: '/founders' },
    { name: 'Members', href: '/members' },
    { name: 'Events', href: '/events' },
    { name: 'Join Us', href: '/join' },
    { name: 'Contact', href: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[var(--md-sys-color-surface)] border-t border-[var(--md-sys-color-surface-container)]">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[var(--md-sys-color-primary)] flex items-center justify-center">
                <span className="text-[var(--md-sys-color-on-primary)] font-semibold text-sm">GHF</span>
              </div>
              <div>
                <span className="text-[var(--md-sys-color-on-surface)] font-semibold tracking-tight block">Guardians of Hope</span>
                <span className="text-xs text-[var(--md-sys-color-secondary)] font-medium">Where courage meets the care</span>
              </div>
            </Link>
            <p className="mt-6 text-[var(--md-sys-color-on-surface-variant)] leading-relaxed max-w-sm">
              A JNV alumni-led initiative dedicated to empowering underprivileged children through education, mentorship, and community support.
            </p>
            <p className="mt-4 text-sm text-[var(--md-sys-color-on-surface-muted)]">
              Independent non-profit by JNV alumni. Not affiliated with official JNV administration.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3 md:col-start-7">
            <h3 className="text-sm font-semibold text-[var(--md-sys-color-on-surface)] tracking-wide uppercase">Navigation</h3>
            <ul className="mt-6 space-y-4">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[var(--md-sys-color-on-surface-variant)] hover:text-[var(--md-sys-color-primary)] transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold text-[var(--md-sys-color-on-surface)] tracking-wide uppercase">Get in Touch</h3>
            <div className="mt-6 space-y-4">
              <p className="text-[var(--md-sys-color-on-surface-variant)]">contact@guardiansofhope.org</p>
              <Link
                href="/join"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[var(--md-sys-color-on-primary)] bg-[var(--md-sys-color-primary)] rounded-full hover:bg-[var(--md-sys-color-primary-dark)] transition-all duration-300 hover:shadow-lg"
              >
                <span>Join Our Cause</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-[var(--md-sys-color-outline-variant)]">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[var(--md-sys-color-on-surface-muted)]">
              &copy; {new Date().getFullYear()} Guardians of Hope Foundation. All rights reserved.
            </p>
            <p className="text-sm text-[var(--md-sys-color-on-surface-muted)]">
              Made with purpose by JNV Alumni
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

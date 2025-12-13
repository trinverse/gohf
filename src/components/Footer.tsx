import Link from 'next/link'

const navigation = {
  main: [
    { name: 'About', href: '/about' },
    { name: 'Founders', href: '/founders' },
    { name: 'Events', href: '/events' },
    { name: 'Join Us', href: '/join' },
    { name: 'Contact', href: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#fafafa] border-t border-[#f1f3f4]">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0A84FF] flex items-center justify-center">
                <span className="text-white font-semibold text-sm">JNV</span>
              </div>
              <span className="text-[#1C1C1E] font-semibold tracking-tight">Alumni Foundation</span>
            </Link>
            <p className="mt-6 text-[#5f6368] leading-relaxed max-w-sm">
              An alumni-led initiative dedicated to empowering underprivileged children through education, mentorship, and community support.
            </p>
            <p className="mt-4 text-sm text-[#9aa0a6]">
              Independent non-profit. Not affiliated with official JNV administration.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3 md:col-start-7">
            <h3 className="text-sm font-semibold text-[#1C1C1E] tracking-wide uppercase">Navigation</h3>
            <ul className="mt-6 space-y-4">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[#5f6368] hover:text-[#0A84FF] transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold text-[#1C1C1E] tracking-wide uppercase">Get in Touch</h3>
            <div className="mt-6 space-y-4">
              <p className="text-[#5f6368]">contact@jnvalumnifoundation.org</p>
              <Link
                href="/join"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#0A84FF] rounded-full hover:bg-[#0066CC] transition-all duration-300 hover:shadow-lg"
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
        <div className="mt-16 pt-8 border-t border-[#e8eaed]">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#9aa0a6]">
              &copy; {new Date().getFullYear()} JNV Alumni Foundation. All rights reserved.
            </p>
            <p className="text-sm text-[#9aa0a6]">
              Made with purpose by JNV Alumni
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

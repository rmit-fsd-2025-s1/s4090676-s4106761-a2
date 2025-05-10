import styled from "@emotion/styled"
import Link from "next/link"

const Footer = styled.footer`
    background-color: indigo;
    color: white;
    padding: 0.7rem 1rem;
    width: 100%;
`

export function AppFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <Footer>
        <p>© {currentYear} LiRon CORP</p>
        <nav className="footer-links">
          {/* FIXME */}
          <Link href="/contact">Privacy Policy | </Link>
          <Link href="/contact">Terms of Service | </Link>
          <Link href="/contact">Contact Us </Link>
        </nav>
      </Footer>
    </>
  )
}

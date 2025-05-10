import styled from "@emotion/styled"

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
          <a href="/contact">Privacy Policy | </a>
          <a href="/contact">Terms of Service | </a>
          <a href="/contact">Contact Us </a>
        </nav>
      </Footer>
    </>
  )
}

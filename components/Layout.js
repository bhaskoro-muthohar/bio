/**
 * The page ground is painted by body in GlobalStyle, so the layout no longer
 * carries a background image. Children provide their own <main>.
 */
export default function Layout({ children }) {
  return <>{children}</>;
}

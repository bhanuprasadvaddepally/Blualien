import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Seo from './components/Seo.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const WorkPage = lazy(() => import('./pages/Work.jsx'));
const Products = lazy(() =>
  import('./pages/ContentPages.jsx').then(({ Products: Page }) => ({ default: Page })),
);
const Studio = lazy(() =>
  import('./pages/ContentPages.jsx').then(({ Studio: Page }) => ({ default: Page })),
);
const Labs = lazy(() =>
  import('./pages/ContentPages.jsx').then(({ Labs: Page }) => ({ default: Page })),
);
const About = lazy(() =>
  import('./pages/ContentPages.jsx').then(({ About: Page }) => ({ default: Page })),
);
const People = lazy(() =>
  import('./pages/ContentPages.jsx').then(({ People: Page }) => ({ default: Page })),
);
const Careers = lazy(() =>
  import('./pages/ContentPages.jsx').then(({ Careers: Page }) => ({ default: Page })),
);
const Journal = lazy(() =>
  import('./pages/ContentPages.jsx').then(({ Journal: Page }) => ({ default: Page })),
);
const NotFound = lazy(() =>
  import('./pages/ContentPages.jsx').then(({ NotFound: Page }) => ({ default: Page })),
);

function PageLoader() {
  return <div className="min-h-96 bg-paper" aria-label="Loading page" />;
}

function RoutedPage({ title, noIndex = false, children }) {
  return (
    <>
      <Seo title={title} noIndex={noIndex} />
      <Suspense fallback={<PageLoader />}>{children}</Suspense>
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <ScrollToTop />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" tabIndex="-1">
        <Routes>
          <Route
            path="/"
            element={
              <RoutedPage title="BLUALIEN | Building what comes next.">
                <Home />
              </RoutedPage>
            }
          />
          <Route
            path="/products"
            element={
              <RoutedPage title="Products | BLUALIEN">
                <Products />
              </RoutedPage>
            }
          />
          <Route
            path="/studio"
            element={
              <RoutedPage title="Studio | BLUALIEN">
                <Studio />
              </RoutedPage>
            }
          />
          <Route
            path="/work"
            element={
              <RoutedPage title="Work | BLUALIEN">
                <WorkPage />
              </RoutedPage>
            }
          />
          <Route path="/orbit" element={<Navigate to="/" replace />} />
          <Route
            path="/labs"
            element={
              <RoutedPage title="Labs | BLUALIEN">
                <Labs />
              </RoutedPage>
            }
          />
          <Route
            path="/about"
            element={
              <RoutedPage title="About | BLUALIEN">
                <About />
              </RoutedPage>
            }
          />
          <Route
            path="/people"
            element={
              <RoutedPage title="People | BLUALIEN">
                <People />
              </RoutedPage>
            }
          />
          <Route
            path="/careers"
            element={
              <RoutedPage title="Careers | BLUALIEN">
                <Careers />
              </RoutedPage>
            }
          />
          <Route
            path="/contact"
            element={
              <RoutedPage title="Contact | BLUALIEN">
                <Contact />
              </RoutedPage>
            }
          />
          <Route
            path="/journal"
            element={
              <RoutedPage title="Journal | BLUALIEN">
                <Journal />
              </RoutedPage>
            }
          />
          <Route
            path="*"
            element={
              <RoutedPage title="Page not found | BLUALIEN" noIndex>
                <NotFound />
              </RoutedPage>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

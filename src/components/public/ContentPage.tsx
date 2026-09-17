import { useEffect, useState, type ReactNode } from "react";
import PublicHeader from "./PublicHeader";
import Footer from "./Footer";
import { img } from "../../data";
import {
  getPublicHomeContent,
  setCachedPublicHomeContent,
  subscribeToPublicContent,
} from "../../services/siteContent";
import { api } from "../../services/api";
import { useLocation } from "react-router-dom";
export default function ContentPage({
  kicker,
  title,
  intro,
  image,
  children,
}: {
  kicker: string;
  title: string;
  intro: string;
  image: string;
  children: ReactNode;
}) {
  const { pathname } = useLocation();
  const [content, setContent] = useState(() => getPublicHomeContent());
  useEffect(() => {
    let active = true;
    api.publicContent
      .get()
      .then((next: ReturnType<typeof getPublicHomeContent>) => {
        if (active) {
          const normalized = setCachedPublicHomeContent(next);
          setContent(normalized);
        }
      })
      .catch(() => undefined);
    const off = subscribeToPublicContent(() =>
      setContent(getPublicHomeContent()),
    );
    return () => {
      active = false;
      off();
    };
  }, []);
  const meta = content.pages[pathname];
  const heroImage = meta?.image || image;
  return (
    <div className="public-site">
      <PublicHeader />
      <main>
        <section className="page-hero">
          <div>
            <span className="eyebrow">{meta?.kicker || kicker}</span>
            <h1>{meta?.title || title}</h1>
            <p>{meta?.intro || intro}</p>
          </div>
          {heroImage && (
            <img
              src={
                heroImage.startsWith("http") || heroImage.startsWith("/")
                  ? heroImage
                  : img(heroImage)
              }
              alt="SGGSIE&T Training & Placement Cell"
            />
          )}
        </section>
        {children}
      </main>
      <Footer />
    </div>
  );
}

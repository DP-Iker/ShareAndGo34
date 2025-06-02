import type { FC } from "react";
import { useLocation } from "react-router-dom";
import type { NoticiaProps } from "../../interfaces/NoticiasProps";
import { NoticiasComponent } from "../../components/NoticiasComponent/NoticiasComponent";

export const NoticiaDetailPage: FC = () => {
  const location = useLocation();
  const noticia: NoticiaProps = location.state;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
        <section>
          <h1 className="text-4xl font-extrabold leading-snug text-gray-900 mb-4">
            {noticia.titulo}
          </h1>

          <p className="text-sm text-gray-500 mb-6">
            {noticia.fecha} · por{" "}
            <span className="italic">{noticia.autor}</span>
          </p>

          <div className="mb-8">
            <img
              src={noticia.imagen}
              alt={noticia.titulo}
              className="w-[47em] h-auto object-cover rounded"
            />
          </div>

          <p className="text-lg text-gray-700 mb-8">{noticia.descripcion}</p>

          <article className="text-[17px] leading-[1.75rem] text-gray-800 space-y-6">
            {noticia.contenido ? (
              noticia.contenido
                .split("\n\n")
                .map((p, idx) => <p key={idx}>{p}</p>)
            ) : (
              <p className="italic text-gray-500">
                No hay contenido disponible.
              </p>
            )}
          </article>
        </section>

        <aside className="hidden lg:block h-screen overflow-auto pr-2 py-16">
          <h2 className="text-lg font-semibold text-gray-900 mb-5 pl-21">
            Otras noticias
          </h2>
          <NoticiasComponent />{" "}
          {/* Puedes personalizarlo para que no sea clicable si ya estás en una */}
        </aside>
      </div>
    </main>
  );
};
